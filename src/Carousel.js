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
  }

  _getTemplate() {
    const elTemplate = document.getElementById(this.getAttribute("template-id"));
    return elTemplate ? elTemplate.innerHTML : this._getDefaultTemplate();
  }

  _getDefaultTemplate() {
    return `
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
  }

  connectedCallback() {
    this.shadowRoot.innerHTML = this._getTemplate();

    this.observer = new MutationObserver(this.onMutation);
    this.observer.observe(this, {
      childList: true
    });

    this.state = {
      current: 0,
      total: 0,
    };

    const elPrev = this.shadowRoot.getElementById("btnPrev");
    if (elPrev) {
      elPrev.addEventListener("click", this.previous.bind(this));
    }

    const elNext = this.shadowRoot.getElementById("btnNext");
    if (elNext) {
      elNext.addEventListener("click", this.next.bind(this));
    }

    [ "label-prev", "label-next", "aria-prev", "aria-next" ].forEach(name => {
      this._updateAttribute(name, this.getAttribute(name));
    });
  }

  disconnectedCallback() {
    this.observer.disconnect();
  }

  static get observedAttributes() {
    return [
      "label-prev",
      "label-next",
      "aria-prev",
      "aria-next",
    ];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue === newValue) return;

    this._updateAttribute(name, newValue);
  }

  _updateAttribute(name, value) {
    if (!value) return;

    const ids = {
      "label-prev": "btnPrev",
      "label-next": "btnNext",
      "aria-prev": "btnPrev",
      "aria-next": "btnNext",
    };

    const id = ids[name];
    const el = this.shadowRoot.getElementById(id);
    if (!el) return;

    if (name === "label-prev" || name === "label-next") {
      el.textContent = value;
    } else if (name === "aria-prev" || name === "aria-next") {
      el.setAttribute("aria-label", value);
    }
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
