/**
 * @license
 * Copyright 2021 Frank Ballmeyer
 * This code is released under the MIT license.
 * SPDX-License-Identifier: MIT
 */

import { MetaAttachmentApi } from '@ballware/meta-interface';
import axios from 'axios';

const attachmentFetchFunc = (serviceBaseUrl: string) => (
  token: string,
  owner: string
): Promise<Array<Record<string, unknown>>> => {
  const url = `${serviceBaseUrl}api/file/all/${owner}`;

  return axios
    .get(url, { headers: { Authorization: `Bearer ${token}` } })
    .then(response => response.data);
};

const attachmentUploadFunc = (serviceBaseUrl: string) => (
  token: string,
  owner: string,
  file: File
): Promise<void> => {
  const url = `${serviceBaseUrl}api/file/upload/${owner}`;

  const formData = new FormData();

  formData.append('files[]', file);

  return axios.post(url, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
      Authorization: `Bearer ${token}`,
    },
  });
};

const attachmentOpenFunc = (serviceBaseUrl: string) => (
  _token: string,
  owner: string,
  fileName: string
): Promise<string> => {
  const url = `${serviceBaseUrl}api/file/byname/${owner}?file=${encodeURIComponent(
    fileName
  )}`;

  return Promise.resolve(url);
};

const attachmentDeleteFunc = (serviceBaseUrl: string) => (
  token: string,
  owner: string,
  fileName: string
): Promise<void> => {
  const url = `${serviceBaseUrl}api/file/byname/${owner}?file=${encodeURIComponent(
    fileName
  )}`;

  return axios.delete(url, { headers: { Authorization: `Bearer ${token}` } });
};

/**
 * Create adapter for attachment data operations with ballware.meta.service
 * @param serviceBaseUrl Base URL to connect to ballware.meta.service
 * @returns Adapter object providing data operations
 */
export function createMetaBackendAttachmentApi(
  serviceBaseUrl: string
): MetaAttachmentApi {
  return {
    queryByOwner: attachmentFetchFunc(serviceBaseUrl),
    upload: attachmentUploadFunc(serviceBaseUrl),
    open: attachmentOpenFunc(serviceBaseUrl),
    remove: attachmentDeleteFunc(serviceBaseUrl),
  } as MetaAttachmentApi;
}
