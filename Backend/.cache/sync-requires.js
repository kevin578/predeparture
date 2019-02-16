const { hot } = require("react-hot-loader/root")

// prefer default export if available
const preferDefault = m => m && m.default || m


exports.components = {
  "component---cache-dev-404-page-js": hot(preferDefault(require("/Users/kbriggs/Desktop/predeparture/.cache/dev-404-page.js"))),
  "component---src-pages-404-js": hot(preferDefault(require("/Users/kbriggs/Desktop/predeparture/src/pages/404.js"))),
  "component---src-pages-edit-page-js": hot(preferDefault(require("/Users/kbriggs/Desktop/predeparture/src/pages/edit-page.js"))),
  "component---src-pages-index-js": hot(preferDefault(require("/Users/kbriggs/Desktop/predeparture/src/pages/index.js"))),
  "component---src-pages-page-2-js": hot(preferDefault(require("/Users/kbriggs/Desktop/predeparture/src/pages/page-2.js"))),
  "component---src-pages-login-js": hot(preferDefault(require("/Users/kbriggs/Desktop/predeparture/src/pages/login.js")))
}

