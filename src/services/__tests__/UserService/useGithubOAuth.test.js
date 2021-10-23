// const UserService = require('../../UserService');
// const GithubRepository = require('../../../repositories/GithubRepository');
// // const AppError = require('../../../errors/AppError');

// const code = '123abc';
// const githubRepo = new GithubRepository();
// let UserServiceInstance = null;
// const mockParams = {
//   userRepository: {},
//   githubRepository: githubRepo
// };
// beforeAll(() => {
//   UserServiceInstance = new UserService(mockParams);
// });

// describe('Unit test for useGithubOAuth()', () => {
//   afterEach(() => {
//     jest.restoreAllMocks();
//   });

//   test('should return user profile', async () => {
//     jest
//       .spyOn(githubRepo, 'exchangeCodeForAccessToken')
//       .mockImplementation(() => Promise.resolve('accessgranted'));

//     jest
//       .spyOn(githubRepo, 'getUserProfile')
//       .mockImplementation(() => Promise.resolve('John Jonathan Doe'));

//     jest
//       .spyOn(githubRepo, 'getUserEmail')
//       .mockImplementation(() => Promise.resolve('johndoe@gmail.com'));

//     const { firstName, middleName, lastName, email } =
//       await UserServiceInstance.useGithubOAuth(code);
//     expect(firstName).toBe('John');
//     expect(middleName).toBe('Jonathan');
//     expect(lastName).toBe('Doe');
//     expect(email).toBe('johndoe@gmail.com');
//   });

//   test('check if exchangeCodeForAccessToken is being called once with correct param', async () => {
//     const mockExchange = jest
//       .spyOn(githubRepo, 'exchangeCodeForAccessToken')
//       .mockImplementation(() => Promise.resolve('accessgranted'));

//     jest
//       .spyOn(githubRepo, 'getUserProfile')
//       .mockImplementation(() => Promise.resolve('John Jonathan Doe'));

//     jest
//       .spyOn(githubRepo, 'getUserEmail')
//       .mockImplementation(() => Promise.resolve('johndoe@gmail.com'));

//     await UserServiceInstance.useGithubOAuth(code);

//     expect(mockExchange).toHaveBeenCalledTimes(1);
//     expect(mockExchange).toHaveBeenCalledWith(code);
//   });

//   test('check if getUserProfile is being called once with correct param', async () => {
//     jest
//       .spyOn(githubRepo, 'exchangeCodeForAccessToken')
//       .mockImplementation(() => Promise.resolve('accessgranted'));

//     const mockGetUserProfile = jest
//       .spyOn(githubRepo, 'getUserProfile')
//       .mockImplementation(() => Promise.resolve('John Jonathan Doe'));

//     jest
//       .spyOn(githubRepo, 'getUserEmail')
//       .mockImplementation(() => Promise.resolve('johndoe@gmail.com'));

//     await UserServiceInstance.useGithubOAuth(code);
//     expect(mockGetUserProfile).toHaveBeenCalledTimes(1);
//     expect(mockGetUserProfile).toHaveBeenCalledWith('accessgranted');
//   });

//   test('check if getUserEmail is being called once with correct param', async () => {
//     jest
//       .spyOn(githubRepo, 'exchangeCodeForAccessToken')
//       .mockImplementation(() => Promise.resolve('accessgranted'));

//     jest
//       .spyOn(githubRepo, 'getUserProfile')
//       .mockImplementation(() => Promise.resolve('John Jonathan Doe'));

//     const mockGetUserEmail = jest
//       .spyOn(githubRepo, 'getUserEmail')
//       .mockImplementation(() => Promise.resolve('johndoe@gmail.com'));

//     await UserServiceInstance.useGithubOAuth(code);
//     expect(mockGetUserEmail).toHaveBeenCalledTimes(1);
//     expect(mockGetUserEmail).toHaveBeenCalledWith('accessgranted');
//   });

//   test('check if sanitizeName is being called once with correct param', async () => {
//     jest
//       .spyOn(githubRepo, 'exchangeCodeForAccessToken')
//       .mockImplementation(() => Promise.resolve('accessgranted'));

//     jest
//       .spyOn(githubRepo, 'getUserProfile')
//       .mockImplementation(() => Promise.resolve('John Jonathan Doe'));

//     jest
//       .spyOn(githubRepo, 'getUserEmail')
//       .mockImplementation(() => Promise.resolve('johndoe@gmail.com'));

//     const mocksanitizeName = jest.spyOn(UserServiceInstance, 'sanitizeName');

//     await UserServiceInstance.useGithubOAuth(code);
//     expect(mocksanitizeName).toHaveBeenCalledTimes(1);
//     expect(mocksanitizeName).toHaveBeenCalledWith('John Jonathan Doe');
//   });

//   // test('should throw an AppError if exchangeCodeForAccessToken() throws an error', async () => {
//   //   jest.spyOn(githubRepo, 'exchangeCodeForAccessToken').mockImplementation(
//   //     () =>
//   //       new Promise((_, reject) => {
//   //         reject(new Error());
//   //       })
//   //   );

//   //   jest
//   //     .spyOn(githubRepo, 'getUserProfile')
//   //     .mockImplementation(() => Promise.resolve('John Jonathan Doe'));

//   //   jest
//   //     .spyOn(githubRepo, 'getUserEmail')
//   //     .mockImplementation(() => Promise.resolve('johndoe@gmail.com'));

//   //   await expect(() => {
//   //     UserServiceInstance.useGithubOAuth(code);
//   //   }).rejects.toThrow(AppError);
//   // });

//   // test('should throw an AppError if getUserProfile() throws an error', () => {
//   //   expect(() => {
//   //     UserServiceInstance.useGithubOAuth(code);
//   //   }).toThrowError(new AppError(500, 'Something went wrong'));
//   // });

//   // test('should throw an AppError if getUserEmail() throws an error', () => {
//   //   expect(() => {
//   //     UserServiceInstance.useGithubOAuth(code);
//   //   }).toThrowError(new AppError(500, 'Something went wrong'));
//   // });
// });

describe('Unit test for useGithubOAuth()', () => {
  test('should return user profile', () => {});
  test('check if exchangeCodeForAccessToken is being called once with correct param', () => {});
  test('check if getUserProfile is being called once with correct param', () => {});
  test('check if getUserEmail is being called once with correct param', () => {});
  test('check if sanitizeName is being called once with correct param', () => {});
});
