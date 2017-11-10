const fs = require('fs')
const path = require('path')

// Loading built modules.
const render = require('../build/server').default

const template = fs.readFileSync(path.join(__dirname, '../build/index.html'), {
  encoding: 'utf8',
})

module.exports = (req, res, next) => {
  const params = {
    req,
    res,
    accessToken: req.cookies.accessToken,
  }

  return render(params)
    .then(({ error, url, html, state, helmet, style }) => {
    // Error
      if (error) {
        return res.next(error)
      }

      // Redirect
      if (url) {
        return res.redirect(url)
      }

      const page = template
        .replace(
          '<div id="root"></div>',
          `<div id="root">${html}</div><script>window.__PRELOADED_STATE__=${JSON.stringify(
            state,
          ).replace(/</g, '\\u003c')}</script>`,
        )
        .replace(
          '<meta helmet>',
          `${helmet.title.toString()}${helmet.meta.toString()}${helmet.link.toString()}`,
        )
        .replace('<style></style>', style)
      res.send(page)
    })
    .catch(e => {
      console.error(e)
      next(e)
    })
}
