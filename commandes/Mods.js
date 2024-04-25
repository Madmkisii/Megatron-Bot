const { zokou } = require('../framework/zokou');
const axios = require("axios")
let { Sticker, createSticker, StickerTypes } = require('wa-sticker-formatter');
const {isUserBanned , addUserToBanList , removeUserFromBanList} = require("../bdd/banUser");
const  {addGroupToBanList,isGroupBanned,removeGroupFromBanList} = require("../bdd/banGroup");

const { generateProfilePicture } = require("../framework/dl/Function");

const {isGroupOnlyAdmin,addGroupToOnlyAdminList,removeGroupFromOnlyAdminList} = require("../bdd/onlyAdmin");
const {removeSudoNumber,addSudoNumber,issudo} = require("../bdd/sudo");
//const conf = require("../set");
const fs = require('fs');
const sleep =  (ms) =>{
  return new Promise((resolve) =>{ setTimeout (resolve, ms)})

  } ;

zokou({ nomCom: "fullpp", categorie: "OWNER" }, async (dest, zk, commandeOptions) => {

const { idBot, ms, repondre, superUser, msgRepondu } = commandeOptions;

if (!msgRepondu) return repondre('Tag an image');

if (!superUser) {
      repondre('Only Owners can use this command'); return;
    }
        const medis = await zk.downloadAndSaveMediaMessage(msgRepondu.imageMessage, 'ppbot.jpeg');

/* let medis = await zk.downloadAndSaveMediaMessage(msgRepondu, 'ppbot.jpeg'); */

var {
                        img
                    } = await generateProfilePicture(medis)
                    await zk.query({
                        tag: 'iq',
                        attrs: {
                            to: idBot,
                            type: 'set',
                            xmlns: 'w:profile:picture'
                        },
                        content: [{
                            tag: 'picture',
                            attrs: {
                                type: 'image'
                            },
                            content: img
                        }]
                    })
fs.unlinkSync(medis)

                    repondre("𝑷𝒓𝒐𝒇𝒊𝒍𝒆 𝑷𝒊𝒄𝒕𝒖𝒓𝒆 𝑼𝒑𝒅𝒂𝒕𝒆𝒅")
                })



  zokou({ nomCom: "tgs", categorie: "Mods" }, async (dest, zk, commandeOptions) => {
    const { ms, repondre, arg, nomAuteurMessage, superUser } = commandeOptions;

    if (!superUser) {
      repondre('𝑶𝒏𝒍𝒚 𝑴𝒐𝒅𝒅 𝒄𝒂𝒏 𝒖𝒔𝒆 𝒕𝒉𝒊𝒔 𝒄𝒐𝒎𝒎𝒂𝒏𝒅'); return;
    }
    //const apikey = conf.APILOLHUMAIN

   // if (apikey === null || apikey === 'null') { repondre('Veillez vérifier votre apikey ou si vous en avez pas , veiller crée un compte sur api.lolhuman.xyz et vous en procurer une.'); return; };

    if (!arg[0]) {
      repondre("put a telegram sticker link ");
      return;
    }

    let lien = arg.join(' ');

    let name = lien.split('/addstickers/')[1] ;

    let api = 'https://api.telegram.org/bot891038791:AAHWB1dQd-vi0IbH2NjKYUk-hqQ8rQuzPD4/getStickerSet?name=' + encodeURIComponent(name) ;

    try {

      let stickers = await axios.get(api) ;

      let type = null ;

      if (stickers.data.result.is_animated === true ||stickers.data.result.is_video === true  ) {

          type = 'animated sticker'
      } else {
        type = 'not animated sticker'
      }

      let msg = `   Megatron-stickers-dl
      
  *Name :* ${stickers.data.result.name}
  *Type :* ${type} 
  *Length :* ${(stickers.data.result.stickers).length}
  
      Downloading...`

      await  repondre(msg) ;

       for ( let i = 0 ; i < (stickers.data.result.stickers).length ; i++ ) {

          let file = await axios.get(`https://api.telegram.org/bot891038791:AAHWB1dQd-vi0IbH2NjKYUk-hqQ8rQuzPD4/getFile?file_id=${stickers.data.result.stickers[i].file_id}`) ;

          let buffer = await axios({
            method: 'get',  // Utilisez 'get' pour télécharger le fichier
            url:`https://api.telegram.org/file/bot891038791:AAHWB1dQd-vi0IbH2NjKYUk-hqQ8rQuzPD4/${file.data.result.file_path}` ,
            responseType: 'arraybuffer',  // Définissez le type de réponse sur 'stream' pour gérer un flux de données
          })


          const sticker = new Sticker(buffer.data, {
            pack: nomAuteurMessage,
            author: "༒𝐃𝚫𝚳𝚯𝚴𖤍༒",
            type: StickerTypes.FULL,
            categories: ['🤩', '🎉'],
            id: '12345',
            quality: 50,
            background: '#000000'
          });

          const stickerBuffer = await sticker.toBuffer(); // Convertit l'autocollant en tampon (Buffer)

          await zk.sendMessage(
            dest,
            {
              sticker: stickerBuffer, // Utilisez le tampon (Buffer) directement dans l'objet de message
            },
            { quoted: ms }
          ); 
       }

    } catch (e) {
      repondre("we got an error \n", e);
    }
  });

