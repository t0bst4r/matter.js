/**
 * @license
 * Copyright 2022-2024 Matter.js Authors
 * SPDX-License-Identifier: Apache-2.0
 */

import {
    AuthorityKeyIdentifier_X509,
    BasicConstraints_X509,
    BitByteArray,
    BYTES_KEY,
    ContextTagged,
    ContextTaggedBytes,
    DerCodec,
    DerObject,
    EcdsaWithSHA256_X962,
    ELEMENTS_KEY,
    ExtendedKeyUsage_X509,
    KeyUsage_Signature_ContentCommited_X509,
    KeyUsage_Signature_X509,
    OBJECT_ID_KEY,
    OrganisationName_X520,
    Pkcs7Data,
    Pkcs7SignedData,
    PublicKeyEcPrime256v1_X962,
    SHA256_CMS,
    SubjectKeyIdentifier_X509,
} from "../codec/DerCodec.js";
import { MatterError } from "../common/MatterError.js";
import { Crypto } from "../crypto/Crypto.js";
import { Key, PublicKey } from "../crypto/Key.js";
import { CaseAuthenticatedTag, TlvCaseAuthenticatedTag } from "../datatype/CaseAuthenticatedTag.js";
import { FabricId, TlvFabricId } from "../datatype/FabricId.js";
import { NodeId, TlvNodeId } from "../datatype/NodeId.js";
import { TlvVendorId, VendorId } from "../datatype/VendorId.js";
import { TlvArray } from "../tlv/TlvArray.js";
import { TlvBoolean } from "../tlv/TlvBoolean.js";
import { TlvUInt16, TlvUInt32, TlvUInt64, TlvUInt8 } from "../tlv/TlvNumber.js";
import { TlvField, TlvObject, TlvOptionalField, TlvOptionalRepeatedField, TlvTaggedList } from "../tlv/TlvObject.js";
import { TypeFromSchema } from "../tlv/TlvSchema.js";
import { TlvByteString, TlvString } from "../tlv/TlvString.js";
import { ByteArray } from "../util/ByteArray.js";

export class CertificateError extends MatterError {}

const YEAR_S = 365 * 24 * 60 * 60;
const EPOCH_OFFSET_S = 10957 * 24 * 60 * 60;

// TODO replace usage of Date by abstraction

export function matterToJsDate(date: number) {
    return date === 0 ? NON_WELL_DEFINED_DATE : new Date((date + EPOCH_OFFSET_S) * 1000);
}

export function jsToMatterDate(date: Date, addYears = 0) {
    return date.getTime() === NON_WELL_DEFINED_DATE.getTime()
        ? 0
        : Math.floor(date.getTime() / 1000) - EPOCH_OFFSET_S + addYears * YEAR_S;
}

function intTo16Chars(value: bigint | number) {
    const byteArray = new ByteArray(8);
    const dataView = byteArray.getDataView();
    dataView.setBigUint64(0, typeof value === "bigint" ? value : BigInt(value));
    return byteArray.toHex().toUpperCase();
}

function uInt16To8Chars(value: number) {
    const byteArray = new ByteArray(4);
    const dataView = byteArray.getDataView();
    dataView.setUint32(0, value);
    return byteArray.toHex().toUpperCase();
}

function uInt16To4Chars(value: number) {
    const byteArray = new ByteArray(2);
    const dataView = byteArray.getDataView();
    dataView.setUint16(0, value);
    return byteArray.toHex().toUpperCase();
}

/**
 * Matter specific ASN.1 OIDs
 * @see {@link MatterSpecification.v12.Core} Appendix E
 */

/**
 * Generator function to create a specific ASN field for a Matter OpCert DN with the OID base 1.3.6.1.4.1.37244.1.*.
 * The returned function takes the value and returns the ASN.1 DER object.
 */
const GenericMatterOpCertObject =
    <T>(id: number, valueConverter?: (value: T) => string) =>
    (value: T) => [
        DerObject(`2b0601040182a27c01${id.toString(16).padStart(2, "0")}`, {
            value: (valueConverter ?? intTo16Chars)(value as any),
        }),
    ];

