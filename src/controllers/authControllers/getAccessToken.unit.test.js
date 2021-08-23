// const { getAccessToken } = require('./getAccessToken');

// describe('Unit test for getAccessToken', () => {
//   // test('should call next() when valid code is passed', () => {
//   //   const mockReq = { query: { code: 'test' } };
//   //   const mockRes = {};
//   //   const mockNext = jest.fn();
//   //   const mockExchange = jest.fn(() =>
//   //     Promise.resolve({ data: { access_token: 'abc123' } })
//   //   );
//   //   mockReq.exchangeCodeForAccessToken = mockExchange;
//   //   getAccessToken(mockReq, mockRes, mockNext);
//   //   expect(mockNext).toHaveBeenCalledTimes(1);
//   // });

//   // test('should contain github access_token in request object', () => {
//   //   const mockReq = { query: { code: 'test' } };
//   //   const mockRes = {};
//   //   const mockNext = jest.fn();
//   //   const mockExchange = jest.fn(args =>
//   //     Promise.resolve({ data: { access_token: 'abc123' } })
//   //   );
//   //   mockReq.exchangeCodeForAccessToken = mockExchange;
//   //   getAccessToken(mockReq, mockRes, mockNext);
//   //   expect(mockReq.access_token).toBe('abc123');
//   // });
//   test('should throw an error if code is invalid', () => {});
// });
