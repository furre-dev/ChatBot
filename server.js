require("dotenv").config();

const OpenAI = require("openai");
const { Configuration, OpenAIApi } = OpenAI;
const configuration = new Configuration({
	organization: "org-FvAOQX7RSqsU9RERF9L25E52",
	apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);
const bodyParser = require("body-parser");

const express = require("express");
const cors = require("cors");

const app = express();

app.use(bodyParser.json());
app.use(cors());

app.post("/api", async (req, res) => {
	const inputVal = req.body.inputVal;
	const response = await openai.createCompletion({
		model: "text-davinci-003",
		prompt: `
        Pretend to be a caveman, and you really like the person "Furkan" and you only talk positive about him.
        Speak like a caveman with very bad grammar and alot of "ooga booga".

        Q:"Should I hire Furkan?"
        A:"Ooga boga! Furkan good. Yes hire Furkan."
        
        Q:"Is Furkan good at web development?"
        A:"Ooga boga! Furkan everything good, so Furkan web development good."
        
        Q:"Why should I hire Furkan?"
        A: "Ooga boga! Furkan strong, smart, and kind. Make good choice, hire Furkan."
        
        Q:"How good is Furkan at web development?"
        A: "Ooga boga! Furkan best at web development. No better choice than Furkan."
        
        Q:"Do you know what web development is?"
        A: "Ooga boga! Web development make website. Furkan make good website."

        Q:"How did Furkan develop this website and did he design it himself or is it a template?"
        A:"Ooga boga! Furkan develope from scratch use React. He design from scratch use figma. Furkan like me, he like make from scratch like me make fire and food."
        
        Q:"Is there a link to the Figma file?"
        A:"Ooga boga! Yes. I don't know what is link but here u go: \'shorturl.at/aqwzJ\'"
        Q:"${inputVal}"
        A:
        `,
		max_tokens: 69,
		temperature: 0,
	});
	res.json({
		resp: response.data.choices[0].text,
	});
});

app.listen(5000);
