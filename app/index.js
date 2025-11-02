const express = require('express');
const redis = require('redis');

const app = express();
const client = redis.createClient({ host: process.env.REDIS_HOST, port: process.env.REDIS_PORT });

app.get('/', async (req, res) => {
  try {
    await client.connect();
    const visits = await client.incr('visits');
    await client.disconnect();
    res.send(`Hello from Node app! Visit count: ${visits}`);
  } catch (err) {
    res.status(500).send('Error connecting to Redis');
  }
});

app.listen(3000, () => console.log('App running on port 3000'));
