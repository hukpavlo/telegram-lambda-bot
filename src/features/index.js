const textHandler = require('./text');
const defaultHandler = require('./default');
const stickerHandler = require('./sticker');
const callbackQueryHandler = require('./callback-query');

const { logger } = require('../helpers');

module.exports = (webhook) => {
  logger.info(JSON.stringify(webhook));

  const { message, callback_query: callbackQuery } = webhook.originalRequest;

  if (message) {
    if (message.text) {
      return textHandler(message);
    }

    if (message.sticker) {
      return stickerHandler(message);
    }
  } else if (callbackQuery) {
    return callbackQueryHandler(callbackQuery);
  }

  return defaultHandler();
};
