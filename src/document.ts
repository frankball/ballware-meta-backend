import { MetaDocumentApi, DocumentSelectEntry } from '@ballware/meta-interface';
import axios from 'axios';

const selectListPrintDocumentsForEntity = (metaServiceBaseUrl: string) => (
  token: string,
  entity: string
): Promise<Array<DocumentSelectEntry>> => {
  const url = `${metaServiceBaseUrl}api/document/selectlistdocumentsforentity/${entity}`;

  return axios
    .get<Array<DocumentSelectEntry>>(url, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then(response => response.data);
};

const viewerUrl = (documentServiceBaseUrl: string) => (
  token: string,
  search: string
): Promise<string> => {
  const url = `${documentServiceBaseUrl}viewer?token=${encodeURIComponent(
    token
  )}&${search}`;

  return Promise.resolve(url);
};

export function createMetaBackendDocumentApi(
  metaServiceBaseUrl: string,
  documentServiceBaseUrl: string
): MetaDocumentApi {
  return {
    selectListPrintDocumentsForEntity: selectListPrintDocumentsForEntity(
      metaServiceBaseUrl
    ),
    viewerUrl: viewerUrl(documentServiceBaseUrl),
  } as MetaDocumentApi;
}
