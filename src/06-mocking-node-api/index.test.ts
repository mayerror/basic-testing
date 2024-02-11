// Uncomment the code below and write your tests
import path from 'node:path';
import { doStuffByTimeout, doStuffByInterval, readFileAsynchronously } from '.';
import fs from 'node:fs';
import fsPromises from 'node:fs/promises';

describe('doStuffByTimeout', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set timeout with provided callback and timeout', () => {
    jest.spyOn(global, 'setTimeout');
    const callback = jest.fn();
    doStuffByTimeout(callback, 1000);

    expect(setTimeout).toHaveBeenCalledTimes(1);
    expect(setTimeout).toHaveBeenLastCalledWith(callback, 1000);
  });

  test('should call callback only after timeout', () => {
    jest.spyOn(global, 'setTimeout');
    const callback = jest.fn();
    doStuffByTimeout(callback, 1000);

    expect(callback).not.toHaveBeenCalled();

    jest.runAllTimers();

    expect(callback).toHaveBeenCalled();
    expect(callback).toHaveBeenCalledTimes(1);
  });
});

describe('doStuffByInterval', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
    jest.clearAllTimers();
  });

  test('should set interval with provided callback and timeout', () => {
    jest.spyOn(global, 'setInterval');
    const callback = jest.fn();
    doStuffByInterval(callback, 1000);

    expect(setInterval).toHaveBeenCalledTimes(1);
    expect(setInterval).toHaveBeenLastCalledWith(callback, 1000);
  });

  test('should call callback multiple times after multiple intervals', () => {
    const callback = jest.fn();

    doStuffByInterval(callback, 100);

    jest.advanceTimersToNextTimer(5);

    expect(callback).toHaveBeenCalledTimes(5);
  });
});

describe('readFileAsynchronously', () => {
  test('should call join with pathToFile', async () => {
    const join = jest.spyOn(path, 'join').mockReturnValue('somepath');
    const pathToFile = 'pathToFile';

    await readFileAsynchronously(pathToFile);

    expect(join).toHaveBeenCalledTimes(1);
    expect(join).toHaveBeenLastCalledWith(expect.anything(), pathToFile);
  });

  test('should return null if file does not exist', async () => {
    jest.spyOn(fs, 'existsSync').mockReturnValue(false);
    const pathToFile = 'pathToFile';

    const fileContent = await readFileAsynchronously(pathToFile);

    expect(fileContent).toBe(null);
  });

  test('should return file content if file exists', async () => {
    const content = 'some content';
    jest.spyOn(fs, 'existsSync').mockReturnValue(true);
    jest
      .spyOn(fsPromises, 'readFile')
      .mockReturnValue(Promise.resolve(content));
    const pathToFile = 'pathToFile';

    const fileContent = await readFileAsynchronously(pathToFile);

    expect(fileContent).toBe(content);
  });
});
