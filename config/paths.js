const path = require('path')
const fs = require('fs')

const appDirectory = fs.realpathSync(process.cwd())
const resolveApp = relativePath => path.resolve(appDirectory, relativePath)

module.exports = {
  appPackageJson: resolveApp('package.json'),
  serverRenderJs: resolveApp('src/server/render.js'),
  server: resolveApp('build/server'),
  styles: resolveApp('src/styles'),
}
