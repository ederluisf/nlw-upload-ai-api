import { log } from 'console';
import { fastify } from 'fastify';
import { getAllPromptsRoute } from './routes/get-all-prompts';

const app = fastify();

app.register(getAllPromptsRoute);

app.listen({
  port: 3333,
}).then(() => {
  log('HTTP Server Running On http://localhost:3333/');
});
