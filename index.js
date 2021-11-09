import TelegramBot from 'node-telegram-bot-api';
import config from 'config'
import kb from './buttons/kb.js';
import keybords from "./buttons/keywords.js";
import reason from "./reason/reason.js";
import answer from "./reason/answer.js";
import milost from "./reason/milost.js";
import fetch from 'node-fetch';
import random from "./function/Random.js";
import fraze from "./reason/fraze.js";

const TOKEN = config.get('TOKEN')
const bot = new TelegramBot(TOKEN, {polling: true});

bot.on('message', async msg => {
    const chatId = msg.chat.id;
    console.log('working', msg.from.first_name);
    switch (msg.text) {
        case kb.loveanya.pohval:
            bot.sendMessage(chatId, `${milost[Math.floor(Math.random() * (milost.length))]}`)
            break
        case kb.home.msg:
            bot.sendMessage(chatId, fraze[0], {
                reply_markup: {
                    keyboard: keybords.msgTost
                }
            })
            break
        case kb.home.love:
            bot.sendMessage(chatId, fraze[1], {
                reply_markup: {
                    keyboard: keybords.anyalove
                }
            })

        case kb.home.pohval:
            const response = await fetch(fraze[2]);
            const data = await response.json();
            bot.sendPhoto(chatId, data.file)
            break
        case kb.back:
            bot.sendMessage(chatId, fraze[3], {
                reply_markup: {
                    keyboard: keybords.home
                }
            })
            break

        case kb.loveanya.love:
            bot.sendMessage(chatId, `${fraze[4]} ${reason[random(reason)]}\n${fraze[5]}`)
            break
        case kb.msgTost.proig:
            bot.sendMessage(chatId, `${answer.iam[random(answer.iam)]}`)
            break

        case kb.msgTost.ti:
            bot.sendMessage(chatId, `${answer.you[random(answer.you)]}`)
            break

        case kb.msgTost.netti:
            bot.sendMessage(chatId, `${answer.noyou[random(answer.noyou)]}`)
            break
        default:
            bot.sendMessage(chatId, fraze[6])

    }
})

bot.onText(/\/start/, msg => {
    const chatId = msg.chat.id;
    const text = fraze[7];
    bot.sendMessage(chatId, text, {
        reply_markup: {
            keyboard: keybords.home
        }
    })
})

