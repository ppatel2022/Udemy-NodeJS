const fs = require("fs");
const http = require('http');
const url = require('url');
const replaceTemplate = require("./modules/replaceTemplate");

const slugify = require('slugify');

//---------------------SERVER----------------------

const tempOverview = fs.readFileSync(`${__dirname}/templates/template-overview.html`, 'utf-8');
const tempCard = fs.readFileSync(`${__dirname}/templates/template-card.html`, 'utf-8');
const tempProduct = fs.readFileSync(`${__dirname}/templates/template-product.html`, 'utf-8');

const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, 'utf-8');
const dataObj = JSON.parse(data);

// Use Slugify to change URL or our page to display user friendly text instead of "?id=0"
const slugs = dataObj.map(el => slugify(el.productName))
console.log(slugify('Fresh Avocado', {lower: true}));
// -- Start Server-----------
  const server = http.createServer((req, res) => {
  const { query, pathname } = url.parse(req.url, true);

  // Overview Page.««««««««««««««««««««««««««««««««««««««
    if(pathname === '/' ||  pathname === '/overview') {
        res.writeHead(200, {'Content-type': 'text/html'});
        const cardsHtml = dataObj.map(el => replaceTemplate(tempCard, el)).join('');
        const output = tempOverview.replace('{%PRODUCT_CARDS%}', cardsHtml);

        res.end(output);
        } 
  // Product Page.««««««««««««««««««««««««««««««««««««««
    else if (pathname === '/product')  {
      res.writeHead(200, {'Content-type': 'text/html'});
      const product = dataObj[query.id];
      const output = replaceTemplate(tempProduct, product);
      res.end(output);
      } 
      // API  ««««««««««««««««««««««««««««««««««««««««««
    else if (pathname === '/api') {
          res.writeHead(200, {'Content-type': 'application/json'});
          res.end(data);
      }
    // Not Found...«««««««««««««««««««««««««««««««««««««
    else {
          res.writeHead(404, {
            'Content-type': 'text/html',
            "my-own-header": "hello-world"
          });
          res.end('<h1>Page not Found...</h1>');
        }
    });

server.listen(8000, '127.0.0.1', () => {console.log('Listening to requests on port 8000');});





