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
