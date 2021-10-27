function MongoUrl(url) {
  this.url = url;
}

const setMongoUrl = () => {
  switch (process.env.NODE_ENV) {
    case 'production':
      return new MongoUrl(process.env.MONGODB_URL_PROD);

    case 'test':
      return new MongoUrl(process.env.MONGODB_URL_TEST);

    default:
      return new MongoUrl(process.env.MONGODB_URL_DEV);
  }
};

module.exports = setMongoUrl;