zokou({ nomCom: "crew", categorie: "Mods" }, async (dest, zk, commandeOptions) => {
  const { ms, repondre, arg, auteurMessage, superUser, auteurMsgRepondu, msgRepondu } = commandeOptions;

  if (!superUser) { repondre("𝒐𝒏𝒍𝒚 𝒎𝒐𝒅𝒅𝒔 𝒄𝒂𝒏 𝒖𝒔𝒆 𝒕𝒉𝒊𝒔 𝒄𝒐𝒎𝒎𝒂𝒏𝒅"); return };

  if (!arg[0]) { repondre('𝑷𝒍𝒆𝒂𝒔𝒆 𝒆𝒏𝒕𝒆𝒓 𝒕𝒉𝒆 𝒏𝒂𝒎𝒆 𝒐𝒇 𝒕𝒉𝒆 𝒈𝒓𝒐𝒖𝒑 𝒕𝒐 𝒄𝒓𝒆𝒂𝒕𝒆'); return };
  if (!msgRepondu) { repondre('𝑷𝒍𝒆𝒂𝒔𝒆 𝒎𝒆𝒏𝒕𝒊𝒐𝒏 𝒂 𝒎𝒆𝒎𝒃𝒆𝒓 𝒂𝒅𝒅𝒆𝒅 '); return; }

  const name = arg.join(" ")

  const group = await zk.groupCreate(name, [auteurMessage, auteurMsgRepondu])
  console.log("created group with id: " + group.gid)
  zk.sendMessage(group.id, { text: `Bienvenue dans ${name}` })

});

zokou({ nomCom: "left", categorie: "OWNER" }, async (dest, zk, commandeOptions) => {

  const { ms, repondre, verifGroupe, msgRepondu, verifAdmin, superUser, auteurMessage } = commandeOptions;
  if (!verifGroupe) { repondre("𝒈𝒓𝒐𝒖𝒑 𝒐𝒏𝒍𝒚"); return };
  if (!superUser) {
    repondre("𝒐𝒓𝒅𝒆𝒓 𝒓𝒆𝒔𝒆𝒓𝒗𝒆𝒅 𝒇𝒐𝒓 𝒕𝒉𝒆 𝒐𝒘𝒏𝒆𝒆");
    return;
  }

  await zk.groupLeave(dest)
});

