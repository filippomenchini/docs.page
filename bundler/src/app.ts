import express, {Request, Response, text} from 'express';

import {_debug} from './utils/debug.js'
const PORT = process.env.PORT || 8000;

const app = express();
app.use(text());

app.get('/', (req, res) => res.send('Express + TypeScript Server With ESM'));

app.listen(PORT, () => {
  console.log(`⚡️[server]: Server is totally running at http://localhost:${PORT}`);
});

app.post('/bundle', async (req: Request, res: Response) => {
  const bundled = await _debug(req?.body?.trim())
  res.send(bundled)
})