/**
 * Generator function to create a specific ASN field for a Matter AttCert DN with the OID base 1.3.6.1.4.1.37244.2.*.
 * The returned function takes the value and returns the ASN.1 DER object.
 */
const GenericMatterAttCertObject =
    <T>(id: number, valueConverter?: (value: T) => string) =>
    (value: T) => [
        DerObject(`2b0601040182a27c02${id.toString(16).padStart(2, "0")}`, {
            value: (valueConverter ?? intTo16Chars)(value as any),
        }),
    ];

/** matter-node-id = ASN.1 OID 1.3.6.1.4.1.37244.1.1 */
export const NodeId_Matter = GenericMatterOpCertObject<NodeId>(1);

/** matter-firmware-signing-id = ASN.1 OID 1.3.6.1.4.1.37244.1.2 */
export const FirmwareSigningId_Matter = GenericMatterOpCertObject<number>(2);

/** matter-icac-id = ASN.1 OID 1.3.6.1.4.1.37244.1.3 */
export const IcacId_Matter = GenericMatterOpCertObject<bigint | number>(3);

/** matter-rcac-id = ASN.1 OID 1.3.6.1.4.1.37244.1.4 */
export const RcacId_Matter = GenericMatterOpCertObject<bigint | number>(4);

/** matter-fabric-id = ASN.1 OID 1.3.6.1.4.1.37244.1.5 */
export const FabricId_Matter = GenericMatterOpCertObject<FabricId>(5);

/** matter-noc-cat = ASN.1 OID 1.3.6.1.4.1.37244.1.6 */
export const NocCat_Matter = GenericMatterOpCertObject<number>(6, uInt16To8Chars);

/** matter-oid-vid = ASN.1 OID 1.3.6.1.4.1.37244.2.1 */
export const VendorId_Matter = GenericMatterAttCertObject<VendorId>(1, uInt16To4Chars);

/** matter-oid-pid = ASN.1 OID 1.3.6.1.4.1.37244.2.2 */
export const ProductId_Matter = GenericMatterAttCertObject<number>(2, uInt16To4Chars);

const DefaultIssuerMatterFields: TlvFields = {
    nodeId: TlvOptionalField(17, TlvNodeId),
    firmwareSigningId: TlvOptionalField(18, TlvUInt32),
    icacId: TlvOptionalField(19, TlvUInt64),
    rcacId: TlvOptionalField(20, TlvUInt64),
    fabricId: TlvOptionalField(21, TlvFabricId),
    caseAuthenticatedTags: TlvOptionalRepeatedField(22, TlvCaseAuthenticatedTag, { maxLength: 3 }),
};

/**
 * TLV schema for a generic subject or issuer field in a certificate. We handle all fields as optional here for the TLV
 * parsing and check required fields in the logic to make sure we return the correct errors.
 */
