import axios from "axios";
import type { Product, Application, CreateApplication, PartialApplication, ApiError } from "../types";

const BASE_URL = 'https://nesto-fe-exam.vercel.app/api';
const DEFAULT_HEADERS = {
  Accept: 'application/json',
  'Content-Type': 'application/json',
  'X-Nesto-Candidat': 'MoeTafti',
};
const DEFAULT_TIMEOUT = 25000;

async function genericApiCall<T>(method: 'get' | 'post' | 'put', path: string, data?: any): Promise<T> {
  try {
    const url = `${BASE_URL}${path}`;
    const response = await axios.request<T>({
      method,
      url,
      data,
      headers: DEFAULT_HEADERS,
      timeout: DEFAULT_TIMEOUT,
    });
    return response.data;
  } catch (err) {
    const error = err as ApiError | { message?: string };
    throw new Error(error?.message ?? 'API call failed');
  }
}

export const getProducts = (): Promise<Product[]> => genericApiCall<Product[]>('get', '/products');

export const createApplication = (body: CreateApplication): Promise<Application> =>
  genericApiCall<Application>('post', '/applications', body);

export const getApplications = (): Promise<Application[]> => genericApiCall<Application[]>('get', '/applications');

export const getApplicationById = (id: string): Promise<Application> =>
  genericApiCall<Application>('get', `/applications/${id}`);

export const updateApplication = (id: string, body: PartialApplication): Promise<Application> =>
  genericApiCall<Application>('put', `/applications/${id}`, body);