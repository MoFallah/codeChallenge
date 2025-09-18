import axios from 'axios';
import {
  getProducts,
  createApplication,
  getApplications,
  getApplicationById,
  updateApplication,
} from './apis';

vi.mock('axios');

const BASE_URL = 'https://nesto-fe-exam.vercel.app/api';
const DEFAULT_HEADERS = {
  Accept: 'application/json',
  'Content-Type': 'application/json',
  'X-Nesto-Candidat': 'MoeTafti',
};
const DEFAULT_TIMEOUT = 25000;

let mockRequest: any;

beforeEach(() => {
  vi.clearAllMocks();
  mockRequest = vi.fn();
  (axios as any).request = mockRequest;
});

describe('Apis unit tests', () => {

  it('genericApiCall returns response.data on success', async () => {
    mockRequest.mockResolvedValue({ data: 'success' });
    const res = await getProducts();
    expect(res).toBe('success');
  });

  it('getProducts calls axios.request with correct args and returns data', async () => {
    const payload = [{ id: 1, name: 'Moe', type: 'FIXED', bestRate: 2.01 }];
    mockRequest.mockResolvedValue({ data: payload });

    const res = await getProducts();
    expect(res).toEqual(payload);
    expect(mockRequest).toHaveBeenCalledWith({
      method: 'get',
      url: `${BASE_URL}/products`,
      data: undefined,
      headers: DEFAULT_HEADERS,
      timeout: DEFAULT_TIMEOUT,
    });
  });

  it('createApplication posts body and returns created application', async () => {
    const app = { id: 'abc1234', type: 'NEW', applicants: [], createdAt: '17-09-2025' };
    mockRequest.mockResolvedValue({ data: app });

    const body = { productId: 12345 };
    const res = await createApplication(body as any);
    expect(res).toEqual(app);
    expect(mockRequest).toHaveBeenCalledWith({
      method: 'post',
      url: `${BASE_URL}/applications`,
      data: body,
      headers: DEFAULT_HEADERS,
      timeout: DEFAULT_TIMEOUT,
    });
  });

  it('getApplications calls axios.request and returns list', async () => {
    mockRequest.mockResolvedValue({ data: [] });
    const res = await getApplications();
    expect(res).toEqual([]);
    expect(mockRequest).toHaveBeenCalledWith({
      method: 'get',
      url: `${BASE_URL}/applications`,
      data: undefined,
      headers: DEFAULT_HEADERS,
      timeout: DEFAULT_TIMEOUT,
    });
  });

  it('getApplicationById calls axios.request with id in url', async () => {
    const app = { id: 'abc1234' } as any;
    mockRequest.mockResolvedValue({ data: app });
    const res = await getApplicationById('abc1234');
    expect(res).toEqual(app);
    expect(mockRequest).toHaveBeenCalledWith({
      method: 'get',
      url: `${BASE_URL}/applications/abc1234`,
      data: undefined,
      headers: DEFAULT_HEADERS,
      timeout: DEFAULT_TIMEOUT,
    });
  });

  it('updateApplication sends put with body and returns updated app', async () => {
    const app = { id: 'test-id' } as any;
    mockRequest.mockResolvedValue({ data: app });
    const body = { applicants: [] };
    const res = await updateApplication('test-id', body as any);
    expect(res).toEqual(app);
    expect(mockRequest).toHaveBeenCalledWith({
      method: 'put',
      url: `${BASE_URL}/applications/test-id`,
      data: body,
      headers: DEFAULT_HEADERS,
      timeout: DEFAULT_TIMEOUT,
    });
  });
});

describe('Apis exception tests', () => {

  it('genericApiCall throws error message from rejected response', async () => {
    mockRequest.mockRejectedValue({ message: 'failtest failed response' });
    await expect(getProducts()).rejects.toThrow('failtest failed response');
  });

  it('genericApiCall throws default message if rejected error has no message', async () => {
    mockRequest.mockRejectedValue({});
    await expect(getProducts()).rejects.toThrow('API call failed');
  });
});