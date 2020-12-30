import express from 'express'

const app = express()

app.use('/', (req, res) => {
    return res.status(200).send('Hello, I\'m the AvaBOT')
})

app.listen(process.env.PORT || 3333)


export default app