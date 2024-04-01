import express, { Express} from 'express';
import { limiter } from './middleware/rate-limiter';
import { corsOptions } from './middleware/cors';
import { router } from './routes/url-shortner-routes';
import { requestValidation } from './middleware/request-validator';

const app: Express = express();
const port: number = 3000;

app.use(express.json());
app.use(corsOptions);
app.use(limiter);
app.use(requestValidation);
app.use(router)

app.listen(port, () => {
  console.log(`Server running on port ${port}`)
})