/* https://github.com/kpander/carousel-js */
/* dist/Carousel.js v2.3.1 Wed Sep 20 2023 21:17:14 GMT-0400 (Eastern Daylight Saving Time) */

"use strict";class CarouselIthreads extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"}),this.onMutation=this.onMutation.bind(this)}_getTemplate(){var t=document.getElementById(this.getAttribute("template-id"));return t?t.innerHTML:this._getDefaultTemplate()}_getDefaultTemplate(){return`
${this._getDefaultStyles()}
<div part="container-slot">
  <slot></slot>
</div>
<div part="container-grid">
  <button id="btnPrev" part="button previous">Previous</button>
  <button id="btnNext" part="button next">Next</button>
  <ul id="pagination" part="container-pagination"></ul>
</div>
`}_getDefaultStyles(){return`
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
    `}connectedCallback(){this.shadowRoot.innerHTML=this._getTemplate(),this.observer=new MutationObserver(this.onMutation),this.observer.observe(this,{childList:!0}),this.state={current:0,total:0};var t=this.shadowRoot.getElementById("btnPrev"),t=(t&&t.addEventListener("click",this.previous.bind(this)),this.shadowRoot.getElementById("btnNext"));t&&t.addEventListener("click",this.next.bind(this)),["label-prev","label-next","aria-prev","aria-next"].forEach(t=>{this._updateAttribute(t,this.getAttribute(t))})}disconnectedCallback(){this.observer.disconnect()}static get observedAttributes(){return["label-prev","label-next","aria-prev","aria-next"]}attributeChangedCallback(t,e,a){e!==a&&this._updateAttribute(t,a)}_updateAttribute(t,e){var a;e&&(a=this.shadowRoot.getElementById({"label-prev":"btnPrev","label-next":"btnNext","aria-prev":"btnPrev","aria-next":"btnNext"}[t]))&&("label-prev"===t||"label-next"===t?a.textContent=e:"aria-prev"!==t&&"aria-next"!==t||a.setAttribute("aria-label",e))}_addPagination(){var e=this.shadowRoot.getElementById("pagination");if(e)for(let t=0;t<this.state.total;t++){var a=document.createElement("li"),i=(a.setAttribute("part","pagination-item"),document.createElement("button"));i.setAttribute("data-item",t),i.setAttribute("aria-label","Go to item "+(t+1)+" of "+this.state.total),i.setAttribute("part","pagination-button"),i.textContent=""+(t+1),i.addEventListener("click",this._goto.bind(this)),a.appendChild(i),e.appendChild(a)}}_updatePagination(i){var t=this.shadowRoot.getElementById("pagination");t&&t.querySelectorAll("li").forEach((t,e)=>{var a=t.querySelector("button");e===i?(t.setAttribute("part","pagination-item active"),a.setAttribute("part","pagination-button active")):(t.setAttribute("part","pagination-item"),a.setAttribute("part","pagination-button"))})}onMutation(t){var e=[];for(const a of t)e.push(...a.addedNodes);this.init()}init(){var t;this.state.total=[...this.childNodes].filter(t=>t.nodeType===Node.ELEMENT_NODE).length,this.hasAttribute("pagination")?this._addPagination():(t=this.shadowRoot.getElementById("pagination"))&&t.remove(),this.activate(this.state.current)}previous(){return this.activate(this.state.current-1)}next(){return this.activate(this.state.current+1)}_goto(t){t=parseInt(t.target.getAttribute("data-item"),10);this.activate(t)}activate(a){return(a=a<0?this.state.total-1:a)>=this.state.total&&(a=0),this.state.current=a,[...this.childNodes].filter(t=>t.nodeType===Node.ELEMENT_NODE).forEach((t,e)=>{e===a?t.removeAttribute("hidden"):t.setAttribute("hidden","hidden")}),this._updatePagination(a),this.state.current}}customElements.define("carousel-ithreads",CarouselIthreads);