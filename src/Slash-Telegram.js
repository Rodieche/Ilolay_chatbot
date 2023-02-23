const TelegramBotToken = "5700511360:AAG0li9KsWNfznOQEkZx-a4LX5KaPsuqEww";
const TelegramChatID = "-1001532010755";

const sendTelegramMessage = (user, text) => {
  const message = `${user} esta alertando: ${text}`;
  const response = UrlFetchApp.fetch(`https://api.telegram.org/bot${TelegramBotToken}/sendMessage\?chat_id=${TelegramChatID}&parse_mode=HTML&text=${message}`);
  console.log(response);
  return;
}