"use strict";
/**
 * @file
 * Carousel.js
 */

class Carousel {

  constructor() {
    this.state = {
      active: 0,
      total: 0,
    };

    this._countItems();
    this.activate(this.state.active);
    this.bindButtons();
  }

  _countItems() {
    const selector = "[data-csjs-container] [data-csjs-item]";
    const els = document.querySelectorAll(selector);
    els.forEach((el, index) => {
      el.setAttribute("data-csjs-item-id", index);
      el.setAttribute("hidden", "hidden");
    });
    this.state.total = els.length;
  }

  activate(index) {
    if (index > this.state.total - 1) index = 0;
    if (index < 0) index = this.state.total - 1;

    // Hide current item.
    const selectorOld = `[data-csjs-item-id="${this.state.active}"]`;
    document.querySelector(selectorOld).setAttribute("hidden", "hidden");

    // Show new item.
    this.state.active = index;
    const selectorNew = `[data-csjs-item-id="${this.state.active}"]`;
    document.querySelector(selectorNew).removeAttribute("hidden");

    return this.state.active;
  }

  next() {
    return this.activate(this.state.active + 1);
  }

  previous() {
    return this.activate(this.state.active - 1);
  }

  bindButtons() {
    const me = this;
    document.querySelectorAll("[data-csjs-previous]").forEach(el => {
      el.addEventListener("click", me.previous.bind(this));
    });
    document.querySelectorAll("[data-csjs-next]").forEach(el => {
      el.addEventListener("click", me.next.bind(this));
    });
  }
}

const carousel_init = function() {
  window.carousel = new Carousel();
};

document.addEventListener("DOMContentLoaded", carousel_init);
