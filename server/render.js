const fs = require('fs');
const path = require('path');
const serialize = require('serialize-javascript');

// Loading built modules.
const render = require('./build').default;

const template = fs.readFileSync(path.join(__dirname, '../build/index.html'), { encoding: 'utf8' });

module.exports = (ctx) => {
  const location = ctx.path;
  const params = {
    location,
    accessToken: ctx.cookies.get('accessToken'),
  };
  return render(params).then(({ html, state, helmet, style }) => {
    const page = template
      .replace(
        '<div id="root"></div>',
        `<div id="root">${html}</div><script>window.__PRELOADED_STATE__=${serialize(state)}</script>`,
      )
      .replace(
        '<meta helmet>',
        `${helmet.title.toString()}${helmet.meta.toString()}${helmet.link.toString()}`,
      )
      .replace(
        '<style></style>',
        style,
      );

    ctx.body = page;
  });
};
