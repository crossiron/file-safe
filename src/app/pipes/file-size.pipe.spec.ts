import {FileSizePipe} from './file-size.pipe';

describe('FileSizePipe', () => {
  let pipe: FileSizePipe;

  beforeEach(() => {
    pipe = new FileSizePipe();
  });

  it('should create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should format bytes correctly', () => {
    const testValue = 1024;
    expect(pipe.transform(testValue)).toEqual('1.02 kB');
  });

  it('should handle larger values correctly', () => {
    const testValue = 1024 * 1024; // 1 MB
    expect(pipe.transform(testValue)).toEqual('1.05 MB');
  });

  it('should return "0 B" for zero bytes', () => {
    expect(pipe.transform(0)).toEqual('0 B');
  });

  it('should handle very large numbers', () => {
    const testValue = 1024 * 1024 * 1024; // 1 GB
    expect(pipe.transform(testValue)).toEqual('1.07 GB');
  });
});
