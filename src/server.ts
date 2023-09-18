import { log } from 'console';
import { fastify } from 'fastify';

const app = fastify();

app.get('/', () => {
  return 'Hello World';
});

app.listen({
  port: 3333,
}).then(() => {
  log('HTTP Server Running!');
});