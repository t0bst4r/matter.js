[@project-chip/matter.js](../README.md) / [Modules](../modules.md) / [behavior/definitions/door-lock/export](../modules/behavior_definitions_door_lock_export.md) / DoorLockServer

# Class: DoorLockServer

[behavior/definitions/door-lock/export](../modules/behavior_definitions_door_lock_export.md).DoorLockServer

This is the default server implementation of [DoorLockBehavior](../modules/behavior_definitions_door_lock_export.md#doorlockbehavior).

## Hierarchy

- [`DoorLockBehavior`](../interfaces/behavior_definitions_door_lock_export.DoorLockBehavior-1.md)

  ↳ **`DoorLockServer`**

## Table of contents

### Constructors

- [constructor](behavior_definitions_door_lock_export.DoorLockServer.md#constructor)

### Properties

- [#agent](behavior_definitions_door_lock_export.DoorLockServer.md##agent)
- [[reference]](behavior_definitions_door_lock_export.DoorLockServer.md#[reference])
- [agent](behavior_definitions_door_lock_export.DoorLockServer.md#agent)
- [cluster](behavior_definitions_door_lock_export.DoorLockServer.md#cluster)
- [context](behavior_definitions_door_lock_export.DoorLockServer.md#context)
- [endpoint](behavior_definitions_door_lock_export.DoorLockServer.md#endpoint)
- [events](behavior_definitions_door_lock_export.DoorLockServer.md#events)
- [features](behavior_definitions_door_lock_export.DoorLockServer.md#features)
- [session](behavior_definitions_door_lock_export.DoorLockServer.md#session)
- [state](behavior_definitions_door_lock_export.DoorLockServer.md#state)
- [Events](behavior_definitions_door_lock_export.DoorLockServer.md#events-1)
- [Interface](behavior_definitions_door_lock_export.DoorLockServer.md#interface)
- [Internal](behavior_definitions_door_lock_export.DoorLockServer.md#internal)
- [State](behavior_definitions_door_lock_export.DoorLockServer.md#state-1)
- [cluster](behavior_definitions_door_lock_export.DoorLockServer.md#cluster-1)
- [defaults](behavior_definitions_door_lock_export.DoorLockServer.md#defaults)
- [dependencies](behavior_definitions_door_lock_export.DoorLockServer.md#dependencies)
- [early](behavior_definitions_door_lock_export.DoorLockServer.md#early)
- [id](behavior_definitions_door_lock_export.DoorLockServer.md#id)
- [name](behavior_definitions_door_lock_export.DoorLockServer.md#name)
- [schema](behavior_definitions_door_lock_export.DoorLockServer.md#schema)
- [supervisor](behavior_definitions_door_lock_export.DoorLockServer.md#supervisor)
- [supports](behavior_definitions_door_lock_export.DoorLockServer.md#supports)

### Methods

- [[asyncDispose]](behavior_definitions_door_lock_export.DoorLockServer.md#[asyncdispose])
- [asAdmin](behavior_definitions_door_lock_export.DoorLockServer.md#asadmin)
- [callback](behavior_definitions_door_lock_export.DoorLockServer.md#callback)
- [initialize](behavior_definitions_door_lock_export.DoorLockServer.md#initialize)
- [lockDoor](behavior_definitions_door_lock_export.DoorLockServer.md#lockdoor)
- [reactTo](behavior_definitions_door_lock_export.DoorLockServer.md#reactto)
- [toString](behavior_definitions_door_lock_export.DoorLockServer.md#tostring)
- [unlockDoor](behavior_definitions_door_lock_export.DoorLockServer.md#unlockdoor)
- [unlockWithTimeout](behavior_definitions_door_lock_export.DoorLockServer.md#unlockwithtimeout)
- [alter](behavior_definitions_door_lock_export.DoorLockServer.md#alter)
- [enable](behavior_definitions_door_lock_export.DoorLockServer.md#enable)
- [for](behavior_definitions_door_lock_export.DoorLockServer.md#for)
- [set](behavior_definitions_door_lock_export.DoorLockServer.md#set)
- [with](behavior_definitions_door_lock_export.DoorLockServer.md#with)

## Constructors

### constructor

• **new DoorLockServer**(`agent`, `backing`): [`DoorLockServer`](behavior_definitions_door_lock_export.DoorLockServer.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `agent` | [`Agent`](endpoint_export.Agent-1.md) |
| `backing` | [`BehaviorBacking`](behavior_cluster_export._internal_.BehaviorBacking.md) |

#### Returns

[`DoorLockServer`](behavior_definitions_door_lock_export.DoorLockServer.md)

#### Inherited from

DoorLockBehavior.constructor

#### Defined in

[packages/matter.js/src/behavior/cluster/ClusterBehavior.ts:181](https://github.com/project-chip/matter.js/blob/3adaded6/packages/matter.js/src/behavior/cluster/ClusterBehavior.ts#L181)

## Properties

### #agent

• `Private` **#agent**: [`Agent`](endpoint_export.Agent-1.md)

#### Inherited from

[DoorLockBehavior](../interfaces/behavior_definitions_door_lock_export.DoorLockBehavior-1.md).[#agent](../interfaces/behavior_definitions_door_lock_export.DoorLockBehavior-1.md##agent)

#### Defined in

[packages/matter.js/src/behavior/Behavior.ts:50](https://github.com/project-chip/matter.js/blob/3adaded6/packages/matter.js/src/behavior/Behavior.ts#L50)

___

### [reference]

• **[reference]**: [`Datasource`](../interfaces/behavior_cluster_export._internal_.Datasource-1.md)\<[`StateType`](../interfaces/behavior_cluster_export._internal_.StateType.md)\>

#### Inherited from

[DoorLockBehavior](../interfaces/behavior_definitions_door_lock_export.DoorLockBehavior-1.md).[[reference]](../interfaces/behavior_definitions_door_lock_export.DoorLockBehavior-1.md#[reference])

#### Defined in

[packages/matter.js/src/behavior/Behavior.ts:273](https://github.com/project-chip/matter.js/blob/3adaded6/packages/matter.js/src/behavior/Behavior.ts#L273)

[packages/matter.js/src/behavior/Behavior.ts:273](https://github.com/project-chip/matter.js/blob/3adaded6/packages/matter.js/src/behavior/Behavior.ts#L273)

[packages/matter.js/src/behavior/Behavior.ts:273](https://github.com/project-chip/matter.js/blob/3adaded6/packages/matter.js/src/behavior/Behavior.ts#L273)

___

### agent

• **agent**: [`Agent`](endpoint_export.Agent-1.md)

#### Inherited from

[DoorLockBehavior](../interfaces/behavior_definitions_door_lock_export.DoorLockBehavior-1.md).[agent](../interfaces/behavior_definitions_door_lock_export.DoorLockBehavior-1.md#agent)

#### Defined in

[packages/matter.js/src/behavior/Behavior.ts:79](https://github.com/project-chip/matter.js/blob/3adaded6/packages/matter.js/src/behavior/Behavior.ts#L79)

[packages/matter.js/src/behavior/Behavior.ts:79](https://github.com/project-chip/matter.js/blob/3adaded6/packages/matter.js/src/behavior/Behavior.ts#L79)

[packages/matter.js/src/behavior/Behavior.ts:79](https://github.com/project-chip/matter.js/blob/3adaded6/packages/matter.js/src/behavior/Behavior.ts#L79)

___

### cluster

• **cluster**: `never`

The implemented cluster.

#### Inherited from

[DoorLockBehavior](../interfaces/behavior_definitions_door_lock_export.DoorLockBehavior-1.md).[cluster](../interfaces/behavior_definitions_door_lock_export.DoorLockBehavior-1.md#cluster)

#### Defined in

[packages/matter.js/src/behavior/cluster/ClusterBehavior.ts:47](https://github.com/project-chip/matter.js/blob/3adaded6/packages/matter.js/src/behavior/cluster/ClusterBehavior.ts#L47)

[packages/matter.js/src/behavior/cluster/ClusterBehavior.ts:280](https://github.com/project-chip/matter.js/blob/3adaded6/packages/matter.js/src/behavior/cluster/ClusterBehavior.ts#L280)

___

### context

• **context**: [`ActionContext`](../interfaces/behavior_cluster_export._internal_.ActionContext.md)

#### Inherited from

[DoorLockBehavior](../interfaces/behavior_definitions_door_lock_export.DoorLockBehavior-1.md).[context](../interfaces/behavior_definitions_door_lock_export.DoorLockBehavior-1.md#context)

#### Defined in

[packages/matter.js/src/behavior/Behavior.ts:93](https://github.com/project-chip/matter.js/blob/3adaded6/packages/matter.js/src/behavior/Behavior.ts#L93)

[packages/matter.js/src/behavior/Behavior.ts:93](https://github.com/project-chip/matter.js/blob/3adaded6/packages/matter.js/src/behavior/Behavior.ts#L93)

[packages/matter.js/src/behavior/Behavior.ts:93](https://github.com/project-chip/matter.js/blob/3adaded6/packages/matter.js/src/behavior/Behavior.ts#L93)

___

### endpoint

• **endpoint**: [`Endpoint`](endpoint_export.Endpoint-1.md)\<[`Empty`](../interfaces/behavior_cluster_export._internal_.Empty.md)\>

#### Inherited from

[DoorLockBehavior](../interfaces/behavior_definitions_door_lock_export.DoorLockBehavior-1.md).[endpoint](../interfaces/behavior_definitions_door_lock_export.DoorLockBehavior-1.md#endpoint)

#### Defined in

[packages/matter.js/src/behavior/Behavior.ts:86](https://github.com/project-chip/matter.js/blob/3adaded6/packages/matter.js/src/behavior/Behavior.ts#L86)

[packages/matter.js/src/behavior/Behavior.ts:86](https://github.com/project-chip/matter.js/blob/3adaded6/packages/matter.js/src/behavior/Behavior.ts#L86)

[packages/matter.js/src/behavior/Behavior.ts:86](https://github.com/project-chip/matter.js/blob/3adaded6/packages/matter.js/src/behavior/Behavior.ts#L86)

___

### events

• `Readonly` **events**: [`EventEmitter`](util_export.EventEmitter-1.md) & `Omit`\<[`ClusterEvents`](../modules/behavior_cluster_export.md#clusterevents)\<[`Of`](../interfaces/cluster_export.ClusterType.Of.md)\<\{ `attributes`: {} = \{}; `commands`: {} = \{}; `events`: {} = \{}; `id`: ``0`` = 0; `name`: ``"Unknown"`` = "Unknown"; `revision`: ``0`` = 0 }\>, typeof [`ClusterBehavior`](../modules/behavior_cluster_export.ClusterBehavior.md)\>, `never`\> & \{ `actuatorEnabled$Change`: [`AttributeObservable`](../modules/behavior_cluster_export.ClusterEvents.md#attributeobservable)\<[`Attribute`](../interfaces/cluster_export.Attribute.md)\<`boolean`, `any`\>\> ; `lockState$Change`: [`AttributeObservable`](../modules/behavior_cluster_export.ClusterEvents.md#attributeobservable)\<[`Attribute`](../interfaces/cluster_export.Attribute.md)\<``null`` \| [`LockState`](../enums/cluster_export.DoorLock.LockState.md), `any`\>\> ; `lockType$Change`: [`AttributeObservable`](../modules/behavior_cluster_export.ClusterEvents.md#attributeobservable)\<[`Attribute`](../interfaces/cluster_export.Attribute.md)\<[`LockType`](../enums/cluster_export.DoorLock.LockType.md), `any`\>\> ; `operatingMode$Change`: [`AttributeObservable`](../modules/behavior_cluster_export.ClusterEvents.md#attributeobservable)\<[`WritableAttribute`](../interfaces/cluster_export.WritableAttribute.md)\<[`OperatingMode`](../enums/cluster_export.DoorLock.OperatingMode.md), `any`\>\> ; `supportedOperatingModes$Change`: [`AttributeObservable`](../modules/behavior_cluster_export.ClusterEvents.md#attributeobservable)\<[`FixedAttribute`](../interfaces/cluster_export.FixedAttribute.md)\<[`TypeFromPartialBitSchema`](../modules/schema_export.md#typefrompartialbitschema)\<\{ `noRemoteLockUnlock`: [`BitFlag`](../modules/schema_export.md#bitflag) ; `normal`: [`BitFlag`](../modules/schema_export.md#bitflag) ; `passage`: [`BitFlag`](../modules/schema_export.md#bitflag) ; `privacy`: [`BitFlag`](../modules/schema_export.md#bitflag) ; `vacation`: [`BitFlag`](../modules/schema_export.md#bitflag)  }\>, `any`\>\>  } & \{ `alarmMask$Change`: `undefined` \| [`AttributeObservable`](../modules/behavior_cluster_export.ClusterEvents.md#attributeobservable)\<[`OptionalWritableAttribute`](../interfaces/cluster_export.OptionalWritableAttribute.md)\<[`TypeFromPartialBitSchema`](../modules/schema_export.md#typefrompartialbitschema)\<\{ `forcedDoorOpenUnderDoorLockedCondition`: [`BitFlag`](../modules/schema_export.md#bitflag) ; `lockResetToFactoryDefaults`: [`BitFlag`](../modules/schema_export.md#bitflag) ; `lockingMechanismJammed`: [`BitFlag`](../modules/schema_export.md#bitflag) ; `reserved`: [`BitFlag`](../modules/schema_export.md#bitflag) ; `rfModulePowerCycled`: [`BitFlag`](../modules/schema_export.md#bitflag) ; `tamperAlarmFrontEscutcheonRemovedFromMain`: [`BitFlag`](../modules/schema_export.md#bitflag) ; `tamperAlarmWrongCodeEntryLimit`: [`BitFlag`](../modules/schema_export.md#bitflag)  }\>, `any`\>\> ; `autoRelockTime$Change`: `undefined` \| [`AttributeObservable`](../modules/behavior_cluster_export.ClusterEvents.md#attributeobservable)\<[`OptionalWritableAttribute`](../interfaces/cluster_export.OptionalWritableAttribute.md)\<`number`, `any`\>\> ; `defaultConfigurationRegister$Change`: `undefined` \| [`AttributeObservable`](../modules/behavior_cluster_export.ClusterEvents.md#attributeobservable)\<[`OptionalAttribute`](../interfaces/cluster_export.OptionalAttribute.md)\<[`TypeFromPartialBitSchema`](../modules/schema_export.md#typefrompartialbitschema)\<\{ `autoRelockTimeSet`: [`BitFlag`](../modules/schema_export.md#bitflag) ; `enableLocalProgrammingEnabled`: [`BitFlag`](../modules/schema_export.md#bitflag) ; `keypadInterfaceDefaultAccessEnabled`: [`BitFlag`](../modules/schema_export.md#bitflag) ; `ledSettingsSet`: [`BitFlag`](../modules/schema_export.md#bitflag) ; `remoteInterfaceDefaultAccessIsEnabled`: [`BitFlag`](../modules/schema_export.md#bitflag) ; `soundEnabled`: [`BitFlag`](../modules/schema_export.md#bitflag)  }\>, `any`\>\> ; `enableInsideStatusLed$Change`: `undefined` \| [`AttributeObservable`](../modules/behavior_cluster_export.ClusterEvents.md#attributeobservable)\<[`OptionalWritableAttribute`](../interfaces/cluster_export.OptionalWritableAttribute.md)\<`boolean`, `any`\>\> ; `enableLocalProgramming$Change`: `undefined` \| [`AttributeObservable`](../modules/behavior_cluster_export.ClusterEvents.md#attributeobservable)\<[`OptionalWritableAttribute`](../interfaces/cluster_export.OptionalWritableAttribute.md)\<`boolean`, `any`\>\> ; `enableOneTouchLocking$Change`: `undefined` \| [`AttributeObservable`](../modules/behavior_cluster_export.ClusterEvents.md#attributeobservable)\<[`OptionalWritableAttribute`](../interfaces/cluster_export.OptionalWritableAttribute.md)\<`boolean`, `any`\>\> ; `enablePrivacyModeButton$Change`: `undefined` \| [`AttributeObservable`](../modules/behavior_cluster_export.ClusterEvents.md#attributeobservable)\<[`OptionalWritableAttribute`](../interfaces/cluster_export.OptionalWritableAttribute.md)\<`boolean`, `any`\>\> ; `language$Change`: `undefined` \| [`AttributeObservable`](../modules/behavior_cluster_export.ClusterEvents.md#attributeobservable)\<[`OptionalWritableAttribute`](../interfaces/cluster_export.OptionalWritableAttribute.md)\<`string`, `any`\>\> ; `ledSettings$Change`: `undefined` \| [`AttributeObservable`](../modules/behavior_cluster_export.ClusterEvents.md#attributeobservable)\<[`OptionalWritableAttribute`](../interfaces/cluster_export.OptionalWritableAttribute.md)\<`number`, `any`\>\> ; `localProgrammingFeatures$Change`: `undefined` \| [`AttributeObservable`](../modules/behavior_cluster_export.ClusterEvents.md#attributeobservable)\<[`OptionalWritableAttribute`](../interfaces/cluster_export.OptionalWritableAttribute.md)\<[`TypeFromPartialBitSchema`](../modules/schema_export.md#typefrompartialbitschema)\<\{ `addUsersCredentialsSchedulesLocally`: [`BitFlag`](../modules/schema_export.md#bitflag) ; `adjustLockSettingsLocally`: [`BitFlag`](../modules/schema_export.md#bitflag) ; `clearUsersCredentialsSchedulesLocally`: [`BitFlag`](../modules/schema_export.md#bitflag) ; `modifyUsersCredentialsSchedulesLocally`: [`BitFlag`](../modules/schema_export.md#bitflag)  }\>, `any`\>\> ; `soundVolume$Change`: `undefined` \| [`AttributeObservable`](../modules/behavior_cluster_export.ClusterEvents.md#attributeobservable)\<[`OptionalWritableAttribute`](../interfaces/cluster_export.OptionalWritableAttribute.md)\<`number`, `any`\>\>  } & \{ `doorLockAlarm`: [`EventObservable`](../modules/behavior_cluster_export.ClusterEvents.md#eventobservable)\<[`Event`](../interfaces/cluster_export.Event.md)\<[`TypeFromFields`](../modules/tlv_export.md#typefromfields)\<\{ `alarmCode`: [`FieldType`](../interfaces/tlv_export.FieldType.md)\<[`AlarmCode`](../enums/cluster_export.DoorLock.AlarmCode.md)\>  }\>, `any`\>\> ; `lockOperation`: [`EventObservable`](../modules/behavior_cluster_export.ClusterEvents.md#eventobservable)\<[`Event`](../interfaces/cluster_export.Event.md)\<[`TypeFromFields`](../modules/tlv_export.md#typefromfields)\<\{ `credentials`: [`OptionalFieldType`](../interfaces/tlv_export.OptionalFieldType.md)\<``null`` \| [`TypeFromFields`](../modules/tlv_export.md#typefromfields)\<\{ `credentialIndex`: ... ; `credentialType`: ...  }\>[]\> ; `fabricIndex`: [`FieldType`](../interfaces/tlv_export.FieldType.md)\<``null`` \| [`FabricIndex`](../modules/datatype_export.md#fabricindex)\> ; `lockOperationType`: [`FieldType`](../interfaces/tlv_export.FieldType.md)\<[`LockOperationType`](../enums/cluster_export.DoorLock.LockOperationType.md)\> ; `operationSource`: [`FieldType`](../interfaces/tlv_export.FieldType.md)\<[`OperationSource`](../enums/cluster_export.DoorLock.OperationSource.md)\> ; `sourceNode`: [`FieldType`](../interfaces/tlv_export.FieldType.md)\<``null`` \| [`NodeId`](../modules/datatype_export.md#nodeid)\> ; `userIndex`: [`FieldType`](../interfaces/tlv_export.FieldType.md)\<``null`` \| `number`\>  }\>, `any`\>\> ; `lockOperationError`: [`EventObservable`](../modules/behavior_cluster_export.ClusterEvents.md#eventobservable)\<[`Event`](../interfaces/cluster_export.Event.md)\<[`TypeFromFields`](../modules/tlv_export.md#typefromfields)\<\{ `credentials`: [`OptionalFieldType`](../interfaces/tlv_export.OptionalFieldType.md)\<``null`` \| [`TypeFromFields`](../modules/tlv_export.md#typefromfields)\<\{ `credentialIndex`: ... ; `credentialType`: ...  }\>[]\> ; `fabricIndex`: [`FieldType`](../interfaces/tlv_export.FieldType.md)\<``null`` \| [`FabricIndex`](../modules/datatype_export.md#fabricindex)\> ; `lockOperationType`: [`FieldType`](../interfaces/tlv_export.FieldType.md)\<[`LockOperationType`](../enums/cluster_export.DoorLock.LockOperationType.md)\> ; `operationError`: [`FieldType`](../interfaces/tlv_export.FieldType.md)\<[`OperationError`](../enums/cluster_export.DoorLock.OperationError.md)\> ; `operationSource`: [`FieldType`](../interfaces/tlv_export.FieldType.md)\<[`OperationSource`](../enums/cluster_export.DoorLock.OperationSource.md)\> ; `sourceNode`: [`FieldType`](../interfaces/tlv_export.FieldType.md)\<``null`` \| [`NodeId`](../modules/datatype_export.md#nodeid)\> ; `userIndex`: [`FieldType`](../interfaces/tlv_export.FieldType.md)\<``null`` \| `number`\>  }\>, `any`\>\>  } & {}

Access the behavior's events.

#### Inherited from

[DoorLockBehavior](../interfaces/behavior_definitions_door_lock_export.DoorLockBehavior-1.md).[events](../interfaces/behavior_definitions_door_lock_export.DoorLockBehavior-1.md#events)

#### Defined in

[packages/matter.js/src/behavior/Behavior.ts:144](https://github.com/project-chip/matter.js/blob/3adaded6/packages/matter.js/src/behavior/Behavior.ts#L144)

[packages/matter.js/src/behavior/cluster/ClusterBehavior.ts:290](https://github.com/project-chip/matter.js/blob/3adaded6/packages/matter.js/src/behavior/cluster/ClusterBehavior.ts#L290)

___

### features

• **features**: `Object`

Supported features as a flag object.

#### Inherited from

[DoorLockBehavior](../interfaces/behavior_definitions_door_lock_export.DoorLockBehavior-1.md).[features](../interfaces/behavior_definitions_door_lock_export.DoorLockBehavior-1.md#features)

#### Defined in

[packages/matter.js/src/behavior/cluster/ClusterBehavior.ts:54](https://github.com/project-chip/matter.js/blob/3adaded6/packages/matter.js/src/behavior/cluster/ClusterBehavior.ts#L54)

[packages/matter.js/src/behavior/cluster/ClusterBehavior.ts:54](https://github.com/project-chip/matter.js/blob/3adaded6/packages/matter.js/src/behavior/cluster/ClusterBehavior.ts#L54)

[packages/matter.js/src/behavior/cluster/ClusterBehavior.ts:54](https://github.com/project-chip/matter.js/blob/3adaded6/packages/matter.js/src/behavior/cluster/ClusterBehavior.ts#L54)

[packages/matter.js/src/behavior/cluster/ClusterBehavior.ts:295](https://github.com/project-chip/matter.js/blob/3adaded6/packages/matter.js/src/behavior/cluster/ClusterBehavior.ts#L295)

[packages/matter.js/src/behavior/cluster/ClusterBehavior.ts:295](https://github.com/project-chip/matter.js/blob/3adaded6/packages/matter.js/src/behavior/cluster/ClusterBehavior.ts#L295)

___

### session

• **session**: [`SecureSession`](session_export.SecureSession.md)\<[`MatterDevice`](behavior_cluster_export._internal_.MatterDevice.md)\>

#### Inherited from

[DoorLockBehavior](../interfaces/behavior_definitions_door_lock_export.DoorLockBehavior-1.md).[session](../interfaces/behavior_definitions_door_lock_export.DoorLockBehavior-1.md#session)

#### Defined in

[packages/matter.js/src/behavior/Behavior.ts:100](https://github.com/project-chip/matter.js/blob/3adaded6/packages/matter.js/src/behavior/Behavior.ts#L100)

[packages/matter.js/src/behavior/Behavior.ts:100](https://github.com/project-chip/matter.js/blob/3adaded6/packages/matter.js/src/behavior/Behavior.ts#L100)

[packages/matter.js/src/behavior/Behavior.ts:100](https://github.com/project-chip/matter.js/blob/3adaded6/packages/matter.js/src/behavior/Behavior.ts#L100)

___

### state

• `Readonly` **state**: `Omit`\<[`Type`](../modules/behavior_cluster_export.ClusterState.md#type)\<[`Of`](../interfaces/cluster_export.ClusterType.Of.md)\<\{ `attributes`: {} = \{}; `commands`: {} = \{}; `events`: {} = \{}; `id`: ``0`` = 0; `name`: ``"Unknown"`` = "Unknown"; `revision`: ``0`` = 0 }\>, typeof [`ClusterBehavior`](../modules/behavior_cluster_export.ClusterBehavior.md)\>, `never`\> & \{ `actuatorEnabled`: `boolean` ; `lockState`: ``null`` \| [`LockState`](../enums/cluster_export.DoorLock.LockState.md) ; `lockType`: [`LockType`](../enums/cluster_export.DoorLock.LockType.md) ; `operatingMode`: [`OperatingMode`](../enums/cluster_export.DoorLock.OperatingMode.md)  } & \{ `alarmMask?`: [`TypeFromPartialBitSchema`](../modules/schema_export.md#typefrompartialbitschema)\<\{ `forcedDoorOpenUnderDoorLockedCondition`: [`BitFlag`](../modules/schema_export.md#bitflag) ; `lockResetToFactoryDefaults`: [`BitFlag`](../modules/schema_export.md#bitflag) ; `lockingMechanismJammed`: [`BitFlag`](../modules/schema_export.md#bitflag) ; `reserved`: [`BitFlag`](../modules/schema_export.md#bitflag) ; `rfModulePowerCycled`: [`BitFlag`](../modules/schema_export.md#bitflag) ; `tamperAlarmFrontEscutcheonRemovedFromMain`: [`BitFlag`](../modules/schema_export.md#bitflag) ; `tamperAlarmWrongCodeEntryLimit`: [`BitFlag`](../modules/schema_export.md#bitflag)  }\> ; `autoRelockTime?`: `number` ; `defaultConfigurationRegister?`: [`TypeFromPartialBitSchema`](../modules/schema_export.md#typefrompartialbitschema)\<\{ `autoRelockTimeSet`: [`BitFlag`](../modules/schema_export.md#bitflag) ; `enableLocalProgrammingEnabled`: [`BitFlag`](../modules/schema_export.md#bitflag) ; `keypadInterfaceDefaultAccessEnabled`: [`BitFlag`](../modules/schema_export.md#bitflag) ; `ledSettingsSet`: [`BitFlag`](../modules/schema_export.md#bitflag) ; `remoteInterfaceDefaultAccessIsEnabled`: [`BitFlag`](../modules/schema_export.md#bitflag) ; `soundEnabled`: [`BitFlag`](../modules/schema_export.md#bitflag)  }\> ; `enableInsideStatusLed?`: `boolean` ; `enableLocalProgramming?`: `boolean` ; `enableOneTouchLocking?`: `boolean` ; `enablePrivacyModeButton?`: `boolean` ; `language?`: `string` ; `ledSettings?`: `number` ; `localProgrammingFeatures?`: [`TypeFromPartialBitSchema`](../modules/schema_export.md#typefrompartialbitschema)\<\{ `addUsersCredentialsSchedulesLocally`: [`BitFlag`](../modules/schema_export.md#bitflag) ; `adjustLockSettingsLocally`: [`BitFlag`](../modules/schema_export.md#bitflag) ; `clearUsersCredentialsSchedulesLocally`: [`BitFlag`](../modules/schema_export.md#bitflag) ; `modifyUsersCredentialsSchedulesLocally`: [`BitFlag`](../modules/schema_export.md#bitflag)  }\> ; `soundVolume?`: `number`  } & \{ `supportedOperatingModes`: [`TypeFromPartialBitSchema`](../modules/schema_export.md#typefrompartialbitschema)\<\{ `noRemoteLockUnlock`: [`BitFlag`](../modules/schema_export.md#bitflag) ; `normal`: [`BitFlag`](../modules/schema_export.md#bitflag) ; `passage`: [`BitFlag`](../modules/schema_export.md#bitflag) ; `privacy`: [`BitFlag`](../modules/schema_export.md#bitflag) ; `vacation`: [`BitFlag`](../modules/schema_export.md#bitflag)  }\>  } & {}

Access the behavior's state.

#### Inherited from

[DoorLockBehavior](../interfaces/behavior_definitions_door_lock_export.DoorLockBehavior-1.md).[state](../interfaces/behavior_definitions_door_lock_export.DoorLockBehavior-1.md#state)

#### Defined in

[packages/matter.js/src/behavior/Behavior.ts:139](https://github.com/project-chip/matter.js/blob/3adaded6/packages/matter.js/src/behavior/Behavior.ts#L139)

[packages/matter.js/src/behavior/cluster/ClusterBehavior.ts:285](https://github.com/project-chip/matter.js/blob/3adaded6/packages/matter.js/src/behavior/cluster/ClusterBehavior.ts#L285)

___

### Events

▪ `Static` `Readonly` **Events**: [`Type`](../modules/behavior_cluster_export.ClusterEvents.md#type)\<[`Cluster`](../interfaces/cluster_export.DoorLock.Cluster.md), [`Type`](../interfaces/behavior_cluster_export.ClusterBehavior.Type.md)\<[`Of`](../interfaces/cluster_export.ClusterType.Of.md)\<\{ `attributes`: {} = \{}; `commands`: {} = \{}; `events`: {} = \{}; `id`: ``0`` = 0; `name`: ``"Unknown"`` = "Unknown"; `revision`: ``0`` = 0 }\>, typeof [`ClusterBehavior`](../modules/behavior_cluster_export.ClusterBehavior.md), [`DoorLockInterface`](../modules/behavior_definitions_door_lock_export.md#doorlockinterface)\>\>

#### Inherited from

DoorLockBehavior.Events

#### Defined in

[packages/matter.js/src/behavior/cluster/ClusterBehavior.ts:195](https://github.com/project-chip/matter.js/blob/3adaded6/packages/matter.js/src/behavior/cluster/ClusterBehavior.ts#L195)

___

### Interface

▪ `Static` `Readonly` **Interface**: [`DoorLockInterface`](../modules/behavior_definitions_door_lock_export.md#doorlockinterface)

#### Inherited from

DoorLockBehavior.Interface

#### Defined in

[packages/matter.js/src/behavior/cluster/ClusterBehavior.ts:198](https://github.com/project-chip/matter.js/blob/3adaded6/packages/matter.js/src/behavior/cluster/ClusterBehavior.ts#L198)

___

### Internal

▪ `Static` `Readonly` **Internal**: () => {}

#### Type declaration

• **new Internal**(): `Object`

##### Returns

`Object`

#### Inherited from

DoorLockBehavior.Internal

#### Defined in

[packages/matter.js/src/behavior/cluster/ClusterBehavior.ts:197](https://github.com/project-chip/matter.js/blob/3adaded6/packages/matter.js/src/behavior/cluster/ClusterBehavior.ts#L197)

___

### State

▪ `Static` `Readonly` **State**: () => [`Type`](../modules/behavior_cluster_export.ClusterState.md#type)\<[`Cluster`](../interfaces/cluster_export.DoorLock.Cluster.md), [`Type`](../interfaces/behavior_cluster_export.ClusterBehavior.Type.md)\<[`Of`](../interfaces/cluster_export.ClusterType.Of.md)\<\{ `attributes`: {} = \{}; `commands`: {} = \{}; `events`: {} = \{}; `id`: ``0`` = 0; `name`: ``"Unknown"`` = "Unknown"; `revision`: ``0`` = 0 }\>, typeof [`ClusterBehavior`](../modules/behavior_cluster_export.ClusterBehavior.md), [`DoorLockInterface`](../modules/behavior_definitions_door_lock_export.md#doorlockinterface)\>\>

#### Type declaration

• **new State**(): [`Type`](../modules/behavior_cluster_export.ClusterState.md#type)\<[`Cluster`](../interfaces/cluster_export.DoorLock.Cluster.md), [`Type`](../interfaces/behavior_cluster_export.ClusterBehavior.Type.md)\<[`Of`](../interfaces/cluster_export.ClusterType.Of.md)\<\{ `attributes`: {} = \{}; `commands`: {} = \{}; `events`: {} = \{}; `id`: ``0`` = 0; `name`: ``"Unknown"`` = "Unknown"; `revision`: ``0`` = 0 }\>, typeof [`ClusterBehavior`](../modules/behavior_cluster_export.ClusterBehavior.md), [`DoorLockInterface`](../modules/behavior_definitions_door_lock_export.md#doorlockinterface)\>\>

##### Returns

[`Type`](../modules/behavior_cluster_export.ClusterState.md#type)\<[`Cluster`](../interfaces/cluster_export.DoorLock.Cluster.md), [`Type`](../interfaces/behavior_cluster_export.ClusterBehavior.Type.md)\<[`Of`](../interfaces/cluster_export.ClusterType.Of.md)\<\{ `attributes`: {} = \{}; `commands`: {} = \{}; `events`: {} = \{}; `id`: ``0`` = 0; `name`: ``"Unknown"`` = "Unknown"; `revision`: ``0`` = 0 }\>, typeof [`ClusterBehavior`](../modules/behavior_cluster_export.ClusterBehavior.md), [`DoorLockInterface`](../modules/behavior_definitions_door_lock_export.md#doorlockinterface)\>\>

#### Inherited from

DoorLockBehavior.State

#### Defined in

[packages/matter.js/src/behavior/cluster/ClusterBehavior.ts:196](https://github.com/project-chip/matter.js/blob/3adaded6/packages/matter.js/src/behavior/cluster/ClusterBehavior.ts#L196)

___

### cluster

▪ `Static` `Readonly` **cluster**: [`Cluster`](../interfaces/cluster_export.DoorLock.Cluster.md)

Base cluster state include all attribute values but may be extended by subclasses.

#### Inherited from

DoorLockBehavior.cluster

#### Defined in

[packages/matter.js/src/behavior/cluster/ClusterBehavior.ts:193](https://github.com/project-chip/matter.js/blob/3adaded6/packages/matter.js/src/behavior/cluster/ClusterBehavior.ts#L193)

___

### defaults

▪ `Static` `Readonly` **defaults**: [`Type`](../modules/behavior_cluster_export.ClusterState.md#type)\<[`Cluster`](../interfaces/cluster_export.DoorLock.Cluster.md), [`Type`](../interfaces/behavior_cluster_export.ClusterBehavior.Type.md)\<[`Of`](../interfaces/cluster_export.ClusterType.Of.md)\<\{ `attributes`: {} = \{}; `commands`: {} = \{}; `events`: {} = \{}; `id`: ``0`` = 0; `name`: ``"Unknown"`` = "Unknown"; `revision`: ``0`` = 0 }\>, typeof [`ClusterBehavior`](../modules/behavior_cluster_export.ClusterBehavior.md), [`DoorLockInterface`](../modules/behavior_definitions_door_lock_export.md#doorlockinterface)\>\>

#### Inherited from

DoorLockBehavior.defaults

#### Defined in

[packages/matter.js/src/behavior/cluster/ClusterBehavior.ts:202](https://github.com/project-chip/matter.js/blob/3adaded6/packages/matter.js/src/behavior/cluster/ClusterBehavior.ts#L202)

___

### dependencies

▪ `Static` `Optional` `Readonly` **dependencies**: `Iterable`\<[`Type`](../interfaces/behavior_export.Behavior.Type.md)\>

#### Inherited from

DoorLockBehavior.dependencies

#### Defined in

[packages/matter.js/src/behavior/cluster/ClusterBehavior.ts:204](https://github.com/project-chip/matter.js/blob/3adaded6/packages/matter.js/src/behavior/cluster/ClusterBehavior.ts#L204)

___

### early

▪ `Static` `Readonly` **early**: `boolean`

#### Inherited from

DoorLockBehavior.early

#### Defined in

[packages/matter.js/src/behavior/cluster/ClusterBehavior.ts:201](https://github.com/project-chip/matter.js/blob/3adaded6/packages/matter.js/src/behavior/cluster/ClusterBehavior.ts#L201)

___

### id

▪ `Static` `Readonly` **id**: ``"doorLock"``

The behavior ID for ClusterBehaviors is the name of the cluster.

#### Inherited from

DoorLockBehavior.id

#### Defined in

[packages/matter.js/src/behavior/cluster/ClusterBehavior.ts:188](https://github.com/project-chip/matter.js/blob/3adaded6/packages/matter.js/src/behavior/cluster/ClusterBehavior.ts#L188)

___

### name

▪ `Static` `Readonly` **name**: `string`

#### Inherited from

DoorLockBehavior.name

#### Defined in

[packages/matter.js/src/behavior/cluster/ClusterBehavior.ts:183](https://github.com/project-chip/matter.js/blob/3adaded6/packages/matter.js/src/behavior/cluster/ClusterBehavior.ts#L183)

___

### schema

▪ `Static` `Optional` `Readonly` **schema**: [`Schema`](../modules/behavior_cluster_export._internal_.md#schema)

#### Inherited from

DoorLockBehavior.schema

#### Defined in

[packages/matter.js/src/behavior/cluster/ClusterBehavior.ts:200](https://github.com/project-chip/matter.js/blob/3adaded6/packages/matter.js/src/behavior/cluster/ClusterBehavior.ts#L200)

___

### supervisor

▪ `Static` `Readonly` **supervisor**: [`RootSupervisor`](behavior_cluster_export._internal_.RootSupervisor.md)

#### Inherited from

DoorLockBehavior.supervisor

#### Defined in

[packages/matter.js/src/behavior/cluster/ClusterBehavior.ts:203](https://github.com/project-chip/matter.js/blob/3adaded6/packages/matter.js/src/behavior/cluster/ClusterBehavior.ts#L203)

___

### supports

▪ `Static` **supports**: (`other`: [`Type`](../interfaces/behavior_export.Behavior.Type.md)) => `boolean`

#### Type declaration

▸ (`other`): `boolean`

##### Parameters

| Name | Type |
| :------ | :------ |
| `other` | [`Type`](../interfaces/behavior_export.Behavior.Type.md) |

##### Returns

`boolean`

#### Inherited from

DoorLockBehavior.supports

#### Defined in

[packages/matter.js/src/behavior/cluster/ClusterBehavior.ts:205](https://github.com/project-chip/matter.js/blob/3adaded6/packages/matter.js/src/behavior/cluster/ClusterBehavior.ts#L205)

## Methods

### [asyncDispose]

▸ **[asyncDispose]**(): [`MaybePromise`](../modules/util_export.md#maybepromise)

Release resources.  This is the public API for releasing application resources held by behaviors in internal
state.

#### Returns

[`MaybePromise`](../modules/util_export.md#maybepromise)

#### Inherited from

[DoorLockBehavior](../interfaces/behavior_definitions_door_lock_export.DoorLockBehavior-1.md).[[asyncDispose]](../interfaces/behavior_definitions_door_lock_export.DoorLockBehavior-1.md#[asyncdispose])

#### Defined in

[packages/matter.js/src/behavior/Behavior.ts:197](https://github.com/project-chip/matter.js/blob/3adaded6/packages/matter.js/src/behavior/Behavior.ts#L197)

___

### asAdmin

▸ **asAdmin**(`fn`): `void`

Execute logic with elevated privileges.

The provided function executes with privileges escalated to offline mode.  This is not commonly necessary.

Elevated logic effectively ignores ACLs so should be used with care.

Note that interactions with the behavior will remain elevated until the synchronous completion of this call.
You should only elevate privileges for synchronous logic.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `fn` | () => `void` | the elevated logic |

#### Returns

`void`

#### Inherited from

[DoorLockBehavior](../interfaces/behavior_definitions_door_lock_export.DoorLockBehavior-1.md).[asAdmin](../interfaces/behavior_definitions_door_lock_export.DoorLockBehavior-1.md#asadmin)

#### Defined in

[packages/matter.js/src/behavior/Behavior.ts:124](https://github.com/project-chip/matter.js/blob/3adaded6/packages/matter.js/src/behavior/Behavior.ts#L124)

___

### callback

▸ **callback**\<`A`, `R`\>(`reactor`, `options?`): (...`args`: `A`) => `undefined` \| `R`

Create a generic callback function that has the same properties as a [Reactor](../modules/behavior_export.md#reactor).

Like a reactor, the callback's "this" will be bound to an active Behavior instance.
Because of this: The reactor MUST be a real JS function - arrow functions will not work!

#### Type parameters

| Name | Type |
| :------ | :------ |
| `A` | extends `any`[] |
| `R` | `R` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `reactor` | [`Reactor`](../modules/behavior_export.md#reactor)\<`A`, `R`\> |
| `options?` | [`Options`](../interfaces/behavior_export.Reactor.Options.md) |

#### Returns

`fn`

▸ (`...args`): `undefined` \| `R`

##### Parameters

| Name | Type |
| :------ | :------ |
| `...args` | `A` |

##### Returns

`undefined` \| `R`

#### Inherited from

[DoorLockBehavior](../interfaces/behavior_definitions_door_lock_export.DoorLockBehavior-1.md).[callback](../interfaces/behavior_definitions_door_lock_export.DoorLockBehavior-1.md#callback)

#### Defined in

[packages/matter.js/src/behavior/Behavior.ts:225](https://github.com/project-chip/matter.js/blob/3adaded6/packages/matter.js/src/behavior/Behavior.ts#L225)

___

### initialize

▸ **initialize**(`_options?`): [`MaybePromise`](../modules/util_export.md#maybepromise)

Behaviors are ephemeral and should not perform initialization in their constructor.  They can override this
method instead.

This method may be synchronous or asyncronous.  If asynchronous, the behavior will not be available for external
use until initialization completes.

#### Parameters

| Name | Type |
| :------ | :------ |
| `_options?` | `Object` |

#### Returns

[`MaybePromise`](../modules/util_export.md#maybepromise)

#### Inherited from

[DoorLockBehavior](../interfaces/behavior_definitions_door_lock_export.DoorLockBehavior-1.md).[initialize](../interfaces/behavior_definitions_door_lock_export.DoorLockBehavior-1.md#initialize)

#### Defined in

[packages/matter.js/src/behavior/Behavior.ts:191](https://github.com/project-chip/matter.js/blob/3adaded6/packages/matter.js/src/behavior/Behavior.ts#L191)

___

### lockDoor

▸ **lockDoor**(`request`): [`MaybePromise`](../modules/util_export.md#maybepromise)

#### Parameters

| Name | Type |
| :------ | :------ |
| `request` | [`TypeFromFields`](../modules/tlv_export.md#typefromfields)\<\{ `pinCode`: [`OptionalFieldType`](../interfaces/tlv_export.OptionalFieldType.md)\<`Uint8Array`\>  }\> |

#### Returns

[`MaybePromise`](../modules/util_export.md#maybepromise)

**`See`**

[MatterApplicationClusterSpecificationV1_1](../interfaces/spec_export.MatterApplicationClusterSpecificationV1_1.md) § 5.2.4

#### Inherited from

[DoorLockBehavior](../interfaces/behavior_definitions_door_lock_export.DoorLockBehavior-1.md).[lockDoor](../interfaces/behavior_definitions_door_lock_export.DoorLockBehavior-1.md#lockdoor)

#### Defined in

[packages/matter.js/src/behavior/definitions/door-lock/DoorLockInterface.ts:139](https://github.com/project-chip/matter.js/blob/3adaded6/packages/matter.js/src/behavior/definitions/door-lock/DoorLockInterface.ts#L139)

___

### reactTo

▸ **reactTo**\<`O`\>(`observable`, `reactor`, `options?`): `void`

Install a [Reactor](../modules/behavior_export.md#reactor).

Important: The reactor MUST be a real JS function - arrow functions will not work!

#### Type parameters

| Name | Type |
| :------ | :------ |
| `O` | extends [`Observable`](../interfaces/util_export.Observable.md)\<`any`[], `any`\> |

#### Parameters

| Name | Type |
| :------ | :------ |
| `observable` | `O` |
| `reactor` | [`Reactor`](../modules/behavior_export.md#reactor)\<`Parameters`\<`O`[``"emit"``]\>, `ReturnType`\<`O`[``"emit"``]\>\> |
| `options?` | [`Options`](../interfaces/behavior_export.Reactor.Options.md) |

#### Returns

`void`

#### Inherited from

[DoorLockBehavior](../interfaces/behavior_definitions_door_lock_export.DoorLockBehavior-1.md).[reactTo](../interfaces/behavior_definitions_door_lock_export.DoorLockBehavior-1.md#reactto)

#### Defined in

[packages/matter.js/src/behavior/Behavior.ts:211](https://github.com/project-chip/matter.js/blob/3adaded6/packages/matter.js/src/behavior/Behavior.ts#L211)

___

### toString

▸ **toString**(): `string`

Description used in diagnostic messages.

#### Returns

`string`

#### Inherited from

[DoorLockBehavior](../interfaces/behavior_definitions_door_lock_export.DoorLockBehavior-1.md).[toString](../interfaces/behavior_definitions_door_lock_export.DoorLockBehavior-1.md#tostring)

#### Defined in

[packages/matter.js/src/behavior/Behavior.ts:202](https://github.com/project-chip/matter.js/blob/3adaded6/packages/matter.js/src/behavior/Behavior.ts#L202)

___

### unlockDoor

▸ **unlockDoor**(`request`): [`MaybePromise`](../modules/util_export.md#maybepromise)

#### Parameters

| Name | Type |
| :------ | :------ |
| `request` | [`TypeFromFields`](../modules/tlv_export.md#typefromfields)\<\{ `pinCode`: [`OptionalFieldType`](../interfaces/tlv_export.OptionalFieldType.md)\<`Uint8Array`\>  }\> |

#### Returns

[`MaybePromise`](../modules/util_export.md#maybepromise)

**`See`**

[MatterApplicationClusterSpecificationV1_1](../interfaces/spec_export.MatterApplicationClusterSpecificationV1_1.md) § 5.2.4

#### Inherited from

[DoorLockBehavior](../interfaces/behavior_definitions_door_lock_export.DoorLockBehavior-1.md).[unlockDoor](../interfaces/behavior_definitions_door_lock_export.DoorLockBehavior-1.md#unlockdoor)

#### Defined in

[packages/matter.js/src/behavior/definitions/door-lock/DoorLockInterface.ts:144](https://github.com/project-chip/matter.js/blob/3adaded6/packages/matter.js/src/behavior/definitions/door-lock/DoorLockInterface.ts#L144)

___

### unlockWithTimeout

▸ **unlockWithTimeout**(`request`): [`MaybePromise`](../modules/util_export.md#maybepromise)

#### Parameters

| Name | Type |
| :------ | :------ |
| `request` | [`TypeFromFields`](../modules/tlv_export.md#typefromfields)\<\{ `pinCode`: [`OptionalFieldType`](../interfaces/tlv_export.OptionalFieldType.md)\<`Uint8Array`\> ; `timeout`: [`FieldType`](../interfaces/tlv_export.FieldType.md)\<`number`\>  }\> |

#### Returns

[`MaybePromise`](../modules/util_export.md#maybepromise)

**`See`**

[MatterApplicationClusterSpecificationV1_1](../interfaces/spec_export.MatterApplicationClusterSpecificationV1_1.md) § 5.2.4

#### Inherited from

[DoorLockBehavior](../interfaces/behavior_definitions_door_lock_export.DoorLockBehavior-1.md).[unlockWithTimeout](../interfaces/behavior_definitions_door_lock_export.DoorLockBehavior-1.md#unlockwithtimeout)

#### Defined in

[packages/matter.js/src/behavior/definitions/door-lock/DoorLockInterface.ts:149](https://github.com/project-chip/matter.js/blob/3adaded6/packages/matter.js/src/behavior/definitions/door-lock/DoorLockInterface.ts#L149)

___

### alter

▸ **alter**\<`This`, `AlterationsT`\>(`this`, `alterations`): [`Type`](../interfaces/behavior_cluster_export.ClusterBehavior.Type.md)\<[`WithAlterations`](../modules/cluster_export.ElementModifier.md#withalterations)\<`This`[``"cluster"``], `AlterationsT`\>, `This`, [`InterfaceOf`](../modules/behavior_cluster_export.ClusterInterface.md#interfaceof)\<`This`\>\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `This` | extends [`Type`](../interfaces/behavior_cluster_export.ClusterBehavior.Type.md)\<[`ClusterType`](../interfaces/cluster_export.ClusterType-1.md), [`Type`](../interfaces/behavior_export.Behavior.Type.md), [`ClusterInterface`](../modules/behavior_cluster_export.md#clusterinterface)\<{}\>\> |
| `AlterationsT` | extends [`Alterations`](../modules/cluster_export.ElementModifier.md#alterations)\<`This`[``"cluster"``]\> |

#### Parameters

| Name | Type |
| :------ | :------ |
| `this` | `This` |
| `alterations` | `AlterationsT` |

#### Returns

[`Type`](../interfaces/behavior_cluster_export.ClusterBehavior.Type.md)\<[`WithAlterations`](../modules/cluster_export.ElementModifier.md#withalterations)\<`This`[``"cluster"``], `AlterationsT`\>, `This`, [`InterfaceOf`](../modules/behavior_cluster_export.ClusterInterface.md#interfaceof)\<`This`\>\>

#### Inherited from

DoorLockBehavior.alter

#### Defined in

[packages/matter.js/src/behavior/cluster/ClusterBehavior.ts:233](https://github.com/project-chip/matter.js/blob/3adaded6/packages/matter.js/src/behavior/cluster/ClusterBehavior.ts#L233)

___

### enable

▸ **enable**\<`This`, `FlagsT`\>(`this`, `flags`): [`Type`](../interfaces/behavior_cluster_export.ClusterBehavior.Type.md)\<[`WithAlterations`](../modules/cluster_export.ElementModifier.md#withalterations)\<`This`[``"cluster"``], [`ElementFlagAlterations`](../modules/cluster_export.ElementModifier.md#elementflagalterations)\<`FlagsT`\>\>, `This`, [`InterfaceOf`](../modules/behavior_cluster_export.ClusterInterface.md#interfaceof)\<`This`\>\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `This` | extends [`Type`](../interfaces/behavior_cluster_export.ClusterBehavior.Type.md)\<[`ClusterType`](../interfaces/cluster_export.ClusterType-1.md), [`Type`](../interfaces/behavior_export.Behavior.Type.md), [`ClusterInterface`](../modules/behavior_cluster_export.md#clusterinterface)\<{}\>\> |
| `FlagsT` | extends [`ElementFlags`](../modules/cluster_export.ElementModifier.md#elementflags)\<`This`[``"cluster"``]\> |

#### Parameters

| Name | Type |
| :------ | :------ |
| `this` | `This` |
| `flags` | `FlagsT` |

#### Returns

[`Type`](../interfaces/behavior_cluster_export.ClusterBehavior.Type.md)\<[`WithAlterations`](../modules/cluster_export.ElementModifier.md#withalterations)\<`This`[``"cluster"``], [`ElementFlagAlterations`](../modules/cluster_export.ElementModifier.md#elementflagalterations)\<`FlagsT`\>\>, `This`, [`InterfaceOf`](../modules/behavior_cluster_export.ClusterInterface.md#interfaceof)\<`This`\>\>

#### Inherited from

DoorLockBehavior.enable

#### Defined in

[packages/matter.js/src/behavior/cluster/ClusterBehavior.ts:243](https://github.com/project-chip/matter.js/blob/3adaded6/packages/matter.js/src/behavior/cluster/ClusterBehavior.ts#L243)

___

### for

▸ **for**\<`This`, `ClusterT`\>(`this`, `cluster`, `schema?`): [`Type`](../interfaces/behavior_cluster_export.ClusterBehavior.Type.md)\<`ClusterT`, `This`, [`InterfaceOf`](../modules/behavior_cluster_export.ClusterInterface.md#interfaceof)\<`This`\>\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `This` | extends [`Type`](../interfaces/behavior_cluster_export.ClusterBehavior.Type.md)\<[`ClusterType`](../interfaces/cluster_export.ClusterType-1.md), [`Type`](../interfaces/behavior_export.Behavior.Type.md), [`ClusterInterface`](../modules/behavior_cluster_export.md#clusterinterface)\<{}\>\> |
| `ClusterT` | extends [`ClusterType`](../interfaces/cluster_export.ClusterType-1.md) |

#### Parameters

| Name | Type |
| :------ | :------ |
| `this` | `This` |
| `cluster` | `ClusterT` |
| `schema?` | [`Schema`](../modules/behavior_cluster_export._internal_.md#schema) |

#### Returns

[`Type`](../interfaces/behavior_cluster_export.ClusterBehavior.Type.md)\<`ClusterT`, `This`, [`InterfaceOf`](../modules/behavior_cluster_export.ClusterInterface.md#interfaceof)\<`This`\>\>

#### Inherited from

DoorLockBehavior.for

#### Defined in

[packages/matter.js/src/behavior/cluster/ClusterBehavior.ts:219](https://github.com/project-chip/matter.js/blob/3adaded6/packages/matter.js/src/behavior/cluster/ClusterBehavior.ts#L219)

___

### set

▸ **set**\<`This`\>(`this`, `defaults`): `This`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `This` | extends [`Type`](../interfaces/behavior_export.Behavior.Type.md) |

#### Parameters

| Name | Type |
| :------ | :------ |
| `this` | `This` |
| `defaults` | `Partial`\<[`RelaxTypes`](../modules/cluster_export.ClusterType.md#relaxtypes)\<`InstanceType`\<`This`[``"State"``]\>\>\> |

#### Returns

`This`

#### Inherited from

DoorLockBehavior.set

#### Defined in

[packages/matter.js/src/behavior/cluster/ClusterBehavior.ts:241](https://github.com/project-chip/matter.js/blob/3adaded6/packages/matter.js/src/behavior/cluster/ClusterBehavior.ts#L241)

___

### with

▸ **with**\<`This`, `FeaturesT`\>(`this`, `...features`): [`Type`](../interfaces/behavior_cluster_export.ClusterBehavior.Type.md)\<[`WithFeatures`](../modules/cluster_export.ClusterComposer.md#withfeatures)\<`This`[``"cluster"``], `FeaturesT`\>, `This`, [`InterfaceOf`](../modules/behavior_cluster_export.ClusterInterface.md#interfaceof)\<`This`\>\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `This` | extends [`Type`](../interfaces/behavior_cluster_export.ClusterBehavior.Type.md)\<[`ClusterType`](../interfaces/cluster_export.ClusterType-1.md), [`Type`](../interfaces/behavior_export.Behavior.Type.md), [`ClusterInterface`](../modules/behavior_cluster_export.md#clusterinterface)\<{}\>\> |
| `FeaturesT` | extends [`FeatureSelection`](../modules/cluster_export.ClusterComposer.md#featureselection)\<`This`[``"cluster"``]\> |

#### Parameters

| Name | Type |
| :------ | :------ |
| `this` | `This` |
| `...features` | `FeaturesT` |

#### Returns

[`Type`](../interfaces/behavior_cluster_export.ClusterBehavior.Type.md)\<[`WithFeatures`](../modules/cluster_export.ClusterComposer.md#withfeatures)\<`This`[``"cluster"``], `FeaturesT`\>, `This`, [`InterfaceOf`](../modules/behavior_cluster_export.ClusterInterface.md#interfaceof)\<`This`\>\>

#### Inherited from

DoorLockBehavior.with

#### Defined in

[packages/matter.js/src/behavior/cluster/ClusterBehavior.ts:225](https://github.com/project-chip/matter.js/blob/3adaded6/packages/matter.js/src/behavior/cluster/ClusterBehavior.ts#L225)