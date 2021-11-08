const wrapAsync = require('../wrapAsync');

const mockError = new Error();
const mockNext = jest.fn();
const mockFn = jest
  .fn()
  .mockImplementationOnce(() => Promise.resolve())
  .mockImplementationOnce(() => Promise.reject(mockError));

describe('Unit Test : wrapAsync()', () => {
  test('should call function passed through argument one time with correct args', async () => {
    const returnedFn = wrapAsync(mockFn);
    await returnedFn({}, {}, mockNext);
    expect(mockFn).toHaveBeenCalledTimes(1);
    expect(mockFn).toHaveBeenNthCalledWith(1, {}, {}, mockNext);
  });

  test('should call next() one time and pass in Error object', async () => {
    const returnedFn = wrapAsync(mockFn);
    await returnedFn({}, {}, mockNext);
    expect(mockNext).toHaveBeenCalledTimes(1);
    expect(mockNext).toHaveBeenNthCalledWith(1, mockError);
  });
});
