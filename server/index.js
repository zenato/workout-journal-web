const express = require('express');
const cookieParser = require('cookie-parser');
const proxy = require('http-proxy-middleware');
const paths = require('react-scripts/config/paths');
const render = require('./render');

const app = express();

const port = process.env.NODE_PORT || 3001;

app.use(cookieParser());

// Set proxy
const proxySetting = require(paths.appPackageJson).proxy;
Object.keys(proxySetting).forEach(key => {
  app.use(key, proxy(proxySetting[key]));
});

// Serve rendered app page instead of index.html
app.use(async (req, res, next) => {
  if (req.path === '/') {
    return render(req, res, next);
  }
  return next();
});

app.use(express.static(paths.appBuild));
app.use(render);

// Page not found
app.use((req, res) => {
  res.status(404);
});

// Error
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500);
});

app.listen(port, err => {
  if (err) {
    console.log(err);
    return;
  }
  console.info(`⚡  Listening on ${port}.`);
});
