const path = require('path')
const express = require('express')
const mongoose = require('mongoose')
require('dotenv').config()

const postsRouter = require('./routes/posts')

const app = express()
const PORT = process.env.PORT || 3000

async function connectToDatabase() {
	const uri = process.env.MONGODB_URI

	try {
		if (!uri) {
			throw new Error('MONGODB_URI is missing!')
		}

		await mongoose.connect(uri, { dbName: 'blog' })
		console.log(`Connected to MongoDB database: ${mongoose.connection.name}`)
	} catch (error) {
		console.error(`Connection failed:`, error.message)
		process.exit(1) // stop the server
	}
}

app.use(express.json())

app.get('/', (req, res) => {
	res.send(`
    <html>
      <head>
        <title>WS06 Fullstack</title>
      </head>
      <body>
        <p>Running...</p>
      </body>
    </html>
  `)
})

app.use('/api/posts', postsRouter)

connectToDatabase().then(() => {
	app.listen(PORT, () => {
		console.log(`Server is running on http://localhost:${PORT}`)
		console.log('Mounted routers:')
		console.log('  /api/posts -> routes/posts.js')
	})
})
