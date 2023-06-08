require('dotenv').config();
const _ = require('lodash');
const Koa = require('koa');
const bodyParser = require('koa-bodyparser');

const protector = (ctx, next) => {
  console.log('timestamp', new Date().toISOString(), 'ip', ctx.ip, 'url', ctx.url);
  ctx.stataus = 301;
  ctx.redirect(
    _.sample([
      'http://speed.transip.nl/random-1000mb.bin',
      'https://speed.hetzner.de/1GB.bin',
      'https://www.gov.cn',
      'https://www.fbi.gov',
    ])
  );
  return null;
};

const app = new Koa();
app.proxy = true;
const { PORT = 8080 } = process.env;

app.use(bodyParser()).use(protector);

app.listen(PORT, () => {
  console.log(`Protector listening on port: ${PORT}`);
});
