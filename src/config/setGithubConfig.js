function GithubConfig(clientId, clientSecret) {
  this.clientId = clientId;
  this.clientSecret = clientSecret;
}

const setGithubConfig = () => {
  switch (process.env.NODE_ENV) {
    case 'production':
      return new GithubConfig(
        process.env.GITHUB_CLIENT_ID_PROD,
        process.env.GITHUB_CLIENT_SECRET_PROD
      );

    case 'test':
      return new GithubConfig(
        process.env.GITHUB_CLIENT_ID_TEST,
        process.env.GITHUB_CLIENT_SECRET_TEST
      );

    default:
      return new GithubConfig(
        process.env.GITHUB_CLIENT_ID_DEV,
        process.env.GITHUB_CLIENT_SECRET_DEV
      );
  }
};

module.exports = setGithubConfig;
