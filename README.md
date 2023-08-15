# carousel-js

Simple vanilla js carousel, for displaying different cards in a group.


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
<div data-csjs-container>

  <div data-csjs-item>
    <p>I am the first item</p>
  </div>

  <div data-csjs-item>
    <ul>
      <li>I am the second carousel item</li>
      <li>I am the second carousel item</li>
    </ul>
  </div>

  <div data-csjs-item>
    <img src="https://placekitten.com/640/480">
    <p>I am the third item, a photo</p>
  </div>

</div>

<button data-csjs-previous>Previous slide</button>
<button data-csjs-next>Next slide</button>
```

In the example above:

  - The attribute `data-csjs-container` defines a carousel container
  - Each item within the container with a `data-csjs-item` attribute can be shown/hidden in the carousel
  - An element with `data-csjs-previous` will show the previous slide when clicked
  - An element with `data-csjs-next` will show the next slide when clicked

In this example, there are 3 slides and buttons for navigating forward and backward.


## Multiple carousels on the same page

<!--

```html
<div data-csjs-container data-csjs-id="1">

  <div data-csjs-item>
    <p>I am the first item</p>
  </div>

  <div data-csjs-item>
    <ul>
      <li>I am the second carousel item</li>
      <li>I am the second carousel item</li>
    </ul>
  </div>

  <div data-csjs-item>
    <img src="https://placekitten.com/640/480">
    <p>I am the third item, a photo</p>
  </div>

</div>

<button data-csjs-id="1" data-csjs-previous>Previous slide</button>
<button data-csjs-id="1" data-csjs-next>Next slide</button>
`

-->



# API

## `<int> window.carousel.previous()`

## `<int> window.carousel.next()`

## `<int> window.carousel.activate(<int> index)`



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

  - Allow multiple carousels on the same page


# Maintainer

  - Kendall Anderson (kpander@invisiblethreads.com)

