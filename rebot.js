import "./config.js";
 import { jidNormalizedUser, generateWAMessageContent, generateWAMessage, generateWAMessageFromContent, prepareWAMessageMedia, getContentType } from "@whiskeysocket/baileys"
 import util, { promisify } from "util";
 import fs from "fs";
 import qs from "qs";
 import axios from 'axios';
 import * as cheerio from "cheerio";
 import FormData from 'form-data';
 import { fileURLToPath } from 'url';
 import path, { dirname } from "path"
 import ffmpeg from "fluent-ffmpeg";
 import chalk from "chalk"
 import os from "os"
 import crypto from "crypto";
 import { exec, spawn, execSync } from "child_process"
 import { fileTypeFromBuffer } from 'file-type';
 import { runtime, smsg, getBuffer, fetchJson, isUrl, getRandom, jsonformat, getGroupAdmins, formatp} from "./lib/myfunc.js"
 import ms from 'parse-ms'
 import toMs from "ms";
 import moment from 'moment-timezone'
 import yts  from "yt-search"
 import { uploadFile, btch } from './lib/uploader.js'
 import { checkUserMessageLimit } from "./lib/antispam.js"


 //Variabel declared
 let cmhit = []
 let multi = true
 let nopref = false
 let enhance = {};

 export default async function rebotHandler(rebot, m, chatUpdate, store) { 
  try {

// variabel body to prefix
    const body = (m.mtype === 'conversation') ? m.message.conversation : (m.mtype == 'imageMessage') ? m.message.imageMessage.caption : (m.mtype == 'documentMessage') ? m.message.documentMessage.caption : (m.mtype == 'reactionMessage') ? m.message.reactionMessage.text : (m.mtype == 'locationMessage') ? m.message.locationMessage.comment : (m.mtype == 'interactiveResponseMessage') ? JSON.parse(m.message.interactiveResponseMessage.nativeFlowResponseMessage.paramsJson).id : (m.mtype == 'videoMessage') ? m.message.videoMessage.caption : (m.mtype == 'extendedTextMessage') ? m.message.extendedTextMessage.text : (m.mtype == 'buttonsResponseMessage') ? m.message.buttonsResponseMessage.selectedButtonId : (m.mtype == 'listResponseMessage') ? m.message.listResponseMessage.singleSelectReply.selectedRowId : (m.mtype == 'templateButtonReplyMessage') ? m.message.templateButtonReplyMessage.selectedId : (m.mtype === 'messageContextInfo') ? (m.message.buttonsResponseMessage?.selectedButtonId || m.message.listResponseMessage?.singleSelectReply.selectedRowId || m.text) : ''
    const budy = (typeof m.text == 'string' ? m.text : '')
    var prefix;

    if (multi && !nopref) {
      prefix = /^[z°•π÷×¶∆£¢€¥®™+✓_=|~!?@#$%^&.©^]/gi.test(body) ? body.match(/^[z°•π÷×¶∆£¢€¥®™+✓_=|~!?@#$%^&.©^]/gi)[0] : ".";
    } else {
      prefix = nopref ? "" : global.prefa || ".";
    }

const isCmd = (new RegExp(`^\\${prefix}\\S+`, 'gi')).test(body) || (!prefix && !body.startsWith('.')); // Memeriksa apakah pesan dimulai dengan prefix atau langsung command tanpa prefix
const command = isCmd ? (body.startsWith(prefix) ? body.split(' ')[0].slice(prefix.length).toLowerCase() : body.split(' ')[0].toLowerCase()) : ''; // Mengambil command setelah prefix atau langsung jika tanpa prefix
const args = isCmd ? body.trim().split(/ +/).slice(1) : [];

  // variabel user and subject
const text = args.join(" ")
const q = args.join(" ")
const pushname = m.pushName || "GK ada namanya"
const botNumber = await rebot.decodeJid(rebot.user.id)
const fatkuns = (m.quoted || m)
const quoted = (fatkuns.mtype == 'buttonsMessage') ? fatkuns[Object.keys(fatkuns)[1]] : (fatkuns.mtype == 'templateMessage') ? fatkuns.hydratedTemplate[Object.keys(fatkuns.hydratedTemplate)[1]] : (fatkuns.mtype == 'product') ? fatkuns[Object.keys(fatkuns)[0]] : m.quoted ? m.quoted : m
const mime = (quoted.msg || quoted).mimetype || ''
const qmsg = (quoted.msg || quoted)
const isMedia = /image|video|sticker|audio/.test(mime)
const creatorIds = [botNumber, ...global.owner]
.map(v => {
  const num = v.replace(/[^0-9]/g, '');
  return [
    `${num}@s.whatsapp.net`,
    `${num}@c.us`,
    `${num}@lid`
  ];
})
.flat();
const isCreator = creatorIds.includes(m.sender);
const isModerator = isCreator || (global.db.data.users[m.sender] && global.db.data.users[m.sender].moderator?.status === true)
const isPremium = isCreator || (global.db.data.users[m.sender] && global.db.data.users[m.sender].premium && global.db.data.users[m.sender].premium.status === true);
const isBan = (global.db.data.users[m.sender] && global.db.data.users[m.sender].banned && global.db.data.users[m.sender].banned === true);
const isBanspam = (global.db.data.users[m.sender] && global.db.data.users[m.sender].banspam && global.db.data.users[m.sender].banspam.status === true);



  // variabel Group
const groupMetadata = m.isGroup ? await store.groupMetadata(m.chat, rebot).catch(e => {}) : ''
const groupName = m.isGroup ? groupMetadata.subject : ''
const participants = m.isGroup ? await groupMetadata.participants : ''
const groupAdmins = m.isGroup ? await getGroupAdmins(participants) : ''
const isAdmins = m.isGroup ? groupAdmins.includes(m.sender) : false
const isBotAdmins = m.isGroup ? groupAdmins.includes(botNumber) : false

//Another variabel 
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const more = String.fromCharCode(8206);
const readmore = more.repeat(550);
const timeWib = moment.tz('Asia/Jakarta').format('DD/MM HH:mm:ss')
const timeWita = moment().tz('Asia/Makassar').format('DD/MM HH:mm:ss')
const timeWit = moment().tz('Asia/Jayapura').format('DD/MM HH:mm:ss')

//DATABASE INISIALIZATION
let isNumber = x => typeof x === 'number' && !isNaN(x);

// Determine limit based on premium statusq
let limitUser = isPremium ? global.limitawal.premium : global.limitawal.free;
// Determine JID & LID
let jid, lid;
if (m.key.remoteJid.endsWith('@s.whatsapp.net')) {
  jid = m.key.remoteJid;
  lid = m.key.remoteJidAlt;
} else if (m.key.remoteJid.endsWith('@g.us')) {
  jid = m.key.participantAlt;
  lid = m.key.participant;
}

let keyUser = jid || m.sender;

// === CRITICAL FIX: Initialize user object properly ===

// Ensure users object exists
if (!global.db.data.users) {
  global.db.data.users = {};
}

// Check if user exists, if not create with defaults
if (!global.db.data.users[keyUser]) {
  console.log(`Creating new user: ${keyUser}`);
  
  global.db.data.users[keyUser] = {
    afkTime: -1,
    afkReason: '',
    limit: limitUser,
    moderator: { status: false, expired: 0 },
    premium: { status: false, expired: 0 },
    banspam: { status: false, expired: 0 },
    banned: false,
    jid: jid,
    lid: lid
  };
}

// NOW get user reference (guaranteed to exist)
let user = global.db.data.users[keyUser];

// Validate and fill missing properties (for existing users)
if (!isNumber(user.afkTime)) user.afkTime = -1;
if (!('afkReason' in user)) user.afkReason = '';
if (!isNumber(user.limit)) user.limit = limitUser;
if (!('banned' in user)) user.banned = false;

// Ensure objects exist with proper structure
if (!user.moderator || typeof user.moderator !== 'object') {
  user.moderator = { status: false, expired: 0 };
}
if (!user.premium || typeof user.premium !== 'object') {
  user.premium = { status: false, expired: 0 };
}
if (!user.banspam || typeof user.banspam !== 'object') {
  user.banspam = { status: false, expired: 0 };
}

// Update identities (in case they changed)
user.jid = jid;
user.lid = lid;

// // === VERIFICATION (Optional but recommended) ===
// console.log(`User loaded: ${keyUser}`, {
//   limit: user.limit,
//   premium: user.premium?.status || false,
//   banned: user.banned
// });


let chats = global.db.data.chats[m.chat]
if (typeof chats !== 'object') global.db.data.chats[m.chat] = {}
  if (chats) {
    if (!('mute' in chats)) chats.mute = false
      if (!('antilink' in chats)) chats.antilink = false
        if (!('mentionsTag' in chats)) chats.mentionsTag = { antiMention: false, autoKick: false }
          if (!('antiurl' in chats)) chats.antiurl = { antiurls: false, autoKickurl: false, setMessageUrl: true }
        } else global.db.data.chats[m.chat] = {
          mute: false,
          antilink: false,
          mentionsTag: { antiMention: false, autoKick: false },
          antiurl: { antiurls: false, autoKickurl: false, setMessageUrl: true },
        }

        let setting = global.db.data.settings[botNumber]
        const now = new Date();
        if (typeof setting !== 'object') global.db.data.settings[botNumber] = {}
          if (setting) {
            if (!isNumber(setting.status)) setting.status = 0
              if (!isNumber(setting.hit)) setting.hit = 0
                if (!isNumber(setting.resetlimit)) setting.resetlimit = { dateYesterday:  new Date().getDate(), boolLimit: false }
                  if (!('earthquakeData' in setting)) setting.earthquakeData = null
                    if (!('autobio' in setting)) setting.autobio = true
                      if (!('changelog' in setting)) setting.changelog = []
                        if (!('templateImage' in setting)) setting.templateImage = false
                          if (!('templateVideo' in setting)) setting.templateVideo = false
                            if (!('templateGif' in setting)) setting.templateGif = false
                              if (!('templateLoc' in setting)) setting.templateLoc = true
                                if (!('templateMsg' in setting)) setting.templateMsg = false    
                              } else global.db.data.settings[botNumber] = {
                                status: 0,
                                hit: 0,
resetlimit: { dateYesterday:  new Date().getDate(), boolLimit: false }, // Fixed this line
earthquakeData: null,
autobio: true,
changelog: [],
templateImage: false,
templateVideo: false,
templateGif: false,
templateLoc: true,
templateMsg: false,
}


if (m.message) {
  console.log(chalk.black(chalk.bgGreen('[ TIME ]')), chalk.black(chalk.bgGreen(new Date)) + '\n' + chalk.white('[ PESAN ]'), chalk.black(chalk.bgBlue(budy || m.mtype)) + '\n' + chalk.magenta('=> Dari'), chalk.green(pushname), chalk.yellow(m.sender) + '\n' + chalk.blueBright('=> Di'), chalk.green(m.isGroup ? groupName : 'Private Chat', m.chat))
  // console.log(m)
}

cmhit.push(command)
global.db.data.settings[botNumber].hit += 1

if (isBan) {
  return m.reply('> _ⓘ Maaf kamu sudah terbanned permanen di bot ini_')
} 

async function getLidFromJid(id) {
  if (id.endsWith("@lid")) return id;
  const res = await rebot.onWhatsApp(id).catch(() => []);
  // console.log(res)
  return res[0]?.lid || id;
}

async function normalizedMention(id) {
  if (id.startsWith("@")) {
    let lidNumber = id.replace(/^@/, '') 
    let userLid = lidNumber + '@lid'
    let userEntry = Object.values(global.db.data.users).find(u => u.lid === userLid)
    if (userEntry) {
      let res = userEntry.jid
      console.log(userLid + "<-->" + res)
      return res
    }
  } else {
    let res = id.replace(/[^0-9]/g, '') + '@s.whatsapp.net'
    console.log(res)
    return res
  }
}


/////////////////////////Funcion moderator/////////////////////////////// 

const expiredModeratorCheck = (rebot, db) => {
  setInterval(() => {
    Object.keys(db.data.users).forEach((jid) => {
      let user = db.data.users[jid];
// Pastikan user memiliki properti premium dan waktu expired tidak nol
      if (
        user.moderator && 
        user.moderator.status === true && 
        user.moderator.expired !== 0 &&
        Date.now() >= user.moderator.expired
        ) {
// Reset status premium dan limit ke nilai free
        user.moderator = { status: false, expired: 0 };

// Kirim notifikasi ke user bahwa premium telah expired
      rebot.sendText(jid, '「 *moderator Expired* 」\n\n*_Masa moderator kamu sudah berakhir, sekarang kamu tidak lagi Menjadi Moderator_*\n\n> _ⓘ Jika kamu ingin membeli bisa ketik .toko atau chat owner_');
      rebot.sendText(global.ownerJid+`@s.whatsapp.net`,`*「  MODERATOR EXPIRED 」* \n\nHai Owner! Waktu moderator *${jid}*, Telah Berakhir!`, m);

    }
  });
}, 1000); // Pengecekan dilakukan setiap 1 detik
};

expiredModeratorCheck(rebot, global.db)
/////////////////////////end function///////////////////////////////



/////////////////////////Funcion antispam/////////////////////////////// 

// function extractCommands(filePath) {
//   const content = fs.readFileSync(filePath, 'utf8');
//   const regex = /case\s+'([^']+)'(?=:)/g;
//   let match;
//   const cmdTect = [];

//   while ((match = regex.exec(content)) !== null) {
//     cmdTect.push(match[1]);
//   }

//   return cmdTect;
// }

// const cmdTecth = extractCommands(path.join(__dirname, 'rebot.js'));


if (!isCreator && isCmd && checkUserMessageLimit(m.sender)) {
  const spamTime = toMs("30m")
const additionalTime = toMs("10m"); // Waktu tambahan 15 menit
const user = global.db.data.users[m.sender]

if (!isBanspam) {
  user.banspam = { status: true, expired: Date.now() + spamTime };
} else {
  const remainingTime = user.banspam.expired - Date.now();
  const newDuration = remainingTime + additionalTime;
  user.banspam.expired += toMs(`${newDuration}ms`);
  m.reply('> _ⓘ Melakukan spam saat masa banned/coldown, waktu coldown kamu ditambahkan 5 menit_')
}

rebot.sendText(`6289692509996@s.whatsapp.net`, 'SPAM DETECTION!!', m);
m.reply('> _ⓘ Maaf kamu terdeteksi melakukan spam, kamu akan dibanned dan tidak bisa menggunakan fitur bot sementara dengan coldown waktu 60 menit_\n> _Silahkan gunakan fitur .cekspam untuk melihat detail coldown_');
}

const expiredBanSpam = (rebot, db) => {
  setInterval(() => {
    Object.keys(db.data.users).forEach((jid) => {
      let user = db.data.users[jid];
// Pastikan user memiliki properti premium dan waktu expired tidak nol
      if (
        user.banspam && 
        user.banspam.status === true && 
        user.banspam.expired !== 0 &&
        Date.now() >= user.banspam.expired
        ) {
// Reset status premium dan limit ke nilai free
        user.banspam = { status: false, expired: 0 };

// Kirim notifikasi ke user bahwa premium telah expired
      rebot.sendText(jid, '「 *Masa Banned Selesai* 」 \n\n*_Waktu banned kamu sudah selesai, Sekarang kamu sudah bisa menggunakan bot kembali_*\n\n> _ⓘ Mohon agar tidak melakukan spam lagi!!_')
     // rebot.sendText(global.ownerJid+`@s.whatsapp.net`,`*「  MODERATOR EXPIRED 」* \n\nHai Owner! Waktu moderator *${jid}*, Telah Berakhir!`, m);

    }
  });
}, 1000); // Pengecekan dilakukan setiap 1 detik
};

expiredBanSpam(rebot, global.db)
/////////////////////////end function///////////////////////////////


switch (command) {
case "tes":
  if (isBanspam) return m.reply(mess.spam)

    await rebot.sendMessage(m.chat, { text: "✅ Done! Active and working." }, { quoted: m });
    // console.log(m)
  break;

case 'public': {
  if (!isCreator) return m.reply(mess.owner)
    rebot.public = true
  m.reply('Sukse Change To Public Usage')
}
break
case 'self': {
  if (!isCreator) return m.reply(mess.owner)
    rebot.public = false
  m.reply('Sukses Change To Self Usage')
}
break

  ////////////////////////GROUP FITUR////////////////////////

  case 'groupinfo':
case 'infogrup': {
  if (!m.isGroup) return m.reply(mess.group);
  if (isBanspam) return m.reply(mess.spam);
  
  try {
    // Ini akan pakai cache
    const metadata = await store.groupMetadata(m.chat, rebot);
    
    if (!metadata) {
      return m.reply('❌ Gagal mendapatkan info grup');
    }
    
    const participants = metadata.participants || [];
    const admins = participants.filter(p => p.admin).map(p => p.id);
    
    let txt = `📱 *GROUP INFO*\n\n`;
    txt += `📌 *Name:* ${metadata.subject}\n`;
    txt += `🆔 *ID:* ${metadata.id}\n`;
    txt += `👥 *Members:* ${participants.length}\n`;
    txt += `👑 *Admins:* ${admins.length}\n`;
    txt += `📅 *Created:* ${new Date(metadata.creation * 1000).toLocaleDateString()}\n`;
    txt += `🔒 *Settings:* ${metadata.announce ? 'Only Admins' : 'All Members'}\n`;
    txt += `✏️ *Edit Info:* ${metadata.restrict ? 'Only Admins' : 'All Members'}\n`;
    
    if (metadata.desc) {
      txt += `\n📝 *Description:*\n${metadata.desc}`;
    }
    
    m.reply(txt);
    
  } catch (err) {
    throw err
  }
}
break;

case 'cachestatus':
case 'cacheinfo':
case 'statuscache': {
  if (!isCreator) return m.reply(mess.owner);
  
  try {
    const cacheData = global.cacheHelpers.getStats();
    
    let txt = `📊 *GROUP METADATA CACHE STATUS*\n\n`;
    txt += `╭─────────────────\n`;
    txt += `│ 🔑 *Cached Groups:* ${cacheData.totalCached}\n`;
    txt += `│ ✅ *Cache Hits:* ${cacheData.hits}\n`;
    txt += `│ ❌ *Cache Misses:* ${cacheData.misses}\n`;
    txt += `│ 📈 *Hit Rate:* ${cacheData.hitRate}%\n`;
    txt += `╰─────────────────\n\n`;
    
    if (cacheData.totalCached > 0) {
      txt += `📋 *Cached Groups (${Math.min(10, cacheData.totalCached)} shown):*\n\n`;
      
      const keys = cacheData.keys.slice(0, 10);
      
      for (let i = 0; i < keys.length; i++) {
        const jid = keys[i];
        const info = global.cacheHelpers.getCacheInfo(jid);
        
        const groupName = info?.data?.subject || info?.data?.name || 'Unknown Group';
        const membersCount = info?.data?.participants?.length || 0;
        const expiresIn = info?.expiresIn || 0;
        const expiresMin = expiresIn > 0 ? Math.floor(expiresIn / 60) : 0;
        
        txt += `${i + 1}. *${groupName}*\n`;
        txt += `   📱 ID: ${jid.split('@')[0]}\n`;
        txt += `   ⏳ Expires: ${expiresMin}m (${expiresIn}s)\n`;
        txt += `   👥 Members: ${membersCount}\n\n`;
      }
      
      if (cacheData.totalCached > 10) {
        txt += `_... and ${cacheData.totalCached - 10} more groups_\n\n`;
      }
    } else {
      txt += `📭 *No groups cached yet*\n\n`;
      txt += `💡 Groups will be cached automatically when accessed\n\n`;
    }
    
    txt += `⚙️ *Cache TTL:* 1 hour per group`;
    
    await rebot.sendMessage(m.chat, { text: txt }, {quoted: m } );
    
  } catch (err) {
    console.error('Cache status error:', err);
    throw err;
  }
}
break;

// 2. Check Cache - Cek cache grup saat ini
case 'checkcache':
case 'cekcache':
case 'cekgroupcache': {
  if (!m.isGroup) return m.reply(mess.group);
  if (!isAdmins && !isCreator) return m.reply(mess.admin)

    try {
      const info = global.cacheHelpers.getCacheInfo(m.chat);

      let txt = `📦 *CACHE INFO FOR THIS GROUP*\n\n`;
      txt += `╭─────────────────\n`;
      txt += `│ 📌 *Group:* ${groupMetadata.subject || 'Unknown'}\n`;
      txt += `│ 🆔 *ID:* ${m.chat.split('@')[0]}\n`;
      txt += `│ 📊 *Status:* ${info.exists ? '✅ Cached' : '❌ Not Cached'}\n`;
      txt += `╰─────────────────\n\n`;

      if (info.exists) {
        const expiresMinutes = Math.floor(info.expiresIn / 60);
        const expiresSeconds = info.expiresIn % 60;

        txt += `⏱️ *Cache Info:*\n`;
        txt += `├ Expires in: ${expiresMinutes}m ${expiresSeconds}s\n`;
        txt += `├ Members: ${info.data.participants.length}\n`;
        txt += `├ Admins: ${info.data.participants.filter(p => p.admin).length}\n`;
        txt += `├ Created: ${new Date(info.data.creation * 1000).toLocaleDateString()}\n`;
        txt += `└ Last updated: Fresh\n\n`;
        txt += `💡 Cache akan auto-refresh dalam ${expiresMinutes} menit`;
      } else {
        txt += `⚠️ *Not Cached Yet*\n\n`;
        txt += `💡 Cache akan dibuat otomatis saat metadata diakses.\n`;
        txt += `Gunakan *.refreshgroup* untuk cache sekarang.`;
      }

      await m.reply(txt);

    } catch (err) {
      throw err
    }
  }
  break;

// 3. Refresh Group Cache - Refresh cache grup saat ini
case 'refreshgroupcache':
case 'refreshgroup':
case 'refreshcache': {
  if (!m.isGroup) return m.reply(mess.group);
  if (!isAdmins && !isCreator) return m.reply(mess.admin);
  
  try {
    m.reply('🔄 Refreshing group cache...');
    
    // Invalidate current cache
    global.cacheHelpers.invalidate(m.chat);
    
    // Fetch fresh data
    const metadata = await store.groupMetadata(m.chat, rebot);
    
    if (!metadata) {
      return m.reply('❌ Failed to fetch group metadata');
    }
    
    const admins = metadata.participants.filter(p => p.admin).length;
    
    let txt = `✅ *GROUP CACHE REFRESHED!*\n\n`;
    txt += `╭─────────────────\n`;
    txt += `│ 📌 *Name:* ${metadata.subject}\n`;
    txt += `│ 👥 *Members:* ${metadata.participants.length}\n`;
    txt += `│ 👑 *Admins:* ${admins}\n`;
    txt += `│ 🔒 *Settings:* ${metadata.announce ? 'Only Admins' : 'All Members'}\n`;
    txt += `│ ✏️ *Edit Info:* ${metadata.restrict ? 'Admins Only' : 'All Members'}\n`;
    txt += `╰─────────────────\n\n`;
    txt += `⏱️ Cache akan expire dalam 1 jam`;
    
    m.reply(txt);
    
  } catch (err) {
    throw err
  }
}
break;

// 4. Clear Cache - Hapus cache tertentu atau semua
case 'clearcache':
case 'cleargroupcache':
case 'hapuscache': {
  if (!isCreator) return m.reply(mess.owner);
  
  try {
    const stats = global.cacheHelpers.getStats();
    const beforeCount = stats.totalCached;
    
    if (beforeCount === 0) {
      return m.reply('📭 No cache to clear!');
    }
    
    // Clear all cache
    global.cacheHelpers.clear();
    
    let txt = `✅ *CACHE CLEARED SUCCESSFULLY*\n\n`;
    txt += `🗑️ Cleared: ${beforeCount} group caches\n`;
    txt += `💾 Memory freed\n\n`;
    txt += `💡 Cache akan dibuat ulang otomatis saat dibutuhkan`;
    
    m.reply(txt);
    
  } catch (err) {
    throw err
  }
}
break;

// 5. Clear This Group Cache - Hapus cache grup saat ini saja
case 'clearthiscache':
case 'hapuscacheini': {
  if (!m.isGroup) return m.reply(mess.group);
  if (!isAdmins && !isCreator) return m.reply(mess.admin);
  
  try {
    const info = global.cacheHelpers.getCacheInfo(m.chat);
    
    if (!info.exists) {
      return m.reply('📭 This group is not cached yet!');
    }
    
    // Invalidate this group's cache
    global.cacheHelpers.invalidate(m.chat);
    
    let txt = `✅ *CACHE CLEARED*\n\n`;
    txt += `📌 Group: ${info.data.subject}\n`;
    txt += `🗑️ Cache untuk grup ini telah dihapus\n\n`;
    txt += `💡 Cache akan dibuat ulang saat metadata diakses lagi`;
    
    m.reply(txt);
    
  } catch (err) {
    throw err
  }
}
break;

// 6. List Cached Groups - List semua grup yang di-cache
case 'listcache':
case 'listcachedgroups':
case 'cachedgroups': {
  if (!isCreator) return m.reply(mess.owner);
  
  try {
    const cachedGroups = global.cacheHelpers.getCachedGroups();
    
    if (cachedGroups.length === 0) {
      return m.reply('📭 *No groups cached yet*\n\nGroups akan di-cache otomatis saat metadata diakses.');
    }
    
    let txt = `📋 *CACHED GROUPS LIST*\n\n`;
    txt += `Total: ${cachedGroups.length} groups\n`;
    txt += `════════════════════\n\n`;
    
    const maxShow = 20;
    for (let i = 0; i < Math.min(maxShow, cachedGroups.length); i++) {
      const jid = cachedGroups[i];
      const info = global.cacheHelpers.getCacheInfo(jid);
      
      const expiresMin = Math.floor(info.expiresIn / 60);
      
      txt += `*${i + 1}. ${info.data?.subject || 'Unknown Group'}*\n`;
      txt += `   📱 ${jid.split('@')[0]}\n`;
      txt += `   👥 ${info.data?.participants?.length || 0} members\n`;
      txt += `   ⏳ ${expiresMin}m remaining\n`;
      txt += `   ────────────────\n`;
    }
    
    if (cachedGroups.length > maxShow) {
      txt += `\n_... and ${cachedGroups.length - maxShow} more groups_\n`;
      txt += `\nUse *.cachestatus* for full statistics`;
    }
    
    await m.reply(txt);
    
  } catch (err) {
    throw err
  }
}
break;

// 7. Preload Cache - Preload semua grup
case 'preloadcache':
case 'loadcache':
case 'warmcache': {
  if (!isCreator) return m.reply(mess.owner);
  
  try {
    m.reply('🔄 *Starting cache preload...*\n\nThis may take a while depending on number of groups.');
    
    const startTime = Date.now();
    const result = await global.cacheHelpers.preload(rebot);
    const duration = ((Date.now() - startTime) / 1000).toFixed(2);
    
    if (result.success) {
      let txt = `✅ *CACHE PRELOAD COMPLETE*\n\n`;
      txt += `╭─────────────────\n`;
      txt += `│ 📦 *Loaded:* ${result.count} groups\n`;
      txt += `│ ⏱️ *Duration:* ${duration}s\n`;
      txt += `│ 💾 *Status:* All cached\n`;
      txt += `╰─────────────────\n\n`;
      txt += `🚀 All group metadata is now cached and ready!\n`;
      txt += `⏱️ Cache will expire in 1 hour`;
      
      await m.reply(txt);
    } else {
      m.reply(`❌ *Preload failed*\n\nError: ${result.error}\n\nSome groups may still be cached.`);
    }
    
  } catch (err) {
    throw err
  }
}
break;

   ////////////////////////END GROUP FITUR////////////////////////

case 'metadata' : {
  if (!isModerator) return m.reply(mess.mod)
    if (isBanspam) return m.reply(mess.spam)

      let target = text
    ? await normalizedMention(text)
    : m.quoted
    ? m.quoted.sender
    : m.sender;
  // console.log(target)
    let chatData = global.db.data.users[target] || {};

// Format data menjadi string JSON yang rapi
    let formattedData = JSON.stringify(chatData, null, 2);

// Kirimkan pesan dengan isi database
    m.reply(`Database: \n\`\`\`${formattedData}\`\`\``);
  }
  break

case 'moderator': {
  if (!isCreator) return m.reply("Hanya owner/creator yang dapat menggunakan perintah ini.");

  let [action, expired, num] = text.split(" ");
  if (!action || (action !== 'add' && action !== 'del')) {
    return m.reply("Format salah! Gunakan .premium [add|del] [expired] <noinput628../reply/mention");
  }

  let target = num
  ? await normalizedMention(num)
  : m.quoted
  ? m.quoted.sender
  : null;

  if (!target) return m.reply("Silahkan sebutkan target!\n.premium [add|del] [expired] <noinput628../reply/mention");


// Proses add atau del premium
  if (action === 'add') {
    if (!expired) return m.reply("Format waktu tidak valid! Gunakan seperti 1d, 7h, 30m.");
    global.db.data.users[target].moderator = { status: true, expired: Date.now() + toMs(expired) };
    global.db.data.users[target].limit = global.limitawal.moderator;
    rebot.sendTextWithMentions(m.chat,`✅ *@${target.split('@')[0]}* sekarang menjadi moderator bot selama *${expired}*!`, m);
    await rebot.sendMessage(target, { text: `🎉 Selamat! Kamu telah menjadi *moderator* selama *${expired}*!\n\n> _Gunakan fitur .cekmoderator untuk melihat sisa waktu atau expired_` });
  } else if (action === 'del') {
    global.db.data.users[target].moderator = { status: false, expired: 0 };
    global.db.data.users[target].limit = global.limitawal.free;
    m.reply(`Berhasil menghapus moderator dari ${target}`);
  }
}
break;

case 'moderatorheck':
case 'checkmoderator':
case 'moderatorcek':
case 'cekmoderator': {
  if (isBanspam) return m.reply(mess.spam)
    let dbprem = user
  if (!user.moderator.status) return m.reply(`> _Kamu tidak terdaftar sebagai moderator. Ketik ${prefix}toko untuk membeli hak moderator_`)
    let cekvip = ms(dbprem.moderator.expired - Date.now())
  let premiumnya = `*「  MODERATOR EXPIRED 」*\n\n➸ *ID*: ${m.sender}\n➸ *Expired :* ${cekvip.days} day(s) ${cekvip.hours} hour(s) ${cekvip.minutes} minute(s)`
  m.reply(premiumnya)
}
break

case 'addlimit': {
  if (!isCreator) return m.reply(mess.owner);

  try {
    let [jmlh, num] = text.split(" ");
    let jumlah = parseInt(jmlh)
    if (isNaN(jumlah) || jumlah <= 0) return m.reply('> _ⓘ Masukkan angka limit yang valid!_\n_Example:.addlimit 5 62..._');

    let target = num
    ? await normalizedMention(num)
    : m.quoted
    ? m.quoted.sender
    : null;

    if (!target) return m.reply('> _ⓘ Harap reply pengguna atau masukkan nomor target dengan format 62...!_\n> _Example:.addlimit 5 62..._');
    if (!global.db.data.users[target]) return m.reply('> _ⓘ Pengguna tidak ditemukan dalam database!_');

    global.db.data.users[target].limit += jumlah;

    rebot.sendTextWithMentions(m.chat,`✅ Berhasil menambahkan *${jumlah}* limit ke *@${target.split('@')[0]}*!`, m);

// Kirim notifikasi ke target
    await rebot.sendMessage(target, { text: `📢 Kamu mendapatkan tambahan *${jumlah}* limit dari Owner!` });

  } catch (err) {
    console.error(err);
    m.reply('❌ Terjadi kesalahan! Transaksi dibatalkan.');
  }
}
break;

case 'dellimit': {
  if (!isCreator) return m.reply(mess.owner);

  try {
    let [jmlh, num] = text.split(" ");
    let jumlah = parseInt(jmlh)
    if (isNaN(jumlah) || jumlah <= 0) return m.reply('> _ⓘ Masukkan angka limit yang valid!_\n_Example:.dellimit 5 62..._');

    let target = num
    ? await normalizedMention(num)
    : m.quoted
    ? m.quoted.sender
    : null;

    if (!target) return m.reply('> _ⓘ Harap reply pengguna atau masukkan nomor target dengan format 62...!_\n> _Example:.dellimit 5 62..._');
    if (!global.db.data.users[target]) return m.reply('> _ⓘ Pengguna tidak ditemukan dalam database!_');

    global.db.data.users[target].limit -= jumlah;

    rebot.sendTextWithMentions(m.chat,`✅ Berhasil menghapus *${jumlah}* limit ke *@${target.split('@')[0]}*!`, m);


  } catch (err) {
    console.error(err);
    m.reply('❌ Terjadi kesalahan! Transaksi dibatalkan.');
  }
}
break;

case 'transferlimit': case 'tflimit': {
  if (isBanspam) return m.reply(mess.spam)
    try {
      let [jmlh, num] = text.split(" ");
      let jumlah = parseInt(jmlh)
      let target = num
      ? await normalizedMention(num)
      : m.quoted
      ? m.quoted.sender
      : null;

      if (!jumlah || isNaN(jumlah) || jumlah <= 0) return m.reply('> _ⓘ Masukkan nominal limit yang valid!_\n> _Example:.transferlimit 5 62..._');
      if (!target) return m.reply('> _ⓘ Masukkan nomor target dengan format 62...!_\n> _Example:.transferlimit 5 62..._');
      if (!global.db.data.users[target]) return m.reply('> _ⓘ Pengguna tidak ditemukan dalam database!_');
      if (!user) return m.reply('> _ⓘ Data kamu tidak ditemukan dalam database!_');

      let senderLimit = user.limit;
      if (senderLimit < jumlah) return m.reply('> _ⓘ Limit kamu tidak mencukupi untuk transfer ini!_');

// Kurangi limit pengirim dan tambahkan ke penerima
      user.limit -= jumlah;
      global.db.data.users[target].limit += jumlah;

      rebot.sendTextWithMentions(m.chat,`✅ Berhasil mentransfer *${jumlah}* limit ke *@${target.split('@')[0]}*!`,m);

// Kirim notifikasi ke target
      await rebot.sendMessage(target, { text: `📢 Kamu menerima *${jumlah}* limit dari *@${m.sender.split('@')[0]}*!`});

    } catch (err) {
      console.error(err);
      m.reply('❌ Terjadi kesalahan! Transaksi dibatalkan.');
    }
  }
  break;

case 'ban': {
  if (!isModerator) return m.reply(mess.mod);
  if (isBanspam) return m.reply(mess.spam)

    let num = args[1]

  let target = num
  ? await normalizedMention(num)
  : m.quoted
  ? m.quoted.sender
  : null;

  if (!target) return m.reply("Silahkan sebutkan target!\n.premium [add|del] <noinput628../reply/mention");


// Proses add atau del 
  if (args[0] === 'add') {
    global.db.data.users[target].banned = true
    rebot.sendTextWithMentions(m.chat,`✅ User dengan ID *@${target.split('@')[0]}* Sukse diban`, m);
  } else if (args[0] === 'del') {
    global.db.data.users[target].banned = false
    m.reply(`Berhasil membuka ban dari ${target}`);
  }
}
break;

case 'spamcheck':
case 'cekspam': {
  if (!isBanspam) return m.reply(`> _ⓘ Fitur Khusus bagi pengguna yang telah melakukan spam dan mendapatkan penalti_`)
    let cekspamm = ms(user.banspam.expired - Date.now())
  let sispamnya = `*「 SPAM EXPIRE 」*\n\n➸ *ID*: ${m.sender}\n➸ *Expired :* ${cekspamm.days} day(s) ${cekspamm.hours} hour(s) ${cekspamm.minutes} minute(s)`
  m.reply(sispamnya)
}
break

case 'spamlist':
case 'listspam': {
  if (!isModerator) return m.reply(mess.mod);

  let users = global.db.data.users;
  let spamUsers = Object.entries(users).filter(([jid, data]) => data.banspam && data.banspam.status);

  if (spamUsers.length === 0) return m.reply("> _ⓘ Tidak ada user yang sedang terkena banspam._");

  let txt = `📑 *List Spam*\nJumlah: ${spamUsers.length}\n\n`;

  for (let [jid, data] of spamUsers) {
    let sisa = data.banspam.expired - Date.now();
    if (sisa < 0) continue; // kalau sudah lewat, skip

    let seconds = Math.floor(sisa / 1000) % 60;
    let minutes = Math.floor(sisa / (1000 * 60)) % 60;
    let hours   = Math.floor(sisa / (1000 * 60 * 60)) % 24;
    let days    = Math.floor(sisa / (1000 * 60 * 60 * 24));

    txt += `*ID:* @${jid.split('@')[0]}\n`;
    txt += `*Expire:* ${days} day(s) ${hours} hour(s) ${minutes} minute(s) ${seconds} second(s)\n\n`;
  }

  rebot.sendTextWithMentions(m.chat, txt, m);
}
break;

case 'banspam': {
  if (!isModerator) return m.reply(mess.mod);

  let [action, expired, num] = text.split(" ");
  if (!action || (action !== 'add' && action !== 'del')) {
    return m.reply("Format salah! Gunakan .banspam [add|del] [expired] <noinput628../reply/mention");
  }

  let target = num
  ? await normalizedMention(num)
  : m.quoted
  ? m.quoted.sender
  : null;

  if (!target) return m.reply("Silahkan sebutkan target!\n.banspam [add|del] [expired] <noinput628../reply/mention");


// Proses add atau del premium
  if (action === 'add') {
    if (!expired) return m.reply("Format waktu tidak valid! Gunakan seperti 1d, 7h, 30m.");
    global.db.data.users[target].banspam = { status: true, expired: Date.now() + toMs(expired) };
    rebot.sendTextWithMentions(m.chat,`✅ *@${target.split('@')[0]}* dibanned selama *${expired}*!`, m);
  } else if (action === 'del') {
    global.db.data.users[target].banspam = { status: false, expired: 0 };
    m.reply(`Berhasil menghapus baspam dari ${target}`);
  }
}
break;

  case 'ping':
case 'tes':
case 'botstatus':
case 'statusbot':
case 'status': {
  if (isBanspam) return m.reply(mess.spam);

  try {
    // Send loading message
    const loadingMsg = await m.reply('📊 _Collecting system information..._');

    // ===== 1. LATENCY & RESPONSE TIME =====
    const startTime = Date.now();
    const pingStart = performance.now();

    // Simulate actual ping
    await new Promise(resolve => setTimeout(resolve, 10));

    const pingEnd = performance.now();
    const responseTime = (pingEnd - pingStart).toFixed(2);

    // ===== 2. BAILEYS & BOT VERSION =====
    const packageJsonBailVersion = JSON.parse(await fs.readFileSync('./node_modules/@whiskeysocket/baileys/package.json', 'utf8'));
    const BotVersion = JSON.parse(await fs.readFileSync('./package.json', 'utf8'));

    // ===== 3. RUNTIME =====
    const uptime = process.uptime();
    const runtimeStr = runtime(uptime);

    // ===== 4. MEMORY USAGE =====
    const memUsage = process.memoryUsage();
    const formatMemory = (bytes) => {
      const mb = bytes / 1024 / 1024;
      return mb.toFixed(2) + ' MB';
    };

    // ===== 5. CPU USAGE (2 SAMPLES) =====
    const cpus = os.cpus();
    const cpuModel = cpus[0].model.trim();
    const cpuSpeed = cpus[0].speed;
    const cpuCores = cpus.length;

    // Get CPU usage (sample 1)
    const getCPUInfo = () => {
      const cpus = os.cpus();
      let totalIdle = 0, totalTick = 0;

      cpus.forEach(cpu => {
        for (let type in cpu.times) {
          totalTick += cpu.times[type];
        }
        totalIdle += cpu.times.idle;
      });

      return { idle: totalIdle / cpus.length, total: totalTick / cpus.length };
    };

    const startCPU = getCPUInfo();

    // Wait 100ms for second sample
    await new Promise(resolve => setTimeout(resolve, 100));

    const endCPU = getCPUInfo();

    // Calculate CPU usage percentage
    const idleDiff = endCPU.idle - startCPU.idle;
    const totalDiff = endCPU.total - startCPU.total;
    const cpuUsage = (100 - ~~(100 * idleDiff / totalDiff));

    // ===== 6. OS INFORMATION =====
    const platform = os.platform();
    const osType = os.type();
    const osRelease = os.release();
    const osArch = os.arch();
    const hostname = os.hostname();

    // Format platform name
    const platformNames = {
      'linux': '🐧 Linux',
      'darwin': '🍎 macOS',
      'win32': '🪟 Windows',
      'android': '🤖 Android'
    };
    const platformName = platformNames[platform] || platform;

    // ===== 7. SYSTEM MEMORY =====
    const totalMem = os.totalmem();
    const freeMem = os.freemem();
    const usedMem = totalMem - freeMem;
    const memPercentage = ((usedMem / totalMem) * 100).toFixed(2);

    // ===== 8. LOAD AVERAGE (Linux/macOS only) =====
    let loadAvg = '';
    try {
      const loads = os.loadavg();
      loadAvg = `${loads[0].toFixed(2)}, ${loads[1].toFixed(2)}, ${loads[2].toFixed(2)}`;
    } catch (e) {
      loadAvg = 'N/A';
    }

    // ===== 9. BOT INFORMATION =====
    const nodeVersion = process.version;
    const botPID = process.pid;

    // ===== 10. DATABASE INFO =====
    const totalUsers = Object.keys(global.db?.data?.users || {}).length;
    const totalGroups = Object.keys(global.db?.data?.chats || {}).length;

    // ===== BUILD RESPONSE =====
    let statusText = `╭─❑ 「 *BOT STATUS* 」 ❑─\n`;
    statusText += `│\n`;

    // Response Time
    statusText += `│ ⚡ *Response Time*\n`;
    statusText += `│ ├ Latency: ${responseTime} ms\n`;
    statusText += `│ └ Speed: ${(1000 / parseFloat(responseTime)).toFixed(2)} msg/s\n`;
    statusText += `│\n`;

    // Runtime
    statusText += `│ ⏰ *Runtime*\n`;
    statusText += `│ └ ${runtimeStr}\n`;
    statusText += `│\n`;

    // Bot Info
    statusText += `│ 🤖 *Bot Information*\n`;
    statusText += `│ ├ Bot Name: v${global.botName}\n`;
    statusText += `│ ├ Bot Version: v${BotVersion.version}\n`;
    statusText += `│ ├ Mode : ${rebot.public ? 'Public' : 'Self'}\n`;
    statusText += `│ ├ Baileys: v${packageJsonBailVersion.version}\n`;
    statusText += `│ ├ Node.js: ${nodeVersion}\n`;
    statusText += `│ ├ PID: ${botPID}\n`;
    statusText += `│ ├ Users: ${totalUsers}\n`;
    statusText += `│ └ Groups: ${totalGroups}\n`;
    statusText += `│\n`;

    // Server Info
    statusText += `│ 💻 *Server Information*\n`;
    statusText += `│ ├ OS: ${platformName}\n`;
    statusText += `│ ├ Type: ${osType}\n`;
    statusText += `│ ├ Release: ${osRelease}\n`;
    statusText += `│ ├ Arch: ${osArch}\n`;
    statusText += `│ └ Hostname: ${hostname}\n`;
    statusText += `│\n`;

    // CPU Info
    statusText += `│ 🔥 *CPU Information*\n`;
    statusText += `│ ├ Model: ${cpuModel}\n`;
    statusText += `│ ├ Cores: ${cpuCores}\n`;
    statusText += `│ ├ Speed: ${cpuSpeed} MHz\n`;
    statusText += `│ ├ Usage: ${cpuUsage}%\n`;
    statusText += `│ └ Load Avg: ${loadAvg}\n`;
    statusText += `│\n`;

    // Memory Info
    statusText += `│ 💾 *Memory Information*\n`;
    statusText += `│\n`;
    statusText += `│ *System Memory*\n`;
    statusText += `│ ├ Total: ${formatp(totalMem)}\n`;
    statusText += `│ ├ Used: ${formatp(usedMem)} (${memPercentage}%)\n`;
    statusText += `│ └ Free: ${formatp(freeMem)}\n`;
    statusText += `│\n`;
    statusText += `│ *Process Memory*\n`;
    statusText += `│ ├ RSS: ${formatMemory(memUsage.rss)}\n`;
    statusText += `│ ├ Heap Used: ${formatMemory(memUsage.heapUsed)}\n`;
    statusText += `│ ├ Heap Total: ${formatMemory(memUsage.heapTotal)}\n`;
    statusText += `│ └ External: ${formatMemory(memUsage.external)}\n`;
    statusText += `│\n`;

    statusText += `╰──────❑\n\n`;
    statusText += `_Updated: ${new Date().toLocaleString('id-ID', { timeZone: 'Asia/Jakarta' })}_`;

    // Send status
    await rebot.sendMessage(m.chat, { 
      text: statusText 
    }, { quoted: m });

  } catch (err) {
    throw err
  }
}
break;


default:
 if (budy.startsWith(">")) {
    try {
      if (!isCreator) return
        let evaled = await eval(budy.slice(1));
      if (typeof evaled !== "string") {
        evaled = util.inspect(evaled);
      }
      await m.reply(evaled);
    } catch (err) {
      await m.reply(String(err));
    }
  }

  if (budy.startsWith('$')) {
    if (!isCreator) return 
      exec(budy.slice(2), (err, stdout) => {
        if(err) return m.reply(err)
          if (stdout) return m.reply(stdout)
        })
  }

  if (/^(bot|rebot)/i.test(budy)) {
    if (isBan) return m.reply('> _ⓘ Maaf kamu sudah terbanned permanen di bot ini_')
      if (isBanspam) return m.reply(mess.spam)
        if (m.key.fromMe) return

          m.reply(`Hai aku Rebot, ada yang bisa aku bantu? Silahkan Ketik ${prefix}menu`)
      }
  
}
} catch (err) {
  await rebot.sendMessage(m.chat, { text: util.format(err) }, { quoted: m });
}
}
