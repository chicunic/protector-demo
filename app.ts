import Koa from 'koa';

const urls = [
  'http://speed.transip.nl/random-1000mb.bin',
  'https://speed.hetzner.de/1GB.bin',
  'https://www.gov.cn',
  'https://www.fbi.gov',
];

const protector: Koa.Middleware = (ctx) => {
  console.log('timestamp', new Date().toISOString(), 'ip', ctx.ip, 'url', ctx.url);
  ctx.status = 301;
  ctx.redirect(urls[Math.floor(Math.random() * urls.length)]);
};

const app = new Koa();
app.proxy = true;
const { PORT = 8080 } = process.env;

app.use(protector);

app.listen(PORT, () => {
  console.log(`Protector listening on port: ${PORT}`);
});
