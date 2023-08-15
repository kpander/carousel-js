"use strict";
/**
 * @file
 * Carousel.js
 */

class CarouselIthreads extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });

    // https://stackoverflow.com/questions/68475272/when-can-we-access-the-children-elements-of-a-custom-component-using-javascript
    this.onMutation = this.onMutation.bind(this);

    const template = document.createElement("template");
    template.innerHTML = `
<style>
:host {
  display: block;
}
</style>
<div id="container">
  <slot></slot>
</div>
<button id="btnPrev">Previous</button>
<button id="btnNext">Next</button>
`;
    const clone = template.content.cloneNode(true);
    this.shadowRoot.appendChild(clone);
  }

  connectedCallback() {
    this.observer = new MutationObserver(this.onMutation);
    this.observer.observe(this, {
      childList: true
    });

    this.state = {
      current: 0,
      total: 0,
    };

    this.shadowRoot.getElementById("btnPrev").addEventListener("click", this.previous.bind(this));
    this.shadowRoot.getElementById("btnNext").addEventListener("click", this.next.bind(this));
  }

  disconnectedCallback() {
    this.observer.disconnect();
  }

  onMutation(mutations) {
    const added = [];

    // A `mutation` is passed for each new node
    for (const mutation of mutations) {
      // Could test for `mutation.type` here, but since we only have
      // set up one observer type it will always be `childList`
      added.push(...mutation.addedNodes);
    }

    this.init();
  }

  init() {
    this.state.total = [...this.childNodes].filter(el => {
      return el.nodeType === Node.ELEMENT_NODE;
    }).length;

    this.activate(this.state.current);
  }

  /**
   * Show the previous slide.
   */
  previous() {
    return this.activate(this.state.current - 1);
  }

  /**
   * Show the next slide.
   */
  next() {
    return this.activate(this.state.current + 1);
  }

  /**
   * Display the item at the given index.
   *
   * If the index is less or more than the allowable range, it will
   * be reset to something valid.
   */
  activate(newIndex) {
    if (newIndex < 0) newIndex = this.state.total - 1;
    if (newIndex >= this.state.total) newIndex = 0;
    this.state.current = newIndex;

    [...this.childNodes].filter(el => {
      return el.nodeType === Node.ELEMENT_NODE;
    }).forEach((el, index) => {
      if (index === newIndex) {
        el.removeAttribute("hidden");
      } else {
        el.setAttribute("hidden", "hidden");
      }
    });

    return this.state.current;
  }

}
customElements.define('carousel-ithreads', CarouselIthreads);
