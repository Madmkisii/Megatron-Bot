

const { zokou } = require("../framework/zokou")
//const { getGroupe } = require("../bdd/groupe")
const { Sticker, StickerTypes } = require('wa-sticker-formatter');
const {ajouterOuMettreAJourJid,mettreAJourAction,verifierEtatJid} = require("../bdd/antilien")
const {atbajouterOuMettreAJourJid,atbverifierEtatJid} = require("../bdd/antibot")
const { search, download } = require("aptoide-scraper");
const fs = require("fs-extra");
const conf = require("../set");
const { default: axios } = require('axios');
//const { uploadImageToImgur } = require('../framework/imgur');





zokou({ nomCom: "tagall", categorie: 'Group', reaction: "📣" }, async (dest, zk, commandeOptions) => {

  const { ms, repondre, arg, verifGroupe, nomGroupe, infosGroupe, nomAuteurMessage, verifAdmin, superUser } = commandeOptions


 

  if (!verifGroupe) { repondre("✋🏿 ✋🏿this command is reserved for groups ❌"); return; }
  if (!arg || arg === ' ') {
  mess = 'Aucun Message'
  } else {
    mess = arg.join(' ')
  } ;
  let membresGroupe = verifGroupe ? await infosGroupe.participants : ""
  var tag = ""; 
  tag += `========================\n  
        ✞ *𝑴𝑬𝑮𝑨𝑻𝑹𝑶𝑵-𝑩𝑶𝑻* ✞
========================\n
👥 Group : ${nomGroupe} 🚀 
👤 Author : *${nomAuteurMessage}* 👋 
📜 Message : *${mess}* 📝
========================\n
\n

` ;




  let emoji = ['🦴', '👀', '😮‍💨', '❌', '✔️', '😇', '⚙️', '🔧', '🎊', '😡', '🙏🏿', '⛔️', '$','😟','🥵','🐅']
  let random = Math.floor(Math.random() * (emoji.length - 1))


  for (const membre of membresGroupe) {
    tag += `${emoji[random]}      @${membre.id.split("@")[0]}\n`
  }

 
 if (verifAdmin || superUser) {

  zk.sendMessage(dest, { text: tag, mentions: membresGroupe.map((i) => i.id) }, { quoted: ms })

   } else { repondre('command reserved for admins')}

});


zokou({ nomCom: "invite", categorie: 'Group', reaction: "🙋" }, async (dest, zk, commandeOptions) => {
  const { repondre, nomGroupe, nomAuteurMessage, verifGroupe } = commandeOptions;
  if (!verifGroupe) { repondre("wait bro , you want the link to my dm?"); return; };


  var link = await zk.groupInviteCode(dest)
  var lien = `https://chat.whatsapp.com/${link}`;

  let mess = `Hello ${nomAuteurMessage} , here is the group link of ${nomGroupe} \n

Click Here To Join :${lien}`
  repondre(mess)


});
/** *nommer un membre comme admin */
zokou({ nomCom: "promote", categorie: 'Group', reaction: "👨🏿‍💼" }, async (dest, zk, commandeOptions) => {
  let { repondre, msgRepondu, infosGroupe, auteurMsgRepondu, verifGroupe, auteurMessage, superUser, idBot } = commandeOptions;
  let membresGroupe = verifGroupe ? await infosGroupe.participants : ""
  if (!verifGroupe) { return repondre("For groups only"); }


  const verifMember = (user) => {

    for (const m of membresGroupe) {
      if (m.id !== user) {
        continue;
      }
      else { return true }
      //membre=//(m.id==auteurMsgRepondu? return true) :false;
    }
  }

  const memberAdmin = (membresGroupe) => {
    let admin = [];
    for (m of membresGroupe) {
      if (m.admin == null) continue;
      admin.push(m.id);

    }
    // else{admin= false;}
    return admin;
  }

  const a = verifGroupe ? memberAdmin(membresGroupe) : '';


  let admin = verifGroupe ? a.includes(auteurMsgRepondu) : false;
  let membre = verifMember(auteurMsgRepondu)
  let autAdmin = verifGroupe ? a.includes(auteurMessage) : false;
  zkad = verifGroupe ? a.includes(idBot) : false;
  try {
    // repondre(verifZokouAdmin)

    if (autAdmin || superUser) {
      if (msgRepondu) {
        if (zkad) {
          if (membre) {
            if (admin == false) {
              var txt = `🎊🍾  @${auteurMsgRepondu.split("@")[0]} Has been promoted as a group Admin by 𝛫𝛪𝛭𝛭𝑌.`
              await zk.groupParticipantsUpdate(dest, [auteurMsgRepondu], "promote");
              zk.sendMessage(dest, { text: txt, mentions: [auteurMsgRepondu] })
            } else { return repondre("𝑴𝒆𝒎𝒃𝒆𝒓 𝒊𝒔 𝒂𝒍𝒓𝒆𝒂𝒅𝒚 𝒂𝒏 𝒂𝒅𝒎𝒊𝒏.") }

          } else { return repondre("𝑼𝒔𝒆𝒓 𝒏𝒐𝒕 𝒂 𝒎𝒆𝒎𝒃𝒆𝒓 𝒐𝒇 𝒕𝒉𝒊𝒔 𝒈𝒓𝒐𝒖𝒑."); }
        }
        else { return repondre("𝑰𝒅𝒊𝒐𝒕, 𝑰 𝒂𝒎 𝒏𝒐𝒕 𝒂𝒅𝒎𝒊𝒏.") }

      } else { repondre("𝒑𝒍𝒆𝒂𝒔𝒆 𝒕𝒂𝒈 𝒎𝒆𝒎𝒃𝒆𝒓 𝒕𝒐 𝒃𝒆 𝒑𝒓𝒐𝒎𝒐𝒕𝒆𝒅"); }
    } else { return repondre("𝑭*𝒖𝒄𝒌𝒊𝒏 𝒓𝒆𝒕𝒂𝒓𝒅 𝒄𝒐𝒎𝒎𝒂𝒏𝒅 𝒊𝒔 𝒇𝒐𝒓 𝒈𝒓𝒐𝒖𝒑 𝒂𝒅𝒎𝒊𝒏𝒔.") }
  } catch (e) { repondre("oups " + e) }

})

//fin nommer
/** ***demettre */

