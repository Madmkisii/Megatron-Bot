"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const { zokou } = require("../framework/zokou");
zokou({ nomCom: "tempmail", reaction: "😌", nomFichier: __filename }, async (dest, zk, commandeOptions) => {
    console.log("Commande saisie !!!s");
    let z = '*𝑴𝑬𝑮𝑨𝑻𝑹𝑶𝑵-𝑩𝑶𝑻* Temporary emails,Powered by *𝑲𝒊𝒎𝒎𝒚* \n\n ' + "Click the link below to create unlimited TEMPORARY Emails. Powered by *𝑴𝑬𝑮𝑨𝑻𝑹𝑶𝑵.*";
    let d = ' https://tempmailpro.app';
    let varmess = z + d;
    var img = 'https://telegra.ph/file/bcf5cec3445652ab197bc.jpg';
    await zk.sendMessage(dest, { image: { url: img }, caption: varmess });
    //console.log("montest")
});
console.log("mon test");
/*module.exports.commande = () => {
  var nomCom = ["test","t"]
  var reaction="☺️"
  return { nomCom, execute,reaction }
};

async function  execute  (origineMessage,zok) {
  console.log("Commande saisie !!!s")
   let z ='Salut je m\'appelle *MEGATRON-BOT* \n\n '+'je suis un bot Whatsapp Multi-appareil '
      let d =' developpé par *Kimmy*'
      let varmess=z+d
      var img='https://telegra.ph/file/bcf5cec3445652ab197bc.jpg'
await  zok.sendMessage(origineMessage,  { image:{url:img},caption:varmess});
}  */ 
