/**
 * @license
 * Copyright 2022-2024 Matter.js Authors
 * SPDX-License-Identifier: Apache-2.0
 */

import { AdministratorCommissioningServer } from "@project-chip/matter.js/behavior/definitions/administrator-commissioning";
import { BooleanStateServer } from "@project-chip/matter.js/behavior/definitions/boolean-state";
import { CarbonDioxideConcentrationMeasurementServer } from "@project-chip/matter.js/behavior/definitions/carbon-dioxide-concentration-measurement";
import { CarbonMonoxideConcentrationMeasurementServer } from "@project-chip/matter.js/behavior/definitions/carbon-monoxide-concentration-measurement";
import { ColorControlServer } from "@project-chip/matter.js/behavior/definitions/color-control";
import { DescriptorServer } from "@project-chip/matter.js/behavior/definitions/descriptor";
import { FixedLabelServer } from "@project-chip/matter.js/behavior/definitions/fixed-label";
import { FlowMeasurementServer } from "@project-chip/matter.js/behavior/definitions/flow-measurement";
import { FormaldehydeConcentrationMeasurementServer } from "@project-chip/matter.js/behavior/definitions/formaldehyde-concentration-measurement";
import { IlluminanceMeasurementServer } from "@project-chip/matter.js/behavior/definitions/illuminance-measurement";
import { LocalizationConfigurationServer } from "@project-chip/matter.js/behavior/definitions/localization-configuration";
import { ModeSelectServer } from "@project-chip/matter.js/behavior/definitions/mode-select";
import { NetworkCommissioningServer } from "@project-chip/matter.js/behavior/definitions/network-commissioning";
import { NitrogenDioxideConcentrationMeasurementServer } from "@project-chip/matter.js/behavior/definitions/nitrogen-dioxide-concentration-measurement";
import { OccupancySensingServer } from "@project-chip/matter.js/behavior/definitions/occupancy-sensing";
import { OzoneConcentrationMeasurementServer } from "@project-chip/matter.js/behavior/definitions/ozone-concentration-measurement";
import { Pm1ConcentrationMeasurementServer } from "@project-chip/matter.js/behavior/definitions/pm1-concentration-measurement";
import { Pm10ConcentrationMeasurementServer } from "@project-chip/matter.js/behavior/definitions/pm10-concentration-measurement";
import { Pm25ConcentrationMeasurementServer } from "@project-chip/matter.js/behavior/definitions/pm25-concentration-measurement";
import { PowerSourceServer } from "@project-chip/matter.js/behavior/definitions/power-source";
import { PowerTopologyServer } from "@project-chip/matter.js/behavior/definitions/power-topology";
import { PressureMeasurementServer } from "@project-chip/matter.js/behavior/definitions/pressure-measurement";
import { PumpConfigurationAndControlServer } from "@project-chip/matter.js/behavior/definitions/pump-configuration-and-control";
import { RadonConcentrationMeasurementServer } from "@project-chip/matter.js/behavior/definitions/radon-concentration-measurement";
import { RelativeHumidityMeasurementServer } from "@project-chip/matter.js/behavior/definitions/relative-humidity-measurement";
import { SwitchServer } from "@project-chip/matter.js/behavior/definitions/switch";
import { TemperatureMeasurementServer } from "@project-chip/matter.js/behavior/definitions/temperature-measurement";
import { ThermostatUserInterfaceConfigurationServer } from "@project-chip/matter.js/behavior/definitions/thermostat-user-interface-configuration";
import { TimeFormatLocalizationServer } from "@project-chip/matter.js/behavior/definitions/time-format-localization";
import { TotalVolatileOrganicCompoundsConcentrationMeasurementServer } from "@project-chip/matter.js/behavior/definitions/total-volatile-organic-compounds-concentration-measurement";
import { UnitLocalizationServer } from "@project-chip/matter.js/behavior/definitions/unit-localization";
import { UserLabelServer } from "@project-chip/matter.js/behavior/definitions/user-label";
import { AirQualityServer } from "@project-chip/matter.js/behaviors/air-quality";
import {
    AdministratorCommissioning,
    AirQuality,
    BasicInformation,
    ColorControl,
    ConcentrationMeasurement,
    LevelControl,
    ModeSelect,
    NetworkCommissioning,
    OccupancySensing,
    PowerSource,
    PowerTopology,
    PumpConfigurationAndControl,
    ResourceMonitoring,
    Switch,
    ThermostatUserInterfaceConfiguration,
    TimeFormatLocalization,
    WindowCovering,
} from "@project-chip/matter.js/cluster";
import { DeviceTypeId, EndpointNumber, VendorId } from "@project-chip/matter.js/datatype";
import { DimmableLightDevice } from "@project-chip/matter.js/devices/DimmableLightDevice";
import { OnOffLightDevice } from "@project-chip/matter.js/devices/OnOffLightDevice";
import { Endpoint } from "@project-chip/matter.js/endpoint";
import { Environment, StorageService } from "@project-chip/matter.js/environment";
import { ServerNode } from "@project-chip/matter.js/node";
import { Storage } from "@project-chip/matter.js/storage";
import { ByteArray } from "@project-chip/matter.js/util";
import { TestActivatedCarbonFilterMonitoringServer } from "./cluster/TestActivatedCarbonFilterMonitoringServer.js";
import { TestGeneralDiagnosticsServer } from "./cluster/TestGeneralDiagnosticsServer.js";
import { TestHepaFilterMonitoringServer } from "./cluster/TestHEPAFilterMonitoringServer.js";
import { TestIdentifyServer } from "./cluster/TestIdentifyServer.js";
import { TestLevelControlServer } from "./cluster/TestLevelControlServer.js";
import { TestWindowCoveringServer } from "./cluster/TestWindowCoveringServer.js";
import { TestInstance } from "./GenericTestApp.js";
import { NamedPipeCommandHandler } from "./NamedPipeCommandHandler.js";