zokou({ nomCom: "demote", categorie: 'Group', reaction: "👨🏿‍💼" }, async (dest, zk, commandeOptions) => {
  let { repondre, msgRepondu, infosGroupe, auteurMsgRepondu, verifGroupe, auteurMessage, superUser, idBot } = commandeOptions;
  let membresGroupe = verifGroupe ? await infosGroupe.participants : ""
  if (!verifGroupe) { return repondre("For groups only"); }


  const verifMember = (user) => {

    for (const m of membresGroupe) {
      if (m.id !== user) {
        continue;
      }
      else { return true }
      //membre=//(m.id==auteurMsgRepondu? return true) :false;
    }
  }

  const memberAdmin = (membresGroupe) => {
    let admin = [];
    for (m of membresGroupe) {
      if (m.admin == null) continue;
      admin.push(m.id);

    }
    // else{admin= false;}
    return admin;
  }

  const a = verifGroupe ? memberAdmin(membresGroupe) : '';


  let admin = verifGroupe ? a.includes(auteurMsgRepondu) : false;
  let membre = verifMember(auteurMsgRepondu)
  let autAdmin = verifGroupe ? a.includes(auteurMessage) : false;
  zkad = verifGroupe ? a.includes(idBot) : false;
  try {
    // repondre(verifZokouAdmin)

    if (autAdmin || superUser) {
      if (msgRepondu) {
        if (zkad) {
          if (membre) {
            if (admin == false) {

              repondre("𝑻𝒉𝒊𝒔 𝒄𝒓𝒂𝒑 𝒐𝒇 𝒂 𝒄*𝒎 𝒊𝒔 𝒏𝒐𝒕 𝒂𝒏 admi𝒏.")

            } else {
              var txt = `@${auteurMsgRepondu.split("@")[0]} 𝒘𝒂𝒔 𝒓𝒆𝒎𝒐𝒗𝒆𝒅 𝒇𝒓𝒐𝒎 𝒉𝒊𝒔 𝒑𝒐𝒔𝒊𝒕𝒊𝒐𝒏 𝒂𝒔 𝒂 𝒈𝒓𝒐𝒖𝒑 𝒂𝒅𝒎𝒊𝒏\n`
              await zk.groupParticipantsUpdate(dest, [auteurMsgRepondu], "𝒅𝒆𝒎𝒐𝒕𝒆");
              zk.sendMessage(dest, { text: txt, mentions: [auteurMsgRepondu] })
            }

          } else { return repondre("𝑻𝒉𝒊𝒔 𝒖𝒔𝒆𝒓 𝒊𝒔 𝒏𝒐𝒕 𝒑𝒂𝒓𝒕 𝒐𝒇 𝒕𝒉𝒆 𝒈𝒓𝒐𝒖𝒑."); }
        }
        else { return repondre("𝑰 𝒂𝒎 𝒏𝒐𝒕 𝒂𝒅𝒎𝒊𝒏.") }

      } else { repondre("𝒑𝒍𝒆𝒂𝒔𝒆 𝒕𝒂𝒈 𝒕𝒉𝒆 𝒎𝒆𝒎𝒃𝒆𝒓 𝒕𝒐 𝒃𝒆 𝒓𝒆𝒎𝒐𝒗𝒆𝒅"); }
    } else { return repondre("𝑭*𝒄𝒌𝒊𝒏 𝒉*𝒆 𝒄𝒐𝒎𝒎𝒂𝒏𝒅 𝒊𝒔 𝒇𝒐𝒓 𝒂𝒅𝒎𝒊𝒏.") }
  } catch (e) { repondre("oups " + e) }

})



/** ***fin démettre****  **/
/** **retirer** */
zokou({ nomCom: "remove", categorie: 'Group', reaction: "👨🏿‍💼" }, async (dest, zk, commandeOptions) => {
  let { repondre, msgRepondu, infosGroupe, auteurMsgRepondu, verifGroupe, nomAuteurMessage, auteurMessage, superUser, idBot } = commandeOptions;
  let membresGroupe = verifGroupe ? await infosGroupe.participants : ""
  if (!verifGroupe) { return repondre("for groups only"); }


  const verifMember = (user) => {

    for (const m of membresGroupe) {
      if (m.id !== user) {
        continue;
      }
      else { return true }
      //membre=//(m.id==auteurMsgRepondu? return true) :false;
    }
  }

  const memberAdmin = (membresGroupe) => {
    let admin = [];
    for (m of membresGroupe) {
      if (m.admin == null) continue;
      admin.push(m.id);

    }
    // else{admin= false;}
    return admin;
  }

  const a = verifGroupe ? memberAdmin(membresGroupe) : '';


  let admin = verifGroupe ? a.includes(auteurMsgRepondu) : false;
  let membre = verifMember(auteurMsgRepondu)
  let autAdmin = verifGroupe ? a.includes(auteurMessage) : false;
  zkad = verifGroupe ? a.includes(idBot) : false;
  try {
    // repondre(verifZokouAdmin)

    if (autAdmin || superUser) {
      if (msgRepondu) {
        if (zkad) {
          if (membre) {
            if (admin == false) {
              const gifLink = "https://raw.githubusercontent.com/djalega8000/Zokou-MD/main/media/remover.gif"
              var sticker = new Sticker(gifLink, {
                pack: '༒𝐃𝚫𝚳𝚯𝚴𖤍༒', // The pack name
                author: nomAuteurMessage, // The author name
                type: StickerTypes.FULL, // The sticker type
                categories: ['🤩', '🎉'], // The sticker category
                id: '12345', // The sticker id
                quality: 50, // The quality of the output file
                background: '#000000'
              });

              await sticker.toFile("st.webp")
              var txt = `@${auteurMsgRepondu.split("@")[0]} 𝒘𝒂𝒔 𝒓𝒆𝒎𝒐𝒗𝒆𝒅 𝒇𝒓𝒐𝒎 𝒕𝒉𝒆 𝒈𝒓𝒐𝒖𝒑.\n`
            /*  zk.sendMessage(dest, { sticker: fs.readFileSync("st.webp") }, { quoted: ms.message.extendedTextMessage.contextInfo.stanzaId})*/
              await zk.groupParticipantsUpdate(dest, [auteurMsgRepondu], "remove");
              zk.sendMessage(dest, { text: txt, mentions: [auteurMsgRepondu] })

            } else { repondre("𝑩𝒐𝒕 𝒄𝒂𝒏𝒏𝒐𝒕 𝒓𝒆𝒎𝒐𝒗𝒆 𝒂𝒅𝒎𝒊𝒏.") }

          } else { return repondre("𝑻𝒉𝒊𝒔 𝒖𝒔𝒆𝒓 𝒊𝒔 𝒏𝒐𝒕 𝒑𝒂𝒓𝒕 𝒐𝒇 𝒕𝒉𝒆 𝒈𝒓𝒐𝒖𝒑."); }
        }
        else { return repondre("𝑰 𝒂𝒎 𝒏𝒐𝒕 𝒂𝒏 𝒂𝒅𝒎𝒊𝒏 𝒐𝒇 𝒕𝒉𝒊𝒔 𝒈𝒓𝒐𝒖𝒑.") }

      } else { repondre("𝒑𝒍𝒆𝒂𝒔𝒆 𝒕𝒂𝒈 𝒕𝒉𝒆 𝒎𝒆𝒎𝒃𝒆𝒓 𝒕𝒐 𝒃𝒆 𝒓𝒆𝒎𝒐𝒗𝒆𝒅"); }
    } else { return repondre("𝑫*𝒄𝒌𝒉𝒆𝒂𝒅 𝒕𝒉𝒊𝒔 𝒄𝒐𝒎𝒎𝒂𝒏𝒅 𝒊𝒔 𝒇𝒐𝒇 𝒈𝒓𝒐𝒖𝒑 𝒂𝒅𝒎𝒊𝒏𝒔.") }
  } catch (e) { repondre("oups " + e) }

})



/** ***fin démettre****  **
/** *****fin retirer */

zokou({ nomCom: "add", categorie: 'Group', reaction: "👨🏿‍💼" }, async (dest, zk, commandeOptions) => {
  let { repondre, msgRepondu, infosGroupe, auteurMsgRepondu, verifGroupe, nomAuteurMessage, auteurMessage, superUser, idBot } = commandeOptions;
  let membresGroupe = verifGroupe ? await infosGroupe.participants : ""
  if (!verifGroupe) { return repondre("𝒇𝒐𝒓 𝒈𝒓𝒐𝒖𝒑𝒔 𝒐𝒏𝒍𝒚");} 

  const participants = await message.groupMetadata(message.jid)
		const isImAdmin = await isAdmin(participants, message.client.user.jid)
		if (!isImAdmin) return await message.send(`_I'm not admin._`)
		match = match || message.reply_message.jid
		if (!match) return await message.send('Example : 𝒂𝒅𝒅 254790593618')
		// if (!match.startsWith('@@')) {
		// 	match = jidToNum(match)
		// 	const button = await genButtonMessage(
		// 		[
		// 			{ id: `@@`, text: 'NO' },
		// 			{ id: `add @@${match}`, text: 'YES' },
		// 		],
		// 		`Your Number maybe banned, Do you want add @${match}`,
		// 		''
		// 	)
		// 	return await message.send(
		// 		button,
		// 		{ contextInfo: { mentionedJid: [numToJid(match)] } },
		// 		'button'
		// 	)
		// }
		match = jidToNum(match)
		const res = await message.Add(match)
		if (res == '403') return await message.send('_𝑭𝒂𝒊𝒍𝒆𝒅, 𝑰𝒏𝒗𝒊𝒕𝒆 𝒔𝒆𝒏𝒕_')
		else if (res && res != '200')
			return await message.send(res, { quoted: message.data })

})


