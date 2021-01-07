import { MetaLookupApi } from '@ballware/meta-interface';
import axios from 'axios';

const selectListForLookupFunc = (serviceBaseUrl: string) => (
  token: string,
  lookupId: string
): Promise<Array<Record<string, unknown>>> => {
  const url = `${serviceBaseUrl}api/lookup/selectlistforlookup/${lookupId}`;

  return axios
    .get<Array<Record<string, unknown>>>(url, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then(response => response.data);
};

const selectByIdForLookupFunc = (serviceBaseUrl: string) => (
  token: string,
  lookupId: string
) => (id: string): Promise<Record<string, unknown>> => {
  const url = `${serviceBaseUrl}api/lookup/selectbyidforlookup/${lookupId}/${id}`;

  return axios
    .get<Record<string, unknown>>(url, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then(response => response.data);
};

const selectListForLookupIdentifierFunc = (serviceBaseUrl: string) => (
  token: string,
  identifier: string
): Promise<Array<Record<string, unknown>>> => {
  const url = `${serviceBaseUrl}api/lookup/selectlistforlookupidentifier/${identifier}`;

  return axios
    .get<Array<Record<string, unknown>>>(url, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then(response => response.data);
};

const selectByIdForLookupIdentifierFunc = (serviceBaseUrl: string) => (
  token: string,
  identifier: string
) => (id: string): Promise<Record<string, unknown>> => {
  const url = `${serviceBaseUrl}api/lookup/selectbyidforlookupidentifier/${identifier}/${id}`;

  return axios
    .get<Record<string, unknown>>(url, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then(response => response.data);
};

const selectListForLookupWithParamFunc = (serviceBaseUrl: string) => (
  token: string,
  lookupId: string,
  param: unknown
): Promise<Array<Record<string, unknown>>> => {
  const url = `${serviceBaseUrl}api/lookup/selectlistforlookupwithparam/${lookupId}/${param}`;

  return axios
    .get<Array<Record<string, unknown>>>(url, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then(response => response.data);
};

const selectByIdForLookupWithParamFunc = (serviceBaseUrl: string) => (
  token: string,
  lookupId: string,
  param: unknown
) => (id: string): Promise<Record<string, unknown>> => {
  const url = `${serviceBaseUrl}api/lookup/selectbyidforlookupwithparam/${lookupId}/${param}/${id}`;

  return axios
    .get<Record<string, unknown>>(url, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then(response => response.data);
};

const autoCompleteForLookupFunc = (serviceBaseUrl: string) => (
  token: string,
  lookupId: string
): Promise<Array<unknown>> => {
  const url = `${serviceBaseUrl}api/lookup/autocompleteforlookup/${lookupId}`;

  return axios
    .get<Array<unknown>>(url, { headers: { Authorization: `Bearer ${token}` } })
    .then(response => response.data);
};

const autoCompleteForLookupWithParamFunc = (serviceBaseUrl: string) => (
  token: string,
  lookupId: string,
  param: unknown
): Promise<Array<unknown>> => {
  const url = `${serviceBaseUrl}api/lookup/autocompleteforlookupwithparam/${lookupId}/${param}`;

  return axios
    .get<Array<unknown>>(url, { headers: { Authorization: `Bearer ${token}` } })
    .then(response => response.data);
};

export function createMetaBackendLookupApi(
  serviceBaseUrl: string
): MetaLookupApi {
  return {
    selectListForLookup: selectListForLookupFunc(serviceBaseUrl),
    selectByIdForLookup: selectByIdForLookupFunc(serviceBaseUrl),
    selectListForLookupIdentifier: selectListForLookupIdentifierFunc(
      serviceBaseUrl
    ),
    selectByIdForLookupIdentifier: selectByIdForLookupIdentifierFunc(
      serviceBaseUrl
    ),
    selectListForLookupWithParam: selectListForLookupWithParamFunc(
      serviceBaseUrl
    ),
    selectByIdForLookupWithParam: selectByIdForLookupWithParamFunc(
      serviceBaseUrl
    ),
    autoCompleteForLookup: autoCompleteForLookupFunc(serviceBaseUrl),
    autoCompleteForLookupWithParam: autoCompleteForLookupWithParamFunc(
      serviceBaseUrl
    ),
  } as MetaLookupApi;
}
