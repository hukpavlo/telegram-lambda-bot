const botBuilder = require('claudia-bot-builder');

const handlers = require('./features');
const { logger } = require('./helpers');

module.exports = botBuilder((webhook) => {
  logger.info(JSON.stringify(webhook));

  const { message, callback_query: callbackQuery } = webhook.originalRequest;

  if (message) {
    if (message.text) {
      return handlers.textHandler(message);
    }

    if (message.sticker) {
      return handlers.stickerHandler(message);
    }
  } else if (callbackQuery) {
    return handlers.callbackQueryHandler(callbackQuery);
  }

  return handlers.defaultHandler();
});
