
import time

import telebot

# BOT_TOKEN = os.environ.get('BOT_TOKEN')
BOT_TOKEN = "5591428373:AAFKha-HE7gRrNBgbLTGeNMaG-dLqS9U0YU"
bot = telebot.TeleBot(BOT_TOKEN)


current_time = time.ctime()


@bot.message_handler(commands=['Greet'])
def send_welcome(message):
    bot.reply_to(message, "Howdy, how are you doing?")


@bot.message_handler(commands=['Hello'])
def hello_message(message):

    while (True):
        current_time = time.ctime()
        bot.send_message(message.chat.id, "/"+current_time)
        time.sleep(2)


bot.polling()
