const {
	MessageType
} = require("@adiwajshing/baileys");
const fs = require("fs-extra")
const moment = require("moment-timezone")

const { getBuffer } = require('../lib/myfunc')
const { color, bgcolor } = require('../lib/color')

let setting = JSON.parse(fs.readFileSync('./config/setting.json'))
prefix = setting.prefix

module.exports = welcome = async (Hapis, anu) => {
	    const welkom = JSON.parse(fs.readFileSync('./database/group/welcome.json'))
	    const isWelcome = welkom.includes(anu.jid)
	    if (!isWelcome) return
		try {
			    mem = anu.participants[0]
			    console.log(anu)
                try {
                pp_user = await Hapis.getProfilePicture(mem)
                } catch (e) {
                pp_user = 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png?q=60'
            }
                try {
                pp_grup = await Hapis.getProfilePicture(anu.jid)
                } catch (e) {
                pp_grup = 'https://i.postimg.cc/SN54m6LW/SAVE-20210728-133334.jpg'
            }
            if (anu.action == 'add' && mem.includes(Hapis.user.jid)) {
            Hapis.sendMessage(anu.jid, 'Halo! Terima Kasih sudah Mengundangku, Jika ingin Menggunakan Bot Ketik ${prefix}menu', 'conversation')
            }
             if (anu.action == 'add' && !mem.includes(Hapis.user.jid)) {
             if (!welkom.includes(anu.jid)) return
                mdata = await Hapis.groupMetadata(anu.jid)
                memeg = mdata.participants.length
            	num = anu.participants[0]
                let v = Hapis.contacts[num] || { notify: num.replace(/@.+/, '') }
                anu_user = v.vname || v.notify || num.split('@')[0]
                time_wel = moment.tz('Asia/Jakarta').format("HH:mm")
                teks = `Halo Member baru\n${anu_user} \nIntro\n• Nama : \n• Umur :\n• Gender : \n• Asal :\n\n• Semoga Betah `
	            buff = fs.readFileSync(`media/foto/welcome.jpg`) 
                buttons = [{buttonId: `#`,buttonText:{displayText: 'WELCOME BABU'},type:1}]
                imageMsg = (await Hapis.prepareMessageMedia((buff), 'imageMessage', {thumbnail: buff})).imageMessage
                buttonsMessage = { contentText: `${teks}`, footerText: 'Baca deskripsi dulu kontol \nlangsung masuk aja.', imageMessage: imageMsg, buttons: buttons, headerType: 4 }
                prep = await Hapis.prepareMessageFromContent(mdata.id,{buttonsMessage},{})
                Hapis.relayWAMessage(prep)
}
             if (anu.action == 'remove' && !mem.includes(Hapis.user.jid)) {
             if (!welkom.includes(anu.jid)) return
                mdata = await Hapis.groupMetadata(anu.jid)
                memeg = mdata.participants.length
            	num = anu.participants[0]
                let v = Hapis.contacts[num] || { notify: num.replace(/@.+/, '') }
                anu_user = v.vname || v.notify || num.split('@')[0]
                time_wel = moment.tz('Asia/Jakarta').format("HH:mm")
                teks = `Lah kenapa ${anu_user} keluar?`
	            buff = fs.readFileSync(`media/foto/out.jpg`) 
                buttons = [{buttonId: `#`,buttonText:{displayText: 'SI BEBAN KELUAR WKWKWK'},type:1}]
                imageMsg = (await Hapis.prepareMessageMedia((buff), 'imageMessage', {thumbnail: buff})).imageMessage
                buttonsMessage = { contentText: `${teks}`, footerText: '© HELA BOTZ', imageMessage: imageMsg, buttons: buttons, headerType: 4 }
                prep = await Hapis.prepareMessageFromContent(mdata.id,{buttonsMessage},{})
                Hapis.relayWAMessage(prep)
            }
		} catch (e) {
			console.log('Error : %s', color(e, 'red'))
		}
	}
