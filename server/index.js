const { GoogleGenerativeAI } = require('@google/generative-ai');
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv')
dotenv.config()


const port = 5000;


const genAI = new GoogleGenerativeAI("AIzaSyBVdu6MQFHOY_OPGwV-y1GZ9G9Y2P7QF8o");
const app = express();

app.use(cors());

app.get('/api', (req, res) => {
    res.send({status : 'YOUR ON HOME PAGE'});
})

app.get('/api/gem/:prompt', async (req, res) => {

    try 
    {
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash-latest" });
        const result = await model.generateContentStream(req.params.prompt);

        // Set headers to keep the connection alive and indicate that the response is streamed
        res.setHeader('Content-Type', 'text/plain');
        res.setHeader('Transfer-Encoding', 'chunked');
        res.setHeader('Cache-Control', 'no-cache');

        // Stream the response to the client
        for await (const chunk of result.stream) {
            const chunkText = chunk.text();
            res.write(chunkText);
        }

        // End the response when the stream is finished
        res.end();   
    } 
    catch (error) {
        res.status('status : 500 internal server error')
    }
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