export class AllClustersTestInstance implements TestInstance {
    serverNode?: ServerNode;
    protected appName: string;
    #namedPipeHandler?: NamedPipeCommandHandler;

    constructor(
        public storage: Storage,
        protected options: {
            appName: string;
            discriminator?: number;
            passcode?: number;
        },
    ) {
        this.appName = options.appName;
    }

    async #setupNamedPipe() {
        if (this.serverNode === undefined) {
            throw new Error("ServerNode not initialized, cannot setup NamedPipeCommandHandler.");
        }
        try {
            this.#namedPipeHandler = new NamedPipeCommandHandler(
                `/tmp/chip_all_clusters_fifo_${process.pid}`,
                this.serverNode,
            );
            await this.#namedPipeHandler.listen();
        } catch (error) {
            console.log("Error creating named pipe:", error);
        }
    }

    /** Set up the test instance MatterServer. */
    async setup() {
        try {
            this.serverNode = await this.setupServer();
            await this.#setupNamedPipe();
        } catch (error) {
            // Catch and log error, else the test framework hides issues here
            console.log(error);
            console.log((error as Error).stack);
            throw error;
        }
        console.log(`======> ${this.appName}: Setup done`);
    }

    /** Start the test instance MatterServer with the included device. */
    async start() {
        if (!this.serverNode) throw new Error("serverNode not initialized on start");

        /*
        const env = Environment.default;
        env.vars.set("mdns.networkInterface", "en0");
        */

        try {
            await this.serverNode.start();
            const { qrPairingCode } = this.serverNode.state.commissioning.pairingCodes;
            // Magic logging chip testing waits for
            console.log(`SetupQRCode: [${qrPairingCode}]`);
            console.log();
            // Magic logging chip testing waits for
            console.log("mDNS service published:");
            console.log();

            console.log(`======> ${this.appName}: Instance started`);
        } catch (error) {
            // Catch and log error, else the test framework hides issues here
            console.log(error);
        }
        console.log("=====>>> STARTED");
    }

    /** Stop the test instance MatterServer and the device. */
    async stop() {
        if (!this.serverNode) throw new Error("serverNode not initialized on close");
        await this.serverNode.close();
        //this.serverNode.cancel();
        //await this.serverNode.lifecycle.act;
        this.serverNode = undefined;
        try {
            await this.#namedPipeHandler?.close();
        } catch (error) {
            console.log("Error closing named pipe:", error);
        }
        console.log(`======> ${this.appName}: Instance stopped`);
    }

    async setupServer(): Promise<ServerNode> {
        Environment.default.get(StorageService).factory = (_namespace: string) => this.storage;

        const networkId = new ByteArray(32);

        let deviceTestEnableKey = ByteArray.fromHex("00112233445566778899aabbccddeeff");
        const argsEnableKeyIndex = process.argv.indexOf("--enable-key");
        if (argsEnableKeyIndex !== -1) {
            deviceTestEnableKey = ByteArray.fromHex(process.argv[argsEnableKeyIndex + 1]);
        }

        const serverNode = await ServerNode.create(
            ServerNode.RootEndpoint.with(
                //BasicInformationServer.enable({ events: { shutDown: true, leave: true } }),
                // We upgrade the AdminCommissioningCluster to also allow Basic Commissioning, so we can use for more testcases
                AdministratorCommissioningServer.with("Basic"),
                TestGeneralDiagnosticsServer.enable({
                    events: { hardwareFaultChange: true, radioFaultChange: true, networkFaultChange: true },
                }),
                LocalizationConfigurationServer,

                NetworkCommissioningServer.with("EthernetNetworkInterface"), // Set the correct Ethernet network Commissioning cluster
                TimeFormatLocalizationServer.with("CalendarFormat"),
                UnitLocalizationServer.with("TemperatureUnit"),
                UserLabelServer,
            ),
            {
                id: "binford-6100",
                network: {
                    port: 5540,
                    //advertiseOnStartup: false,
                },
                commissioning: {
                    passcode: this.options.passcode ?? 20202021,
                    discriminator: this.options.discriminator ?? 3840,
                },
                productDescription: {
                    name: this.appName,
                    deviceType: DeviceTypeId(0x0101),
                },
                accessControl: {
                    extension: [],
                },
                administratorCommissioning: {
                    windowStatus: AdministratorCommissioning.CommissioningWindowStatus.WindowNotOpen,
                },
                basicInformation: {
                    vendorName: "Binford",
                    vendorId: VendorId(0xfff1),
                    nodeLabel: "",
                    productName: "MorePowerPro 6100",
                    productLabel: "MorePowerPro 6100",
                    productId: 0x8001,
                    serialNumber: `9999-9999-9999`,
                    manufacturingDate: "20210101",
                    partNumber: "123456",
                    productUrl: "https://test.com",
                    uniqueId: `node-matter-unique`,
                    localConfigDisabled: false,
                    productAppearance: {
                        finish: BasicInformation.ProductFinish.Satin,
                        primaryColor: BasicInformation.Color.Purple,
                    },
                    reachable: true,
                    maxPathsPerInvoke: 10,
                },
                generalDiagnostics: {
                    totalOperationalHours: 0, // set to enable it
                    activeHardwareFaults: [], // set to enable it
                    activeRadioFaults: [], // set to enable it
                    activeNetworkFaults: [], // set to enable it
                    testEventTriggersEnabled: true, // Enable Test events
                    deviceTestEnableKey,
                },
                localizationConfiguration: {
                    activeLocale: "en-US",
                    supportedLocales: ["en-US", "de-DE", "es-ES"],
                },
                networkCommissioning: {
                    maxNetworks: 1,
                    interfaceEnabled: true,
                    lastConnectErrorValue: 0,
                    lastNetworkId: networkId,
                    lastNetworkingStatus: NetworkCommissioning.NetworkCommissioningStatus.Success,
                    networks: [{ networkId: networkId, connected: true }],
                },
                timeFormatLocalization: {
                    hourFormat: TimeFormatLocalization.HourFormat["24Hr"],
                    activeCalendarType: TimeFormatLocalization.CalendarType.Gregorian,
                    supportedCalendarTypes: [TimeFormatLocalization.CalendarType.Gregorian],
                },
                userLabel: {
                    labelList: [{ label: "foo", value: "bar" }],
                },
            },
        );

        const endpoint1 = new Endpoint(
            OnOffLightDevice.with(
                AirQualityServer.with(
                    AirQuality.Feature.Fair,
                    AirQuality.Feature.Moderate,
                    AirQuality.Feature.VeryPoor,
                    AirQuality.Feature.ExtremelyPoor,
                ),
                TestActivatedCarbonFilterMonitoringServer,
                BooleanStateServer.enable({ events: { stateChange: true } }),
                CarbonDioxideConcentrationMeasurementServer.with(
                    "NumericMeasurement",
                    "PeakMeasurement",
                    "AverageMeasurement",
                ),
                CarbonMonoxideConcentrationMeasurementServer.with(
                    ConcentrationMeasurement.Feature.LevelIndication,
                    ConcentrationMeasurement.Feature.MediumLevel,
                    ConcentrationMeasurement.Feature.CriticalLevel,
                ),
                ColorControlServer.with(
                    ColorControl.Feature.HueSaturation,
                    ColorControl.Feature.EnhancedHue,
                    ColorControl.Feature.ColorLoop,
                    ColorControl.Feature.Xy,
                    ColorControl.Feature.ColorTemperature,
                ),
                FixedLabelServer,
                FlowMeasurementServer,
                FormaldehydeConcentrationMeasurementServer.with(
                    ConcentrationMeasurement.Feature.LevelIndication,
                    ConcentrationMeasurement.Feature.MediumLevel,
                    ConcentrationMeasurement.Feature.CriticalLevel,
                    ConcentrationMeasurement.Feature.NumericMeasurement,
                    ConcentrationMeasurement.Feature.PeakMeasurement,
                    ConcentrationMeasurement.Feature.AverageMeasurement,
                ),
                TestHepaFilterMonitoringServer,
                TestIdentifyServer,
                IlluminanceMeasurementServer,
                TestLevelControlServer.with(
                    LevelControl.Feature.OnOff,
                    LevelControl.Feature.Lighting,
                    LevelControl.Feature.Frequency,
                ),
                ModeSelectServer.with(ModeSelect.Feature.OnOff),
                NitrogenDioxideConcentrationMeasurementServer.with(
                    ConcentrationMeasurement.Feature.LevelIndication,
                    ConcentrationMeasurement.Feature.MediumLevel,
                    ConcentrationMeasurement.Feature.CriticalLevel,
                    ConcentrationMeasurement.Feature.NumericMeasurement,
                    ConcentrationMeasurement.Feature.PeakMeasurement,
                    ConcentrationMeasurement.Feature.AverageMeasurement,
                ),
                OccupancySensingServer,
                OzoneConcentrationMeasurementServer.with(
                    ConcentrationMeasurement.Feature.LevelIndication,
                    ConcentrationMeasurement.Feature.MediumLevel,
                    ConcentrationMeasurement.Feature.CriticalLevel,
                    ConcentrationMeasurement.Feature.NumericMeasurement,
                    ConcentrationMeasurement.Feature.PeakMeasurement,
                    ConcentrationMeasurement.Feature.AverageMeasurement,
                ),
                Pm1ConcentrationMeasurementServer.with(
                    ConcentrationMeasurement.Feature.LevelIndication,
                    ConcentrationMeasurement.Feature.MediumLevel,
                    ConcentrationMeasurement.Feature.CriticalLevel,
                    ConcentrationMeasurement.Feature.NumericMeasurement,
                    ConcentrationMeasurement.Feature.PeakMeasurement,
                    ConcentrationMeasurement.Feature.AverageMeasurement,
                ),
                Pm10ConcentrationMeasurementServer.with(
                    ConcentrationMeasurement.Feature.LevelIndication,
                    ConcentrationMeasurement.Feature.MediumLevel,
                    ConcentrationMeasurement.Feature.CriticalLevel,
                    ConcentrationMeasurement.Feature.NumericMeasurement,
                    ConcentrationMeasurement.Feature.PeakMeasurement,
                    ConcentrationMeasurement.Feature.AverageMeasurement,
                ),
                Pm25ConcentrationMeasurementServer.with(
                    ConcentrationMeasurement.Feature.LevelIndication,
                    ConcentrationMeasurement.Feature.MediumLevel,
                    ConcentrationMeasurement.Feature.CriticalLevel,
                    ConcentrationMeasurement.Feature.NumericMeasurement,
                    ConcentrationMeasurement.Feature.PeakMeasurement,
                    ConcentrationMeasurement.Feature.AverageMeasurement,
                ),
                PowerSourceServer.with(PowerSource.Feature.Battery),
                PowerTopologyServer.with(PowerTopology.Feature.SetTopology, PowerTopology.Feature.DynamicPowerFlow),
                PressureMeasurementServer,
                PumpConfigurationAndControlServer.with(PumpConfigurationAndControl.Feature.ConstantPressure),
                RadonConcentrationMeasurementServer.with(
                    ConcentrationMeasurement.Feature.LevelIndication,
                    ConcentrationMeasurement.Feature.MediumLevel,
                    ConcentrationMeasurement.Feature.CriticalLevel,
                    ConcentrationMeasurement.Feature.NumericMeasurement,
                    ConcentrationMeasurement.Feature.PeakMeasurement,
                    ConcentrationMeasurement.Feature.AverageMeasurement,
                ),
                RelativeHumidityMeasurementServer,
                SwitchServer.with(Switch.Feature.LatchingSwitch),
                TemperatureMeasurementServer,
                ThermostatUserInterfaceConfigurationServer,
                TotalVolatileOrganicCompoundsConcentrationMeasurementServer.with(
                    "LevelIndication",
                    "MediumLevel",
                    "CriticalLevel",
                    "NumericMeasurement",
                    "PeakMeasurement",
                    "AverageMeasurement",
                ),
                UserLabelServer,
                TestWindowCoveringServer,
            ),
            {
                number: EndpointNumber(1),
                id: "ep1",
                activatedCarbonFilterMonitoring: {
                    condition: 20,
                    degradationDirection: ResourceMonitoring.DegradationDirection.Down,
                    changeIndication: ResourceMonitoring.ChangeIndication.Critical,
                    inPlaceIndicator: true,
                    lastChangedTime: null,
                    replacementProductList: [
                        {
                            productIdentifierType: ResourceMonitoring.ProductIdentifierType.Ean,
                            productIdentifierValue: "1234567890123",
                        },
                    ],
                },
                airQuality: {
                    airQuality: AirQuality.AirQualityEnum.Fair,
                },
                booleanState: {
                    stateValue: false,
                },
                carbonDioxideConcentrationMeasurement: {
                    measuredValue: 12.34,
                    minMeasuredValue: 0,
                    maxMeasuredValue: 100,
                    peakMeasuredValue: 34.56,
                    peakMeasuredValueWindow: 10000,
                    averageMeasuredValue: 23.45,
                    averageMeasuredValueWindow: 1000,
                    uncertainty: 1.5,
                    measurementUnit: ConcentrationMeasurement.MeasurementUnit.Ppm,
                    measurementMedium: ConcentrationMeasurement.MeasurementMedium.Water,
                },
                carbonMonoxideConcentrationMeasurement: {
                    measurementMedium: ConcentrationMeasurement.MeasurementMedium.Air,
                    levelValue: ConcentrationMeasurement.LevelValue.Critical,
                },
                colorControl: {
                    coupleColorTempToLevelMinMireds: 0,
                    remainingTime: 0,
                    driftCompensation: 0,
                    compensationText: "foo",
                    startUpColorTemperatureMireds: 32639,
                    numberOfPrimaries: 6,
                    primary1X: 0,
                    primary1Y: 0,
                    primary1Intensity: 0,
                    primary2X: 0,
                    primary2Y: 0,
                    primary2Intensity: 0,
                    primary3X: 0,
                    primary3Y: 0,
                    primary3Intensity: 0,
                    primary4X: 0,
                    primary4Y: 0,
                    primary4Intensity: 0,
                    primary5X: 0,
                    primary5Y: 0,
                    primary5Intensity: 0,
                    primary6X: 0,
                    primary6Y: 0,
                    primary6Intensity: 0,
                    whitePointX: 0,
                    whitePointY: 0,
                    colorPointRx: 0,
                    colorPointRy: 0,
                    colorPointRIntensity: 0,
                    colorPointGx: 0,
                    colorPointGy: 0,
                    colorPointGIntensity: 0,
                    colorPointBx: 0,
                    colorPointBy: 0,
                    colorPointBIntensity: 0,
                    managedTransitionTimeHandling: true, // enable transition management
                },
                fixedLabel: {
                    labelList: [
                        { label: "foo", value: "bar" },
                        { label: "foo2", value: "bar2" },
                    ],
                },
                flowMeasurement: {
                    measuredValue: 1,
                    minMeasuredValue: 0,
                    maxMeasuredValue: 100,
                    tolerance: 0,
                },
                formaldehydeConcentrationMeasurement: {
                    measuredValue: 12.34,
                    minMeasuredValue: 0,
                    maxMeasuredValue: 100,
                    peakMeasuredValue: 34.56,
                    peakMeasuredValueWindow: 10000,
                    averageMeasuredValue: 23.45,
                    averageMeasuredValueWindow: 1000,
                    uncertainty: 1.5,
                    measurementUnit: ConcentrationMeasurement.MeasurementUnit.Ppm,
                    measurementMedium: ConcentrationMeasurement.MeasurementMedium.Water,
                    levelValue: ConcentrationMeasurement.LevelValue.Critical,
                },
                hepaFilterMonitoring: {
                    condition: 20,
                    degradationDirection: ResourceMonitoring.DegradationDirection.Down,
                    changeIndication: ResourceMonitoring.ChangeIndication.Warning,
                    inPlaceIndicator: true,
                    lastChangedTime: null,
                    replacementProductList: [
                        {
                            productIdentifierType: ResourceMonitoring.ProductIdentifierType.Ean,
                            productIdentifierValue: "1234567890123",
                        },
                    ],
                },
                illuminanceMeasurement: {
                    tolerance: 0,
                    lightSensorType: null,
                },
                levelControl: {
                    currentLevel: 1,
                    minLevel: 1,
                    maxLevel: 0xfe,
                    options: {},
                    onOffTransitionTime: 1000,
                    onLevel: 0x50,
                    onTransitionTime: 500,
                    offTransitionTime: 500,
                    defaultMoveRate: 100,
                    remainingTime: 0,
                    startUpCurrentLevel: 100,
                    currentFrequency: 50,
                    minFrequency: 50,
                    maxFrequency: 60,
                    managedTransitionTimeHandling: true, // enable transition management
                },
                modeSelect: {
                    description: "ModeSelect",
                    standardNamespace: null,
                    supportedModes: [
                        { label: "Black", mode: 0, semanticTags: [{ mfgCode: 0, value: 0 }] },
                        { label: "Cappuccino", mode: 4, semanticTags: [{ mfgCode: 0, value: 0 }] },
                        { label: "Espresso", mode: 7, semanticTags: [{ mfgCode: 0, value: 0 }] },
                    ],
                    currentMode: 0,
                    startUpMode: 4,
                    onMode: 7,
                },
                nitrogenDioxideConcentrationMeasurement: {
                    measuredValue: 12.34,
                    minMeasuredValue: 0,
                    maxMeasuredValue: 100,
                    peakMeasuredValue: 34.56,
                    peakMeasuredValueWindow: 10000,
                    averageMeasuredValue: 23.45,
                    averageMeasuredValueWindow: 1000,
                    uncertainty: 1.5,
                    measurementUnit: ConcentrationMeasurement.MeasurementUnit.Ppm,
                    measurementMedium: ConcentrationMeasurement.MeasurementMedium.Water,
                    levelValue: ConcentrationMeasurement.LevelValue.Critical,
                },
                occupancySensing: {
                    occupancySensorType: OccupancySensing.OccupancySensorType.Pir,
                    occupancySensorTypeBitmap: { pir: true },
                    occupancy: { occupied: true },
                },
                ozoneConcentrationMeasurement: {
                    measuredValue: 12.34,
                    minMeasuredValue: 0,
                    maxMeasuredValue: 100,
                    peakMeasuredValue: 34.56,
                    peakMeasuredValueWindow: 10000,
                    averageMeasuredValue: 23.45,
                    averageMeasuredValueWindow: 1000,
                    uncertainty: 1.5,
                    measurementUnit: ConcentrationMeasurement.MeasurementUnit.Ppm,
                    measurementMedium: ConcentrationMeasurement.MeasurementMedium.Water,
                    levelValue: ConcentrationMeasurement.LevelValue.Critical,
                },
                pm1ConcentrationMeasurement: {
                    measuredValue: 12.34,
                    minMeasuredValue: 0,
                    maxMeasuredValue: 100,
                    peakMeasuredValue: 34.56,
                    peakMeasuredValueWindow: 10000,
                    averageMeasuredValue: 23.45,
                    averageMeasuredValueWindow: 1000,
                    uncertainty: 1.5,
                    measurementUnit: ConcentrationMeasurement.MeasurementUnit.Ppm,
                    measurementMedium: ConcentrationMeasurement.MeasurementMedium.Water,
                    levelValue: ConcentrationMeasurement.LevelValue.Critical,
                },
                pm10ConcentrationMeasurement: {
                    measuredValue: 12.34,
                    minMeasuredValue: 0,
                    maxMeasuredValue: 100,
                    peakMeasuredValue: 34.56,
                    peakMeasuredValueWindow: 10000,
                    averageMeasuredValue: 23.45,
                    averageMeasuredValueWindow: 1000,
                    uncertainty: 1.5,
                    measurementUnit: ConcentrationMeasurement.MeasurementUnit.Ppm,
                    measurementMedium: ConcentrationMeasurement.MeasurementMedium.Water,
                    levelValue: ConcentrationMeasurement.LevelValue.Critical,
                },
                pm25ConcentrationMeasurement: {
                    measuredValue: 12.34,
                    minMeasuredValue: 0,
                    maxMeasuredValue: 100,
                    peakMeasuredValue: 34.56,
                    peakMeasuredValueWindow: 10000,
                    averageMeasuredValue: 23.45,
                    averageMeasuredValueWindow: 1000,
                    uncertainty: 1.5,
                    measurementUnit: ConcentrationMeasurement.MeasurementUnit.Ppm,
                    measurementMedium: ConcentrationMeasurement.MeasurementMedium.Water,
                    levelValue: ConcentrationMeasurement.LevelValue.Critical,
                },
                powerSource: {
                    status: PowerSource.PowerSourceStatus.Active,
                    order: 1,
                    description: "Battery",
                    batChargeLevel: PowerSource.BatChargeLevel.Ok,
                    batReplacementNeeded: false,
                    batReplaceability: PowerSource.BatReplaceability.NotReplaceable,
                },
                powerTopology: {
                    availableEndpoints: [EndpointNumber(1)],
                    activeEndpoints: [EndpointNumber(1)],
                },
                pumpConfigurationAndControl: {
                    effectiveOperationMode: PumpConfigurationAndControl.OperationMode.Normal,
                    effectiveControlMode: PumpConfigurationAndControl.ControlMode.ConstantPressure,
                    minConstPressure: 0,
                    maxConstPressure: 100,
                    pumpStatus: {
                        deviceFault: true,
                    },
                    speed: 50,
                    lifetimeEnergyConsumed: 0,
                    lifetimeRunningHours: 0,
                    power: 50,
                    operationMode: PumpConfigurationAndControl.OperationMode.Normal,
                    controlMode: PumpConfigurationAndControl.ControlMode.ConstantPressure,
                },
                radonConcentrationMeasurement: {
                    measuredValue: 12.34,
                    minMeasuredValue: 0,
                    maxMeasuredValue: 100,
                    peakMeasuredValue: 34.56,
                    peakMeasuredValueWindow: 10000,
                    averageMeasuredValue: 23.45,
                    averageMeasuredValueWindow: 1000,
                    uncertainty: 1.5,
                    measurementUnit: ConcentrationMeasurement.MeasurementUnit.Ppm,
                    measurementMedium: ConcentrationMeasurement.MeasurementMedium.Water,
                    levelValue: ConcentrationMeasurement.LevelValue.Critical,
                },
                relativeHumidityMeasurement: {
                    tolerance: 0,
                    minMeasuredValue: 0,
                    maxMeasuredValue: 100,
                },
                temperatureMeasurement: {
                    tolerance: 0,
                    minMeasuredValue: 0,
                    maxMeasuredValue: 100,
                },
                thermostatUserInterfaceConfiguration: {
                    scheduleProgrammingVisibility:
                        ThermostatUserInterfaceConfiguration.ScheduleProgrammingVisibility.ScheduleProgrammingPermitted,
                },
                userLabel: {
                    labelList: [{ label: "foo", value: "bar" }],
                },
                totalVolatileOrganicCompoundsConcentrationMeasurement: {
                    measuredValue: 12.34,
                    minMeasuredValue: 0,
                    maxMeasuredValue: 100,
                    peakMeasuredValue: 34.56,
                    peakMeasuredValueWindow: 10000,
                    averageMeasuredValue: 23.45,
                    averageMeasuredValueWindow: 1000,
                    uncertainty: 1.5,
                    measurementUnit: ConcentrationMeasurement.MeasurementUnit.Ppm,
                    measurementMedium: ConcentrationMeasurement.MeasurementMedium.Water,
                    levelValue: ConcentrationMeasurement.LevelValue.Critical,
                },
                windowCovering: {
                    type: WindowCovering.WindowCoveringType.TiltBlindLift,
                    currentPositionLiftPercent100ths: 0,
                    currentPositionTiltPercent100ths: 0,
                    safetyStatus: {},
                    currentPositionLift: 0,
                    currentPositionTilt: 0,
                    numberOfActuationsLift: 0,
                    numberOfActuationsTilt: 0,
                    currentPositionLiftPercentage: 0,
                    currentPositionTiltPercentage: 0,
                    physicalClosedLimitLift: 0,
                    physicalClosedLimitTilt: 0,
                    installedOpenLimitLift: 0,
                    installedOpenLimitTilt: 0,
                    supportsCalibration: false,
                },
            },
        );
        await serverNode.add(endpoint1);

        const endpoint3 = new Endpoint(
            DimmableLightDevice.with(
                DescriptorServer,
                SwitchServer.with(
                    Switch.Feature.MomentarySwitch,
                    Switch.Feature.MomentarySwitchRelease,
                    Switch.Feature.MomentarySwitchLongPress, //MS & MSR & MSL works in testing
                    //Switch.Feature.MomentarySwitchMultiPress, // Can not be tested right now because https://github.com/project-chip/connectedhomeip/issues/34923
                ),
            ),
            {
                number: EndpointNumber(3),
                id: "ep3",
                descriptor: {
                    deviceTypeList: [
                        { deviceType: 0x0101, revision: 3 },
                        { deviceType: 0x0100, revision: 3 },
                    ],
                },
                switch: {
                    rawPosition: 0,
                    longPressDelay: 5000, // Expected by the Python test framework to simulate a long press
                    //multiPressDelay: 700,
                },
            },
        );
        await serverNode.add(endpoint3);

        return serverNode;
    }
}
