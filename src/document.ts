/**
 * @license
 * Copyright 2021 Frank Ballmeyer
 * This code is released under the MIT license.
 * SPDX-License-Identifier: MIT
 */

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

/**
 * Create adapter for document data operations with ballware.meta.service
 * @param serviceBaseUrl Base URL to connect to ballware.meta.service
 * @returns Adapter object providing data operations
 */
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
