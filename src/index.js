require('dotenv').config();
const{ Client, IntentsBitField} = require('discord.js');
const{ translateText } = require('./translation');


const client = new Client({
    intents: [
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildMembers,
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.MessageContent,
    ],
});

client.on('ready', (c) =>{
    console.log(`${c.user.tag} is online.`);
    client.user.setPresence({
        activities: [{name: process.env.ACTIVITY}],
        afk: false,
        type: 'Playing'
    })
})

client.on('messageCreate', async (message) =>{
    if(message.author.bot){
        return;
    }
    //Personal message for your account for funny or testing
    if(message.author.displayName === process.env.USER && message.content === 'hello'){
        message.reply(process.env.MESSAGE);
    }

    try{
        const testText = await translateText(message.content);
        const detectedLan = testText.detectedLanguage.language;
        const messReply = testText.translatedText;
        const accur = testText.detectedLanguage.confidence;
        if(detectedLan === 'tr'){
            message.reply(`${messReply} \n (confidence accuracy of ${accur})`,messReply, accur);
        }
        //message.reply(detectedLan);
    } catch (error){
        console.error(error);
    }
})


client.login(process.env.TOKEN);



