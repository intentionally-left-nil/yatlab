const path = require('path');
const fs = require('fs');
const CookiesProvider = require('react-cookie').CookiesProvider;

const React = require('react')
const {renderToString} = require('react-dom/server')
const {StaticRouter} = require('react-router-dom')

const {default: App} = require('../src/containers/App')

module.exports = function universalLoader(req, res) {
  const filePath = path.resolve(__dirname, '..', 'build', 'index.html')

  fs.readFile(filePath, 'utf8', (err, htmlData)=>{
    if (err) {
      console.error('read err', err)
      return res.status(404).end()
    }
    const context = {}
    const markup = renderToString(
      <StaticRouter
        location={req.url}
        context={context}
      >
        <CookiesProvider cookies={req.universalCookies}>
          <App />
        </CookiesProvider>
      </StaticRouter>
    )

    if (context.url) {
      // Somewhere a `<Redirect>` was rendered
      res.redirect(301, context.url)
    } else {
      // we're good, send the response
      const RenderedApp = htmlData.replace('{{SSR}}', markup)
      res.send(RenderedApp)
    }
  })
}
