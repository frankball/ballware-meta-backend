import { MetaGenericEntityApi, CrudItem } from '@ballware/meta-interface';
import { paramsToUrl } from './util';
import axios from 'axios';

const queryFunc = (baseUrl: string) => (token: string, query: string, params?: object): Promise<Array<CrudItem>> => {

    const queryParams = paramsToUrl(params);

    const url = queryParams ? `${baseUrl}/query/${query}${queryParams}` : `${baseUrl}/all/${query}`;

    return axios.get(url, { headers: { 'Authorization': `Bearer ${token}` }}).then(response => response.data);
}

const byIdFunc = (baseUrl: string) => (token: string, id: string): Promise<CrudItem> => {

    const url = `${baseUrl}/byId/${id}`;

    return axios.get(url, { headers: { 'Authorization': `Bearer ${token}` }}).then(response => response.data);
}

const newFunc = (baseUrl: string) => (token: string, params?: object): Promise<CrudItem> => {

    const queryParams = paramsToUrl(params);

    const url = queryParams ? `${baseUrl}/newquery${queryParams}` : `${baseUrl}/new`;

    return axios.get(url, { headers: { 'Authorization': `Bearer ${token}` }}).then(response => response.data);
}

const saveFunc = (baseUrl: string) => (token: string, item: object): Promise<void> => {
    
    const url = `${baseUrl}/save`;

    return axios.post(url, JSON.stringify(item), { headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` }});
}

const saveBatchFunc = (baseUrl: string) => (token: string, items: object[]): Promise<void> => {
    
    const url = `${baseUrl}/savebatch`;

    return axios.post(url, JSON.stringify(items), { headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` }});
}

const removeFunc = (baseUrl: string) => (token: string, id: string): Promise<void> => {
   
    const url = `${baseUrl}/remove/${id}`;

    return axios.delete(url, { headers: { 'Authorization': `Bearer ${token}` }});
}

export function createMetaBackendGenericEntityApi(entityBaseUrl: string): MetaGenericEntityApi {
    return {
        entityQuery: queryFunc(entityBaseUrl),
        entityById: byIdFunc(entityBaseUrl),
        entityNew: newFunc(entityBaseUrl),
        entitySave: saveFunc(entityBaseUrl),
        entitySaveBatch: saveBatchFunc(entityBaseUrl),
        entityRemove: removeFunc(entityBaseUrl)        
    } as MetaGenericEntityApi;
}