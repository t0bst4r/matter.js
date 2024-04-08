[@project-chip/matter.js](../README.md) / [Modules](../modules.md) / [cluster/export](../modules/cluster_export.md) / [Groups](../modules/cluster_export.Groups.md) / RemoveGroupResponse

# Interface: RemoveGroupResponse

[cluster/export](../modules/cluster_export.md).[Groups](../modules/cluster_export.Groups.md).RemoveGroupResponse

The RemoveGroupResponse command is generated by the server in response to the receipt of a RemoveGroup command.

**`See`**

[MatterApplicationClusterSpecificationV1_1](spec_export.MatterApplicationClusterSpecificationV1_1.md) § 1.3.7.10

## Hierarchy

- [`TypeFromSchema`](../modules/tlv_export.md#typefromschema)\<typeof [`TlvRemoveGroupResponse`](../modules/cluster_export.Groups.md#tlvremovegroupresponse)\>

  ↳ **`RemoveGroupResponse`**

## Table of contents

### Properties

- [groupId](cluster_export.Groups.RemoveGroupResponse.md#groupid)
- [status](cluster_export.Groups.RemoveGroupResponse.md#status)

## Properties

### groupId

• **groupId**: [`GroupId`](../modules/datatype_export.md#groupid)

#### Inherited from

TypeFromSchema.groupId

#### Defined in

[packages/matter.js/src/cluster/definitions/GroupsCluster.ts:204](https://github.com/project-chip/matter.js/blob/3adaded6/packages/matter.js/src/cluster/definitions/GroupsCluster.ts#L204)

___

### status

• **status**: [`StatusCode`](../enums/protocol_interaction_export.StatusCode.md)

#### Inherited from

TypeFromSchema.status

#### Defined in

[packages/matter.js/src/cluster/definitions/GroupsCluster.ts:203](https://github.com/project-chip/matter.js/blob/3adaded6/packages/matter.js/src/cluster/definitions/GroupsCluster.ts#L203)