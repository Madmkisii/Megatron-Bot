const { zokou } = require('../framework/zokou');
const {addOrUpdateDataInAlive , getDataFromAlive} = require('../bdd/alive')
const moment = require("moment-timezone");
const s = require(__dirname + "/../set");

zokou(
    {
        nomCom : 'alive',
        categorie : 'General'
        
    },async (dest,zk,commandeOptions) => {

 const {ms , arg, repondre,superUser} = commandeOptions;

 const data = await getDataFromAlive();

 if (!arg || !arg[0] || arg.join('') === '') {

    if(data) {
       
        const {message , lien} = data;


        var mode = "public";
        if ((s.MODE).toLocaleLowerCase() != "yes") {
            mode = "private";
        }
      
    
     
    moment.tz.setDefault('EAT');

// Créer une date et une heure en EAT
const temps = moment().format('HH:mm:ss');
const date = moment().format('DD/MM/YYYY');

    const alivemsg = `
*Owner* : ${s.OWNER_NAME}
*Mode* : ${mode}
*Date* : ${date}
*Time* : ${temps}

 ${message}
 
 
 *𝑴𝑬𝑮𝑨𝑻𝑹𝑶𝑵-𝑩𝑶𝑻 𝒃𝒚 𝑫𝒂𝒎𝒐𝒏 𝒊𝒔 𝒂𝒍𝒊𝒗𝒆*`

 if (lien.match(/\.(mp4|gif)$/i)) {
    try {
        zk.sendMessage(dest, { video: { url: lien }, caption: alivemsg }, { quoted: ms });
    }
    catch (e) {
        console.log("🥵🥵 Menu erreur " + e);
        repondre("🥵🥵 Menu erreur " + e);
    }
} 
// Checking for .jpeg or .png
else if (lien.match(/\.(jpeg|png|jpg)$/i)) {
    try {
        zk.sendMessage(dest, { image: { url: lien }, caption: alivemsg }, { quoted: ms });
    }
    catch (e) {
        console.log("🥵🥵 Menu erreur " + e);
        repondre("🥵🥵 Menu erreur " + e);
    }
} 
else {
    
    repondre(alivemsg);
    
}

    } else {
        if(!superUser) { repondre("𝒕𝒉𝒆𝒓𝒆 𝒊𝒔 𝒏𝒐 𝒂𝒍𝒊𝒗𝒆 𝒇𝒐𝒓 𝒕𝒉𝒊𝒔 𝒃𝒐𝒕") ; return};

      await   repondre("𝒀𝒐𝒖 𝒉𝒂𝒗𝒆 𝒏𝒐𝒕 𝒚𝒆𝒕 𝒔𝒂𝒗𝒆𝒅 𝒚𝒐𝒖𝒓 𝒂𝒍𝒊𝒗𝒆, 𝒕𝒐 𝒅𝒐 𝒕𝒉𝒊𝒔;  𝒆𝒏𝒕𝒆𝒓 𝒂𝒇𝒕𝒆𝒓 𝒂𝒍𝒊𝒗𝒆 𝒚𝒐𝒖𝒓 𝒎𝒆𝒔𝒔𝒂𝒈𝒆 𝒂𝒏𝒅 𝒚𝒐𝒖𝒓 𝒊𝒎𝒂𝒈𝒆 𝒐𝒓 𝒗𝒊𝒅𝒆𝒐 𝒍𝒊𝒏𝒌 𝒊𝒏 𝒕𝒉𝒊𝒔 𝒄𝒐𝒏𝒕𝒆𝒙𝒕: .𝒂𝒍𝒊𝒗𝒆 𝒎𝒆𝒔𝒔𝒂𝒈𝒆;𝒍𝒊𝒆𝒏");
         repondre("𝒅𝒐𝒏'𝒕 𝒅𝒐 𝒇𝒂𝒌𝒆 𝒕𝒉𝒊𝒏𝒈𝒔 :)")
     }
 } else {

    if(!superUser) { repondre ("𝑶𝒏𝒍𝒚 𝒕𝒉𝒆 𝒐𝒘𝒏𝒆𝒓 𝒄𝒂𝒏  𝒎𝒐𝒅𝒊𝒇𝒚 𝒕𝒉𝒆 𝒂𝒍𝒊𝒗𝒆") ; return};

  
    const texte = arg.join(' ').split(';')[0];
    const tlien = arg.join(' ').split(';')[1]; 


    
await addOrUpdateDataInAlive(texte , tlien)

repondre('message alive refresh successfully')

}
    });
