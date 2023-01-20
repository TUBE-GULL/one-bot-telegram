import { Telegraf } from 'telegraf';
import axios, { Axios } from 'axios';

const URL = {
    BTC: 'https://api.binance.com/api/v3/depth?symbol=BTCUSDT&limit=1',
    ETH: 'https://api.binance.com/api/v3/depth?symbol=ETHUSDT&limit=1',
    ETC: 'https://api.binance.com/api/v3/depth?symbol=ETCUSDT&limit=1',
}

let timerId;
let Increasedeased = true;
const arrayTim = [];
const token = '5763739281:AAHp3kmKO2GtLEZHVlYUzqmVHIeBr81UXxM';
const bot = new Telegraf(token);

bot.start((ctx) =>
    ctx.reply("Hi there!", {
        reply_markup: {
            inline_keyboard: [
                [{ text: "START COURSE BTC", callback_data: "btn-1" },
                { text: "START COURSE ETH", callback_data: "btn-2" },
                { text: "START COURSE ETC", callback_data: "btn-3" }],

                [{
                    text: "Do you have suggestions? Write !", url: "https://t.me/Samsonov_Oleg_Olegovich"
                }],
            ]
        }
    })
);

bot.use((ctx, next) => {
    if (ctx.message) {
        let text = ctx.message.text;
        ctx.update.message.text = text.toLowerCase();
        console.log(text.toLowerCase());
    }
    return next();
});

bot.help((ctx) => ctx.reply('Send me a sticker'));

bot.on('sticker', (ctx) => ctx.reply('👍'));

bot.hears('hi', (ctx) => ctx.reply('Hey there'));

//******************************** / BTC / ******************************************************************
const curseBTC = (ctx) => {
    axios.get(URL.BTC)
        .then((res) => {
            let price = JSON.stringify(res.data.bids[0][0]);
            price = price.replace(/['"]+/g, '');
            price = (+price).toFixed().toString();
            return ctx.replyWithMarkdownV2(` курс BTC: *${price}*`, {
                reply_markup: {
                    inline_keyboard: [[{ text: "STOP !", callback_data: "btn-STOP" }]]
                }
            });
        })
        .catch((error) => {
            return ctx.reply(error);
        })
};

const timeСourse = (ctx) => {
    curseBTC(ctx);
    timerId = setInterval(() => { return curseBTC(ctx); }, 60000 * 30);

};

bot.action('btn-STOP', (ctx) => {
    clearInterval(timerId);
}),

    console.log(arrayTim)

bot.action('btn-1', timeСourse);
bot.hears('курс btc', curseBTC);
//******************************** / ETH / ******************************************************************

const curseETH = (ctx) => {
    axios.get(URL.ETH)
        .then((res) => {
            let price = JSON.stringify(res.data.bids[0][0]);
            price = price.replace(/['"]+/g, '');
            price = (+price).toFixed().toString();
            return ctx.replyWithMarkdown(` курс ETH: *${price}*`);
        })
        .catch((error) => {
            return ctx.reply(error);
        })
};





bot.action('btn-2', curseETH);
bot.hears('курс eth', curseETH);
//******************************** / ETC / ******************************************************************

const curseETC = (ctx) => {
    axios.get(URL.ETC)
        .then((res) => {
            let price = JSON.stringify(res.data.bids[0][0]);
            price = price.replace(/['"]+/g, '');
            price = (+price).toString();
            return ctx.replyWithMarkdown(` курс ETC: *${price}*`, {
                reply_markup: {
                    inline_keyboard: [[{ text: "STOP !", callback_data: "btn-STOP" }]]
                }
            });
        })
        .catch((error) => {
            return ctx.reply(error);
        })
};

bot.action('btn-3', curseETC);
bot.hears('курс etc', curseETC);
