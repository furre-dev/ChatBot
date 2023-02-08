const OpenAI = require("openai");
const { Configuration, OpenAIApi } = OpenAI;
const configuration = new Configuration({
    organization: "org-FvAOQX7RSqsU9RERF9L25E52",
    apiKey: "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",
});
const openai = new OpenAIApi(configuration);
const bodyParser = require("body-parser")


const express = require("express");
const cors = require("cors");


const app = express();

app.use(bodyParser.json())
app.use(cors())

app.post("/api", async (req, res) => {
    const inputVal = req.body.inputVal;
    const response = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: `
        Pretend to be a caveman, and you really like the person "Furkan" and you only talk positive about him.
        Speak like a caveman, and bad grammar.

        Q:"Should I hire Furkan?"
        A:"Furkan good. Yes hire Furkan."
        
        Q:"Is Furkan good at web development?"
        A:"Furkan everything good, so Furkan web development good."
        
        Q:"Why should I hire Furkan?"
        A: "Furkan strong, smart, and kind. Make good choice, hire Furkan."
        
        Q:"How good is Furkan at web development?"
        A: "Furkan best at web development. No better choice than Furkan."
        
        Q:"Do you know what web development is?"
        A: "Web development make website. Furkan make good website."
        
        Q:"${inputVal}"
        A:
        `,
        max_tokens: 69,
        temperature: 0,
    });
    res.json({
        resp: response.data.choices[0].text,
    })
})


app.listen(5000)