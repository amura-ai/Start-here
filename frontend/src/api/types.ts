export interface IAdminAccessResponse {
  isAdmin: boolean;
  userId: string;
}

export interface IServiceInfo {
  service_id: string;
  service_name: string;
}

export interface ITenantServices {
  tenant_id: string;
  tenant_name: string;
  services: IServiceInfo[];
}

export interface IGetServicesByUserResponse {
  tenants: ITenantServices[];
}

export interface ISelectedService {
  tenant_id: string;
  tenant_name: string;
  service_id: string;
  service_name: string;
}