/** *****fin retirer */


zokou({ nomCom: "del", categorie: 'Group',reaction:"🧹" }, async (dest, zk, commandeOptions) => {

  const { ms, repondre, verifGroupe,auteurMsgRepondu,idBot, msgRepondu, verifAdmin, superUser} = commandeOptions;
  
  if (!msgRepondu) {
    repondre("𝑷𝒍𝒆𝒂𝒔𝒆 𝒎𝒆𝒏𝒕𝒊𝒐𝒏 𝒕𝒉𝒆 𝒎𝒆𝒔𝒔𝒂𝒈𝒆 𝒕𝒐 𝒅𝒆𝒍𝒆𝒕𝒆.");
    return;
  }
  if(superUser && auteurMsgRepondu==idBot )
  {
    
       if(auteurMsgRepondu==idBot)
       {
         const key={
            remoteJid:dest,
      fromMe: true,
      id: ms.message.extendedTextMessage.contextInfo.stanzaId,
         }
         await zk.sendMessage(dest,{delete:key});return;
       } 
  }

          if(verifGroupe)
          {
               if(verifAdmin || superUser)
               {
                    
                         try{
                
      
            const key=   {
               remoteJid : dest,
               id : ms.message.extendedTextMessage.contextInfo.stanzaId ,
               fromMe : false,
               participant : ms.message.extendedTextMessage.contextInfo.participant

            }        
         
         await zk.sendMessage(dest,{delete:key});return;

             }catch(e){repondre( "𝑰 𝒏𝒆𝒆𝒅 𝒕𝒐 𝒃𝒆 𝒂𝒏 𝒂𝒅𝒎𝒊𝒏.")}
                    
                      
               }else{repondre("𝑺𝒐𝒓𝒓𝒚, 𝒚𝒐𝒖 𝒂𝒓𝒆 𝒏𝒐𝒕 𝒂𝒏 𝒂𝒅𝒎𝒊𝒏 𝒐𝒇 𝒕𝒉𝒆 𝒈𝒓𝒐𝒖𝒑.")}
          }

});

