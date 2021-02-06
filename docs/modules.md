[@ballware/meta-backend](README.md) / Exports

# @ballware/meta-backend

## Table of contents

### Functions

- [compileStatistic](modules.md#compilestatistic)
- [createMetaBackendAttachmentApi](modules.md#createmetabackendattachmentapi)
- [createMetaBackendDocumentApi](modules.md#createmetabackenddocumentapi)
- [createMetaBackendDocumentationApi](modules.md#createmetabackenddocumentationapi)
- [createMetaBackendEntityApi](modules.md#createmetabackendentityapi)
- [createMetaBackendGenericEntityApi](modules.md#createmetabackendgenericentityapi)
- [createMetaBackendLookupApi](modules.md#createmetabackendlookupapi)
- [createMetaBackendPageApi](modules.md#createmetabackendpageapi)
- [createMetaBackendPickvalueApi](modules.md#createmetabackendpickvalueapi)
- [createMetaBackendProcessingstateApi](modules.md#createmetabackendprocessingstateapi)
- [createMetaBackendStatisticApi](modules.md#createmetabackendstatisticapi)
- [createMetaBackendTenantApi](modules.md#createmetabackendtenantapi)

## Functions

### compileStatistic

▸ `Const`**compileStatistic**(`statistic`: Statistic): CompiledStatistic

#### Parameters:

Name | Type |
------ | ------ |
`statistic` | Statistic |

**Returns:** CompiledStatistic

Defined in: [statistic.ts:33](https://github.com/frankball/ballware-meta-backend/blob/d4d3151/src/statistic.ts#L33)

___

### createMetaBackendAttachmentApi

▸ **createMetaBackendAttachmentApi**(`serviceBaseUrl`: *string*): MetaAttachmentApi

Create adapter for attachment data operations with ballware.meta.service

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`serviceBaseUrl` | *string* | Base URL to connect to ballware.meta.service   |

**Returns:** MetaAttachmentApi

Adapter object providing data operations

Defined in: [attachment.ts:70](https://github.com/frankball/ballware-meta-backend/blob/d4d3151/src/attachment.ts#L70)

___

### createMetaBackendDocumentApi

▸ **createMetaBackendDocumentApi**(`metaServiceBaseUrl`: *string*, `documentServiceBaseUrl`: *string*): MetaDocumentApi

Create adapter for document data operations with ballware.meta.service

#### Parameters:

Name | Type |
------ | ------ |
`metaServiceBaseUrl` | *string* |
`documentServiceBaseUrl` | *string* |

**Returns:** MetaDocumentApi

Adapter object providing data operations

Defined in: [document.ts:40](https://github.com/frankball/ballware-meta-backend/blob/d4d3151/src/document.ts#L40)

___

### createMetaBackendDocumentationApi

▸ **createMetaBackendDocumentationApi**(`metaServiceBaseUrl`: *string*): MetaDocumentationApi

Create adapter for documentation data operations with ballware.meta.service

#### Parameters:

Name | Type |
------ | ------ |
`metaServiceBaseUrl` | *string* |

**Returns:** MetaDocumentationApi

Adapter object providing data operations

Defined in: [documentation.ts:29](https://github.com/frankball/ballware-meta-backend/blob/d4d3151/src/documentation.ts#L29)

___

### createMetaBackendEntityApi

▸ **createMetaBackendEntityApi**(`serviceBaseUrl`: *string*): MetaEntityApi

Create adapter for entity metadata operations with ballware.meta.service

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`serviceBaseUrl` | *string* | Base URL to connect to ballware.meta.service   |

**Returns:** MetaEntityApi

Adapter object providing data operations

Defined in: [entity.ts:552](https://github.com/frankball/ballware-meta-backend/blob/d4d3151/src/entity.ts#L552)

___

### createMetaBackendGenericEntityApi

▸ **createMetaBackendGenericEntityApi**(`entityBaseUrl`: *string*): MetaGenericEntityApi

Create adapter for generic entity data operations with ballware.meta.service

#### Parameters:

Name | Type |
------ | ------ |
`entityBaseUrl` | *string* |

**Returns:** MetaGenericEntityApi

Adapter object providing data operations

Defined in: [genericentity.ts:96](https://github.com/frankball/ballware-meta-backend/blob/d4d3151/src/genericentity.ts#L96)

___

### createMetaBackendLookupApi

▸ **createMetaBackendLookupApi**(`serviceBaseUrl`: *string*): MetaLookupApi

Create adapter for lookup fetch operations with ballware.meta.service

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`serviceBaseUrl` | *string* | Base URL to connect to ballware.meta.service   |

**Returns:** MetaLookupApi

Adapter object providing data operations

Defined in: [lookup.ts:119](https://github.com/frankball/ballware-meta-backend/blob/d4d3151/src/lookup.ts#L119)

___

### createMetaBackendPageApi

▸ **createMetaBackendPageApi**(`metaServiceBaseUrl`: *string*): MetaPageApi

Create adapter for page fetch operations with ballware.meta.service

#### Parameters:

Name | Type |
------ | ------ |
`metaServiceBaseUrl` | *string* |

**Returns:** MetaPageApi

Adapter object providing data operations

Defined in: [page.ts:191](https://github.com/frankball/ballware-meta-backend/blob/d4d3151/src/page.ts#L191)

___

### createMetaBackendPickvalueApi

▸ **createMetaBackendPickvalueApi**(`serviceBaseUrl`: *string*): MetaPickvalueApi

Create adapter for pickvalue fetch operations with ballware.meta.service

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`serviceBaseUrl` | *string* | Base URL to connect to ballware.meta.service   |

**Returns:** MetaPickvalueApi

Adapter object providing data operations

Defined in: [pickvalue.ts:44](https://github.com/frankball/ballware-meta-backend/blob/d4d3151/src/pickvalue.ts#L44)

___

### createMetaBackendProcessingstateApi

▸ **createMetaBackendProcessingstateApi**(`serviceBaseUrl`: *string*): MetaProcessingstateApi

Create adapter for processing state fetch operations with ballware.meta.service

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`serviceBaseUrl` | *string* | Base URL to connect to ballware.meta.service   |

**Returns:** MetaProcessingstateApi

Adapter object providing data operations

Defined in: [processingstate.ts:58](https://github.com/frankball/ballware-meta-backend/blob/d4d3151/src/processingstate.ts#L58)

___

### createMetaBackendStatisticApi

▸ **createMetaBackendStatisticApi**(`serviceBaseUrl`: *string*): MetaStatisticApi

Create adapter for statistic fetch operations with ballware.meta.service

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`serviceBaseUrl` | *string* | Base URL to connect to ballware.meta.service   |

**Returns:** MetaStatisticApi

Adapter object providing data operations

Defined in: [statistic.ts:135](https://github.com/frankball/ballware-meta-backend/blob/d4d3151/src/statistic.ts#L135)

___

### createMetaBackendTenantApi

▸ **createMetaBackendTenantApi**(`serviceBaseUrl`: *string*): MetaTenantApi

Create adapter for tenant fetch operations with ballware.meta.service

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`serviceBaseUrl` | *string* | Base URL to connect to ballware.meta.service   |

**Returns:** MetaTenantApi

Adapter object providing data operations

Defined in: [tenant.ts:63](https://github.com/frankball/ballware-meta-backend/blob/d4d3151/src/tenant.ts#L63)
