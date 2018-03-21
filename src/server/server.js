import Express from 'express';
import http from 'http';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';

import { userRoutes, userMockRoutes } from './user/UserRoutes';
import { authRoutes, authMockRoutes } from './auth/AuthRoutes';
import { interviewRoutes, interviewMockRoutes } from './interview/InterviewRoutes';

const app = new Express();
const localPort = process.env.NODE_ENV === 'testing' ? 3005 : 3001;
const port = process.env.PORT || localPort;
const apiVersion = '1';

app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Add headers
app.use((req, res, next) => {

  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3002');

  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type,Authorization');

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', true);

  // Pass to next layer of middleware
  next();
});

app.use(`/api/v${apiVersion}/`, userRoutes);
app.use(`/api/v${apiVersion}/`, authRoutes);
app.use(`/api/v${apiVersion}/`, interviewRoutes);
app.use(`/mock-api/v${apiVersion}/`, interviewMockRoutes);
app.use(`/mock-api/v${apiVersion}/`, userMockRoutes);
app.use(`/mock-api/v${apiVersion}/`, authMockRoutes);

const server = http.createServer(app);

server.listen(port, (error) => {
  if (error) {
    console.error(error);
  } else {
    console.info(`==> 🌎 Listening on port ${port}. Open up http://localhost:${port}/ in your browser.`);
  }
});

export default app;