import { MetaTenantApi, CompiledTenant, NavigationLayout } from '@ballware/meta-interface';
import JSON5 from 'json5';
import axios from 'axios';

interface Tenant {
    Id: string;
    Name: string;
    Navigation?: string;
    RightsCheckScript?: string;
}

const compileTenant = (tenant: Tenant): CompiledTenant => {
    const compiledTenant = {
      id: tenant.Id,
      name: tenant.Name,
      navigation: tenant.Navigation ? JSON5.parse(tenant.Navigation) as NavigationLayout : {} as NavigationLayout,
  
    } as CompiledTenant;
  
    if (tenant.RightsCheckScript) {
      const compiledArgs = ['rights', 'page'];
      const compiledFn = Function.apply(Function, compiledArgs.concat(tenant.RightsCheckScript));
  
      compiledTenant.pageVisible = compiledFn ? (rights, page) => compiledFn.apply(compiledFn, [rights, page]) : null;
    }
  
    return compiledTenant;
}

const metadataFunc = (serviceBaseUrl: string) => (token: string, tenant: string): Promise<CompiledTenant> => {
    const url = `${serviceBaseUrl}api/tenant/metadatafortenant/${tenant}`;

    return axios.get<Tenant>(url, { headers: { 'Authorization': `Bearer ${token}` }}).then(response => compileTenant(response.data));
}

export function createMetaBackendTenantApi(serviceBaseUrl: string): MetaTenantApi {
    return {
        metadataForTenant: metadataFunc(serviceBaseUrl)
    } as MetaTenantApi;
}