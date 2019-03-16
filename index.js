const express = require('express');
const helmet = require('helmet');
const knex = require('knex');

const knexConfig = require('./knexfile');

const db = knex(knexConfig.development);

const server = express();

server.use(express.json());
server.use(helmet());

// GET ENPOINT
server.get('/zoos', async (req, res) => {
  try {
    const zoos = await db('zoos')
    res.status(200).json(zoos)
  } catch (error) {
    res.status(500).json({ message: "Houston, we have a problem! Failed to retrieve records."})
  }
})

// POST ENDPOINT
server.post('/zoos', async (req, res) => {
  try {
    const [ id ] = await db('zoos').insert(req.body)
    if (id > 0) {
      res.status(201).json({ message: 'record/s added' })
    } else {
      res.status(500).json({ message: "Houston, we have a problem! Failed to insert record."});
    }
  } catch (error) {
    res.status(500).json({ message: "Houston, we have a problem! Failed to insert record."});
  }
});

const port = 5000;
server.listen(port, function() {
  console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`);
});
