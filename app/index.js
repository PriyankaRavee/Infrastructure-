const express = require('express');
const redis = require('redis');

const app = express();

// Connect to Redis once at startup
const client = redis.createClient({
  socket: {
    host: process.env.REDIS_HOST || 'redis',
    port: process.env.REDIS_PORT || 6379
  }
});

client.on('error', (err) => console.error('Redis Client Error', err));

(async () => {
  await client.connect();
})();

app.get('/', async (req, res) => {
  try {
    const visits = await client.incr('visits');
    res.send(`Hello from Node app! Visit count: ${visits}`);
  } catch (err) {
    res.status(500).send('Error connecting to Redis');
  }
});

// Listen on 0.0.0.0 so container is reachable
const PORT = process.env.PORT || 3000;
app.listen(PORT, '0.0.0.0', () => console.log(`App running on port ${PORT}`));
