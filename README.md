# carousel-js

Simple vanilla js carousel web component, for displaying different cards in a group. Includes options for pagination and custom styling.


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

The quick-start example is:

```html
<it-carousel pagination>
  <img src="img1.jpg">
  <img src="img2.jpg">
  <img src="img3.jpg">
</it-carousel>
```

See the <a href="https://kpander.github.io/carousel-js/index.html">Examples page</a>.


## Attributes

| Attribute             | Default value   | Description |
| :- | :- | :- |
| `label-prev`          | `"Previous"`    | The label for the 'previous' button. |
| `label-next`          | `"Next"`        | The label for the 'next' button. |
| `aria-prev`           | `"Go to previous item"` | The ARIA label for the 'previous' button. |
| `aria-next`           | `"Go to next item"` | The ARIA label for the 'next' button. |
| `initial-slide`       | `"1"`           | The index of the slide to display when the carousel is initialized. "1" = the first slide. If the given valid is invalid, the first slide will be displayed first. |
| `pagination`          | `null`          | If this attribute exists, pagination indicators will be added to the carousel. |
| `pagination-label`    | `"{{ index }}"` | String template for each pagination button. Will replace any instance of `"{{ index }}"` with the current slide number. |
| `pagination-values`   | `null`          | Tilde-delimited list of values to use for the pagination buttons. E.g., "First~Second~Third". If not provided, the `pagination-template` label will be used. |
| `template-id`         | `null`          | If this attribute exists, the carousel will use the HTML markup from the element with the `id` specified by this attribute. |
| `unstyled`            | `null`          | If this attribute exists, default CSS styling will not be applied to the carousel. |

**The only attributes that are dynamic are:**

  - `label-prev`
  - `label-next`
  - `aria-prev`
  - `aria-next`

If you change them after the carousel has been initialized, the carousel will update the button labels.


### Almost everything at once (without a custom `template-id`)

What does that look like in practice?

```html
<it-carousel
  label-prev="Go back"
  label-next="Go forward"
  aria-prev="Screenreader go back"
  aria-next="Screenreader go back"
  initial-slide="2"
  pagination
  pagination-label="Show item {{ index }}"
  pagination-values="Car~Dog~Fish~Banana"
  >
  <img src="car.jpg">
  <img src="dog.jpg">
  <img src="fish.jpg">
  <img src="banana.jpg">
  <img src="unknown.jpg">
</it-carousel>
```


# CSS Styling

The component exposes its internal parts by using the `part` attribute in the Shadow DOM.

For example, the Shadow DOM HTML for a simple 3-item carousel using pagination will look like this:

```html
<it-carousel pagination>
  <div part="container">
    <div part="slot">
      <p>I am item 1</p>
      <p hidden="hidden">I am item 2</p>
      <p hidden="hidden">I am item 2</p>
    </div>
    <button part="button previous" id="btnPrev">Previous</button>
    <button part="button next" id="btnNext">Next</button>
    <ul part="pagination" id="pagination">
      <li part="pagination-item active">
        <button data-item="0" aria-label="Go to item 1 of 3" aria-disabled="true" part="pagination-button active">1</button>
      </li>
      <li part="pagination-item">
        <button data-item="1" aria-label="Go to item 2 of 3" part="pagination-button">2</button>
      </li>
      <li part="pagination-item">
        <button data-item="2" aria-label="Go to item 3 of 3" part="pagination-button">3</button>
      </li>
    </ul>
  </div>
</it-carousel>
```

You can style these using the `::part` pseudo-element in CSS. For example:

```css
it-carousel::part(button) {
  background: blue;
}
it-carousel::part(pagination-button) {
  background: gray;
  color: white;
}
it-carousel::part(pagination-button active) {
  background: green;
  color: white;
}
```

The full list of exposed `::part` items that can be styled is:

  - `container`
  - `slot`
  - `button`, `button previous`, `button next`
  - `container-pagination`
  - `pagination-item`, `pagination-item active`
  - `pagination-button`, `pagination-button active`


# API

## Methods

### `<int> (element).previous()`

```js
const el = document.querySelector("it-carousel");
el.previous();
```

### `<int> (element).next()`

```js
const el = document.querySelector("it-carousel");
el.next();
```

### `<int> (element).activate(<int> index)`

```js
const el = document.querySelector("it-carousel");
el.activate(2);
```

The first slide is index "0".

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

## Tests

You may need to perform a one-time installation of browsers for automated testing.

```bash
$ npx playwright install
```

To run the existing tests:

```bash
$ npm run test
```

To run the tests and see the test UI:

```bash
$ npm run test:ui
```

All tests are saved in the `/tests/` folder. They're written for the Playwright test framework. See the <a href="https://playwright.dev/docs/intro">Playwright documentation</a> for more information.


# TODO

  - Option to disable wrap for 'Next' on the last slide, 'Previous' on the first
  - Proper accessible implementation


# Maintainer

  - Kendall Anderson (kpander@invisiblethreads.com)