const TlvGenericMatterSubjectOrIssuerTaggedList = <T extends TlvFields>(matterFields: T) => {
    const fields = {
        // Standard DNs
        commonName: TlvOptionalField(1, TlvString),
        sureName: TlvOptionalField(2, TlvString),
        serialNum: TlvOptionalField(3, TlvString),
        countryName: TlvOptionalField(4, TlvString),
        localityName: TlvOptionalField(5, TlvString),
        stateOrProvinceName: TlvOptionalField(6, TlvString),
        orgName: TlvOptionalField(7, TlvString),
        orgUnitName: TlvOptionalField(8, TlvString),
        title: TlvOptionalField(9, TlvString),
        name: TlvOptionalField(10, TlvString),
        givenName: TlvOptionalField(11, TlvString),
        initials: TlvOptionalField(12, TlvString),
        genQualifier: TlvOptionalField(13, TlvString),
        dnQualifier: TlvOptionalField(14, TlvString),
        pseudonym: TlvOptionalField(15, TlvString),
        domainComponent: TlvOptionalField(16, TlvString),

        // Matter specific DNs
        ...matterFields,

        // Standard DNs when encoded as Printable String
        commonNamePs: TlvOptionalField(129, TlvString),
        sureNamePs: TlvOptionalField(130, TlvString),
        serialNumPs: TlvOptionalField(131, TlvString),
        countryNamePs: TlvOptionalField(132, TlvString),
        localityNamePs: TlvOptionalField(133, TlvString),
        stateOrProvinceNamePs: TlvOptionalField(134, TlvString),
        orgNamePs: TlvOptionalField(135, TlvString),
        orgUnitNamePs: TlvOptionalField(136, TlvString),
        titlePs: TlvOptionalField(137, TlvString),
        namePs: TlvOptionalField(138, TlvString),
        givenNamePs: TlvOptionalField(139, TlvString),
        initialsPs: TlvOptionalField(140, TlvString),
        genQualifierPs: TlvOptionalField(141, TlvString),
        dnQualifierPs: TlvOptionalField(142, TlvString),
        pseudonymPs: TlvOptionalField(143, TlvString),
    };
    return TlvTaggedList(fields);
};

const ExtensionKeyUsageBitmap = {
    digitalSignature: BitFlag(0),
    nonRepudiation: BitFlag(1),
    keyEncipherment: BitFlag(2),
    dataEncipherment: BitFlag(3),
    keyAgreement: BitFlag(4),
    keyCertSign: BitFlag(5),
    cRLSign: BitFlag(6),
    encipherOnly: BitFlag(7),
    decipherOnly: BitFlag(8),
};
const ExtensionKeyUsageSchema = BitmapSchema(ExtensionKeyUsageBitmap);

const BaseMatterCertificate = (matterFields?: { subject?: TlvFields; issuer?: TlvFields }) =>
    TlvObject({
        serialNumber: TlvField(1, TlvByteString.bound({ maxLength: 20 })),
        signatureAlgorithm: TlvField(2, TlvUInt8),
        issuer: TlvField(
            3,
            TlvGenericMatterSubjectOrIssuerTaggedList(matterFields?.issuer ?? DefaultIssuerMatterFields),
        ),
        notBefore: TlvField(4, TlvUInt32),
        notAfter: TlvField(5, TlvUInt32),
        subject: TlvField(
            6,
            TlvGenericMatterSubjectOrIssuerTaggedList(matterFields?.subject ?? DefaultIssuerMatterFields),
        ),
        publicKeyAlgorithm: TlvField(7, TlvUInt8),
        ellipticCurveIdentifier: TlvField(8, TlvUInt8),
        ellipticCurvePublicKey: TlvField(9, TlvByteString),
        extensions: TlvField(
            10,
            TlvTaggedList({
                basicConstraints: TlvField(
                    1,
                    TlvObject({
                        isCa: TlvField(1, TlvBoolean),
                        pathLen: TlvOptionalField(2, TlvUInt8),
                    }),
                ),
                keyUsage: TlvField(2, TlvBitmap(TlvUInt16, ExtensionKeyUsageBitmap)),
                extendedKeyUsage: TlvOptionalField(3, TlvArray(TlvUInt8)),
                subjectKeyIdentifier: TlvField(4, TlvByteString.bound({ length: 20 })),
                authorityKeyIdentifier: TlvField(5, TlvByteString.bound({ length: 20 })),
                futureExtension: TlvOptionalField(6, TlvByteString),
            }),
        ),
        signature: TlvField(11, TlvByteString),
    });

export const TlvRootCertificate = BaseMatterCertificate({
    subject: {
        rcacId: TlvField(20, TlvUInt64),
        fabricId: TlvOptionalField(21, TlvFabricId),
    },
});

export const TlvOperationalCertificate = BaseMatterCertificate({
    subject: {
        nodeId: TlvField(17, TlvNodeId),
        fabricId: TlvField(21, TlvFabricId),
        caseAuthenticatedTags: TlvOptionalRepeatedField(22, TlvCaseAuthenticatedTag, { maxLength: 3 }),
    },
});

