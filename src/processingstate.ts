/**
 * @license
 * Copyright 2021 Frank Ballmeyer
 * This code is released under the MIT license.
 * SPDX-License-Identifier: MIT
 */

import { MetaProcessingstateApi } from '@ballware/meta-interface';
import axios from 'axios';

const selectListForEntity = (serviceBaseUrl: string) => (
  token: string,
  entity: string
): Promise<Array<Record<string, unknown>>> => {
  const url = `${serviceBaseUrl}api/processingstate/selectlistforentity/${entity}`;

  return axios
    .get<Array<Record<string, unknown>>>(url, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then(response => response.data);
};

const selectListAllowedForEntityAndIds = (serviceBaseUrl: string) => (
  token: string,
  entity: string,
  ids: Array<string>
): Promise<Array<Record<string, unknown>>> => {
  const url = `${serviceBaseUrl}api/processingstate/selectlistallowedsuccessorsforentities/${entity}?${ids
    .map(i => `id=${i}`)
    .join('&')}`;

  return axios
    .get<Array<Record<string, unknown>>>(url, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then(response => response.data);
};

const selectByStateForEntity = (serviceBaseUrl: string) => (
  token: string,
  entity: string
) => (state: number | string): Promise<Record<string, unknown>> => {
  const url = `${serviceBaseUrl}api/processingstate/selectbystateforentity/${entity}/${state}`;

  return axios
    .get<Record<string, unknown>>(url, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then(response => response.data);
};

/**
 * Create adapter for processing state fetch operations with ballware.meta.service
 * @param serviceBaseUrl Base URL to connect to ballware.meta.service
 * @returns Adapter object providing data operations
 */
export function createMetaBackendProcessingstateApi(
  serviceBaseUrl: string
): MetaProcessingstateApi {
  return {
    selectListForEntity: selectListForEntity(serviceBaseUrl),
    selectListAllowedForEntityAndIds: selectListAllowedForEntityAndIds(
      serviceBaseUrl
    ),
    selectByStateForEntity: selectByStateForEntity(serviceBaseUrl),
  } as MetaProcessingstateApi;
}