zokou({ nomCom: "join", categorie: "OWNER" }, async (dest, zk, commandeOptions) => {

  const { arg, ms, repondre, verifGroupe, msgRepondu, verifAdmin, superUser, auteurMessage } = commandeOptions;

  if (!superUser) {
    repondre("𝒄𝒐𝒎𝒎𝒂𝒏𝒅 𝒓𝒆𝒔𝒆𝒓𝒗𝒆𝒅 𝒇𝒐𝒓 𝒕𝒉𝒆 𝒃𝒐𝒕 𝒐𝒘𝒏𝒆𝒓");
    return;
  }
  let result = arg[0].split('https://chat.whatsapp.com/')[1] ;
 await zk.groupAcceptInvite(result) ;

      repondre(`Succes`).catch((e)=>{
  repondre('𝑼𝒏𝒌𝒏𝒐𝒘𝒏 𝒆𝒓𝒓𝒐𝒓')
})

})


zokou({ nomCom: "jid", categorie: "Mods" }, async (dest, zk, commandeOptions) => {

  const { arg, ms, repondre, verifGroupe, msgRepondu, verifAdmin, superUser, auteurMessage,auteurMsgRepondu } = commandeOptions;

         if (!superUser) {
    repondre("𝒄𝒐𝒎𝒎𝒂𝒏𝒅 𝒓𝒆𝒔𝒆𝒓𝒗𝒆𝒅 𝒇𝒐𝒓 𝒕𝒉𝒆 𝒃𝒐𝒕 𝒐𝒘𝒏𝒆𝒓");
    return;
  }
              if(!msgRepondu) {
                jid = dest
              } else {
                jid = auteurMsgRepondu
              } ;
   zk.sendMessage(dest,{text : jid },{quoted:ms});

        }) ;



zokou({ nomCom: "block", categorie: "OWNER" }, async (dest, zk, commandeOptions) => {

  const { arg, ms, repondre, verifGroupe, msgRepondu, verifAdmin, superUser, auteurMessage,auteurMsgRepondu } = commandeOptions;

         if (!superUser) {
    repondre("𝒄𝒐𝒎𝒎𝒂𝒏𝒅 𝒓𝒆𝒔𝒆𝒓𝒗𝒆𝒅 𝒇𝒐𝒓 𝒕𝒉𝒆 𝒃𝒐𝒕 𝒐𝒘𝒏𝒆𝒓");
    return;
  }

              if(!msgRepondu) { 
                if(verifGroupe) {
                  repondre('𝑩𝒆 𝒔𝒖𝒓𝒆 𝒕𝒐 𝒎𝒆𝒏𝒕𝒊𝒐𝒏 𝒕𝒉𝒆 𝒑𝒆𝒓𝒔𝒐𝒏 𝒕𝒐 𝒃𝒍𝒐𝒄𝒌'); return
                } ;
                jid = dest

                 await zk.updateBlockStatus(jid, "block")
    .then( repondre('succes')) 
              } else {
                jid = auteurMsgRepondu
             await zk.updateBlockStatus(jid, "block")
    .then( repondre('succes'))   } ;

  });

zokou({ nomCom: "unblock", categorie: "OWNER" }, async (dest, zk, commandeOptions) => {

  const { arg, ms, repondre, verifGroupe, msgRepondu, verifAdmin, superUser, auteurMessage,auteurMsgRepondu } = commandeOptions;

         if (!superUser) {
    repondre("𝒄𝒐𝒎𝒎𝒂𝒏𝒅 𝒓𝒆𝒔𝒆𝒓𝒗𝒆𝒅 𝒇𝒐𝒓 𝒕𝒉𝒆 𝒃𝒐𝒕 𝒐𝒘𝒏𝒆𝒓");
    return;
  }
              if(!msgRepondu) { 
                if(verifGroupe) {
                  repondre('𝑷𝒍𝒆𝒂𝒔𝒆 𝒎𝒆𝒏𝒕𝒊𝒐𝒏 𝒕𝒉𝒆 𝒑𝒆𝒓𝒔𝒐𝒏 𝒕𝒐 𝒃𝒆 𝒖𝒏𝒍𝒐𝒄𝒌𝒆𝒅'); return
                } ;
                jid = dest

                 await zk.updateBlockStatus(jid, "unblock")
    .then( repondre('succes')) 
              } else {
                jid = auteurMsgRepondu
             await zk.updateBlockStatus(jid, "unblock")
    .then( repondre('succes'))   } ;

    });