zokou({ nomCom: "info", categorie: 'Group' }, async (dest, zk, commandeOptions) => {
  const { ms, repondre, verifGroupe } = commandeOptions;
  if (!verifGroupe) { repondre("𝒐𝒓𝒅𝒆𝒓 𝒓𝒆𝒔𝒆𝒓𝒗𝒆𝒅 𝒇𝒐𝒓 𝒕𝒉𝒆 𝒈𝒓𝒐𝒖𝒑 𝒐𝒏𝒍𝒚"); return };

 try { ppgroup = await zk.profilePictureUrl(dest ,'image') ; } catch { ppgroup = conf.IMAGE_MENU}

    const info = await zk.groupMetadata(dest)

    /*console.log(metadata.id + ", title: " + metadata.subject + ", description: " + metadata.desc)*/


    let mess = {
      image: { url: ppgroup },
      caption:  `*━━━━『𝑮𝑹𝑶𝑼𝑷 𝑰𝑵𝑭𝑶』━━━━*\n\n*🎐𝑵𝒂𝒎𝒆:* ${info.subject}\n\n*🔩𝑮𝒓𝒐𝒖𝒑's 𝑰𝑫:* ${dest}\n\n*🔍𝑫𝒆𝒔𝒄:* \n\n${info.desc}`
    }


    zk.sendMessage(dest, mess, { quoted: ms })
  });



 //------------------------------------antilien-------------------------------

 zokou({ nomCom: "antilink", categorie: 'Group', reaction: "🔗" }, async (dest, zk, commandeOptions) => {


  var { repondre, arg, verifGroupe, superUser, verifAdmin } = commandeOptions;
  

  
  if (!verifGroupe) {
    return repondre("*𝒇𝒐𝒓 𝒈𝒓𝒐𝒖𝒑𝒔 𝒐𝒏𝒍𝒚*");
  }
  
  if( superUser || verifAdmin) {
    const enetatoui = await verifierEtatJid(dest)
    try {
      if (!arg || !arg[0] || arg === ' ') { repondre("𝒂𝒏𝒕𝒊𝒍𝒊𝒏𝒌 𝒐𝒏 𝒕𝒐 𝒂𝒄𝒕𝒊𝒗𝒂𝒕𝒆 𝒕𝒉𝒆 𝒂𝒏𝒕𝒊-𝒍𝒊𝒏𝒌 𝒇𝒆𝒂𝒕𝒖𝒓𝒆\n𝒂𝒏𝒕𝒊𝒍𝒊𝒏𝒌 𝒐𝒇𝒇 𝒕𝒐 𝒅𝒆𝒂𝒄𝒕𝒊𝒗𝒂𝒕𝒆 𝒕𝒉𝒆 𝒂𝒏𝒕𝒊-𝒍𝒊𝒏𝒌 𝒇𝒆𝒂𝒕𝒖𝒓𝒆\n𝒂𝒏𝒕𝒊𝒍𝒊𝒏𝒌 𝒂𝒄𝒕𝒊𝒐𝒏/𝒓𝒆𝒎𝒐𝒗𝒆 𝒕𝒐 𝒅𝒊𝒓𝒆𝒄𝒕𝒍𝒚 𝒓𝒆𝒎𝒐𝒗𝒆 𝒕𝒉𝒆 𝒍𝒊𝒏𝒌 𝒘𝒊𝒕𝒉𝒐𝒖𝒕 𝒏𝒐𝒕𝒊𝒄𝒆\n𝒂𝒏𝒕𝒊𝒍𝒊𝒏𝒌 𝒂𝒄𝒕𝒊𝒐𝒏/𝒘𝒂𝒓𝒏 𝒕𝒐 𝒈𝒊𝒗𝒆 𝒘𝒂𝒓𝒏𝒊𝒏𝒈𝒔\n𝒂𝒏𝒕𝒊𝒍𝒊𝒏𝒌 𝒂𝒄𝒕𝒊𝒐𝒏/𝒅𝒆𝒍𝒆𝒕𝒆 𝒕𝒐 𝒓𝒆𝒎𝒐𝒗𝒆 𝒕𝒉𝒆 𝒍𝒊𝒏𝒌 𝒘𝒊𝒕𝒉𝒐𝒖𝒕 𝒂𝒏𝒚 𝒔𝒂𝒏𝒄𝒕𝒊𝒐𝒏𝒔\n\n𝑷𝒍𝒆𝒂𝒔𝒆 𝒏𝒐𝒕𝒆 𝒕𝒉𝒂𝒕 𝒃𝒚 𝒅𝒆𝒇𝒂𝒖𝒍𝒕, 𝒕𝒉𝒆 𝒂𝒏𝒕𝒊-𝒍𝒊𝒏𝒌 𝒇𝒆𝒂𝒕𝒖𝒓𝒆 𝒊𝒔 𝒔𝒆𝒕 𝒕𝒐 𝒅𝒆𝒍𝒆𝒕𝒆.") ; return};
     
      if(arg[0] === 'on') {

      
       if(enetatoui ) { repondre("𝒕𝒉𝒆 𝒂𝒏𝒕𝒊𝒍𝒊𝒏𝒌 𝒊𝒔 𝒂𝒍𝒓𝒆𝒂𝒅𝒚 𝒂𝒄𝒕𝒊𝒗𝒂𝒕𝒆𝒅 𝒇𝒐𝒓 𝒕𝒉𝒊𝒔 𝒈𝒓𝒐𝒖𝒑")
                    } else {
                  await ajouterOuMettreAJourJid(dest,"oui");
                
              repondre("𝒕𝒉𝒆 𝒂𝒏𝒕𝒊𝒍𝒊𝒏𝒌 𝒊𝒔 𝒂𝒄𝒕𝒊𝒗𝒂𝒕𝒆𝒅") }
     
            } else if (arg[0] === "off") {

              if (enetatoui) { 
                await ajouterOuMettreAJourJid(dest , "non");

                repondre("𝑻𝒉𝒆 𝒂𝒏𝒕𝒊𝒍𝒊𝒏𝒌 𝒉𝒂𝒔 𝒃𝒆𝒆𝒏 𝒅𝒆𝒂𝒄𝒕𝒊𝒗𝒂𝒕𝒆𝒅");
                
              } else {
                repondre("𝒂𝒏𝒕𝒊𝒍𝒊𝒏𝒌 𝒊𝒔 𝒏𝒐𝒕 𝒂𝒄𝒕𝒊𝒗𝒂𝒕𝒆𝒅 𝒇𝒐𝒓 𝒕𝒉𝒊𝒔 𝒈𝒓𝒐𝒖𝒑");
              }
            } else if (arg.join('').split("/")[0] === 'action') {
                            

              let action = (arg.join('').split("/")[1]).toLowerCase() ;

              if ( action == 'remove' || action == 'warn' || action == 'delete' ) {

                await mettreAJourAction(dest,action);

                repondre(`𝑻𝒉𝒆 𝒂𝒏𝒕𝒊-𝒍𝒊𝒏𝒌 𝒂𝒄𝒕𝒊𝒐𝒏 𝒉𝒂𝒔 𝒃𝒆𝒆𝒏 𝒖𝒑𝒅𝒂𝒕𝒆𝒅 𝒕𝒐 ${arg.join('').split("/")[1]}`);

              } else {
                  repondre("𝑻𝒉𝒆 𝒐𝒏𝒍𝒚 𝒂𝒄𝒕𝒊𝒐𝒏𝒔 𝒂𝒗𝒂𝒊𝒍𝒂𝒃𝒍𝒔 𝒂𝒓𝒆 𝒘𝒂𝒓𝒏, 𝒓𝒆𝒎𝒐𝒗𝒆, 𝒂𝒏𝒅 𝒅𝒆𝒍𝒆𝒕𝒆") ;
              }
            

            } else repondre("𝒂𝒏𝒕𝒊𝒍𝒊𝒏𝒌 𝒐𝒏 𝒕𝒐 𝒂𝒄𝒕𝒊𝒗𝒂𝒕𝒆 𝒕𝒉𝒆 𝒂𝒏𝒕𝒊-𝒍𝒊𝒏𝒌 𝒇𝒆𝒂𝒕𝒖𝒓𝒆\n𝒂𝒏𝒕𝒊𝒍𝒊𝒏𝒌 𝒐𝒇𝒇 𝒕𝒐 𝒅𝒆𝒂𝒄𝒕𝒊𝒗𝒂𝒕𝒆 𝒕𝒉𝒆 𝒂𝒏𝒕𝒊-link 𝒇𝒆𝒂𝒕𝒖𝒓𝒆\n𝒂𝒏𝒕𝒊𝒍𝒊𝒏𝒌 𝒂𝒄𝒕𝒊𝒐𝒏/𝒓𝒆𝒎𝒐𝒗𝒆 𝒕𝒐 𝒅𝒊𝒓𝒆𝒄𝒕𝒍𝒚 𝒓𝒆𝒎𝒐𝒗𝒆 𝒕𝒉𝒆 𝒍𝒊𝒏𝒌 𝒘𝒊𝒕𝒉𝒐𝒖𝒌 𝒏𝒐𝒕𝒊𝒄𝒆\n𝒂𝒏𝒕𝒊𝒍𝒊𝒏𝒌 𝒂𝒄𝒕𝒊𝒐𝒏/𝒘𝒂𝒓𝒏 𝒕𝒐 𝒈𝒊𝒗𝒆 𝒘𝒂𝒓𝒏𝒊𝒏𝒈𝒔\n𝒂𝒏𝒕𝒊𝒍𝒊𝒏𝒌 𝒂𝒄𝒕𝒊𝒐𝒏/𝒅𝒆𝒍𝒆𝒕𝒆 𝒕𝒐 𝒓𝒆𝒎𝒐𝒗𝒆 𝒕𝒉𝒆 𝒍𝒊𝒏𝒌 𝒘𝒊𝒕𝒉𝒐𝒖𝒕 𝒂𝒏𝒚 𝒔𝒂𝒏𝒄𝒕𝒊𝒐𝒏𝒔\n\n𝑷𝒍𝒆𝒂𝒔𝒆 𝒏𝒐𝒕𝒆 𝒕𝒉𝒂𝒕 𝒃𝒚 𝒅𝒆𝒇𝒂𝒖𝒍𝒕, 𝒕𝒉𝒆 𝒂𝒏𝒕𝒊-𝒍𝒊𝒏𝒌 𝒇𝒆𝒂𝒕𝒖𝒓𝒆 𝒊𝒔 𝒔𝒆𝒕 𝒕𝒐 𝒅𝒆𝒍𝒆𝒕𝒆.")

      
    } catch (error) {
       repondre(error)
    }

  } else { repondre('𝒀𝒐𝒖 𝒂𝒓𝒆 𝒏𝒐𝒕 𝒆𝒏𝒕𝒊𝒕𝒍𝒆𝒅 𝒕𝒐 𝒕𝒉𝒊𝒔 𝒐𝒓𝒅𝒆𝒓') ;
  }

});




 //------------------------------------antibot-------------------------------

 zokou({ nomCom: "antibot", categorie: 'Group', reaction: "🔗" }, async (dest, zk, commandeOptions) => {


  var { repondre, arg, verifGroupe, superUser, verifAdmin } = commandeOptions;
  

  
  if (!verifGroupe) {
    return repondre("*𝒇𝒐𝒓 𝒈𝒓𝒐𝒖𝒑𝒔 𝒐𝒏𝒍𝒚*");
  }
  
  if( superUser || verifAdmin) {
    const enetatoui = await atbverifierEtatJid(dest)
    try {
      if (!arg || !arg[0] || arg === ' ') { repondre('𝒂𝒏𝒕𝒊𝒃𝒐𝒕 𝒐𝒏 𝒕𝒐 𝒂𝒄𝒕𝒊𝒗𝒂𝒕𝒆 𝒕𝒉𝒆 𝒂𝒏𝒕𝒊-𝒃𝒐𝒕 𝒇𝒆𝒂𝒕𝒖𝒓𝒆\n𝒂𝒏𝒕𝒊𝒃𝒐𝒕 𝒐𝒇𝒇 𝒕𝒐 𝒅𝒆𝒂𝒄𝒕𝒊𝒗𝒂𝒕𝒆 𝒕𝒉𝒆 𝒂𝒏𝒕𝒊𝒃𝒐𝒕 𝒇𝒆𝒂𝒕𝒖𝒓𝒆\n𝒂𝒏𝒕𝒊𝒃𝒐𝒕 𝒂𝒄𝒕𝒊𝒐𝒏/𝒓𝒆𝒎𝒐𝒗𝒆 𝒕𝒐 𝒅𝒊𝒓𝒆𝒄𝒕𝒍𝒚 𝒓𝒆𝒎𝒐𝒗𝒆 𝒕𝒉𝒆 𝒃𝒐𝒕 𝒘𝒊𝒕𝒉𝒐𝒖𝒕 𝒏𝒐𝒕𝒊𝒄𝒆\n𝒂𝒏𝒕𝒊𝒃𝒐𝒕 𝒂𝒄𝒕𝒊𝒐𝒏/𝒘𝒂𝒓𝒏 𝒕𝒐 𝒈𝒊𝒗𝒆 𝒘𝒂𝒓𝒏𝒊𝒏𝒈𝒔\n𝒂𝒏𝒕𝒊𝒃𝒐𝒕 𝒂𝒄𝒕𝒊𝒐𝒏/𝒅𝒆𝒍𝒆𝒕𝒆 𝒕𝒐 𝒓𝒆𝒎𝒐𝒗𝒆 𝒕𝒉𝒆 𝒃𝒐𝒕 𝒎𝒆𝒔𝒔𝒂𝒈𝒆 𝒘𝒊𝒕𝒉𝒐𝒖𝒕 𝒂𝒏𝒚 𝒔𝒂𝒏𝒄𝒕𝒊𝒐𝒏𝒔\n\n𝑷𝒍𝒆𝒂𝒔𝒆 𝒏𝒐𝒕𝒆 𝒕𝒉𝒂𝒕 𝒃𝒚 𝒅𝒆𝒇𝒂𝒖𝒍𝒕, 𝒕𝒉𝒆 𝒂𝒏𝒕𝒊-𝒃𝒐𝒕 𝒇𝒆𝒂𝒕𝒖𝒓𝒆 𝒊𝒔 𝒔𝒆𝒕 𝒕𝒐 𝒅𝒆𝒍𝒆𝒕𝒆.') ; return};
     
      if(arg[0] === 'on') {

      
       if(enetatoui ) { repondre("𝒕𝒉𝒆 𝒂𝒏𝒕𝒊𝒃𝒐𝒕 𝒊𝒔 𝒂𝒍𝒓𝒆𝒂𝒅𝒚 𝒂𝒄𝒕𝒊𝒗𝒂𝒕𝒆𝒅 𝒇𝒐𝒓 𝒕𝒉𝒊𝒔 𝒈𝒓𝒐𝒖𝒑")
                    } else {
                  await atbajouterOuMettreAJourJid(dest,"oui");
                
              repondre("𝒕𝒉𝒆 𝒂𝒏𝒕𝒊𝒃𝒐𝒕 𝒊𝒔 𝒂𝒄𝒕𝒊𝒗𝒂𝒕𝒆𝒅") }
     
            } else if (arg[0] === "off") {

              if (enetatoui) { 
                await atbajouterOuMettreAJourJid(dest , "non");

                repondre("𝑻𝒉𝒆 𝒂𝒏𝒕𝒊𝒃𝒐𝒕 𝒉𝒂𝒔 𝒃𝒆𝒆𝒏 𝒔𝒖𝒄𝒄𝒆𝒔𝒔𝒇𝒖𝒍𝒍𝒚 𝒅𝒆𝒂𝒄𝒕𝒊𝒗𝒂𝒕𝒆𝒅");
                
              } else {
                repondre("𝒂𝒏𝒕𝒊𝒃𝒐𝒓 𝒊𝒔 𝒏𝒐𝒕 𝒂𝒄𝒕𝒊𝒗𝒂𝒕𝒆𝒅 𝒇𝒐𝒓 𝒕𝒉𝒊𝒔 𝒈𝒓𝒐𝒖𝒑");
              }
            } else if (arg.join('').split("/")[0] === 'action') {

              let action = (arg.join('').split("/")[1]).toLowerCase() ;

              if ( action == 'remove' || action == 'warn' || action == 'delete' ) {

                await mettreAJourAction(dest,action);

                repondre(`𝑻𝒉𝒆 𝒂𝒏𝒕𝒊-𝒃𝒐𝒕 𝒂𝒄𝒕𝒊𝒐𝒏 𝒉𝒂𝒔 𝒃𝒆𝒆𝒏 𝒖𝒑𝒅𝒂𝒕𝒆𝒅 𝒕𝒐 ${arg.join('').split("/")[1]}`);

              } else {
                  repondre("𝑻𝒉𝒆 𝒐𝒏𝒍𝒚 𝒂𝒄𝒕𝒊𝒐𝒏𝒔 𝒂𝒗𝒂𝒊𝒍𝒂𝒃𝒍𝒆 𝒂𝒓𝒆 𝒘𝒂𝒓𝒏, 𝒓𝒆𝒎𝒐𝒗𝒆, 𝒂𝒏𝒅 𝒅𝒆𝒍𝒆𝒕𝒆") ;
              }
            

            } else {  
              repondre('𝒂𝒏𝒕𝒊𝒃𝒐𝒕 𝒐𝒏 𝒕𝒐 𝒂𝒄𝒕𝒊𝒗𝒂𝒕𝒆 𝒕𝒉𝒆 𝒂𝒏𝒕𝒊-𝒃𝒐𝒕 𝒇𝒆𝒂𝒕𝒖𝒓𝒆\n𝒂𝒏𝒕𝒊𝒃𝒐𝒕 𝒐𝒇𝒇 𝒕𝒐 𝒅𝒆𝒂𝒄𝒕𝒊𝒗𝒂𝒕𝒆 𝒕𝒉𝒆 𝒂𝒏𝒕𝒊𝒃𝒐𝒕 𝒇𝒆𝒂𝒕𝒖𝒓𝒆\n𝒂𝒏𝒕𝒊𝒃𝒐𝒕 𝒂𝒄𝒕𝒊𝒐𝒏/𝒓𝒆𝒎𝒐𝒗𝒆 𝒕𝒐 𝒅𝒊𝒓𝒆𝒄𝒕𝒍𝒚 𝒓𝒆𝒎𝒐𝒗𝒆 𝒕𝒉𝒆 𝒃𝒐𝒕 𝒘𝒊𝒕𝒉𝒐𝒖𝒕 𝒏𝒐𝒕𝒊𝒄𝒆\n𝒂𝒏𝒕𝒊𝒃𝒐𝒕 𝒂𝒄𝒕𝒊𝒐𝒏/𝒘𝒂𝒓𝒏 𝒕𝒐 𝒈𝒊𝒗𝒆 𝒘𝒂𝒓𝒏𝒊𝒏𝒈𝒔\n𝒂𝒏𝒕𝒊𝒃𝒐𝒕 𝒂𝒄𝒕𝒊𝒐𝒏/𝒅𝒆𝒍𝒆𝒕𝒆 𝒕𝒐 𝒓𝒆𝒎𝒐𝒗𝒆 𝒕𝒉𝒆 𝒃𝒐𝒕 𝒎𝒆𝒔𝒔𝒂𝒈𝒆 𝒘𝒊𝒕𝒉𝒐𝒖𝒕 𝒂𝒏𝒚 𝒔𝒂𝒏𝒄𝒕𝒊𝒐𝒏𝒔\n\n𝑷𝒍𝒆𝒂𝒔𝒆 𝒏𝒐𝒕𝒆 𝒕𝒉𝒂𝒕 𝒃𝒚 𝒅𝒆𝒇𝒂𝒖𝒍𝒕, 𝒕𝒉𝒆 𝒂𝒏𝒕𝒊-𝒃𝒐𝒕 𝒇𝒆𝒂𝒕𝒖𝒓𝒆 𝒊𝒔 𝒔𝒆𝒕 𝒕𝒐 𝒅𝒆𝒍𝒆𝒕𝒆.') ;

                            }
    } catch (error) {
       repondre(error)
    }

  } else { repondre('𝒀𝒐𝒖 𝒂𝒓𝒆 𝒏𝒐𝒕 𝒆𝒏𝒕𝒊𝒕𝒍𝒆𝒅 𝒕𝒐 𝒕𝒉𝒊𝒔 𝒐𝒓𝒅𝒆𝒓') ;

  }

});

