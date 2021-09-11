const mockReadUserById = jest.fn().mockImplementation(() =>
  Promise.resolve({
    id: '123abc',
    firstName: 'John',
    middleName: '',
    lastName: 'Doe',
    email: 'johndoe@gmail.com'
  })
);

const mockUserRepository = {
  UserRepository: jest.fn().mockImplementation(() => ({
    readUserById: mockReadUserById
  })),
  mockReadUserById
};

module.exports = mockUserRepository;
