import { MetaAttachmentApi } from '@ballware/meta-interface';
import axios from 'axios';

const attachmentFetchFunc = (serviceBaseUrl: string) => (token: string, owner: string): Promise<Array<Record<string, unknown>>> => {
    const url = `${serviceBaseUrl}api/file/all/${owner}`;

    return axios.get(url, { headers: { 'Authorization': `Bearer ${token}` }}).then(response => response.data);
}

const attachmentUploadFunc = (serviceBaseUrl: string) => (token: string, owner: string, file: File): Promise<void> => {
    const url = `${serviceBaseUrl}api/file/upload/${owner}`;

    const formData = new FormData();

    formData.append("files[]", file);

    return axios.post(url, formData, { headers: { 'Content-Type': 'multipart/form-data', 'Authorization': `Bearer ${token}` }});
}

const attachmentOpenFunc = (serviceBaseUrl: string) => (token: string, owner: string, fileName: string): Promise<string> => {
    const url = `${serviceBaseUrl}api/file/byname/${owner}?file=${encodeURIComponent(fileName)}`;

    return Promise.resolve(url);
}

const attachmentDeleteFunc = (serviceBaseUrl: string) => (token: string, owner: string, fileName: string): Promise<void> => {
    const url = `${serviceBaseUrl}api/file/byname/${owner}?file=${encodeURIComponent(fileName)}`;

    return axios.delete(url, { headers: { 'Authorization': `Bearer ${token}` }});
}

export function createMetaBackendAttachmentApi(serviceBaseUrl: string): MetaAttachmentApi {
    return {
        attachmentFetch: attachmentFetchFunc(serviceBaseUrl),
        attachmentUpload: attachmentUploadFunc(serviceBaseUrl),
        attachmentOpen: attachmentOpenFunc(serviceBaseUrl),
        attachmentDelete: attachmentDeleteFunc(serviceBaseUrl)
    } as MetaAttachmentApi;
}