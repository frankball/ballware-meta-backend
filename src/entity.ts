import { MetaEntityApi, CompiledEntityMetadata, GridLayout, EditLayout, DocumentSelectEntry } from '@ballware/meta-interface';
import JSON5 from 'json5';
import axios from 'axios';

interface EntityMetadata {
    Application: string;
    Entity: string;
    DisplayName: string;
    BaseUrl: string;
    ItemMappingScript: string;
    ItemReverseMappingScript: string;
    Lookups: string;
    Picklists: string;
    CustomScripts?: string;
    CustomFunctions?: string;
    GridLayout: string;
    EditLayout: string;
    StateColumn: string;
  }

interface EntityCustomScripts {
    extendedRightsCheck?: string;
    rightsParamForHead?: string;
    rightsParamForItem?: string;
    prepareCustomParam?: string;
    prepareGridLayout?: string;
    prepareEditLayout?: string;
    editorPreparing?: string;
    editorInitialized?: string;
    editorValueChanged?: string;
    editorEntered?: string;
    editorEvent?: string;
    editorValidating?: string;
    detailGridCellPreparing?: string;
    detailGridRowValidating?: string;
    initNewDetailItem?: string;
    paramEditorInitialized?: string;
    paramEditorValueChanged?: string;
    paramEditorEvent?: string;
    prepareCustomFunction?: string;
    evaluateCustomFunction?: string;
}