//----------------------------------------------------------------------------

zokou({ nomCom: "group", categorie: 'Group' }, async (dest, zk, commandeOptions) => {

  const { repondre, verifGroupe, verifAdmin, superUser, arg } = commandeOptions;

  if (!verifGroupe) { repondre("𝒐𝒓𝒅𝒆𝒓 𝒓𝒆𝒔𝒆𝒓𝒗𝒆𝒅 𝒇𝒐𝒓 𝒈𝒓𝒐𝒖𝒑 𝒐𝒏𝒍𝒚"); return };
  if (superUser || verifAdmin) {

    if (!arg[0]) { repondre('Instructions:\n\nType group open or close'); return; }
    const option = arg.join(' ')
    switch (option) {
      case "open":
        await zk.groupSettingUpdate(dest, 'not_announcement')
        repondre('𝒈𝒓𝒐𝒖𝒑 ope𝒏')
        break;
      case "close":
        await zk.groupSettingUpdate(dest, 'announcement');
        repondre('𝑮𝒓𝒐𝒖𝒑 𝒄𝒍𝒐𝒔𝒆𝒅');
        break;
      default: repondre("𝑷𝒍𝒆𝒂𝒔𝒆 𝒅𝒐𝒏'𝒕 𝒊𝒏𝒗𝒆𝒏𝒕 𝒂𝒏 𝒐𝒑𝒕𝒊𝒐𝒏")
    }

    
  } else {
    repondre("𝒐𝒓𝒅𝒆𝒓 𝒓𝒆𝒔𝒆𝒓𝒗𝒆𝒅 𝒇𝒐𝒓 𝒕𝒉𝒆 𝒂𝒅𝒎𝒊𝒏𝒔");
    return;
  }
 

});

