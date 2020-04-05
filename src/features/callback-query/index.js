const Template = require('claudia-bot-builder').telegramTemplate;

const { logger } = require('../../helpers');

module.exports = (callbackQuery) => {
  logger.info(callbackQuery);

  return new Template.Text('callback query').get();
};
