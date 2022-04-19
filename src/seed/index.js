const { Seeder } = require('mongo-seeding');
const path = require('path');

const config = {
  database: {
    host: '127.0.0.1',
    port: 27017,
    name: 'oxyhubapi-dev'
  }
};

const seeder = new Seeder(config);

const collections = seeder.readCollectionsFromPath(path.resolve('./data'));

seeder
  .import(collections)
  .then(() => {
    console.log('Seeding Successfully Complete!');
  })
  .catch(err => {
    console.log('Error while seeding', err);
  });