export const TlvIntermediateCertificate = BaseMatterCertificate({
    subject: {
        icacId: TlvField(19, TlvUInt64),
        fabricId: TlvOptionalField(21, TlvFabricId),
    },
});

const TlvBaseCertificate = BaseMatterCertificate();

interface AttestationCertificateBase {
    serialNumber: ByteArray;
    signatureAlgorithm: number;
    issuer: {};
    notBefore: number;
    notAfter: number;
    subject: {};
    publicKeyAlgorithm: number;
    ellipticCurveIdentifier: number;
    ellipticCurvePublicKey: ByteArray;
    extensions: {
        basicConstraints: {
            isCa: boolean;
            pathLen?: number;
        };
        keyUsage: TypeFromPartialBitSchema<typeof ExtensionKeyUsageBitmap>;
        extendedKeyUsage?: number[];
        subjectKeyIdentifier: ByteArray;
        authorityKeyIdentifier: ByteArray;
        futureExtension?: ByteArray;
    };
    signature: ByteArray;
}

export interface DeviceAttestationCertificate extends AttestationCertificateBase {
    issuer: {
        commonName: string;
        productId?: number;
        vendorId: VendorId;
    };
    subject: {
        commonName: string;
        productId: number;
        vendorId: VendorId;
    };
}

export interface ProductAttestationIntermediateCertificate extends AttestationCertificateBase {
    issuer: {
        commonName: string;
        vendorId?: VendorId;
    };
    subject: {
        commonName: string;
        productId?: number;
        vendorId: VendorId;
    };
}

export interface ProductAttestationAuthorityCertificate extends AttestationCertificateBase {
    issuer: {
        commonName: string;
        vendorId?: VendorId;
    };
    subject: {
        commonName: string;
        vendorId?: VendorId;
    };
}

export const TlvCertificationDeclaration = TlvObject({
    formatVersion: TlvField(0, TlvUInt16),
    vendorId: TlvField(1, TlvVendorId),
    produceIdArray: TlvField(2, TlvArray(TlvUInt16, { minLength: 1, maxLength: 100 })),
    deviceTypeId: TlvField(3, TlvUInt32),
    certificateId: TlvField(4, TlvString.bound({ length: 19 })),
    securityLevel: TlvField(5, TlvUInt8),
    securityInformation: TlvField(6, TlvUInt16),
    versionNumber: TlvField(7, TlvUInt16),
    certificationType: TlvField(8, TlvUInt8),
    dacOriginVendorId: TlvOptionalField(9, TlvVendorId),
    dacOriginProductId: TlvOptionalField(10, TlvUInt16),
    authorizedPaaList: TlvOptionalField(
        11,
        TlvArray(TlvByteString.bound({ length: 20 }), { minLength: 1, maxLength: 10 }),
    ),
});

export type BaseCertificate = TypeFromSchema<typeof TlvBaseCertificate>;
export type RootCertificate = TypeFromSchema<typeof TlvRootCertificate>;
export type IntermediateCertificate = TypeFromSchema<typeof TlvIntermediateCertificate>;
export type OperationalCertificate = TypeFromSchema<typeof TlvOperationalCertificate>;
type Unsigned<Type> = { [Property in keyof Type as Exclude<Property, "signature">]: Type[Property] };

