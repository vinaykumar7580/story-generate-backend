const express = require("express");
const cors = require("cors");
const axios = require("axios");
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(cors());

app.get("/shayari", async(req, res) => {
  let { category, keyword } = req.query;
  //console.log(category,keyword)
  
    const response = await axios.post('https://api.openai.com/v1/engines/davinci/completions', {
      prompt: `Story about ${keyword}`,
      max_tokens: 100,
      temperature: 0.7,
      n: 1
    }, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`
      }
    });

    const shayari =await response.data.choices[0].text.trim();
    res.json({ shayari });

  
  
});

app.listen(8080, () => {
  console.log("server is running on port 8080");
});