zokou({ nomCom: "left", categorie: "Mods" }, async (dest, zk, commandeOptions) => {

  const { repondre, verifGroupe, superUser } = commandeOptions;
  if (!verifGroupe) { repondre("𝒐𝒓𝒅𝒆𝒓 𝒓𝒆𝒔𝒆𝒓𝒗𝒆𝒅 𝒇𝒐𝒓 𝒈𝒓𝒐𝒖𝒈 𝒐𝒏𝒍𝒚"); return };
  if (!superUser) {
    repondre("𝒄𝒐𝒎𝒎𝒂𝒏𝒅 𝒓𝒆𝒔𝒆𝒓𝒗𝒆𝒅 𝒇𝒐𝒓 𝒕𝒉𝒆 𝒃𝒐𝒕 𝒐𝒘𝒏𝒆𝒓");
    return;
  }
  await repondre('sayonnara') ;
   
  zk.groupLeave(dest)
});

zokou({ nomCom: "gname", categorie: 'Group' }, async (dest, zk, commandeOptions) => {

  const { arg, repondre, verifAdmin } = commandeOptions;

  if (!verifAdmin) {
    repondre("𝒐𝒓𝒅𝒆𝒓 𝒓𝒆𝒔𝒆𝒓𝒗𝒆𝒅 𝒇𝒐𝒓 𝒂𝒅𝒎𝒊𝒏𝒔 𝒐𝒇 𝒕𝒉𝒆 𝒈𝒓𝒐𝒖𝒑");
    return;
  };
  if (!arg[0]) {
    repondre("𝑷𝒍𝒆𝒂𝒔𝒆 𝒆𝒏𝒕𝒆𝒓 𝒕𝒉𝒆 𝒈𝒓𝒐𝒖𝒑 𝒏𝒂𝒎𝒆");
    return;
  };
   const nom = arg.join(' ')
  await zk.groupUpdateSubject(dest, nom);
    repondre(`𝒈𝒓𝒐𝒖𝒑 𝒏𝒂𝒎𝒆 𝒓𝒆𝒇𝒓𝒆𝒔𝒉: *${nom}*`)

 
}) ;

zokou({ nomCom: "gdesc", categorie: 'Group' }, async (dest, zk, commandeOptions) => {

  const { arg, repondre, verifAdmin } = commandeOptions;

  if (!verifAdmin) {
    repondre("𝒐𝒓𝒅𝒆𝒓 𝒓𝒆𝒔𝒆𝒓𝒗𝒆𝒅 𝒇𝒐𝒓 𝒂𝒅𝒎𝒊𝒏𝒔 𝒐𝒇 𝒕𝒉𝒆 𝒈𝒓𝒐𝒖𝒑");
    return;
  };
  if (!arg[0]) {
    repondre("𝑷𝒍𝒆𝒂𝒔𝒆 𝒆𝒏𝒕𝒆𝒕 𝒕𝒉𝒆 𝒈𝒓𝒐𝒖𝒑 𝒅𝒆𝒔𝒄𝒓𝒊𝒑𝒕𝒊𝒐𝒏");
    return;
  };
   const nom = arg.join(' ')
  await zk.groupUpdateDescription(dest, nom);
    repondre(`𝒈𝒓𝒐𝒖𝒑 𝒅𝒆𝒔𝒄𝒓𝒊𝒑𝒕𝒊𝒐𝒏 𝒖𝒑𝒅𝒂𝒕𝒆: *${nom}*`)

 
}) ;


zokou({ nomCom: "gpp", categorie: 'Group' }, async (dest, zk, commandeOptions) => {

  const { repondre, msgRepondu, verifAdmin } = commandeOptions;

  if (!verifAdmin) {
    repondre("𝒐𝒓𝒅𝒆𝒓 𝒓𝒆𝒔𝒆𝒓𝒗𝒆𝒅 𝒇𝒐𝒓 𝒂𝒅𝒎𝒊𝒏𝒏 𝒐𝒇 𝒕𝒉𝒆 𝒈𝒓𝒐𝒖𝒑");
    return;
  }; 
  if (msgRepondu.imageMessage) {
    const pp = await  zk.downloadAndSaveMediaMessage(msgRepondu.imageMessage) ;

    await zk.updateProfilePicture(dest, { url: pp })
                .then( () => {
                    zk.sendMessage(dest,{text:"Group pfp changed"})
                    fs.unlinkSync(pp)
                }).catch(() =>   zk.sendMessage(dest,{text:err})
)
        
  } else {
    repondre('𝑷𝒍𝒆𝒂𝒔𝒆 𝒎𝒆𝒏𝒕𝒊𝒐𝒏 𝒂𝒏 𝒊𝒎𝒂𝒈𝒆')
  }

});