export class CertificateManager {
    static rootCertToAsn1({
        serialNumber,
        notBefore,
        notAfter,
        issuer: { issuerRcacId },
        subject: { rcacId },
        ellipticCurvePublicKey,
        extensions: { subjectKeyIdentifier, authorityKeyIdentifier },
    }: Unsigned<RootCertificate>) {
        return DerCodec.encode({
            version: ContextTagged(0, 2),
            serialNumber: serialNumber[0],
            signatureAlgorithm: EcdsaWithSHA256_X962,
            issuer: {
                issuerRcacId: issuerRcacId === undefined ? undefined : RcacId_Matter(issuerRcacId),
            },
            validity: {
                notBefore: matterToJsDate(notBefore),
                notAfter: matterToJsDate(notAfter),
            },
            subject: {
                rcacId: RcacId_Matter(rcacId),
            },
            publicKey: PublicKeyEcPrime256v1_X962(ellipticCurvePublicKey),
            extensions: ContextTagged(3, {
                basicConstraints: BasicConstraints_X509({ isCa: true }),
                keyUsage: KeyUsage_Signature_ContentCommited_X509,
                subjectKeyIdentifier: SubjectKeyIdentifier_X509(subjectKeyIdentifier),
                authorityKeyIdentifier: AuthorityKeyIdentifier_X509(authorityKeyIdentifier),
            }),
        });
    }

    static nocCertToAsn1({
        serialNumber,
        notBefore,
        notAfter,
        issuer: { issuerRcacId },
        subject: { fabricId, nodeId, caseAuthenticatedTags },
        ellipticCurvePublicKey,
        extensions: { subjectKeyIdentifier, authorityKeyIdentifier },
    }: Unsigned<OperationalCertificate>) {
        // If we ever get a second case of repeated elements, solve is more generic
        if (caseAuthenticatedTags !== undefined) {
            CaseAuthenticatedTag.validateNocTagList(caseAuthenticatedTags);
        }

        const cat0 = caseAuthenticatedTags?.[0];
        const cat1 = caseAuthenticatedTags?.[1];
        const cat2 = caseAuthenticatedTags?.[2];

        return DerCodec.encode({
            version: ContextTagged(0, 2),
            serialNumber: serialNumber[0],
            signatureAlgorithm: EcdsaWithSHA256_X962,
            issuer: {
                issuerRcacId: issuerRcacId === undefined ? undefined : RcacId_Matter(issuerRcacId),
            },
            validity: {
                notBefore: matterToJsDate(notBefore),
                notAfter: matterToJsDate(notAfter),
            },
            subject: {
                fabricId: FabricId_Matter(fabricId),
                nodeId: NodeId_Matter(NodeId(nodeId)),
                cat0: cat0 !== undefined ? NocCat_Matter(cat0) : undefined,
                cat1: cat1 !== undefined ? NocCat_Matter(cat1) : undefined,
                cat2: cat2 !== undefined ? NocCat_Matter(cat2) : undefined,
            },
            publicKey: PublicKeyEcPrime256v1_X962(ellipticCurvePublicKey),
            extensions: ContextTagged(3, {
                basicConstraints: BasicConstraints_X509({}),
                keyUsage: KeyUsage_Signature_X509,
                extendedKeyUsage: ExtendedKeyUsage_X509({ serverAuth: true, clientAuth: true }),
                subjectKeyIdentifier: SubjectKeyIdentifier_X509(subjectKeyIdentifier),
                authorityKeyIdentifier: AuthorityKeyIdentifier_X509(authorityKeyIdentifier),
            }),
        });
    }

    static daCertToAsn1(
        {
            serialNumber,
            notBefore,
            notAfter,
            issuer: { commonName: issuerCommonName, vendorId: issuerVendorId },
            subject: { commonName: subjectCommonName, vendorId: subjectVendorId, productId: subjectProductId },
            ellipticCurvePublicKey,
            extensions: { subjectKeyIdentifier, authorityKeyIdentifier },
        }: Unsigned<DeviceAttestationCertificate>,
        key: Key,
    ) {
        const certificate = {
            version: ContextTagged(0, 2),
            serialNumber: serialNumber[0],
            signatureAlgorithm: EcdsaWithSHA256_X962,
            issuer: {
                commonName: CommonName_X520(issuerCommonName),
                vendorId: VendorId_Matter(issuerVendorId),
            },
            validity: {
                notBefore: matterToJsDate(notBefore),
                notAfter: matterToJsDate(notAfter),
            },
            subject: {
                commonName: CommonName_X520(subjectCommonName),
                vendorId: VendorId_Matter(subjectVendorId),
                productId: ProductId_Matter(subjectProductId),
            },
            publicKey: PublicKeyEcPrime256v1_X962(ellipticCurvePublicKey),
            extensions: ContextTagged(3, {
                basicConstraints: BasicConstraints_X509({
                    isCa: false,
                }),
                keyUsage: KeyUsage_Signature_X509,
                subjectKeyIdentifier: SubjectKeyIdentifier_X509(subjectKeyIdentifier),
                authorityKeyIdentifier: AuthorityKeyIdentifier_X509(authorityKeyIdentifier),
            }),
        };
        return DerCodec.encode({
            certificate,
            signAlgorithm: EcdsaWithSHA256_X962,
            signature: BitByteArray(Crypto.sign(key, DerCodec.encode(certificate), "der")),
        });
    }

