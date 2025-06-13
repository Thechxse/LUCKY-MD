const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'LUCKY-XFORCE••<=>eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQU41a0oyUzFRNEZId2NzMytGS1Ixdm5JSzdBbGlPK3NQTEZsc3pFSm9YND0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiMFhWdVA3SVJFQ2c2SVBmQnJTUmJwdHFZTzJWK0lPRGhlalM0N2xKNVkwVT0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJPR0d1ZlU4M0lsa1RaZjBLdENBd3Y1TTF4NjFreXprb0ljVGV0bzdzMms0PSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJwckxRWCtvdHdlM09GWWJENkI5QVFabzY3Z21hL2ZWVjV4SWVtVTgvSVhJPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Ik1HeW9VdCtldm1HOXNIdjhySjE3S0N5TmgvejJLaG5hcXNVMWcxWUVqbjA9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkZ2QzA0cVVPMUkrUllkcDh5SXhTYUZrWFNsQXdZZ3AvdTdacWZQZmVQeTA9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiSU12SnQ1eVk0SnRIUk5UR1Exck9WczJlRXkrb09waHVKWnREQlMzWWZXOD0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiSUlRaEZSdlhxRVZBcENvMmNScFhLWlZPVkQ5akVGRHZDRDZIUU5FcVZ3az0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Ikp5Zi9wOTEraU1HSUJER0F5VmJxTlVjenROVWYwRE5tdmJYMWxqdlVNM3Uvd1ZrMnpFRUErcm9Jbk05WDF2c3V2YUY0bE1ua3lBS0FJYXBHQWU2TkFnPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MTcwLCJhZHZTZWNyZXRLZXkiOiJpb0tOVWZ1ajlHanowejBRNENodHpaKzk1bnhVWGg1T1RYQllKNWtIUERZPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W3sia2V5Ijp7InJlbW90ZUppZCI6IjIzNDkwOTkzNTE0NDVAcy53aGF0c2FwcC5uZXQiLCJmcm9tTWUiOnRydWUsImlkIjoiNTBFMjAxRjNDNDM5RkQ4OEExQzE4ODFENEI2NzZGNDIifSwibWVzc2FnZVRpbWVzdGFtcCI6MTc0OTc3MjYzM30seyJrZXkiOnsicmVtb3RlSmlkIjoiMjM0OTA5OTM1MTQ0NUBzLndoYXRzYXBwLm5ldCIsImZyb21NZSI6dHJ1ZSwiaWQiOiJERTUwREI4MkQxMTJCMzcxMjhCRTIzOTA4Q0I0NDc5NyJ9LCJtZXNzYWdlVGltZXN0YW1wIjoxNzQ5NzcyNjQ0fV0sIm5leHRQcmVLZXlJZCI6MzEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMSwiYWNjb3VudFN5bmNDb3VudGVyIjoxLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwiZGV2aWNlSWQiOiJWa2VMQ3pJUVFtZUxTeTdXS19zWVJRIiwicGhvbmVJZCI6ImZmYWUxMjAwLWNiZDEtNDViMi1hMThmLTJmMjBjMzgzZWRjYyIsImlkZW50aXR5SWQiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJJMTAvd3B5NU0rcWlkT1lyOExmdVpnczdwUTQ9In0sInJlZ2lzdGVyZWQiOnRydWUsImJhY2t1cFRva2VuIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiRXh6YmtqQmFuQWNCaFdsWVd1Z2dseFVxaVZvPSJ9LCJyZWdpc3RyYXRpb24iOnt9LCJwYWlyaW5nQ29kZSI6IkZSRURFWlJBIiwibWUiOnsiaWQiOiIyMzQ5MDk5MzUxNDQ1OjE4QHMud2hhdHNhcHAubmV0IiwibGlkIjoiMjM0MjU0MjI3NTM5NjQ6MThAbGlkIiwibmFtZSI6IkNoeHNlIn0sImFjY291bnQiOnsiZGV0YWlscyI6IkNOQ1Q3ZW9ERUx2U3JjSUdHRDhnQUNnQSIsImFjY291bnRTaWduYXR1cmVLZXkiOiJmWHFWUG82ZnNoWmJJOFE5TWZOM2VDN0hGOTl3emRaMDArNE8zelNmdzM0PSIsImFjY291bnRTaWduYXR1cmUiOiJ1ZGIyY2RVMUJ1RnhCUm5hQlRCamM2SHYyQjNScFJGMTRVTGxUc0FHR0huaVhIV3kweW54ZVFjRE4yMjF0SWlucWZXVHRpM0dMOHQ0Sm45UzNHWUJDQT09IiwiZGV2aWNlU2lnbmF0dXJlIjoiR0Z6ZTFVcXZldFI1WS82R212MERKNUxRcG9FVEptTGtheEZLcWIwVUc4MWpRMDRCMC8xZndPQnpNNUFJMHZ6ZGRBMzhPNVI3SUV0UzdudGgwWCtqRFE9PSJ9LCJzaWduYWxJZGVudGl0aWVzIjpbeyJpZGVudGlmaWVyIjp7Im5hbWUiOiIyMzQ5MDk5MzUxNDQ1OjE4QHMud2hhdHNhcHAubmV0IiwiZGV2aWNlSWQiOjB9LCJpZGVudGlmaWVyS2V5Ijp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQlgxNmxUNk9uN0lXV3lQRVBUSHpkM2d1eHhmZmNNM1dkTlB1RHQ4MG44TisifX1dLCJwbGF0Zm9ybSI6ImFuZHJvaWQiLCJyb3V0aW5nSW5mbyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkNCSUlBZz09In0sImxhc3RBY2NvdW50U3luY1RpbWVzdGFtcCI6MTc0OTc3MjYxNywibGFzdFByb3BIYXNoIjoiMlAxWWhmIiwibXlBcHBTdGF0ZUtleUlkIjoiQUFBQUFFYkcifQ==',
    PREFIXE: process.env.PREFIX || ",",
    GITHUB : process.env.GITHUB|| 'https://github.com/mr-X-force/LUCKY-MD-XFORCE',
    OWNER_NAME : process.env.OWNER_NAME || "CHXSE",
    NUMERO_OWNER : process.env.NUMERO_OWNER || "2349099351445",
    DEV : process.env.DEV || "FrediEzra Tz",
              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "non",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'non',
    AUTO_REACT: process.env.AUTO_REACTION || "non",  
     AUTO_SAVE_CONTACTS : process.env.AUTO_SAVE_CONTACTS || 'no',
    URL: process.env.URL || "https://files.catbox.moe/uw4l17.jpeg",  
    URL2: process.env.URL2 || "https://files.catbox.moe/3o37c5.jpeg",
    AUTO_REACT_STATUS: process.env.AUTO_REACT_STATUS || 'non',              
    CHAT_BOT: process.env.CHAT_BOT || "off",              
    AUTO_READ_MESSAGES: process.env.AUTO_READ_MESSAGES || "yes",
    AUTO_BLOCK: process.env.AUTO_BLOCK || 'no', 
    GCF: process.env.GROUP_HANDLE || 'no', 
    AUTO_REPLY : process.env.AUTO_REPLY || "no", 
    AUTO_STATUS_TEXT: process.env.AUTO_STATUS_TEXT || 'Your Status Seen By LUCKY-MD-XFORCE',   
    AUTO_STATUS_REPLY: process.env.AUTO_STATUS_REPLY || 'no',
    AUTO_BIO: process.env.AUTO_BIO || 'yes',       
    ANTI_CALL_TEXT : process.env.ANTI_CALL_TEXT || '',             
    GURL: process.env.GURL  || "https://whatsapp.com/channel/0029VaihcQv84Om8LP59fO3f",
    WEBSITE :process.env.GURL || "https://whatsapp.com/channel/0029VaihcQv84Om8LP59fO3f",
    CAPTION : process.env.CAPTION || "LUCKY-MD-XFORCE",
    BOT : process.env.BOT_NAME || 'LUCKY-MD-XFORCE',
    MODE: process.env.PUBLIC_MODE || "no",              
    TIMEZONE: process.env.TIMEZONE || "Africa/Nigeria", 
    PM_PERMIT: process.env.PM_PERMIT || 'no',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME || null,
    HEROKU_API_KEY : process.env.HEROKU_API_KEY || null,
    WARN_COUNT : process.env.WARN_COUNT || '5' ,
    ETAT : process.env.PRESENCE || '1',
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    LUCKY_ADM : process.env.ANTI_DELETE_MESSAGE || 'no',
    ANTI_DELETE_GROUP : process.env.ANTI_DELETE_GROUP || 'no',
    ANTI_CALL: process.env.ANTI_CALL || 'yes', 
    AUDIO_REPLY : process.env.AUDIO_REPLY || 'yes', 
    CHAT_BOT : process.env.CHATBOT_INBOX || "no",
    VOICE_CHATBOT_INBOX : process.env.VOICE_CHATBOT_INBOX || "no",
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9" : "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9",
    /* new Sequelize({
     dialect: 'sqlite',
     storage: DATABASE_URL,
     logging: false,
})
: new Sequelize(DATABASE_URL, 
     dialect: 'postgres',
     ssl: true,
     protocol: 'postgres',
     dialectOptions: {
         native: true,
         ssl: { require: true, rejectUnauthorized: false },
     },
     logging: false,
}),*/
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
