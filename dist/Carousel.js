/* https://github.com/kpander/carousel-js */
/* dist/Carousel.js v2.1.0 Wed Aug 16 2023 21:55:58 GMT-0400 (Eastern Daylight Saving Time) */

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
`}connectedCallback(){this.shadowRoot.innerHTML=this._getTemplate(),this.observer=new MutationObserver(this.onMutation),this.observer.observe(this,{childList:!0}),this.state={current:0,total:0};var t=this.shadowRoot.getElementById("btnPrev"),t=(t&&t.addEventListener("click",this.previous.bind(this)),this.shadowRoot.getElementById("btnNext"));t&&t.addEventListener("click",this.next.bind(this))}disconnectedCallback(){this.observer.disconnect()}onMutation(t){var e=[];for(const s of t)e.push(...s.addedNodes);this.init()}init(){this.state.total=[...this.childNodes].filter(t=>t.nodeType===Node.ELEMENT_NODE).length,this.activate(this.state.current)}previous(){return this.activate(this.state.current-1)}next(){return this.activate(this.state.current+1)}activate(s){return(s=s<0?this.state.total-1:s)>=this.state.total&&(s=0),this.state.current=s,[...this.childNodes].filter(t=>t.nodeType===Node.ELEMENT_NODE).forEach((t,e)=>{e===s?t.removeAttribute("hidden"):t.setAttribute("hidden","hidden")}),this.state.current}}customElements.define("carousel-ithreads",CarouselIthreads);