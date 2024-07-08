const Koa = require('koa');
const Router = require('koa-router');
const bodyParser = require('koa-bodyparser');
const cors = require('@koa/cors');

const app = new Koa();
const router = new Router();

app.use(bodyParser());
app.use(cors()); 

const exchangeRates = {
  GBP: 1.00,
  USD: 1.33,
  EUR: 1.18,
  JPY: 148.00
};

router.get('/exchange-rates', async (ctx) => {
  ctx.body = exchangeRates;
});

router.get('/exchange-rates/:currency', async (ctx) => {
  const { currency } = ctx.params;
  const rate = exchangeRates[currency.toUpperCase()];
  if (rate) {
    ctx.body = { currency, rate };
  } else {
    ctx.status = 404;
    ctx.body = { error: 'Currency not found' };
  }
});

app.use(router.routes()).use(router.allowedMethods());

const server = app.listen(3000, () => {
  console.log('Server running on port 3000');
});

module.exports = server;