/////////////
zokou({nomCom:"hidetag",categorie:'Group',reaction:"🎤"},async(dest,zk,commandeOptions)=>{

  const {repondre,msgRepondu,verifGroupe,arg ,verifAdmin , superUser}=commandeOptions;

  if(!verifGroupe)  { repondre('𝑻𝒉𝒊𝒔 𝒄𝒐𝒎𝒎𝒂𝒏𝒅 𝒊𝒔 𝒐𝒏𝒍𝒚 𝒂𝒍𝒍𝒐𝒘𝒆𝒅 𝒊𝒏 𝒈𝒓𝒐𝒖𝒑𝒔.')} ;
  if (verifAdmin || superUser) { 

  let metadata = await zk.groupMetadata(dest) ;

  //console.log(metadata.participants)
 let tag = [] ;
  for (const participant of metadata.participants ) {

      tag.push(participant.id) ;
  }
  //console.log(tag)

    if(msgRepondu) {
      console.log(msgRepondu)
      let msg ;

      if (msgRepondu.imageMessage) {

        

     let media  = await zk.downloadAndSaveMediaMessage(msgRepondu.imageMessage) ;
     // console.log(msgRepondu) ;
     msg = {

       image : { url : media } ,
       caption : msgRepondu.imageMessage.caption,
       mentions :  tag
       
     }
    

      } else if (msgRepondu.videoMessage) {

        let media  = await zk.downloadAndSaveMediaMessage(msgRepondu.videoMessage) ;

        msg = {

          video : { url : media } ,
          caption : msgRepondu.videoMessage.caption,
          mentions :  tag
          
        }

      } else if (msgRepondu.audioMessage) {
    
        let media  = await zk.downloadAndSaveMediaMessage(msgRepondu.audioMessage) ;
       
        msg = {
   
          audio : { url : media } ,
          mimetype:'audio/mp4',
          mentions :  tag
           }     
        
      } else if (msgRepondu.stickerMessage) {

    
        let media  = await zk.downloadAndSaveMediaMessage(msgRepondu.stickerMessage)

        let stickerMess = new Sticker(media, {
          pack: '༒𝐃𝚫𝚳𝚯𝚴𖤍༒-tag',
          type: StickerTypes.CROPPED,
          categories: ["🤩", "🎉"],
          id: "12345",
          quality: 70,
          background: "transparent",
        });
        const stickerBuffer2 = await stickerMess.toBuffer();
       
        msg = { sticker: stickerBuffer2 , mentions : tag}


      }  else {
          msg = {
             text : msgRepondu.conversation,
             mentions : tag
          }
      }

    zk.sendMessage(dest,msg)

    } else {

        if(!arg || !arg[0]) { repondre('𝑬𝒏𝒕𝒆𝒓 𝒕𝒉𝒆 𝒕𝒆𝒙𝒕 𝒕𝒐 𝒂𝒏𝒏𝒐𝒖𝒏𝒄𝒆 𝒐𝒓 𝒎𝒆𝒏𝒕𝒊𝒐𝒏 𝒕𝒉𝒆 𝒎𝒆𝒔𝒔𝒂𝒈𝒆 𝒕𝒐 𝒂𝒏𝒏𝒐𝒖𝒄𝒆');
        ; return} ;

      zk.sendMessage(
 𝑬𝒏𝒕   dest,
         {
          text : arg.join(' ') ,
          mentions : tag
         }     
      )
    }

} else {
  repondre('𝑪𝒐𝒎𝒎𝒂𝒏𝒅 𝒓𝒆𝒔𝒆𝒓𝒗𝒆𝒅 𝒇𝒐𝒓 𝒂𝒅𝒎𝒊𝒏𝒔.')
}

});


zokou({ nomCom: "apk", reaction: "✨", categorie: "Recherche" }, async (dest, zk, commandeOptions) => {
  const { repondre, arg, ms } = commandeOptions;

  try {
    const appName = arg.join(' ');
    if (!appName) {
      return repondre("*𝑬𝒏𝒕𝒆𝒓 𝒕𝒉𝒆 𝒏𝒂𝒎𝒆 𝒐𝒇 𝒕𝒉𝒆 𝒂𝒑𝒑 𝒕𝒐 𝒔𝒆𝒂𝒓𝒄𝒉 𝒇𝒐𝒓*");
    }

    const searchResults = await search(appName);

    if (searchResults.length === 0) {
      return repondre("*𝒄𝒂𝒏'𝒕 𝒇𝒊𝒏𝒅 𝒂𝒑𝒑, 𝒑𝒍𝒆𝒂𝒔𝒆 𝒆𝒏𝒕𝒆𝒓 𝒂𝒏𝒐𝒕𝒉𝒆𝒓 𝒏𝒂𝒎𝒆*");
    }

    const appData = await download(searchResults[0].id);
    const fileSize = parseInt(appData.size);

    if (fileSize > 300) {
      return repondre("𝑻𝒉𝒆 𝒇𝒊𝒍𝒆 𝒆𝒙𝒄𝒆𝒆𝒅𝒅 300 𝑴𝑩, 𝒖𝒏𝒂𝒃𝒍𝒆 𝒕𝒐 𝒅𝒐𝒘𝒏𝒍𝒐𝒂𝒅.");
    }

    const downloadLink = appData.dllink;
    const captionText =
      "『 *𝑴𝑬𝑮𝑨𝑻𝑹𝑶𝑵 𝑨𝒑𝒑* 』\n\n*𝑵𝒂𝒎𝒆 :* " + appData.name +
      "\n*Id :* " + appData["package"] +
      "\n*Last Update :* " + appData.lastup +
      "\n*Size :* " + appData.size +
      "\n";

    const apkFileName = (appData?.["name"] || "Downloader") + ".apk";
    const filePath = apkFileName;

    const response = await axios.get(downloadLink, { 'responseType': "stream" });
    const fileWriter = fs.createWriteStream(filePath);
    response.data.pipe(fileWriter);

    await new Promise((resolve, reject) => {
      fileWriter.on('finish', resolve);
      fileWriter.on("error", reject);
    });

    const documentMessage = {
      'document': fs.readFileSync(filePath),
      'mimetype': 'application/vnd.android.package-archive',
      'fileName': apkFileName
    };

    // Utilisation d'une seule méthode sendMessage pour envoyer l'image et le document
    zk.sendMessage(dest, { image: { url: appData.icon }, caption: captionText }, { quoted: ms });
    zk.sendMessage(dest, documentMessage, { quoted: ms });

    // Supprimer le fichier après envoi
    fs.unlinkSync(filePath);
  } catch (error) {
    console.error('Erreur lors du traitement de la commande apk:', error);
    repondre("*𝑬𝒓𝒓𝒐𝒓 𝒅𝒖𝒓𝒊𝒏𝒈 𝒂𝒑𝒌 𝒄𝒐𝒎𝒎𝒂𝒏𝒅 𝒑𝒓𝒐𝒄𝒆𝒔𝒔𝒊𝒏𝒈*");
  }
});





/*******************************  automute && autoummute ***************************/

const cron = require(`../bdd/cron`) ;


