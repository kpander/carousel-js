# carousel-js

Simple vanilla js carousel web component, for displaying different cards in a group.


# Installation

## With `npm`

If you're installing via `npm`... Ensure your project has an `.npmrc` file in the project root to tell `npm` where to find the package. Ensure the following line exists:

```
@kpander:registry=https://npm.pkg.github.com/
```

Then:

```
$ npm install @kpander/carousel-js
```

Then, annoyingly, you'll need to copy the files you need into your project's source folder, depending on where that is. E.g., assuming your source files are in `./src/js`:

```
$ cp "node_modules/@kpander/carousel-js/dist/Carousel.js" ./src/js
```


# Usage

## Example 1: Basic usage

```html
<carousel-ithreads>

  <div>
    <p>I am the first item</p>
  </div>

  <div>
    <ul>
      <li>I am the second carousel item</li>
      <li>I am the second carousel item</li>
    </ul>
  </div>

  <div>
    <img src="https://placekitten.com/640/480">
    <p>I am the third item, a photo</p>
  </div>

</carousel-ithreads>
```

In the example above:

  - Each top-level item within the `<carousel-ithreads>` container will be considered a 'slide' in the carousel
  - A button will be created for both a 'Previous' and 'Next' button to control the carousel

In this example above, there are 3 slides.


## Example 2: Providing a custom HTML template

Don't like the positioning of the buttons? Want to change the markup? You can provide something completely custom.

Use the attribute `template-id` on the `<carousel-ithreads>` element. The value should be the `id` of another DOM element. The `innerHTML` of that element will be used as the HTML of the carousel.

This example has 2 carousels on the same page.

  - The first one uses a custom template for markup
  - The second one uses the default markup

```html
<!doctype html>
<html>
<head>
  <script src="Carousel.js"></script>
</head>
<body>

  <template id="my-custom-template">
    <style>
      :host {
        display: block;
      }
    </style>
    <p>Something before the custom carousel</p>
    <button id="btnPrev">Previous BUTTON Is Here</button>
    <div id="container">
      <slot></slot>
    </div>
    <button id="btnNext">Next BUTTON Is Here</button>
    <p>Something after the custom carousel</p>
  </template>

  <h2>Carousel with custom template markup</h2>
  <carousel-ithreads template-id="my-custom-template">
    <div data-slide>
      <p>Custom Carousel: I am the first item</p>
    </div>
    <div data-slide>
      <p>Custom Carousel: I am the second item</p>
    </div>
  </carousel-ithreads>

  <hr>

  <h2>Default carousel</h2>
  <carousel-ithreads>
    <div data-slide>
      <p>Default Carousel: I am the first item</p>
    </div>
    <div data-slide>
      <p>Default Carousel: I am the second item</p>
    </div>
  </carousel-ithreads>

</body>
</html>
```

**Notes:**

  - The `(element).previous()` method will be attached to any item with `id="btnPrev"`
  - The `(element).next()` method will be attached to any item with `id="btnNext"`
  - The `<carousel-ithreads>` children will be inserted into the `<slot></slot>` element
    - If you don't provide the `<slot></slot>` element, no children will be inserted into the carousel
    - That makes for a very boring (and empty) carousel...


## Example 3: Reacting when the carousel changes state

How do I do something whenever a carousel changes?

Create a Mutation Observer and attach it to the carousel.

```html
<!doctype html>
<html>
<head>
  <script src="src/Carousel.js"></script>
</head>
<body>
  <carousel-ithreads>
    <p>I'm the first item</p>
    <p>I'm the second item</p>
    <p>I'm the third item</p>
  </carousel-ithreads>

  <script>
    // Setup a Mutation Observer
    const el = document.querySelector("carousel-ithreads");
    const observer = new MutationObserver(function(changedItems) {
      console.log("carousel changed. new state:", el.state);
    });
    const observerConfig = { attributes: true, childList: true, subtree: true };
    observer.observe(el, observerConfig);
  </script>

</body>
</html>
```

Each time you click a carousel button, the console will output the new carousel state.

This lets you 'subscribe' to carousel component changes.


## Example 4: Custom button labels and ARIA labels

How do I specify the button text (visible, or for screen readers)?

Use any of the custom attributes `label-prev`, `label-next`, `aria-prev` or `aria-next`.


