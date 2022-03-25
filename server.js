require('dotenv').config()

const http = require('http');
const express = require('express');
const cors = require('cors');
const PORT = 8090;
const app = express();
const server = http.createServer(app);
const router = express.Router();

const { Client } = require('@elastic/elasticsearch')
const ESPaginationSearch = require('./ESPaginationSearch')

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.options('*', cors());

router.post('/fetch', async (req, res) => {
  const {esRequest, cursor} = req.body;
  const sortCursor = cursor && cursor.begin && cursor.end ? cursor : { begin: [], end: [] };
  
  const client = new Client({ node: 'https://vpc-mls-search-staging-b6qaefbcrk7nasietpeumhsusi.us-east-1.es.amazonaws.com:443' });
  const paginator = new ESPaginationSearch({ client, request: esRequest, sortCursor });
  
  const response = await paginator.nextPage();
  const newCursor = await paginator.getSortCursor();
  
  return res.json({
    cards: response.body.hits.hits,
    cursor: newCursor,
  });
})

app.use('/', router);

// start server and create endpoint /fetch (POST)
server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/`);
});