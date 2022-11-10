/**
 * @license
 * Copyright 2022 Project CHIP Authors
 * SPDX-License-Identifier: Apache-2.0
 */

import { DataReaderLE } from "../util/DataReaderLE";
import { DataWriterLE } from "../util/DataWriterLE";
import { BitmapSchema, BitFieldEnum } from "../util/schema/BitmapSchema";

/**
 * TLV element types.
 * 
 * @see {@link MatterCoreSpecificationV1_0} § A.7.1
 */
export enum TlvType {
    SignedInt8 = 0x00,
    SignedInt16 = 0x01,
    SignedInt32 = 0x02,
    SignedInt64 = 0x03,
    UnsignedInt8 = 0x04,
    UnsignedInt16 = 0x05,
    UnsignedInt32 = 0x06,
    UnsignedInt64 = 0x07,
    Boolean = 0x08,
    Float32 = 0x0A,
    Float64 = 0x0B,
    Utf8String8 = 0x0C,
    Utf8String16 = 0x0D,
    Utf8String32 = 0x0E,
    Utf8String64 = 0x0F,
    ByteString8 = 0x10,
    ByteString16 = 0x11,
    ByteString32 = 0x12,
    ByteString64 = 0x13,
    Null = 0x14,
    Structure = 0x15,
    Array = 0x16,
    List = 0x17,
    EndOfContainer = 0x18,
}

/**
 * TLV element tag control.
 * 
 * @see {@link MatterCoreSpecificationV1_0} § A.7.2
 */
const enum TagControl {
    Anonymous = 0,
    ContextSpecific = 1,
    CommonProfile16 = 2,
    CommonProfile32 = 3,
    ImplicitProfile16 = 4,
    ImplicitProfile32 = 5,
    FullyQualified48 = 6,
    FullyQualified64 = 7,
}

const ControlByteSchema = BitmapSchema({
    type: BitFieldEnum<TlvType>(0, 5),
    tagControl: BitFieldEnum<TagControl>(5, 3),
});

const COMMON_PROFILE = 0x00000000;

export type TlvTag = {
    profile?: number,
    id?: number,
};

export class TlvCodec {

    /** @see {@link MatterCoreSpecificationV1_0} § A.7 */
    public static readTagType(reader: DataReaderLE) {
        const { tagControl, type } = ControlByteSchema.decode(reader.readUInt8());
        switch (tagControl) {
            case TagControl.Anonymous:
                return { type, tag: {} };
            case TagControl.ContextSpecific:
                return { type, tag: { id: reader.readUInt8() } };
            case TagControl.CommonProfile16:
                return { type, tag: { profile: COMMON_PROFILE, id: reader.readUInt16() } };
            case TagControl.CommonProfile32:
                return { type, tag: { profile: COMMON_PROFILE, id: reader.readUInt32() } };
            case TagControl.ImplicitProfile16:
            case TagControl.ImplicitProfile32:
                throw new Error(`Unsupported implicit profile ${tagControl}`);
            case TagControl.FullyQualified48:
                return { type, tag: { profile: reader.readUInt32(), id: reader.readUInt16() } };
            case TagControl.FullyQualified48:
                return { type, tag: { profile: reader.readUInt32(), id: reader.readUInt32() } };
            default:
                throw new Error(`Unexpected tagControl ${tagControl}`);
        }
    }

    public static readIntegerValue(reader: DataReaderLE, type: TlvType) {
        switch (type) {
            case TlvType.UnsignedInt8:
                return reader.readUInt8();
            case TlvType.UnsignedInt16:
                return reader.readUInt16();
            case TlvType.UnsignedInt32:
                return reader.readUInt32();
            case TlvType.UnsignedInt64:
                return reader.readUInt64();
            default:
                throw new Error(`Unexpected TLV type ${type}`);
        }
    }

    /** @see {@link MatterCoreSpecificationV1_0} § A.7 & A.8 */
    public static writeTag(writer: DataWriterLE, type: TlvType, { profile, id }: TlvTag) {
        if (profile === undefined && id === undefined) {
            writer.writeUInt8(ControlByteSchema.encode({ tagControl: TagControl.Anonymous, type }));
        } else if (profile === undefined) {
            if (id === undefined) throw new Error("Invalid TLV tag: id should be defined for a context specific tag.");
            writer.writeUInt8(ControlByteSchema.encode({ tagControl: TagControl.ContextSpecific, type }));
            writer.writeUInt8(id);
        } else if (profile === COMMON_PROFILE) {
            if (id === undefined) throw new Error("Invalid TLV tag: id should be defined for a common profile.");
            if ((id & 0xFFFF0000) === 0) {
                writer.writeUInt8(ControlByteSchema.encode({ tagControl: TagControl.CommonProfile16, type }));
                writer.writeUInt16(id);
            } else {
                writer.writeUInt8(ControlByteSchema.encode({ tagControl: TagControl.CommonProfile32, type }));
                writer.writeUInt32(id);
            }
        } else {
            if (id === undefined) throw new Error("Invalid TLV tag: id should be defined for a custom profile.");
            if ((id & 0xFFFF0000) === 0) {
                writer.writeUInt8(ControlByteSchema.encode({ tagControl: TagControl.FullyQualified48, type }));
                writer.writeUInt32(profile);
                writer.writeUInt16(id);
            } else {
                writer.writeUInt8(ControlByteSchema.encode({ tagControl: TagControl.FullyQualified64, type }));
                writer.writeUInt32(profile);
                writer.writeUInt32(id);
            }
        }
    }

    public static writeIntegerValue(writer: DataWriterLE, type: TlvType, value: number | bigint) {
        switch (type) {
            case TlvType.UnsignedInt8:
                writer.writeUInt8(value);
                break;
            case TlvType.UnsignedInt16:
                writer.writeUInt16(value);
                break;
            case TlvType.UnsignedInt32:
                writer.writeUInt32(value);
                break;
            case TlvType.UnsignedInt64:
                writer.writeUInt64(value);
                break;
            default:
                throw new Error(`Unexpected TLV type ${type}`);
        }
    }
}
