// const qrcode = require('qrcode-terminal')

// const { Client, MessageMedia, LocalAuth } = require('whatsapp-web.js')
// const client = new Client({
//   authStrategy: new LocalAuth(),
// })

// client.on('qr', (qr) => {
//   qrcode.generate(qr, { small: true })
// })

// client.on('ready', () => {
//   console.log('Client is ready!')
// })

// client.on('message', async (message) => {
//   if(message.hasMedia){
//     const media = await message.downloadMedia()
//     if(media.mimetype.startsWith('image/'))
//   }
//   if (message.body.includes('dog')) {
//     const media = await MessageMedia.fromUrl(
//       'https://tse1.mm.bing.net/th?id=OIP.-djRHIUCvalKm39FW0p-7wAAAA&pid=Api&rs=1&c=1&qlt=95&w=102&h=102',
//       { unsafeMime: true }
//     )
//     const x = client.getChatById
//     return message.getChat().then((chat) => chat.sendMessage(media))
//   }
// })

// client.initialize()

// const fs = require('fs')
// const path = require('path')
// const qrcode = require('qrcode-terminal')
// const { Client, MessageMedia, LocalAuth } = require('whatsapp-web.js')
// const client = new Client({
//   authStrategy: new LocalAuth(),
// })

// client.on('qr', (qr) => {
//   qrcode.generate(qr, { small: true })
// })

// client.on('ready', () => {
//   console.log('Client is ready!')
// })

// client.on('message', async (message) => {
//   if (message.hasMedia) {
//     const media = await message.downloadMedia()
//     if (media.mimetype.startsWith('image/')) {
//       // Handle image
//       const fileExtension = media.mimetype.split('/')[1]
//       const fileName = `image_${Date.now()}.${fileExtension}`
//       const filePath = path.join(__dirname, 'assets', fileName)
//       fs.writeFileSync(filePath, media.data, 'base64')
//       console.log('Saved image:', filePath)
//     } else if (media.mimetype.startsWith('video/')) {
//       // Handle video
//       const fileExtension = media.mimetype.split('/')[1]
//       const fileName = `video_${Date.now()}.${fileExtension}`
//       const filePath = path.join(__dirname, 'assets', fileName)
//       fs.writeFileSync(filePath, media.data, 'base64')
//       console.log('Saved video:', filePath)
//     } else if (media.mimetype === 'image/gif') {
//       // Handle GIF
//       const fileName = `gif_${Date.now()}.gif`
//       const filePath = path.join(__dirname, 'assets', fileName)
//       fs.writeFileSync(filePath, media.data, 'base64')
//       console.log('Saved GIF:', filePath)
//     }
//   }

//   if (message.body.includes('love')) {
//     const media = await MessageMedia.fromUrl(
//       'https://www.shutterstock.com/image-vector/cute-valentine-card-kawaii-style-600w-2070370391.jpg',
//       { unsafeMime: true }
//     )
//     message.reply('i love you alot')
//     return message.getChat().then((chat) => chat.sendMessage(media))
//   }
// })

// client.initialize()

const fs = require('fs')
const path = require('path')
const mongoose = require('mongoose')
const qrcode = require('qrcode-terminal')
const {
  Client,
  MessageMedia,
  LocalAuth,
  RemoteAuth,
} = require('whatsapp-web.js')
const { MongoStore } = require('wwebjs-mongo')
const { MongoClient, ServerApiVersion } = require('mongodb')
require('dotenv').config()

const uri = process.env.URI

mongoose.connect(uri).then(() => {
  const store = new MongoStore({ mongoose: mongoose })
  const client = new Client({
    authStrategy: new RemoteAuth({
      clientId: 'client-one',
      store: store,
      backupSyncIntervalMs: 300000,
    }),
  })
  client.on('qr', (qr) => {
    qrcode.generate(qr, { small: true })
  })

  client.on('ready', () => {
    console.log('Client is ready!')
  })

  client.on('remote_session_saved', (data) => {
    console.log(data)
  })

  // client.on('authenticated', (session) => {
  //   // Save the authentication details to MongoDB
  //   console.log(session)

  //   const authDetails = new AuthDetails({ session: session })
  //   authDetails
  //     .save()
  //     .then(() => {
  //       console.log('Authentication details saved to MongoDB')
  //     })
  //     .catch((error) => {
  //       console.error('Failed to save authentication details:', error)
  //     })
  // })

  client.on('message', async (message) => {
    if (message.hasMedia) {
      const media = await message.downloadMedia()
      if (media.mimetype.startsWith('image/')) {
        // Handle image
        const fileExtension = media.mimetype.split('/')[1]
        const fileName = `image_${Date.now()}.${fileExtension}`
        const filePath = path.join(__dirname, 'assets', fileName)
        fs.writeFileSync(filePath, media.data, 'base64')
        console.log('Saved image:', filePath)
      } else if (media.mimetype.startsWith('video/')) {
        // Handle video
        const fileExtension = media.mimetype.split('/')[1]
        const fileName = `video_${Date.now()}.${fileExtension}`
        const filePath = path.join(__dirname, 'assets', fileName)
        fs.writeFileSync(filePath, media.data, 'base64')
        console.log('Saved video:', filePath)
      } else if (media.mimetype === 'image/gif') {
        // Handle GIF
        const fileName = `gif_${Date.now()}.gif`
        const filePath = path.join(__dirname, 'assets', fileName)
        fs.writeFileSync(filePath, media.data, 'base64')
        console.log('Saved GIF:', filePath)
      }
    }

    if (message.body.includes('ashish')) {
      const media = await MessageMedia.fromUrl(
        'https://www.shutterstock.com/image-vector/cute-valentine-card-kawaii-style-600w-2070370391.jpg',
        { unsafeMime: true }
      )
      message.reply('ashish here')
      return message.getChat().then((chat) => chat.sendMessage(media))
    }
  })
  client.initialize()
})

// Connect to MongoDB
