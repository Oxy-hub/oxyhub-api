const mockReadUserById = jest.fn().mockImplementation(() =>
  Promise.resolve({
    id: '123abc',
    firstName: 'John',
    middleName: '',
    lastName: 'Doe',
    email: 'johndoe@gmail.com'
  })
);

const mockCreateUser = jest.fn().mockImplementation(() =>
  Promise.resolve({
    id: '123abc',
    firstName: 'John',
    middleName: '',
    lastName: 'Doe',
    email: 'johndoe@oxyhub.com'
  })
);

const mockUserRepository = {
  UserRepository: jest.fn().mockImplementation(() => ({
    readUserById: mockReadUserById,
    createUser: mockCreateUser
  })),
  mockReadUserById,
  mockCreateUser
};

module.exports = mockUserRepository;
