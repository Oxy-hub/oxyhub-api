exports.authMiddleware = jest.fn((req, res, next) => {
  console.log('executing mock authMiddleware from __mocks__');
  req.userId = '123abc';
  return next();
});
