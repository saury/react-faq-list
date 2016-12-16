var http = require('http');
var fs = require('fs');

// files
var list='./json/list.json';
var list5='./json/list5.json';
var search='./json/search.json';
var search_null='./json/search_null.json';
var author='./json/author.json';

// var result=JSON.parse(fs.readFileSync(file));

var srv = http.createServer(function (req, res) {
  console.warn(req.url);
  if(req.url && req.url.match(/GetArticles.*count=5/)){
    console.warn('get article only 5');
    res.writeHead(200, {'Content-Type': 'application/json', 'Access-Control-Allow-Origin':'*'});
    res.end(fs.readFileSync(list5));
  }
  if(req.url && req.url.match(/GetArticles/)){
    console.warn('get all article');
    res.writeHead(200, {'Content-Type': 'application/json', 'Access-Control-Allow-Origin':'*'});
    res.end(fs.readFileSync(list));
  }
  else if(req.url && req.url.match(/QueryArticle\?keyword=test/)){
    console.warn('keyword exist');
    res.writeHead(200, {'Content-Type': 'application/json', 'Access-Control-Allow-Origin':'*'});
    res.end(fs.readFileSync(search));
  }
  else if(req.url && req.url.match(/QueryArticle/)){
    console.warn('keyword not exist');
    res.writeHead(200, {'Content-Type': 'application/json', 'Access-Control-Allow-Origin':'*'});
    res.end(fs.readFileSync(search_null));
  }
  else if(req.url && req.url.match(/userid/)){
    console.warn('get author');
    res.writeHead(200, {'Content-Type': 'application/json', 'Access-Control-Allow-Origin':'*'});
    res.end(fs.readFileSync(author));
  }
});

srv.listen(8888, function() {
  console.log('listening on localhost:8888');
});