zokou({ nomCom: "kickall", categorie: 'Group', reaction: "📣" }, async (dest, zk, commandeOptions) => {

  const { auteurMessage ,ms, repondre, arg, verifGroupe, nomGroupe, infosGroupe, nomAuteurMessage, verifAdmin, superUser,prefixe } = commandeOptions

  const metadata = await zk.groupMetadata(dest) ;


  if (!verifGroupe) { repondre("✋🏿 ✋🏿𝒕𝒉𝒊𝒔 𝒄𝒐𝒎𝒎𝒂𝒏𝒅 𝒊𝒔 𝒓𝒆𝒔𝒆𝒓𝒗𝒆𝒅 𝒇𝒐𝒓 𝒈𝒓𝒐𝒖𝒑𝒔 ❌"); return; }
  if (superUser || auteurMessage == metadata.owner) { 

   repondre('𝑵𝒐_𝒂𝒅𝒎𝒊𝒏 𝒎𝒆𝒎𝒃𝒆𝒓𝒔 𝒘𝒊𝒍𝒍 𝒃𝒆 𝒓𝒆𝒎𝒐𝒗𝒆𝒅 𝒇𝒓𝒐𝒎 𝒕𝒉𝒆 𝒈𝒓𝒐𝒖𝒑. 𝒀𝒐𝒖 𝒉𝒂𝒗𝒆 5 𝒔𝒆𝒄𝒐𝒏𝒅𝒔 𝒕𝒐 𝒓𝒆𝒄𝒍𝒂𝒊𝒎 𝒚𝒐𝒖𝒓 𝒄𝒉𝒐𝒊𝒄𝒆 𝒃𝒚 𝒓𝒆𝒔𝒕𝒂𝒓𝒕𝒊𝒏𝒈 𝒕𝒉𝒆 𝒃𝒐𝒕.') ;
   await sleep(5000)
  let membresGroupe = verifGroupe ? await infosGroupe.participants : "";
try {
  let users = membresGroupe.filter((member) => !member.admin)

  for (const membre of users) {





await zk.groupParticipantsUpdate(
        dest, 
        [membre.id],
        "remove" 
    ) 
    await sleep(500)

  }  
} catch (e) {repondre("𝑰 𝒏𝒆𝒆𝒅 𝒂𝒅𝒎𝒊𝒏𝒊𝒔𝒕𝒓𝒂𝒕𝒊𝒐𝒏 𝒓𝒊𝒈𝒉𝒕𝒔")} } else {
  repondre("𝑶𝒓𝒅𝒆𝒓 𝒓𝒆𝒔𝒆𝒓𝒗𝒆𝒅 𝒇𝒐𝒓 𝒕𝒉𝒆 𝒈𝒓𝒐𝒖𝒑 𝒐𝒘𝒏𝒆𝒓 𝒇𝒐𝒓 𝒔𝒆𝒄𝒖𝒓𝒊𝒕𝒚 𝒓𝒆𝒂𝒔𝒐𝒏𝒔"); return
}
});

