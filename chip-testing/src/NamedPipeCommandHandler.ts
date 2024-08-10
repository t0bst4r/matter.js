import { Endpoint } from "@project-chip/matter.js/endpoint";
import { ServerNode } from "@project-chip/matter.js/node";
import { isObject } from "@project-chip/matter.js/util";
import { execSync } from "child_process";
import { constants } from "node:fs";
import { FileHandle, open, unlink } from "node:fs/promises";
import { Socket } from "node:net";
import { NamedPipeCommand } from "./NamedPipeCommands.js";
import { SwitchSimulator } from "./simulators/SwitchSimulator.js";

export class NamedPipeCommandHandler {
    #namedPipeName: string;
    #namedPipe?: FileHandle;
    #namedPipeSocket?: Socket;
    #serverNode: ServerNode;

    constructor(namedPipeName: string, serverNode: ServerNode) {
        this.#namedPipeName = namedPipeName;
        this.#serverNode = serverNode;
    }

    async listen() {
        execSync(`mkfifo ${this.#namedPipeName}`);

        this.#namedPipe = await open(this.#namedPipeName, constants.O_RDONLY | constants.O_NONBLOCK);
        this.#namedPipeSocket = new Socket({ fd: this.#namedPipe.fd });
        console.log(`Named pipe created: ${this.#namedPipeName}`);

        this.#namedPipeSocket.on("data", async dataBuf => {
            let data: Record<string, unknown>;
            try {
                data = JSON.parse(dataBuf.toString());
            } catch (error) {
                console.log("Error parsing named pipe data:", error);
                return;
            }
            console.log("Named pipe data:", data);

            if (!isObject(data) || !("Name" in data)) {
                console.log("Invalid named pipe data:", data);
                return;
            }

            await this.#handleNamedPipeData(data as NamedPipeCommand);
        });

        this.#namedPipeSocket.on("error", err => {
            console.log("Named pipe error:", err);
        });

        this.#namedPipeSocket.on("close", () => {
            console.log("Named pipe closed");
        });
    }

    async close() {
        try {
            this.#namedPipe?.close();
        } catch (error) {
            console.log("Error closing named pipe:", error);
        }
        this.#namedPipe = undefined;
        this.#namedPipeSocket = undefined;
        await unlink(this.#namedPipeName);
    }

    async #handleNamedPipeData(data: NamedPipeCommand) {
        const name = data.Name;

        const endpointId = data.EndpointId;
        let endpoint: Endpoint | undefined = undefined;
        if (endpointId !== undefined) {
            // Find the endpoint instance if an EndpointId is set
            this.#serverNode.visit(visitedEndpoint => {
                if (visitedEndpoint.number === endpointId) {
                    if (endpoint !== undefined) {
                        throw new Error("Duplicate endpoint number? Should never happen");
                    }
                    endpoint = visitedEndpoint;
                }
            });
        }

        switch (name) {
            case "SimulateActionSwitchLongPress":
                if (endpoint === undefined) {
                    throw new Error(`Endpoint ${endpointId} not existing`);
                }
                SwitchSimulator.simulateActionSwitchLongPress(endpoint, data);
                break;
            case "SimulateActionSwitchMultiPress":
                if (endpoint === undefined) {
                    throw new Error(`Endpoint ${endpointId} not existing`);
                }
                SwitchSimulator.simulateActionSwitchMultiPress(endpoint, data);
                break;
            default:
                console.log(`Unknown named pipe command: ${name}`);
        }
    }
}