const compileEntityMetadata = (metaData: EntityMetadata): CompiledEntityMetadata => {

    const compiledMetaData = {
      application: metaData.Application,
      entity: metaData.Entity,
      displayName: metaData.DisplayName,
      baseUrl: metaData.BaseUrl,
      stateColumn: metaData.StateColumn
    } as CompiledEntityMetadata;
  
    if (metaData.ItemMappingScript) {
      const compiledArgs = ['item', 'customParam', 'util'];
      const compiledFn = Function.apply(Function, compiledArgs.concat(metaData.ItemMappingScript));
  
      compiledMetaData.itemMappingScript = compiledFn ? (item, customParam, util) => compiledFn.apply(compiledFn, [item, customParam, util]) : null;
    }
  
    if (metaData.ItemReverseMappingScript) {
      const compiledArgs = ['item', 'customParam', 'util'];
      const compiledFn = Function.apply(Function, compiledArgs.concat(metaData.ItemReverseMappingScript));
  
      compiledMetaData.itemReverseMappingScript = compiledFn ? (item, customParam, util) => compiledFn.apply(compiledFn, [item, customParam, util]) : null;
    }
  
    if (metaData.GridLayout) {
      compiledMetaData.gridLayouts = JSON5.parse(metaData.GridLayout) as Array<GridLayout>;
    }
  
    if (metaData.EditLayout) {
      compiledMetaData.editLayouts = JSON5.parse(metaData.EditLayout) as Array<EditLayout>;
    }
  
    if (metaData.Lookups) {
      compiledMetaData.lookups = JSON5.parse(metaData.Lookups);
    }
  
    if (metaData.Picklists) {
      compiledMetaData.picklists = JSON5.parse(metaData.Picklists);
    }
  
    if (metaData.CustomFunctions) {
      compiledMetaData.customFunctions = JSON5.parse(metaData.CustomFunctions);
    }
  
    if (metaData.CustomScripts) {
      compiledMetaData.compiledCustomScripts = {};
  
      const customScripts = JSON5.parse(metaData.CustomScripts) as EntityCustomScripts;
  
      if (customScripts.extendedRightsCheck) {
        const compiledRightsCheckArgs = ['rights', 'entity', 'right', 'param', 'result'];
        const compiledRightsCheckFn = Function.apply(Function, compiledRightsCheckArgs.concat(customScripts.extendedRightsCheck));
  
        compiledMetaData.compiledCustomScripts.extendedRightsCheck = compiledRightsCheckFn ? (rights, entity, right, param, result) => compiledRightsCheckFn.apply(compiledRightsCheckFn, [rights, entity, right, param, result]) : null;
      }
  
      if (customScripts.rightsParamForHead) {
        const compiledArgs = ['customParam'];
        const compiledFn = Function.apply(Function, compiledArgs.concat(customScripts.rightsParamForHead));
  
        compiledMetaData.compiledCustomScripts.rightsParamForHead = compiledFn ? (customParam) => compiledFn.apply(compiledFn, [customParam]) : null;
      }
  
      if (customScripts.rightsParamForItem) {
        const compiledArgs = ['item', 'customParam'];
        const compiledFn = Function.apply(Function, compiledArgs.concat(customScripts.rightsParamForItem));
  
        compiledMetaData.compiledCustomScripts.rightsParamForItem = compiledFn ? (item, customParam) => compiledFn.apply(compiledFn, [item, customParam]) : null;
      }
  
      if (customScripts.prepareCustomParam) {
        const compiledArgs = ['lookups', 'util', 'callback'];
        const compiledFn = Function.apply(Function, compiledArgs.concat(customScripts.prepareCustomParam));
  
        compiledMetaData.compiledCustomScripts.prepareCustomParam = compiledFn ? (lookups, util, callback) => compiledFn.apply(compiledFn, [lookups, util, callback]) : null;
      }
  
      if (customScripts.prepareGridLayout) {
        const compiledArgs = ['lookups', 'customParam', 'util', 'gridLayout'];
        const compiledFn = Function.apply(Function, compiledArgs.concat(customScripts.prepareGridLayout));
  
        compiledMetaData.compiledCustomScripts.prepareGridLayout = compiledFn ? (lookups, customParam, util, gridLayout) => compiledFn.apply(compiledFn, [lookups, customParam, util, gridLayout]) : null;
      }
  
      if (customScripts.prepareEditLayout) {
        const compiledArgs = ['mode', 'lookups', 'customParam', 'util', 'editLayout'];
        const compiledFn = Function.apply(Function, compiledArgs.concat(customScripts.prepareEditLayout));
  
        compiledMetaData.compiledCustomScripts.prepareEditLayout = compiledFn ? (mode, lookups, customParam, util, editLayout) => compiledFn.apply(compiledFn, [mode, lookups, customParam, util, editLayout]) : null;
      }
  
      if (customScripts.editorPreparing) {
        const compiledEditorPreparingArgs = ['mode', 'item', 'layoutItem', 'identifier', 'lookups', 'util'];
        const compiledEditorPreparingFn = Function.apply(Function, compiledEditorPreparingArgs.concat(customScripts.editorPreparing));
  
        compiledMetaData.compiledCustomScripts.editorPreparing = compiledEditorPreparingFn ? (mode, item, layoutItem, identifier, lookups, util) => compiledEditorPreparingFn.apply(compiledEditorPreparingFn, [mode, item, layoutItem, identifier, lookups, util]) : null;
      }
  
      if (customScripts.editorInitialized) {
        const compiledEditorInitializedArgs = ['mode', 'item', 'editUtil', 'identifier', 'lookups', 'util'];
        const compiledEditorInitializedFn = Function.apply(Function, compiledEditorInitializedArgs.concat(customScripts.editorInitialized));
  
        compiledMetaData.compiledCustomScripts.editorInitialized = compiledEditorInitializedFn ? (mode, item, editUtil, identifier, lookups, util) => compiledEditorInitializedFn.apply(compiledEditorInitializedFn, [mode, item, editUtil, identifier, lookups, util]) : null;
      }
  
      if (customScripts.editorValueChanged) {
        const compiledArgs = ['item', 'editUtil', 'identifier', 'value', 'lookups', 'util'];
        const compiledFn = Function.apply(Function, compiledArgs.concat(customScripts.editorValueChanged));
  
        compiledMetaData.compiledCustomScripts.editorValueChanged = compiledFn ? (item, editUtil, identifier, value, lookups, util) => compiledFn.apply(compiledFn, [item, editUtil, identifier, value, lookups, util]) : null;
      }
  
      if (customScripts.editorEntered) {
        const compiledArgs = ['mode', 'item', 'editUtil', 'identifier', 'lookups', 'util'];
        const compiledFn = Function.apply(Function, compiledArgs.concat(customScripts.editorEntered));
  
        compiledMetaData.compiledCustomScripts.editorEntered = compiledFn ? (mode, item, editUtil, identifier, lookups, util) => compiledFn.apply(compiledFn, [mode, item, editUtil, identifier, lookups, util]) : null;
      }
  
      if (customScripts.editorEvent) {
        const compiledArgs = ['item', 'editUtil', 'identifier', 'event', 'lookups', 'util'];
        const compiledFn = Function.apply(Function, compiledArgs.concat(customScripts.editorEvent));
  
        compiledMetaData.compiledCustomScripts.editorEvent = compiledFn ? (item, editUtil, identifier, event, lookups, util) => compiledFn.apply(compiledFn, [item, editUtil, identifier, event, lookups, util]) : null;
      }
  
      if (customScripts.editorValidating) {
        const compiledArgs = ['item', 'editUtil', 'identifier', 'value', 'validation', 'lookups', 'util'];
        const compiledFn = Function.apply(Function, compiledArgs.concat(customScripts.editorValidating));
  
        compiledMetaData.compiledCustomScripts.editorValidating = compiledFn ? (item, editUtil, identifier, value, validation, lookups, util) => compiledFn.apply(compiledFn, [item, editUtil, identifier, value, validation, lookups, util]) : null;
      }
  
      if (customScripts.detailGridCellPreparing) {
        const compiledArgs = ['mode', 'item', 'detailItem', 'identifier', 'options', 'util'];
        const compiledFn = Function.apply(Function, compiledArgs.concat(customScripts.detailGridCellPreparing));
  
        compiledMetaData.compiledCustomScripts.detailGridCellPreparing = compiledFn ? (mode, item, detailItem, identifier, options, util) => compiledFn.apply(compiledFn, [mode, item, detailItem, identifier, options, util]) : null;
      }
  
      if (customScripts.detailGridRowValidating) {
        const compiledArgs = ['mode', 'item', 'detailItem', 'identifier', 'util'];
        const compiledFn = Function.apply(Function, compiledArgs.concat(customScripts.detailGridRowValidating));
  
        compiledMetaData.compiledCustomScripts.detailGridRowValidating = compiledFn ? (mode, item, detailItem, identifier, util) => compiledFn.apply(compiledFn, [mode, item, detailItem, identifier, util]) : null;
      }
  
      if (customScripts.initNewDetailItem) {
        const compiledArgs = ['dataMember', 'item', 'detailItem', 'util'];
        const compiledFn = Function.apply(Function, compiledArgs.concat(customScripts.initNewDetailItem));
  
        compiledMetaData.compiledCustomScripts.initNewDetailItem = compiledFn ? (dataMember, item, detailItem, util) => compiledFn.apply(compiledFn, [dataMember, item, detailItem, util]) : null;
      }
  
      if (customScripts.paramEditorInitialized) {
        const compiledArgs = ['name', 'editUtil', 'lookups', 'util', 'actions'];
        const compiledFn = Function.apply(Function, compiledArgs.concat(customScripts.paramEditorInitialized));
  
        compiledMetaData.compiledCustomScripts.paramEditorInitialized = compiledFn ? (name, editUtil, lookups, util, actions) => compiledFn.apply(compiledFn, [name, editUtil, lookups, util, actions]) : null;
      }
  
      if (customScripts.paramEditorValueChanged) {
        const compiledArgs = ['name', 'value', 'editUtil', 'lookups', 'util', 'actions'];
        const compiledFn = Function.apply(Function, compiledArgs.concat(customScripts.paramEditorValueChanged));
  
        compiledMetaData.compiledCustomScripts.paramEditorValueChanged = compiledFn ? (name, value, editUtil, lookups, util, actions) => compiledFn.apply(compiledFn, [name, value, editUtil, lookups, util, actions]) : null;
      }
  
      if (customScripts.paramEditorEvent) {
        const compiledArgs = ['name', 'event', 'editUtil', 'lookups', 'util', 'actions', 'param'];
        const compiledFn = Function.apply(Function, compiledArgs.concat(customScripts.paramEditorEvent));
  
        compiledMetaData.compiledCustomScripts.paramEditorEvent = compiledFn ? (name, event, editUtil, lookups, util, actions, param) => compiledFn.apply(compiledFn, [name, event, editUtil, lookups, util, actions, param]) : null;
      }
  
      if (customScripts.prepareCustomFunction) {
  
        const compiledArgs = ['identifier', 'lookups', 'util', 'executeCallback', 'messageCallback', 'selection'];
        const compiledFn = Function.apply(Function, compiledArgs.concat(customScripts.prepareCustomFunction));
  
        compiledMetaData.compiledCustomScripts.prepareCustomFunction = compiledFn ? (identifier, lookups, util, executeCallback, messageCallback, selection) => compiledFn.apply(compiledFn, [identifier, lookups, util, executeCallback, messageCallback, selection]) : null;
      }
  
      if (customScripts.evaluateCustomFunction) {
  
        const compiledArgs = ['identifier', 'lookups', 'util', 'param', 'executeCallback', 'messageCallback'];
        const compiledFn = Function.apply(Function, compiledArgs.concat(customScripts.evaluateCustomFunction));
  
        compiledMetaData.compiledCustomScripts.evaluateCustomFunction = compiledFn ? (identifier, lookups, util, param, executeCallback, messageCallback) => compiledFn.apply(compiledFn, [identifier, lookups, util, param, executeCallback, messageCallback]) : null;
      }
    }
  
    return compiledMetaData;
}


const metadataFunc = (serviceBaseUrl: string) => (token: string, entity: string): Promise<CompiledEntityMetadata> => {
    const url = `${serviceBaseUrl}api/entity/metadataforentity/${entity}`;

    return axios.get<EntityMetadata>(url, { headers: { 'Authorization': `Bearer ${token}` }}).then(response => compileEntityMetadata(response.data));
}

const documentsForEntityFunc = (serviceBaseUrl: string) => (token: string, entity: string): Promise<Array<DocumentSelectEntry>> => {
    
    const url = `${serviceBaseUrl}api/document/selectlistdocumentsforentity/${entity}`;

    return axios.get<Array<DocumentSelectEntry>>(url, { headers: { 'Authorization': `Bearer ${token}` }}).then(response => response.data);
}

export function createMetaBackendEntityApi(serviceBaseUrl: string): MetaEntityApi {
    return {
        metadataForEntity: metadataFunc(serviceBaseUrl),
        documentsForEntity: documentsForEntityFunc(serviceBaseUrl)
    } as MetaEntityApi;
}