import { AxiosResponse } from 'axios';
import { httpClient } from '../instance';
import { IApplication, IApplicationDetailResponse, IApplicationListResponse, IApplicationType } from './models';

export interface IApplicationQuery {
  user_id?: string;
  offset?: number;
  limit?: number;
  type?: IApplicationType;
  api_id?: string;
  ordering?: string;
}

class ApplicationOperator {
  key = 'applications';

  async getAll(query: IApplicationQuery): Promise<AxiosResponse<IApplicationListResponse>> {
    return await httpClient.get(`/${this.key}/`, {
      params: query
    });
  }

  async get(id: string): Promise<AxiosResponse<IApplicationDetailResponse>> {
    return await httpClient.get(`/${this.key}/${id}`);
  }

  async create(data: IApplication): Promise<AxiosResponse<IApplicationDetailResponse>> {
    return await httpClient.post(`/${this.key}/`, data);
  }

  async update(id: string, data: IApplication): Promise<AxiosResponse<IApplicationDetailResponse>> {
    return await httpClient.put(`/${this.key}/${id}`, data);
  }

  async delete(id: string): Promise<AxiosResponse<null>> {
    return await httpClient.delete(`/${this.key}/${id}`);
  }

  async rotateCredential(id: string): Promise<AxiosResponse<IApplicationDetailResponse>> {
    return await httpClient.post(`/${this.key}/${id}/rotate-credential/`);
  }

  async updateRemainingAmount(id: string, data: IApplication): Promise<AxiosResponse<IApplicationDetailResponse>> {
    return await httpClient.post(`/${this.key}/${id}/update-remaining-amount/`, data);
  }
}

export const applicationOperator = new ApplicationOperator();
