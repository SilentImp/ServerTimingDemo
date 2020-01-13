const { renderToNodeStream } = require("react-dom/server");
// const earlyHints = require('early-hints')
const React = require("react");
const express = require('express')
const serverTimingMiddleware = require('server-timing-header');
const port = 4000;
const app = express();

// app.use(earlyHints([
//   { path: '/static/hintmojo.css', rel: 'preload', as: 'script' },
//   { path: '/static/hintmojo.js', rel: 'preload', as: 'script' },
// ]))

// app.get('/static/', function(req, res, next) {
//   res.set('Link', [
//     '</static/badmojo.css>; rel=preload; as=style',
//     '</static/badmojo.js>; rel=preload; as=script',
//     '</static/font.ttf>; rel=preload; as=font'
//   ]);
//   res.status(200).end('ok');
// });

// app.get('/', function (req, res, next) {
//   res.status(200).end(`
//   <html>
//     <head>
//       <title>hint 103</title>
//       <link rel="preload" href="goodmojo.css" as="style">
//       <link rel="preload" href="goodmojo.js" as="script">
//     </head>
//   </html>
//   `);
// });

app.use('/mojo.jpg', function (req, res, next) {
  console.log(req.headers)
  next();
});

app.use(express.static('static'));

app.get('/ch', function (req, res, next) {
  res.set('Accept-CH', 'Save-Data, Downlink, Viewport-Width, Width, Device-Memory, DPR');
  res.status(200).end(`
  <html>
    <head>
      <title>ch</title>
    </head>
    <body>
      <img src="/mojo.jpg" sizes="25vw" />
    </body>
  </html>
  `);
});

{/* <meta http-equiv="Accept-CH" content="Viewport-Width, Width"> */}

app.listen(port, () => console.log(`Example app listening on port ${port}!`))


// app.use(function(req, res, next) {
//   res.set('Access-Control-Allow-Origin', '*');
//   res.set('Timing-Allow-Origin', '*');
//   res.set('server-timing', [
//    `cache;desc="Element not in cache"`,
//    `decision;desc="Server done the jiga dance"`,
//    `render;desc="Render time";dur=58.4`,
//    `data;desc="Items list";dur=24.8`,
//    `data;desc="Recommended items";dur=5`,
//   ]);
//   next();
// });

// app.use(express.static('static'));

// app.get('/dm/', function(req, res, next) {
//   res.set('Accept-CH','Device-Memory');
//   res.status(200).end();
// });

// app.use(serverTimingMiddleware);

// app.get('/script.js', function(req, res, next) {
//   res.set('Content-Type','application/javascript');
//   res.status(200).end();
//   // const timer = (1000 * Math.random());
//   // req.serverTiming.from(`script`);

//   // setTimeout(() => {
//   //   req.serverTiming.from(`secondMetric`);
//   // }, timer/2);

//   // setTimeout(() => {
//   //   req.serverTiming.to(`script`, 'bad mojo');
//   //   res.status(200).end();
//   // }, timer);
// });

// /**
//  * Add trailers don't work at the moment
//  * @see https://nodejs.org/api/http.html#http_response_addtrailers_headers
//  *
//  */
// app.get('/trail', function (req, res, next) {
//   res.writeHead(200, {
//     'Trailer': 'Server-Timing',
//     'Content-Type': 'text/html',
//     'Transfer-Encoding': 'chunked'
//   });
//   res.write("<main id='content'>");
//   const stream = renderToNodeStream(
//     React.createElement('p', null, 'Strimmed text')
//   );
//   stream.pipe(res, { end: false });
//   stream.on('end', () => {
//     res.write("</main>");
//     res.addTrailers({
//       'Server-Timing': 'metric;desc="metric 2";dur=12.4'
//     });
//     res.end();
//   });
// });

// app.get('/', function (req, res, next) {
//   // res.set('server-timing', ['']);
//   // req.serverTiming.from('page');
//   // req.serverTiming.add(res, 'metric', 'metric description', 12.4);
//   setTimeout(() => {
//     res.status(200).end();
//     next();
//   }, 40);
//   // res.status(200).send(`
//   //   <script src="script.js?other=0"></script>
//   //   <script src="script.js?other=1"></script>
//   //   <script src="script.js?other=2"></script>
//   //   <script>
//   //     // Only https for FF
//   //     ['navigation', 'resource']
//   //       .forEach(function(entryType) {
//   //         performance.getEntriesByType(entryType).forEach(function({name: url, serverTiming}) {
//   //           serverTiming.forEach(function({name, duration, description}) {
//   //             console.info('expressjs middleware =',
//   //               JSON.stringify({url, entryType, name, duration, description}, null, 2))
//   //           })
//   //         })
//   //     })
//   //   </script>
//   // `);
// });
