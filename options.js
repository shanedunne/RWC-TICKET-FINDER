require("dotenv").config();

module.exports = {
  urlObject: {
    IREvSA: "https://tickets.rugbyworldcup.com/en/resale_south_africa_ireland",
    IREvSCOT: "https://tickets.rugbyworldcup.com/en/resale_ireland_scotland",
    IRE_QF_IF_WE_TOP_GROUP:
      "https://tickets.rugbyworldcup.com/en/resale_quarter_final2",
    IRE_QF_IF_WE_COME_2ND_IN_GROUP:
      "https://tickets.rugbyworldcup.com/en/resale_quarter_final4",
  },
  delay: 60000,
  telegram: {
    token: process.env["TELEGRAM_BOT_TOKEN"],
    chatId: process.env["CHAT_ID"],
    noTixChat: process.env["NO_TICKET_CHAT"],
  },
};
