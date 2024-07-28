import { div, p, span, b, query, nbsp, button } from './index.js'

query('#app')?.append(
  div(
    p({ click: () => alert('hello') }, 'This is a test'),
    p('This', nbsp(), b('is'), nbsp(), 'another test'),
    button({ click: (e) => console.log(e) }, 'Click me'),
  ),
)
