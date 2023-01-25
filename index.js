const axios = require("axios");
const cheerio = require("cheerio");
require("dotenv").config();
const options = require("./options");
const server = require("./server.js");

// bot set up
const TelegramBot = require("node-telegram-bot-api");

// replace the value below with the Telegram token you receive from @BotFather
const token = options.telegram.token;

// Create a bot that uses 'polling' to fetch new updates
const bot = new TelegramBot(token, { polling: true });

// set the chat ID so it is only for one group
const chatId = options.telegram.chatId;

bot.onText(/\/hello/, (msg) => {
  // 'msg' is the received Message from Telegram
  // 'match' is the result of executing the regexp above on the text content
  // of the message

  const welcomeMsg =
    "Welcome. This bot will scan the Rugby Wold Cup ticket page every 60 seconds. It is specifically targeting the Irish matches. Once tickets are up for resale, we should be the first to know ";

  bot.sendMessage(chatId, welcomeMsg);
});

async function checkForTickets() {
  try {
    for (var match in options.urlObject) {
      const currentURL = options.urlObject[match];

      const { data } = await axios({
        method: "GET",
        url: currentURL,
      });
      // set cheerio to $
      const $ = cheerio.load(data);

      // set no tickets marker
      const noTicketDiv = ".product-not-on-sale-info";

      if ($(noTicketDiv).length === 0) {
        let msg = `Tickets available for ${match}. Run RUN RUN!!!! ${options.urlObject[match]}`;
        bot.sendMessage(chatId, msg);
      }
    }
  } catch (e) {
    console.error(e);
  }
}

// call the check web function with specified time as per options.js
setInterval(checkForTickets, options.delay);
