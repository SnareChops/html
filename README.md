# @snarechops/html

A very simple dom creation lib. Useful for just throwing a few dom elements together from js.

> This is intended for small amounds of dom in tiny js projects. If you're making a large application, use something more suited for that purpose.

## Example
Simplifies the syntax for creating dom elements
```javascript
div({class: 'container'},
  h1('Easy DOM creation'),
  p('Simple', nbsp(), em("get it done"), nbsp(), 'syntax'),
  h2('Supports native elements'),
  document.createElement('hr'),
)
```
Compared to native
```javascript
const div = document.createElement('div')
div.className = 'container'
const h1 = document.createElement('h1')
h1.append(document.createTextNode('Easy DOM creation'))
const em = document.createElement('em')
em.append(document.createTextNode('get it done'))
const p = document.createElement('p')
p.append(
  document.createTextNode('Simple'),
  document.createTextNode(String.fromCharCode(160)),
  em,
  document.createTextNode(String.fromCharCode(160)), 
  document.createTextNode('syntax')
)
const h2 = document.createElement('h2')
h2.append(document.createTextNode('Supports native elements')
div.append(
  h1,
  p,
  h2,
  document.createElement('hr'),
)
```

## Creating an element

Each natively supported dom element has a corresponding convenience function.

```javascript
div()
span()
button()
p()
b()
// etc...
```

A generic element creator is available with `element()`

## Getting the native underlying HTMLElement

Use `.el()` on any element to get the underlying native element.

## Attributes

All elements support setting attributes as an argument, or using the `.attr()` function

```javascript
  div({
    id: 'unique-id',
    class: 'some-class and-another',
    'data-custom': 'custom attributes too',
  })
  // or
  div().attr({class: 'something'})
```
Attributes can be defined in any position of the arguments, but are processed left-to-right.
```javascript
  // End result will be class="b"
  div({class: 'a'}, {class: 'b'})
```
To remove an attribute, set it to undefined
```javascript
  div({class: 'a'}, {class: undefined})
  // or
  const x = div({class: 'a'})
  ...
  x.attr({class: undefined})  
```
Calling `.attr()` with no argument, will return the list of attributes on an element
```javascript
  const x = div({a: 'a', b: 'b', c: 'c'})
  x.attr() // { a: 'a', b: 'b', c: 'c' }
```
## Events
Events work the same as attributes, but instead of a string value, pass a function handler.
Supports any event, native or custom.
```javascript
  div({click: () => console.log('clicked')})
  // or
  function onClick(event){
    console.log(event)
    // `this` in this function will be the native HTMLElement
    // not an element from this library
  }
  div({click: onClick})
  // or
  div().on('click', e => console.log(e))
  // or even (but it's a bit silly)
  div().attr({click: () => alert('silly')})
```
If an event is defined multiple times, it follows the same rules as using `.addEventListener()`. Anonymous functions will create _duplicate_ events.
```javascript
  // BOTH events will be triggered
  div(
    { click: () => console.log('hello') }, 
    { click: () => console.log('world') },
  )
  // or same result
  div()
    .on('click', () => console.log('hello'))
    .on('click', () => console.log('world'))
```
To remove an event handler, pass undefined for the handler
```javascript
  const x = div().on('click', () => console.log(''))
  // Note this will remove ALL click handlers
  x.on('click', undefined)
```
To remove a specific handler only, you can use the native method for now
```javascript
  const x = div().on('click', handler)
  // This will remove only the specified click handler
  // all other click handlers will remain untouched
  x.el().removeEventHandler('click', handler)
```

## Nesting
To nest elements, pass them in order
```javascript
  div(p('Nested'),p('Elements'))
  // or
  div().append(p('Nested'),p('Elements'))
  // or
  div()
    .append(p('Nested'))
    .append(p('Elements'))
```
Can also nest native HTMLElements
```javascript
  div(
    span('Mixed'),
    document.createElement('hr'),
    span('Elements'),
  )
```

## Text
To set the text within an element, pass a string
```javascript
  p('Some text')
  // or
  p().text('Some text')
```
> Note: Internally this creates and appends a `Text` node instead of using innerText.
> This allows for mixing text and elements.

## Mixing arguments
Arguments can be defined in any order, and will be processed from left-to-right.
```javascript
  div(
    'Some text',
    {setting:'an attribute'},
    p('Append an element'),
    'More text after the element',
    {click: () => console.log('an event')},
    span('Another element'),
    {
      'data-attr': 'more',
      'data-attr-2': 'attributes',
    },
    ...someListOfCompatibleItems,
  )
```
Or can use a builder style
```javascript
  div()
    .id('div-id')
    .text('Text before')
    .append(p('An Element'))
    .on('click', () => console.log('hello'))
    .text('Text after')
```

## Working with native elements
To append to a native element
```javascript
  const div = document.createElement('div')
  div.append(p().el())
```
To query the dom for an element
```javascript
  // Note: Can return undefined
  const x = query('#some-selector')
    .text('Hello')
    .append(hr())
    .text('World')
```
To select multiple elements
```javascript
  // Note: Will always return an array
  // Empty array if nothing found
  const list = queryAll('.some-selector')
```