/**
 * @license
 * Copyright 2021 Frank Ballmeyer
 * This code is released under the MIT license.
 * SPDX-License-Identifier: MIT
 */

import { MetaGenericEntityApi, CrudItem, QueryParams } from '@ballware/meta-interface';
import { paramsToUrl } from './util';
import axios from 'axios';

const queryFunc = (baseUrl: string) => (
  token: string,
  query: string,
  params?: QueryParams
): Promise<Array<CrudItem>> => {
  const queryParams = params ? paramsToUrl(params) : undefined;

  const url = queryParams
    ? `${baseUrl}/query/${query}${queryParams}`
    : `${baseUrl}/all/${query}`;

  return axios
    .get(url, { headers: { Authorization: `Bearer ${token}` } })
    .then(response => response.data);
};

const byIdFunc = (baseUrl: string) => (
  token: string,
  id: string
): Promise<CrudItem> => {
  const url = `${baseUrl}/byId/${id}`;

  return axios
    .get(url, { headers: { Authorization: `Bearer ${token}` } })
    .then(response => response.data);
};

const newFunc = (baseUrl: string) => (
  token: string,
  params?: QueryParams
): Promise<CrudItem> => {
  const queryParams = params ? paramsToUrl(params) : undefined;

  const url = queryParams
    ? `${baseUrl}/newquery${queryParams}`
    : `${baseUrl}/new`;

  return axios
    .get(url, { headers: { Authorization: `Bearer ${token}` } })
    .then(response => response.data);
};

const saveFunc = (baseUrl: string) => (
  token: string,
  item: object
): Promise<void> => {
  const url = `${baseUrl}/save`;

  return axios.post(url, JSON.stringify(item), {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });
};

const saveBatchFunc = (baseUrl: string) => (
  token: string,
  items: object[]
): Promise<void> => {
  const url = `${baseUrl}/savebatch`;

  return axios.post(url, JSON.stringify(items), {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });
};

const removeFunc = (baseUrl: string) => (
  token: string,
  id: string
): Promise<void> => {
  const url = `${baseUrl}/remove/${id}`;

  return axios.delete(url, { headers: { Authorization: `Bearer ${token}` } });
};

/**
 * Create adapter for generic entity data operations with ballware.meta.service
 * @param serviceBaseUrl Base URL to connect to ballware.meta.service
 * @returns Adapter object providing data operations
 */
export function createMetaBackendGenericEntityApi(
  entityBaseUrl: string
): MetaGenericEntityApi {
  return {
    query: queryFunc(entityBaseUrl),
    byId: byIdFunc(entityBaseUrl),
    new: newFunc(entityBaseUrl),
    save: saveFunc(entityBaseUrl),
    saveBatch: saveBatchFunc(entityBaseUrl),
    drop: removeFunc(entityBaseUrl),
  } as MetaGenericEntityApi;
}
