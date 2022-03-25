const { Client } = require('@elastic/elasticsearch')
const client = new Client({ node: 'https://vpc-mls-search-staging-b6qaefbcrk7nasietpeumhsusi.us-east-1.es.amazonaws.com:443' });

function ESPaginationSearch ({ client, request, sortCursor = { begin: [], end: []} }) {
  this.direction = 'forward';
  this.client = client;
  this.request = request;
  this.sortCursor = sortCursor;
  return this;
}

ESPaginationSearch.prototype.getSortCursor = function() {
  return this.sortCursor;
}

ESPaginationSearch.prototype.query = async function () {
  const response = await this.client.search(this.request)
  this.updateCursor(response);
  return response;
};

ESPaginationSearch.prototype.updateCursor = function (response) {
  const { body: { hits: { hits } = {} } = {} } = response;
    console.log(hits[0].sort);
    console.log(hits[hits.length-1].sort);
  if (Array.isArray(hits) && hits.length) {
    this.sortCursor = {
      begin: hits[0].sort || [],
      end: hits[hits.length-1].sort || [],
    }
  } else {
    const begin = this.direction === 'forward' ? this.sortCursor.begin : [];
    const end = this.direction === 'backward' ? this.sortCursor.end : [];
    this.sortCursor = { begin, end };
  }
}

ESPaginationSearch.prototype.previousPage = function () {
  if (this.sortCursor.begin.length) {
    this.request.body.search_after = this.sortCursor.begin;
  }

  if (this.direction === 'forward') {
    this.direction = 'backward';
    Object.keys(this.request.body.sort).forEach(key => {
      this.request.body.sort[key] = this.request.body.sort[key] === 'asc' ? 'desc' : 'asc'
    });
  }
  return this.query();
}

ESPaginationSearch.prototype.currentPage = function() {
  return this.query();
}

ESPaginationSearch.prototype.nextPage = function () {
  if (this.sortCursor.end.length) {
    this.request.body.search_after = this.sortCursor.end;
  }
  if (this.direction === 'backward') {
    this.direction = 'forward';
  }
  return this.query();
}

module.exports = ESPaginationSearch;