/**
 * @license
 * Copyright 2021 Frank Ballmeyer
 * This code is released under the MIT license.
 * SPDX-License-Identifier: MIT
 */

import { MetaDocumentationApi } from '@ballware/meta-interface';
import axios from 'axios';

const loadDocumentationForEntity = (metaServiceBaseUrl: string) => (
  token: string,
  entity: string
): Promise<unknown> => {
  const url = `${metaServiceBaseUrl}api/documentation/documentationforentity/${entity}`;

  return axios
    .get<Array<Record<string, unknown>>>(url, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then(response => response.data);
};

/**
 * Create adapter for documentation data operations with ballware.meta.service
 * @param serviceBaseUrl Base URL to connect to ballware.meta.service
 * @returns Adapter object providing data operations
 */
export function createMetaBackendDocumentationApi(
  metaServiceBaseUrl: string
): MetaDocumentationApi {
  return {
    loadDocumentationForEntity: loadDocumentationForEntity(metaServiceBaseUrl),
  } as MetaDocumentationApi;
}
