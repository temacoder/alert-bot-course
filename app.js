//Подключаем модули NodeJS
const { Telegraf } = require('telegraf')
const schedule = require('node-schedule')

//Для получения bot токена идете в @botfather, вводите там команду /newbot и далее по инструкции. Полученный токен вставляете 👇
const bot = new Telegraf('тут должен быть ваш бот токен')

//Код который реагирует на команду /start
bot.start((ctx) => ctx.replyWithHTML('Привет! Я могу напомнить тебе о чем угодно только попроси.\nДля этого отправь мне время напоминания в формате\n<b>ДД.ММ.ГГГГ ЧЧ:ММ:СС</b>'))

//Код который принимает любой текст от юзера и дельше что-то с этим делает
//В нашем конкретном случае мы принимаем строку с датой и временем, создаем из нее расписание и програмируем бота на уведомление в нужное время
bot.on('text', async (ctx) => {

  //Разбиваем сообщение от юзера на отдельные цифры (день, месяц, год, часы, минуты) и получаем массив с этими цифрами
  const dateArray = ctx.update.message.text.split(/[.:\s]/)

  //создаем расписание с помощью модуля schedule
  const rule = new schedule.RecurrenceRule()
  rule.date = parseInt(dateArray[0]) //день
  rule.month = parseInt(dateArray[1].startsWith('0') ? dateArray[1][1] : dateArray[1]) - 1 //месяц
  rule.year = parseInt(dateArray[2]) //год
  rule.hour = parseInt(dateArray[3]) //часы
  rule.minute = parseInt(dateArray[4]) //минуты

  //Запускаем функцию которая ждет нужное время и запускает отправку уведомления
  schedule.scheduleJob(rule, () => {
    ctx.replyWithHTML(`${ctx.chat.first_name}, напоминаю тебе, что ты что-то хотел сделать 😉`)
  })
})

//Функция, которая запускает бот
bot.launch()