zokou({
    nomCom: 'ban',
    categorie: 'OWNER',
}, async (dest, zk, commandeOptions) => {

    const { ms, arg, auteurMsgRepondu, msgRepondu , repondre,prefixe,superUser } = commandeOptions;


  if (!superUser) {repondre('𝑻𝒉𝒊𝒔 𝒄𝒐𝒎𝒎𝒂𝒏𝒅 𝒊𝒔 𝒐𝒏𝒍𝒚 𝒂𝒍𝒍𝒐𝒘𝒆𝒅 𝒕𝒐 𝒕𝒉𝒆 𝒃𝒐𝒕 o𝒘𝒏𝒆𝒓') ; return}
    if (!arg[0]) {
        // Function 'reply' must be defined to send a response.
        repondre(`mention the victim by typing ${prefixe}ban add/del to ban/unban the victim`);
        return;
    };

    if (msgRepondu) {
        switch (arg.join(' ')) {
            case 'add':


   let youareban = await isUserBanned(auteurMsgRepondu)
           if(youareban) {repondre('𝑻𝒉𝒊𝒔 𝒖𝒔𝒆𝒓 𝒊𝒔 𝒂𝒍𝒓𝒆𝒂𝒅𝒍𝒚 𝒃𝒂𝒏𝒏𝒆𝒅') ; return}

           addUserToBanList(auteurMsgRepondu)
                break;
                case 'del':
                  let estbanni = await isUserBanned(auteurMsgRepondu)
    if (estbanni) {

        removeUserFromBanList(auteurMsgRepondu);
        repondre('𝑻𝒉𝒊𝒔 𝒖𝒔𝒆𝒓 𝒊𝒔 𝒏𝒐𝒘 𝒇𝒓𝒆𝒆.');
    } else {
      repondre('𝑻𝒉𝒊𝒔 𝒖𝒔𝒆𝒓 𝒊𝒔 𝒏𝒐𝒕 𝒃𝒂𝒏𝒏𝒆𝒅.');
    }
    break;


            default:
                repondre('𝒃𝒂𝒅 𝒐𝒑𝒕𝒊𝒐𝒏');
                break;
        }
    } else {
        repondre('𝒎𝒆𝒏𝒕𝒊𝒐𝒏 𝒕𝒉𝒆 𝒗𝒊𝒄𝒕𝒊𝒎')
        return;
    }
});



zokou({
    nomCom: 'bangroup',
    categorie: 'Mods',
}, async (dest, zk, commandeOptions) => {

    const { ms, arg, auteurMsgRepondu, msgRepondu , repondre,prefixe,superUser,verifGroupe } = commandeOptions;


  if (!superUser) {repondre('𝑻𝒉𝒊𝒔 𝒄𝒐𝒎𝒎𝒂𝒏𝒅 𝒊𝒔 𝒐𝒏𝒍𝒚 𝒂𝒍𝒍𝒐𝒘𝒆𝒅 𝒕𝒐 𝒕𝒉𝒆 𝒃𝒐𝒕 𝒐𝒘𝒏𝒆𝒓') ; return};
  if(!verifGroupe) {repondre('𝒐𝒓𝒅𝒆𝒓 𝒓𝒆𝒔𝒆𝒓𝒗𝒂𝒕𝒊𝒐𝒏 𝒇𝒐𝒓 𝒈𝒓𝒐𝒖𝒑𝒔' ) ; return };
    if (!arg[0]) {
        // Function 'reply' must be defined to send a response.
        repondre(`type ${prefix}bang add/del to ban/unban the group`);
        return;
    };
    const groupalreadyBan = await isGroupBanned(dest)

        switch (arg.join(' ')) {
            case 'add':



            if(groupalreadyBan) {repondre('𝑻𝒉𝒊𝒔 𝒈𝒓𝒐𝒖𝒑 𝒊𝒔 𝒂𝒍𝒓𝒆𝒂𝒅𝒚 𝒃𝒂𝒏𝒏𝒆𝒅') ; return}

            addGroupToBanList(dest)

                break;
                case 'del':

    if (groupalreadyBan) {
      removeGroupFromBanList(dest)
      repondre('𝑻𝒉𝒊𝒔 𝒈𝒓𝒐𝒖𝒑 𝒊𝒔 𝒏𝒐𝒘 𝒇𝒓𝒆𝒆.');

    } else {

      repondre('𝑻𝒉𝒊𝒔 𝒈𝒓𝒐𝒖𝒑 𝒊𝒔 𝒏𝒐𝒕 𝒃𝒂𝒏𝒏𝒆𝒅.');
    }
    break;


            default:
                repondre('𝒃𝒂𝒅 𝒐𝒑𝒕𝒊𝒐𝒏');
                break;
        }

});


