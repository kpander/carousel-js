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
    const styles = this._getDefaultStyles();
    return `
${styles}
<div part="container-slot">
  <slot></slot>
</div>
<div part="container-grid">
  <button id="btnPrev" part="button previous">Previous</button>
  <button id="btnNext" part="button next">Next</button>
  <ul id="pagination" part="container-pagination"></ul>
</div>
`;
  }

  _getDefaultStyles() {
    return `
<style>

:host {
  display: block;
}

/* Organize the nav buttons and pagination in a grid. */
[part="container-grid"] {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr;
  gap: 0px .5em;
  grid-template-areas:
    "prev next";
}

/* If we're showing pagination, insert them into the grid. */
:host([pagination]) [part="container-grid"] {
  grid-template-columns: 1fr max-content 1fr;
  grid-template-areas:
    "prev pagination next";
}

[part="button previous"] {
  justify-self: end;
  grid-area: prev;
}

[part="button next"] { 
  justify-self: start;
  grid-area: next; 
}

[part="container-pagination"] {
  justify-self: center;
  align-self: center;
  grid-area: pagination;
}

[part~="button"] {
  width: 8em;
}

[part="container-pagination"] {
  list-style-type: none;
  margin: 0;
  padding: 0;
}

[part~="pagination-item"] {
  display: inline-block;
}

[part~="pagination-button"] {
  border-radius: .75em;
  border: 1px solid #ccc;
  margin: 0 .1em;
}

[part="pagination-button"] {
  background: ButtonFace;
  color: inherit;
}

[part="pagination-button active"] {
  background: black;
  color: white;
}

</style>
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

  _addPagination() {
    const el = this.shadowRoot.getElementById("pagination");
    if (!el) return;

    for (let i = 0; i < this.state.total; i++) {
      const li = document.createElement("li");
      li.setAttribute("part", "pagination-item");

      const button = document.createElement("button");
      button.setAttribute("data-item", i);
      button.setAttribute("aria-label", "Go to item " + (i + 1) + " of " + this.state.total);
      button.setAttribute("part", "pagination-button");
      button.textContent = "" + (i + 1);
      button.addEventListener("click", this._goto.bind(this));

      li.appendChild(button);
      el.appendChild(li);
    }
  }

  _updatePagination(newIndex) {
    const elPagination = this.shadowRoot.getElementById("pagination");
    if (elPagination) {
      elPagination.querySelectorAll("li").forEach((elItem, index) => {
        const elButton = elItem.querySelector("button");
        if (index === newIndex) {
          elItem.setAttribute("part", "pagination-item active");
          elButton.setAttribute("part", "pagination-button active");
        } else {
          elItem.setAttribute("part", "pagination-item");
          elButton.setAttribute("part", "pagination-button");
        }
      });
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

    if (this.hasAttribute("pagination")) {
      this._addPagination();
    }

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

  _goto(event) {
    const index = parseInt(event.target.getAttribute("data-item"), 10);
    this.activate(index);
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

    // If we're displaying pagination buttons, update attributes to
    // indicate which one is currently active.
    this._updatePagination(newIndex);

    return this.state.current;
  }

}
customElements.define('carousel-ithreads', CarouselIthreads);
