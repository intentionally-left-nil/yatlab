const path = require('path');
const fs = require('fs');
const CookiesProvider = require('react-cookie').CookiesProvider;
const serialize = require('serialize-javascript');

const React = require('react')
const {renderToString} = require('react-dom/server');
const {StaticRouter} = require('react-router-dom');
const getInitialState = require('./getInitialState');

const {default: App} = require('../src/containers/App');

const addInitialState = (state, html) => {
  const script = `<script>window.__PRELOADED_STATE__ = ${serialize(state, {isJSON: true})}</script>`;
  return html.replace('{{SSR_PRELOADED_STATE}}', script);
};

module.exports = function universalLoader(req, res) {
  const filePath = path.resolve(__dirname, '..', 'build', 'index.html')

  fs.readFile(filePath, 'utf8', (err, html)=>{
    if (err) {
      console.error('read err', err)
      return res.status(404).end()
    }
    getInitialState(req).then((initialState) => {
      const context = {}
      const markup = renderToString(
        <StaticRouter
          location={req.url}
          context={context}
        >
          <CookiesProvider cookies={req.universalCookies}>
            <App {...initialState} />
          </CookiesProvider>
        </StaticRouter>
      )

      if (context.url) {
        // Somewhere a `<Redirect>` was rendered
        res.redirect(302, context.url)
      } else {
        // we're good, send the response
        html = html.replace('{{SSR}}', markup);
        html = addInitialState(initialState, html);
        res.send(html);
      }
    });
  })
}
