# ractive-bin-loader

This [webpack](https://webpack.js.org) loader allows you to write [Ractive.js](https://ractive.js.org) components and have them available pre-compiled for the rest of your webpack build.

## Installation

```sh
npm install --save-dev ractive-bin-loader
```

## Usage

Merge this into your `webpack.config.js`:

```js
module: {
  loaders: [
    {
      // you can scope this by directory or using another extension
      // using .ractive.html for your components gives you good
      // syntax highlighting with most editors
      test: /\.ractive\.html$/,
      loaders: 'ractive-bin-loader'
    }
  ]
}
```

Then you can write components like this:

```html
<!-- you can also use a link tag with an external stylesheet -->
<style>
  /* styles are concatenated, stringified, and injected wherever $CSS is found in the template */
  .my-ractive-component {
    margin: 1em;
    background-color: #eee;
    border-radius: 2px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0,12), 0 1px 2px rgba(0, 0, 0, 0.24);
    padding: 1em;
  }
</style>

<script type="text/ractive" id="myPartial">
  <p>
    Partials can be added as scripts with a type of text/ractive or text/html.
  </p>
  <p>
    They can also include a src attribute to be loaded from an external file.
  </p>
</script>

<!-- any html is gathered up to be parsed and injected wherever $TEMPLATE is found in the script -->
<div class="my-ractive-component">
  {{>myPartial}}
  <button on-click="['go']">Go</button>
</div>

<script>
  // any non-partial scripts are concatenated
  // ES module syntax is _strongly_ recommended
  import Ractive from 'ractive';

  export default Ractive.extend({
    template: $TEMPLATE,
    css: $CSS,
    on: {
      go() { alert('Hello, from my webpacked Ractive.js component!'); }
    }
  });

  // external scripts can also be loaded and concatenated with any inline scripts
  // by supplying a relative src attribute
</script>
```
