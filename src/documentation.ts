import { MetaDocumentationApi } from '@ballware/meta-interface';
import axios from 'axios';

const loadDocumentationForEntity = (metaServiceBaseUrl: string) => (token: string, entity: string): Promise<unknown> => {
    const url = `${metaServiceBaseUrl}api/documentation/documentationforentity/${entity}`;

    return axios.get<Array<Record<string, unknown>>>(url, { headers: { 'Authorization': `Bearer ${token}` }}).then(response => response.data);
}

export function createMetaBackendDocumentationApi(metaServiceBaseUrl: string): MetaDocumentationApi {
    return {
        loadDocumentationForEntity: loadDocumentationForEntity(metaServiceBaseUrl),
    } as MetaDocumentationApi;
}