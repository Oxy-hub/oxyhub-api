const UserService = require('../../UserService');

let UserServiceInstance = null;
const mockParams = { userRepository: {}, githubRepository: {} };
beforeAll(() => {
  UserServiceInstance = new UserService(mockParams);
});

describe('Unit test for sanitizeNames()', () => {
  test('should split a name into proper first,middle and last name', () => {
    const { firstName, middleName, lastName } =
      UserServiceInstance.sanitizeName('John Jonathan Doe');
    expect(firstName).toBe('John');
    expect(middleName).toBe('Jonathan');
    expect(lastName).toBe('Doe');
  });

  test('should split a name having more than 1 middle name into proper first,middle and last name', () => {
    const { firstName, middleName, lastName } =
      UserServiceInstance.sanitizeName('John Jonathan Pastor Doe');
    expect(firstName).toBe('John');
    expect(middleName).toBe('Jonathan Pastor');
    expect(lastName).toBe('Doe');
  });

  //   test('should split a name having multiple blank spaces into proper first,middle and last name', () => {
  //     const { firstName, middleName, lastName } =
  //       UserServiceInstance.sanitizeName('John     Jonathan   Pastor        Doe');
  //     expect(firstName).toBe('John');
  //     expect(middleName).toBe('Jonathan Pastor');
  //     expect(lastName).toBe('Doe');
  //   });
});