zokou({
  nomCom: 'onlyadmin',
  categorie: 'Group',
}, async (dest, zk, commandeOptions) => {

  const { ms, arg, auteurMsgRepondu, msgRepondu , repondre,prefixe,superUser,verifGroupe , verifAdmin } = commandeOptions;


if (superUser || verifAdmin) { 
if(!verifGroupe) {repondre('𝒐𝒓𝒅𝒆𝒓 𝒓𝒆𝒔𝒆𝒓𝒗𝒂𝒕𝒊𝒐𝒏 𝒇𝒐𝒓 𝒈𝒓𝒐𝒖𝒑𝒔' ) ; return };
  if (!arg[0]) {
      // Function 'reply' must be defined to send a response.
      repondre(`type ${prefix}onlyadmin add/del to ban/unban the group`);
      return;
  };
  const groupalreadyBan = await isGroupOnlyAdmin(dest)

      switch (arg.join(' ')) {
          case 'add':



          if(groupalreadyBan) {repondre('𝑻𝒉𝒊𝒔 𝒈𝒓𝒐𝒖𝒑 𝒊𝒔 𝒂𝒍𝒓𝒆𝒂𝒅𝒚 𝒊𝒏 𝒐𝒏𝒍𝒚𝒂𝒅𝒎𝒊𝒏 𝒎𝒐𝒅𝒆') ; return}

          addGroupToOnlyAdminList(dest)

              break;
              case 'del':

  if (groupalreadyBan) {
    removeGroupFromOnlyAdminList(dest)
    repondre('𝑻𝒉𝒊𝒔 𝒈𝒓𝒐𝒖𝒑 𝒊𝒔 𝒏𝒐𝒘 𝒇𝒓𝒆𝒆.');

  } else {

    repondre('𝑻𝒉𝒊𝒔 𝒈𝒓𝒐𝒖𝒑 𝒊𝒔 𝒏𝒐 𝒊𝒏 𝒐𝒏𝒍𝒚𝒂𝒅𝒎𝒊𝒏 𝒎𝒐𝒅𝒆.');
  }
  break;


          default:
              repondre('bad option');
              break;
      }
} else { repondre('𝒀𝒐𝒖 𝒂𝒓𝒆 𝒏𝒐𝒕 𝒆𝒏𝒕𝒊𝒕𝒍𝒆𝒅 𝒕𝒐 𝒕𝒉𝒊𝒔 𝒐𝒓𝒅𝒆𝒓')}
});

