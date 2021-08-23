const config = require('./config');
const server = require('./server');

const init = async () => {
  const app = await server();
  app.listen(config.port, () => {
    console.log(`LISTENING ON PORT ${config.port}`);
  });
};

init();