zokou({
      nomCom : 'automute',
      categorie : 'Group'
  } , async (dest,zk,commandeOptions) => {

      const {arg , repondre , verifAdmin } = commandeOptions ;

      if (!verifAdmin) { repondre('𝒀𝒐𝒖 𝒂𝒓𝒆 𝒏𝒐𝒕 𝒂𝒏 𝒂𝒅𝒎𝒊𝒏 𝒐𝒇 𝒕𝒉𝒊𝒔 𝒈𝒓𝒐𝒖𝒑') ; return}

      group_cron = await cron.getCronById(dest) ;
      
     

      if (!arg || arg.length == 0) {

        let state ;
        if (group_cron == null || group_cron.mute_at == null) {
  
            state =  "No time set for automatic mute"
        } else {
  
          state =  `The group will be muted at ${(group_cron.mute_at).split(':')[0]} ${(group_cron.mute_at).split(':')[1]}`
        }
  
        let msg = `* *State:* ${state}
        * *Instructions:* To activate automatic mute, add the minute and hour after the command separated by ':'
        Example automute 9:30
        * To delete the automatic mute, use the command *automute del*`
        

          repondre(msg) ;
          return ;
      } else {

        let texte = arg.join(' ')

        if (texte.toLowerCase() === `del` ) { 

          if (group_cron == null) {

              repondre('No cronometrage is active') ;
          } else {

              await cron.delCron(dest) ;

              repondre("𝑻𝒉𝒆 𝒂𝒖𝒕𝒐𝒎𝒂𝒕𝒊𝒄 𝒎𝒖𝒕𝒆 𝒉𝒂𝒔 𝒃𝒆𝒆𝒏 𝒓𝒆𝒎𝒐𝒗𝒆𝒅; 𝒓𝒆𝒔𝒕𝒂𝒓𝒕 𝒕𝒐 𝒂𝒑𝒑𝒍𝒚 𝒄𝒉𝒂𝒏𝒈𝒆𝒔") 
              .then(() => {

                exec("pm2 restart all");
              }) ;
          }
        } else if (texte.includes(':')) {

          //let { hr , min } = texte.split(':') ;

          await cron.addCron(dest,"mute_at",texte) ;

          repondre(`𝑺𝒆𝒕𝒕𝒊𝒏𝒈  𝒖𝒑 𝒂𝒖𝒕𝒐𝒎𝒂𝒕𝒊𝒄 𝒎𝒖𝒕𝒆 𝒇𝒐𝒓 ${texte} ; restart to apply changes`) 
          .then(() => {

            exec("pm2 restart all");
          }) ;

        } else {
            repondre('𝑷𝒍𝒆𝒂𝒔𝒆 𝒆𝒏𝒕𝒆𝒓 𝒂 𝒗𝒂𝒍𝒊𝒅 𝒕𝒊𝒎𝒆 𝒘𝒊𝒕𝒉 𝒉𝒐𝒖𝒓 𝒂𝒏𝒅 𝒎𝒊𝒏𝒖𝒕𝒆 𝒔𝒆𝒑𝒂𝒓𝒂𝒕𝒆𝒅 𝒃𝒚 :') ;
        }


      }
  });


  zokou({
    nomCom : 'autounmute',
    categorie : 'Group'
} , async (dest,zk,commandeOptions) => {

    const {arg , repondre , verifAdmin } = commandeOptions ;

    if (!verifAdmin) { repondre('𝒀𝒐𝒖 𝒂𝒓𝒆 𝒏𝒐𝒕 𝒂𝒏 𝒂𝒅𝒎𝒊𝒏 𝒐𝒇 𝒕𝒉𝒊𝒔 𝒈𝒓𝒐𝒖𝒑') ; return}

    group_cron = await cron.getCronById(dest) ;
    
   

    if (!arg || arg.length == 0) {

      let state ;
      if (group_cron == null || group_cron.unmute_at == null) {

          state = "No time set for autounmute" ;

      } else {

        state = `The group will be un-muted at ${(group_cron.unmute_at).split(':')[0]}H ${(group_cron.unmute_at).split(':')[1]}`
      }

      let msg = `* *State:* ${state}
      * *Instructions:* To activate autounmute, add the minute and hour after the command separated by ':'
      Example autounmute 7:30
      * To delete autounmute, use the command *autounmute del*`

        repondre(msg) ;
        return ;

    } else {

      let texte = arg.join(' ')

      if (texte.toLowerCase() === `del` ) { 

        if (group_cron == null) {

            repondre('No cronometrage has been activated') ;
        } else {

            await cron.delCron(dest) ;

            repondre("𝑻𝒉𝒆 𝒂𝒖𝒕𝒐𝒖𝒏𝒎𝒖𝒕𝒆 𝒉𝒂𝒔 𝒃𝒆𝒆𝒏 𝒓𝒆𝒎𝒐𝒗𝒆𝒅; 𝒓𝒆𝒔𝒕𝒂𝒓𝒕 𝒕𝒐 𝒂𝒑𝒑𝒍𝒚 𝒕𝒉𝒆 𝒄𝒉𝒂𝒏𝒈𝒆𝒔")
            .then(() => {

              exec("pm2 restart all");
            }) ;

            

        }
      } else if (texte.includes(':')) {

       

        await cron.addCron(dest,"unmute_at",texte) ;

        repondre(`Setting up autounmute for ${texte}; restart to apply the changes`)
        .then(() => {

          exec("pm2 restart all");
        }) ;

      } else {
          repondre('𝑷𝒍𝒆𝒂𝒔𝒆 𝒆𝒏𝒕𝒆𝒓 𝒂 𝒗𝒂𝒍𝒊𝒅 𝒕𝒊𝒎𝒆 𝒘𝒊𝒕𝒉 𝒉𝒐𝒖𝒓 𝒂𝒏𝒅 𝒎𝒊𝒏𝒖𝒕𝒆 𝒔𝒆𝒑𝒂𝒓𝒂𝒕𝒆𝒅 𝒃𝒚 :') ;
      }


    }
});



zokou({
  nomCom : 'fkick',
  categorie : 'Group'
} , async (dest,zk,commandeOptions) => {

  const {arg , repondre , verifAdmin , superUser , verifZokouAdmin } = commandeOptions ;

  if (verifAdmin || superUser) {

    if(!verifZokouAdmin){ repondre('You need admin rights to perform this command') ; return ;}

    if (!arg || arg.length == 0) { repondre('Please enter the country code whose members will be removed') ; return ;}

      let metadata = await zk.groupMetadata(dest) ;

      let participants = metadata.participants ;

      for (let i = 0 ; i < participants.length ; i++) {

          if (participants[i].id.startsWith(arg[0]) && participants[i].admin === null ) {

             await zk.groupParticipantsUpdate(dest, [participants[i].id], "remove") ;
          }
      }

  } else {
    repondre('𝑺𝒐𝒓𝒓𝒚, 𝒚𝒐𝒖 𝒂𝒓𝒆 𝒏𝒐𝒕 𝒂𝒏 𝒂𝒅𝒎𝒊𝒏 𝒐𝒇 𝒕𝒉𝒊𝒔 𝒈𝒓𝒐𝒖𝒑')
  }


}) ;


zokou({
      nomCom : 'nsfw',
      categorie : 'Group'
}, async (dest,zk,commandeOptions) => {
  
    const {arg , repondre , verifAdmin } = commandeOptions ;

  if(!verifAdmin) { repondre('𝑺𝒐𝒓𝒓𝒚, 𝒚𝒐𝒖 𝒄𝒂𝒏𝒏𝒐𝒕 𝒆𝒏𝒂𝒃𝒍𝒆 𝑵𝑺𝑭𝑾 𝒄𝒐𝒏𝒕𝒆𝒏𝒕 𝒘𝒊𝒕𝒉𝒐𝒖𝒕 𝒃𝒆𝒊𝒏𝒈 𝒂𝒏 𝒂𝒅𝒎𝒊𝒏 𝒐𝒇 𝒕𝒉𝒆 𝒈𝒓𝒐𝒖𝒑') ; return}

      let hbd = require('../bdd/hentai') ;

    let isHentaiGroupe = await hbd.checkFromHentaiList(dest) ;

  if (arg[0] == 'on') {
    
       if(isHentaiGroupe) {repondre('NSFW content is already active for this group') ; return} ;

      await hbd.addToHentaiList(dest) ;

      repondre('𝑵𝑺𝑭𝑾 𝒄𝒐𝒏𝒕𝒆𝒏𝒕 𝒊𝒔 𝒏𝒐𝒘 𝒂𝒄𝒕𝒊𝒗𝒆 𝒇𝒐𝒓 𝒕𝒉𝒊𝒔 𝒈𝒓𝒐𝒖𝒑') ;
       
  } else if (arg[0] == 'off') {

     if(!isHentaiGroupe) {repondre('NSFW content is already disabled for this group') ; return} ;

      await hbd.removeFromHentaiList(dest) ;

      repondre('𝑵𝑺𝑭𝑾 𝒄𝒐𝒏𝒕𝒆𝒏𝒕 𝒊𝒔 𝒏𝒐𝒘 𝒅𝒊𝒔𝒂𝒃𝒍𝒆𝒅 𝒇𝒐𝒓 𝒕𝒉𝒊𝒔 𝒈𝒓𝒐𝒖𝒑') ;
  } else {

      repondre('𝒀𝒐𝒖 𝒎𝒖𝒔𝒕 𝒆𝒏𝒕𝒆𝒓 "𝒐𝒏" or "𝒐𝒇𝒇"') ;
    }
} ) ;