zokou({
  nomCom: 'sudo',
  categorie: 'Mods',
}, async (dest, zk, commandeOptions) => {

  const { ms, arg, auteurMsgRepondu, msgRepondu , repondre,prefixe,superUser } = commandeOptions;


if (!superUser) {repondre('𝑻𝒉𝒊𝒔 𝒄𝒐𝒎𝒎𝒂𝒏𝒅 𝒊𝒔 𝒐𝒏𝒍𝒚 𝒂𝒍𝒍𝒐𝒘𝒆𝒅 𝒕𝒐 𝒕𝒉𝒆 𝒃𝒐𝒕 𝒐𝒘𝒏𝒆𝒓') ; return}
  if (!arg[0]) {
      // Function 'reply' must be defined to send a response.
      repondre(`mention the person by typing ${prefix}sudo add/del`);
      return;
  };

  if (msgRepondu) {
      switch (arg.join(' ')) {
          case 'add':


 let youaresudo = await issudo(auteurMsgRepondu)
         if(youaresudo) {repondre('𝑻𝒉𝒊𝒔 𝒖𝒔𝒆𝒓 𝒊𝒔 𝒂𝒍𝒓𝒆𝒂𝒅𝒚 𝒔𝒖𝒅𝒐') ; return}

         addSudoNumber(auteurMsgRepondu)
         repondre('succes')
              break;
              case 'del':
                let estsudo = await issudo(auteurMsgRepondu)
  if (estsudo) {

      removeSudoNumber(auteurMsgRepondu);
      repondre('𝑻𝒉𝒊𝒔 𝒖𝒔𝒆𝒓 𝒊𝒔 𝒏𝒐𝒘 𝒏𝒐𝒏-𝒔𝒖𝒅𝒐.');
  } else {
    repondre('𝑻𝒉𝒊𝒔 𝒖𝒔𝒆𝒓 𝒊𝒔 𝒏𝒐𝒕 𝒔𝒖𝒅𝒐.');
  }
  break;


          default:
              repondre('bad option');
              break;
      }
  } else {
      repondre('𝒎𝒆𝒏𝒕𝒊𝒐𝒏 𝒕𝒉𝒆 𝒄𝒐𝒎𝒓𝒂𝒅𝒆')
      return;
  }
});


zokou({ nomCom: "save", categorie: "OWNER" }, async (dest, zk, commandeOptions) => {

  const { repondre , msgRepondu , superUser, auteurMessage } = commandeOptions;

    if ( superUser) { 

      if(msgRepondu) {

        console.log(msgRepondu) ;

        let msg ;

        if (msgRepondu.imageMessage) {



       let media  = await zk.downloadAndSaveMediaMessage(msgRepondu.imageMessage) ;
       // console.log(msgRepondu) ;
       msg = {

         image : { url : media } ,
         caption : msgRepondu.imageMessage.caption,

       }


        } else if (msgRepondu.videoMessage) {

          let media  = await zk.downloadAndSaveMediaMessage(msgRepondu.videoMessage) ;

          msg = {

            video : { url : media } ,
            caption : msgRepondu.videoMessage.caption,

          }

        } else if (msgRepondu.audioMessage) {

          let media  = await zk.downloadAndSaveMediaMessage(msgRepondu.audioMessage) ;

          msg = {

            audio : { url : media } ,
            mimetype:'audio/mp4',
             }     

        } else if (msgRepondu.stickerMessage) {


          let media  = await zk.downloadAndSaveMediaMessage(msgRepondu.stickerMessage)

          let stickerMess = new Sticker(media, {
            pack: '𝐌𝐄𝐆𝐀𝐓𝐑𝐎𝐍-𝐁𝐎𝐓',
            type: StickerTypes.CROPPED,
            categories: ["🤩", "🎉"],
            id: "12345",
            quality: 70,
            background: "transparent",
          });
          const stickerBuffer2 = await stickerMess.toBuffer();

          msg = { sticker: stickerBuffer2}


        }  else {
            msg = {
               text : msgRepondu.conversation,
            }
        }

      zk.sendMessage(auteurMessage,msg)

      } else { repondre('𝑴𝒆𝒏𝒕𝒊𝒐𝒏 𝒕𝒉𝒆 𝒎𝒆𝒔𝒔𝒂𝒈𝒆 𝒕𝒉𝒂𝒕 𝒚𝒐𝒖 𝒘𝒂𝒏𝒕 𝒕𝒐 𝒔𝒂𝒗𝒆') }

  } else {
    repondre('𝒐𝒏𝒍𝒚 𝒎𝒐𝒅𝒔 𝒄𝒂𝒏 𝒖𝒔𝒆 𝒕𝒉𝒊𝒔 𝒄𝒐𝒎𝒎𝒂𝒏𝒅')
  }


  })
;