    static paiCertToAsn1(
        {
            serialNumber,
            notBefore,
            notAfter,
            issuer: { commonName: issuerCommonName, vendorId: issuerVendorId },
            subject: { commonName, vendorId, productId },
            ellipticCurvePublicKey,
            extensions: { subjectKeyIdentifier, authorityKeyIdentifier },
        }: Unsigned<ProductAttestationIntermediateCertificate>,
        key: Key,
    ) {
        const certificate = {
            version: ContextTagged(0, 2),
            serialNumber: serialNumber[0],
            signatureAlgorithm: EcdsaWithSHA256_X962,
            issuer: {
                commonName: CommonName_X520(issuerCommonName),
                vendorId: issuerVendorId === undefined ? undefined : VendorId_Matter(issuerVendorId),
            },
            validity: {
                notBefore: matterToJsDate(notBefore),
                notAfter: matterToJsDate(notAfter),
            },
            subject: {
                commonName: CommonName_X520(commonName),
                vendorId: VendorId_Matter(vendorId),
                productId: productId === undefined ? undefined : ProductId_Matter(productId),
            },
            publicKey: PublicKeyEcPrime256v1_X962(ellipticCurvePublicKey),
            extensions: ContextTagged(3, {
                basicConstraints: BasicConstraints_X509({
                    isCa: true,
                    pathLen: 0,
                }),
                keyUsage: KeyUsage_Signature_ContentCommited_X509,
                subjectKeyIdentifier: SubjectKeyIdentifier_X509(subjectKeyIdentifier),
                authorityKeyIdentifier: AuthorityKeyIdentifier_X509(authorityKeyIdentifier),
            }),
        };
        return DerCodec.encode({
            certificate,
            signAlgorithm: EcdsaWithSHA256_X962,
            signature: BitByteArray(Crypto.sign(key, DerCodec.encode(certificate), "der")),
        });
    }

    static paaCertToAsn1(
        {
            serialNumber,
            notBefore,
            notAfter,
            issuer: { commonName: issuerCommonName, vendorId: issuerVendorId },
            subject: { commonName, vendorId },
            ellipticCurvePublicKey,
            extensions: { subjectKeyIdentifier, authorityKeyIdentifier },
        }: Unsigned<ProductAttestationAuthorityCertificate>,
        key: Key,
    ) {
        const certificate = {
            version: ContextTagged(0, 2),
            serialNumber: serialNumber[0],
            signatureAlgorithm: EcdsaWithSHA256_X962,
            issuer: {
                commonName: CommonName_X520(issuerCommonName),
                vendorId: issuerVendorId === undefined ? undefined : VendorId_Matter(issuerVendorId),
            },
            validity: {
                notBefore: matterToJsDate(notBefore),
                notAfter: matterToJsDate(notAfter),
            },
            subject: {
                commonName: CommonName_X520(commonName),
                vendorId: vendorId === undefined ? undefined : VendorId_Matter(vendorId),
            },
            publicKey: PublicKeyEcPrime256v1_X962(ellipticCurvePublicKey),
            extensions: ContextTagged(3, {
                basicConstraints: BasicConstraints_X509({
                    isCa: false,
                }),
                keyUsage: KeyUsage_Signature_ContentCommited_X509,
                subjectKeyIdentifier: SubjectKeyIdentifier_X509(subjectKeyIdentifier),
                authorityKeyIdentifier:
                    authorityKeyIdentifier === undefined
                        ? undefined
                        : AuthorityKeyIdentifier_X509(authorityKeyIdentifier),
            }),
        };
        return DerCodec.encode({
            certificate,
            signAlgorithm: EcdsaWithSHA256_X962,
            signature: BitByteArray(Crypto.sign(key, DerCodec.encode(certificate), "der")),
        });
    }

