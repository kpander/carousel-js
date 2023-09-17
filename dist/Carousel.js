/* https://github.com/kpander/carousel-js */
/* dist/Carousel.js v2.2.0 Sat Sep 16 2023 22:53:56 GMT-0400 (Eastern Daylight Saving Time) */

"use strict";class CarouselIthreads extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"}),this.onMutation=this.onMutation.bind(this)}_getTemplate(){var t=document.getElementById(this.getAttribute("template-id"));return t?t.innerHTML:this._getDefaultTemplate()}_getDefaultTemplate(){return`
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
`}connectedCallback(){this.shadowRoot.innerHTML=this._getTemplate(),this.observer=new MutationObserver(this.onMutation),this.observer.observe(this,{childList:!0}),this.state={current:0,total:0};var t=this.shadowRoot.getElementById("btnPrev"),t=(t&&t.addEventListener("click",this.previous.bind(this)),this.shadowRoot.getElementById("btnNext"));t&&t.addEventListener("click",this.next.bind(this)),["label-prev","label-next","aria-prev","aria-next"].forEach(t=>{this._updateAttribute(t,this.getAttribute(t))})}disconnectedCallback(){this.observer.disconnect()}static get observedAttributes(){return["label-prev","label-next","aria-prev","aria-next"]}attributeChangedCallback(t,e,i){e!==i&&this._updateAttribute(t,i)}_updateAttribute(t,e){var i;e&&(i=this.shadowRoot.getElementById({"label-prev":"btnPrev","label-next":"btnNext","aria-prev":"btnPrev","aria-next":"btnNext"}[t]))&&("label-prev"===t||"label-next"===t?i.textContent=e:"aria-prev"!==t&&"aria-next"!==t||i.setAttribute("aria-label",e))}onMutation(t){var e=[];for(const i of t)e.push(...i.addedNodes);this.init()}init(){this.state.total=[...this.childNodes].filter(t=>t.nodeType===Node.ELEMENT_NODE).length,this.activate(this.state.current)}previous(){return this.activate(this.state.current-1)}next(){return this.activate(this.state.current+1)}activate(i){return(i=i<0?this.state.total-1:i)>=this.state.total&&(i=0),this.state.current=i,[...this.childNodes].filter(t=>t.nodeType===Node.ELEMENT_NODE).forEach((t,e)=>{e===i?t.removeAttribute("hidden"):t.setAttribute("hidden","hidden")}),this.state.current}}customElements.define("carousel-ithreads",CarouselIthreads);