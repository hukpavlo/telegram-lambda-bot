const textHandler = require('./text');
const defaultHandler = require('./default');
const stickerHandler = require('./sticker');
const callbackQueryHandler = require('./callback-query');

module.exports = {
  textHandler,
  defaultHandler,
  stickerHandler,
  callbackQueryHandler,
};
