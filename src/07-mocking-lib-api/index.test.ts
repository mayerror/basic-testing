// Uncomment the code below and write your tests
import axios, { Axios } from 'axios';
import { throttledGetDataFromApi } from './index';
// import { create } from 'lodash';

const relativePath = './path';
const baseURL = 'https://jsonplaceholder.typicode.com';
const response = { data: { id: 1, name: 'John Doe' } };

describe('throttledGetDataFromApi', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });
  test('should create instance with provided base url', async () => {
    const create = jest.spyOn(axios, 'create');
    jest.spyOn(Axios.prototype, 'get').mockResolvedValue(response);

    await throttledGetDataFromApi(relativePath);

    expect(create).toHaveBeenCalledTimes(1);
    expect(create).toHaveBeenLastCalledWith({ baseURL: baseURL });
  });

  test('should perform request to correct provided url', async () => {
    jest.spyOn(axios, 'create');
    const get = jest.spyOn(Axios.prototype, 'get').mockResolvedValue(response);

    await throttledGetDataFromApi(relativePath);
    jest.advanceTimersToNextTimer();

    expect(get).toHaveBeenCalledTimes(1);
    expect(get).toHaveBeenLastCalledWith(relativePath);
  });

  test('should return response data', async () => {
    jest.spyOn(axios, 'create');
    jest.spyOn(Axios.prototype, 'get').mockResolvedValue(response);

    const responseData = await throttledGetDataFromApi(relativePath);
    jest.advanceTimersToNextTimer();

    expect(responseData).toBe(response.data);
  });
});
