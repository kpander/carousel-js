/* https://github.com/kpander/carousel-js */
/* dist/Carousel.js v3.0.1 Thu Sep 28 2023 22:35:23 GMT-0400 (Eastern Daylight Saving Time) */

"use strict";class CarouselIthreads extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"}),this.onMutation=this.onMutation.bind(this)}_getTemplate(){var t=document.getElementById(this.getAttribute("template-id"));return t?t.innerHTML:this._getDefaultTemplate()}_getDefaultTemplate(){return`
${this._getDefaultStyles()}
<div part="container">
  <div part="slot"><slot></slot></div>
  <button part="button previous" id="btnPrev">Previous</button>
  <button part="button next" id="btnNext">Next</button>
  <ul part="pagination" id="pagination"></ul>
</div>
`}_getDefaultStyles(){return`
<style>

:host {
  display: block;
}

button {
  cursor: pointer;
}

/* Organize the nav buttons and pagination in a grid. */
[part="container"] {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0px .5em;
  grid-template-areas:
    "slot slot"
    "prev next";
}

/* If we're showing pagination, insert them into the grid. */
:host([pagination]) [part="container"] {
  grid-template-columns: 1fr max-content 1fr;
  grid-template-areas:
    "slot slot slot"
    "prev pagination next";
}

[part="slot"] {
  grid-area: slot;
}

[part="button previous"] {
  justify-self: end;
  grid-area: prev;
}

[part="button next"] { 
  justify-self: start;
  grid-area: next; 
}

[part="pagination"] {
  justify-self: center;
  align-self: center;
  grid-area: pagination;
}

[part~="button"] {
  width: 8em;
}

[part="pagination"] {
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
    `}connectedCallback(){this.shadowRoot.innerHTML=this._getTemplate(),this.observer=new MutationObserver(this.onMutation),this.observer.observe(this,{childList:!0}),this.state={current:this._getInitialIndex(),total:0},this.hasAttribute("pagination-label")?this.paginationLabel=this.getAttribute("pagination-label"):this.paginationLabel="{{ index }}",this.hasAttribute("pagination-values")?this.paginationValues=this.getAttribute("pagination-values").split("~"):this.paginationValues=null;var t=this.shadowRoot.getElementById("btnPrev"),t=(t&&t.addEventListener("click",this.previous.bind(this)),this.shadowRoot.getElementById("btnNext"));t&&t.addEventListener("click",this.next.bind(this)),["label-prev","label-next","aria-prev","aria-next"].forEach(t=>{this._updateAttribute(t,this.getAttribute(t))})}_getInitialIndex(){var t;return!this.hasAttribute("initial-slide")||(t=parseInt(this.getAttribute("initial-slide"),10),isNaN(t))?0:(t--,Math.max(0,t))}disconnectedCallback(){this.observer.disconnect()}static get observedAttributes(){return["label-prev","label-next","aria-prev","aria-next"]}attributeChangedCallback(t,e,i){e!==i&&this._updateAttribute(t,i)}_updateAttribute(t,e){var i;e&&(i=this.shadowRoot.getElementById({"label-prev":"btnPrev","label-next":"btnNext","aria-prev":"btnPrev","aria-next":"btnNext"}[t]))&&("label-prev"===t||"label-next"===t?i.textContent=e:"aria-prev"!==t&&"aria-next"!==t||i.setAttribute("aria-label",e))}_addPagination(){var e=this.shadowRoot.getElementById("pagination");if(e)for(let t=0;t<this.state.total;t++){var i=document.createElement("li"),a=(i.setAttribute("part","pagination-item"),document.createElement("button"));a.setAttribute("part","pagination-button"),a.setAttribute("data-item",t),a.setAttribute("aria-label",this._getPaginationAriaLabel(t)),a.textContent=this._getPaginationLabel(t),a.addEventListener("click",this._goto.bind(this)),i.appendChild(a),e.appendChild(i)}}_getPaginationLabel(t){return this.paginationValues&&this.paginationValues[t]?this.paginationValues[t]:this.paginationLabel.replace("{{ index }}",t+1)}_getPaginationAriaLabel(t){return"Go to item "+(t+1)+" of "+this.state.total}_updatePagination(a){var t=this.shadowRoot.getElementById("pagination");t&&t.querySelectorAll("li").forEach((t,e)=>{var i=t.querySelector("button");e===a?(t.setAttribute("part","pagination-item active"),i.setAttribute("part","pagination-button active"),i.setAttribute("aria-disabled",!0)):(t.setAttribute("part","pagination-item"),i.setAttribute("part","pagination-button"),i.removeAttribute("aria-disabled"))})}onMutation(t){var e=[];for(const i of t)e.push(...i.addedNodes);this.init()}init(){var t;this.state.total=[...this.childNodes].filter(t=>t.nodeType===Node.ELEMENT_NODE).length,this.hasAttribute("pagination")?this._addPagination():(t=this.shadowRoot.getElementById("pagination"))&&t.remove(),this.activate(this.state.current)}previous(){return this.activate(this.state.current-1)}next(){return this.activate(this.state.current+1)}_goto(t){t=parseInt(t.target.getAttribute("data-item"),10);this.activate(t)}activate(i){return(i=i<0?this.state.total-1:i)>=this.state.total&&(i=0),this.state.current=i,[...this.childNodes].filter(t=>t.nodeType===Node.ELEMENT_NODE).forEach((t,e)=>{e===i?t.removeAttribute("hidden"):t.setAttribute("hidden","hidden")}),this._updatePagination(i),this.state.current}}customElements.define("it-carousel",CarouselIthreads);