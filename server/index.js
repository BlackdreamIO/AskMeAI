const { GoogleGenerativeAI } = require('@google/generative-ai');
const express = require('express');
const cors = require('cors');
const dotEnv = require('dotenv').config();

const port = process.env.PORT || 5000;

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GEMINI_API);
console.log(process.env.GOOGLE_GEMINI_API);
const app = express();

app.use(cors({
    origin : process.env.FRONTEND_ORIGIN
}));

app.get('/api', (req, res) => {
    res.send({status : 'YOUR ON HOME PAGE'});
})

app.get('/api/gem/:prompt', async (req, res) => {

    try 
    {
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash-latest" });
        const result = await model.generateContentStream(req.params.prompt);
        const { totalTokens } = await model.countTokens(req.params.prompt);
        console.log(`totalTokens : ${totalTokens}`);

        // Set headers to keep the connection alive and indicate that the response is streamed
        res.setHeader('Content-Type', 'text/plain');
        res.setHeader('Transfer-Encoding', 'chunked');
        res.setHeader('Cache-Control', 'no-cache');
        res.header("Access-Control-Allow-Origin", process.env.FRONTEND_ORIGIN);

        // Stream the response to the client
        for await (const chunk of result.stream) {
            const chunkText = chunk.text();
            res.write(chunkText);
        }

        // End the response when the stream is finished
        res.end();
    } 
    catch (error) {
        res.write(error);
        res.status('status : 500 internal server error');
        res.end();
    }
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