    static CertificationDeclarationToAsn1(
        eContent: ByteArray,
        subjectKeyIdentifier: ByteArray,
        privateKey: JsonWebKey,
    ) {
        const certificate = {
            version: 3,
            digestAlgorithm: [SHA256_CMS],
            encapContentInfo: Pkcs7Data(eContent),
            signerInfo: [
                {
                    version: 3,
                    subjectKeyIdentifier: ContextTaggedBytes(0, subjectKeyIdentifier),
                    digestAlgorithm: SHA256_CMS,
                    signatureAlgorithm: EcdsaWithSHA256_X962,
                    signature: Crypto.sign(privateKey, eContent, "der"),
                },
            ],
        };

        return DerCodec.encode(Pkcs7SignedData(certificate));
    }

    static validateRootCertificate(rootCert: RootCertificate) {
        Crypto.verify(PublicKey(rootCert.ellipticCurvePublicKey), this.rootCertToAsn1(rootCert), rootCert.signature);
    }

    static validateNocCertificate(rootCert: RootCertificate, nocCert: OperationalCertificate) {
        Crypto.verify(PublicKey(rootCert.ellipticCurvePublicKey), this.nocCertToAsn1(nocCert), nocCert.signature);
    }

    static createCertificateSigningRequest(key: Key) {
        const request = {
            version: 0,
            subject: { organization: OrganisationName_X520("CSR") },
            publicKey: PublicKeyEcPrime256v1_X962(key.publicKey),
            endSignedBytes: ContextTagged(0),
        };

        return DerCodec.encode({
            request,
            signAlgorithm: EcdsaWithSHA256_X962,
            signature: BitByteArray(Crypto.sign(key, DerCodec.encode(request), "der")),
        });
    }

    static getPublicKeyFromCsr(csr: ByteArray) {
        const { [ELEMENTS_KEY]: rootElements } = DerCodec.decode(csr);
        if (rootElements?.length !== 3) throw new CertificateError("Invalid CSR data");
        const [requestNode, signAlgorithmNode, signatureNode] = rootElements;

        // Extract the public key
        const { [ELEMENTS_KEY]: requestElements } = requestNode;
        if (requestElements?.length !== 4) throw new CertificateError("Invalid CSR data");
        const [versionNode, _subjectNode, publicKeyNode] = requestElements;
        const requestVersion = versionNode[BYTES_KEY][0];
        if (requestVersion !== 0) throw new CertificateError(`Unsupported request version${requestVersion}`);
        // TODO: verify subject = { OrganisationName: "CSR" }

        const { [ELEMENTS_KEY]: publicKeyElements } = publicKeyNode;
        if (publicKeyElements?.length !== 2) throw new CertificateError("Invalid CSR data");
        const [_publicKeyTypeNode, publicKeyBytesNode] = publicKeyElements;
        // TODO: verify publicKey algorithm
        const publicKey = publicKeyBytesNode[BYTES_KEY];

        // Verify the CSR signature
        if (!EcdsaWithSHA256_X962[OBJECT_ID_KEY][BYTES_KEY].equals(signAlgorithmNode[ELEMENTS_KEY]?.[0]?.[BYTES_KEY]))
            throw new CertificateError("Unsupported signature type");
        Crypto.verify(PublicKey(publicKey), DerCodec.encode(requestNode), signatureNode[BYTES_KEY], "der");

        return publicKey;
    }
}
