import {TimeAgoPipe} from './time-ago.pipe';

describe('TimeAgoPipe', () => {
  let pipe: TimeAgoPipe;

  beforeEach(() => {
    pipe = new TimeAgoPipe();
  });

  it('should create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should format a Date input to 5 minutes ago', () => {
    const testDate = new Date();
    testDate.setMinutes(testDate.getMinutes() - 5);
    expect(pipe.transform(testDate)).toBe('5 minutes ago');
  });

  it('should format a Date input to 5 hours ago', () => {
    const testDate = new Date();
    testDate.setHours(testDate.getHours() - 5);
    expect(pipe.transform(testDate)).toBe('5 hours ago');
  });
});
