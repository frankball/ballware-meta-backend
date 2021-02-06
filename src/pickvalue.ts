/**
 * @license
 * Copyright 2021 Frank Ballmeyer
 * This code is released under the MIT license.
 * SPDX-License-Identifier: MIT
 */

import { MetaPickvalueApi } from '@ballware/meta-interface';
import axios from 'axios';

const selectListForEntityAndField = (serviceBaseUrl: string) => (
  token: string,
  entity: string,
  field: string
): Promise<Array<Record<string, unknown>>> => {
  const url = `${serviceBaseUrl}api/pickvalue/selectlistforentityandfield/${entity}/${field}`;

  return axios
    .get<Array<Record<string, unknown>>>(url, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then(response => response.data);
};

const selectByValueForEntityAndField = (serviceBaseUrl: string) => (
  token: string,
  entity: string,
  field: string
) => (value: number | string): Promise<Record<string, unknown>> => {
  const url = `${serviceBaseUrl}api/pickvalue/selectbyvalueforentityandfield/${entity}/${field}/${value}`;

  return axios
    .get<Record<string, unknown>>(url, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then(response => response.data);
};

/**
 * Create adapter for pickvalue fetch operations with ballware.meta.service
 * @param serviceBaseUrl Base URL to connect to ballware.meta.service
 * @returns Adapter object providing data operations
 */
export function createMetaBackendPickvalueApi(
  serviceBaseUrl: string
): MetaPickvalueApi {
  return {
    selectListForEntityAndField: selectListForEntityAndField(serviceBaseUrl),
    selectByValueForEntityAndField: selectByValueForEntityAndField(
      serviceBaseUrl
    ),
  } as MetaPickvalueApi;
}