```html
<!doctype html>
<html>
<head>
  <script src="src/Carousel.js"></script>
</head>
<body>
  <carousel-ithreads
    label-prev="Custom previous label"
    label-next="Custom next label"
    aria-prev="Screenreader previous label"
    aria-next="Screenreader next label">
    <p>I'm the first item</p>
    <p>I'm the second item</p>
    <p>I'm the third item</p>
  </carousel-ithreads>

</body>
</html>
```

This will result in 2 buttons with markup like this:

```html
  <button id="btnPrev" aria-label="Screenreader previous label">Custom previous label</button>
  <button id="btnNext" aria-label="Screenreader next label">Custom next label</button>
```

__Important: It should be a rare case where you need to specify buth a label **and** the ARIA label. Please do NOT specify the `aria-*` properties unless you fully understand accessibility and have a very good reason for the ARIA label being different than the visible `<button>` label!__


## Example 5: Automatically add pagination indicators

Add the custom attribute `pagination`.

```html
<!doctype html>
<html>
<head>
  <script src="src/Carousel.js"></script>
</head>
<body>
  <carousel-ithreads pagination>
    <p>I'm the first item</p>
    <p>I'm the second item</p>
    <p>I'm the third item</p>
  </carousel-ithreads>

</body>
</html>
```

When this attribute exists on the `<carousel-ithreads>` element, the component will automatically add pagination indicators to the carousel. There will be one button for each item in the carousel. The pagination buttons will be inserted between the "previous" and "next" buttons.


# CSS Styling

The component exposes its internal parts by using the `part` attribute in the Shadow DOM.

For example, the Shadow DOM HTML for a simple 3-item carousel using pagination will look like this:

```html
<carousel-ithreads pagination>
  <div part="container-slot">
    <p>I am item 1</p>
    <p hidden="hidden">I am item 2</p>
    <p hidden="hidden">I am item 2</p>
  </div>
  <div part="container-grid">
    <button id="btnPrev" part="button previous">Previous</button>
    <button id="btnNext" part="button next">Next</button>
    <ul id="pagination" part="container-pagination">
      <li part="pagination-item active">
        <button data-item="0" aria-label="Go to item 1 of 3" part="pagination-button active">1</button>
      </li>
      <li part="pagination-item">
        <button data-item="1" aria-label="Go to item 2 of 3" part="pagination-button">2</button>
      </li>
      <li part="pagination-item">
        <button data-item="2" aria-label="Go to item 3 of 3" part="pagination-button">3</button>
      </li>
    </ul>
  </div>
</carousel-ithreads>
```

You can style these using the `::part` pseudo-element in CSS. For example:

```css
carousel-ithreads::part(button) {
  background: blue;
}
carousel-ithreads::part(pagination-button) {
  background: gray;
  color: white;
}
carousel-ithreads::part(pagination-button active) {
  background: green;
  color: white;
}
```

The full list of exposed `::part` items that can be styled is:

  - `container-slot`
  - `container-grid`
  - `button`, `button previous`, `button next`
  - `container-pagination`
  - `pagination-item`, `pagination-item active`
  - `pagination-button`, `pagination-button active`


# API

## Methods

### `<int> (element).previous()`

```js
const el = document.querySelector("carousel-ithreads");
el.previous();
```

### `<int> (element).next()`

```js
const el = document.querySelector("carousel-ithreads");
el.next();
```

### `<int> (element).activate(<int> index)`

```js
const el = document.querySelector("carousel-ithreads");
el.activate(2);
```

## Properties

### `state`

Returns the current state object for the carousel. The state object will look something like this:

```js
const el = document.querySelector("carousel-threads");
console.log(el.state);
```

```
{
  current: 4,
  total: 9
}
```

  - `current` indicates which carousel item is currently visible
  - `total` indicates the total number of items in the carousel


# Developers

## Build distribution files

```bash
$ npm run build
```

This will build the distribution files in the `/dist/` folder. Run this before publishing a new release.


## Publishing a new version

This assumes you have an `.npmrc` file in the folder with a valid Github token for creating packages.

```bash
$ npm run build
$ npm publish
```


# TODO

  - Option to disable wrap for 'Next' on the last slide, 'Previous' on the first
  - Option to set the slide to display on init
  - Show pagination
  - Styling options


# Maintainer

  - Kendall Anderson (kpander@invisiblethreads.com)

