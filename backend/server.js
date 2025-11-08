const express = require('express');
const request = require('request');
const cors = require('cors');

const app = express();
app.use(cors()); 
require('dotenv').config();
const apiKey = process.env.API_KEY;
console.log(apiKey)
const PORT = 5000;

function fetchStockData(url, res) {
  request.get({ url, json: true, headers: { 'User-Agent': 'request' } }, (err, response, data) => {
    if (err) return res.status(500).json({ error: err.message });
    if (response.statusCode !== 200) return res.status(response.statusCode).json({ error: 'Failed to fetch data' });
    res.json(data);
  });
}

app.get('/api/fetchStock', (req, res) => {
  const symbol = req.query.symbol;
  const url = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${symbol}&apikey=${apiKey}`;
  fetchStockData(url, res);
});

app.get('/api/fetch15MinStock', (req, res) => {
  const symbol = req.query.symbol;
  const url = `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${symbol}&interval=5min&apikey=${apiKey}&entitlement=delayed&extended_hours=false`;
  fetchStockData(url, res);
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