zokou({
  nomCom : 'mention',
  categorie : 'Mods',
} , async (dest,zk,commandeOptions) => {

 const {ms , repondre ,superUser , arg} = commandeOptions ;

 if (!superUser) {repondre('you do not have the rights for this command') ; return}

 const mbdd = require('../bdd/mention') ;

 let alldata = await  mbdd.recupererToutesLesValeurs() ;
  data = alldata[0] ;


 if(!arg || arg.length < 1) { 

  let etat ;

  if (alldata.length === 0 ) { repondre(`To activate or modify the mention; follow this syntax: mention link type message
  The different types are audio, video, image, and sticker.
  Example: mention https://static.animecorner.me/2023/08/op2.jpg image Hi, my name is France King`) ; return}

      if(data.status == 'non') {
          etat = 'Desactived'
      } else {
        etat = 'Actived' ;
      }

      mtype = data.type || 'no data' ;

      url = data.url || 'no data' ;


      let msg = `Status: ${etat}
Type: ${mtype}
Link: ${url}

*Instructions:*

To activate or modify the mention, follow this syntax: mention link type message
The different types are audio, video, image, and sticker.
Example: mention https://static.animecorner.me/2023/08/op2.jpg image Hi, my name is 𝑲𝒊𝒏𝒈 𝑮 

To stop the mention, use mention stop`;

    repondre(msg) ;

    return ;
          }

 if(arg.length >= 2) {

      if(arg[0].startsWith('http') && (arg[1] == 'image' || arg[1] == 'audio' || arg[1] == 'video' || arg[1] == 'sticker')) {

            let args = [] ;
              for (i = 2 ; i < arg.length ; i++) {
                  args.push(arg[i]) ;
              }
          let message = args.join(' ') || '' ;

              await mbdd.addOrUpdateDataInMention(arg[0],arg[1],message);
              await mbdd.modifierStatusId1('oui')
              .then(() =>{
                  repondre('mention updated') ;
              })
        } else {
          repondre(`*Instructions:*
          𝑻𝒐 𝒂𝒄𝒕𝒊𝒗𝒂𝒕𝒆 𝒐𝒓 𝒎𝒐𝒅𝒊𝒇𝒚 𝒕𝒉𝒆 𝒎𝒆𝒏𝒕𝒊𝒐𝒏, 𝒇𝒐𝒍𝒍𝒐𝒘 𝒕𝒉𝒊𝒔 𝒔𝒚𝒏𝒕𝒂𝒙: 𝒎𝒆𝒏𝒕𝒊𝒐𝒏 𝒍𝒊𝒏𝒌 𝒕𝒚𝒑𝒆 𝒎𝒆𝒔𝒔𝒂𝒈𝒆. 𝑻𝒉𝒆 𝒅𝒊𝒇𝒇𝒆𝒓𝒆𝒏𝒕 𝒕𝒚𝒑𝒆𝒔 𝒂𝒓𝒆 𝒂𝒖𝒅𝒊𝒐, 𝒗𝒊𝒅𝒆𝒐, 𝒊𝒎𝒂𝒈𝒆, 𝒂𝒏𝒅 𝒔𝒕𝒊𝒄𝒌𝒆𝒆.`)
     } 

    } else if ( arg.length === 1 && arg[0] == 'stop') {

        await mbdd.modifierStatusId1('non')
        .then(() =>{
              repondre(' 𝒎𝒆𝒏𝒕𝒊𝒐𝒏 𝒔𝒕𝒐𝒑𝒑𝒆𝒅 ') ;
        })
    }
    else {
        repondre(`𝒑𝒍𝒆𝒂𝒔𝒆 𝒎𝒂𝒌𝒆 𝒔𝒖𝒓𝒆 𝒕𝒐 𝒇𝒐𝒍𝒍𝒐𝒘 𝒕𝒉𝒆 𝒊𝒏𝒔𝒕𝒓𝒖𝒄𝒕𝒊𝒐𝒏𝒔`) ;
    }
})
