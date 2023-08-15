/* https://github.com/kpander/carousel-js */
/* dist/Carousel.js v2.0.0 Tue Aug 15 2023 15:31:16 GMT-0400 (Eastern Daylight Saving Time) */

"use strict";class CarouselIthreads extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"}),this.onMutation=this.onMutation.bind(this);var t=document.createElement("template"),t=(t.innerHTML=`
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
`,t.content.cloneNode(!0));this.shadowRoot.appendChild(t)}connectedCallback(){this.observer=new MutationObserver(this.onMutation),this.observer.observe(this,{childList:!0}),this.state={current:0,total:0},this.shadowRoot.getElementById("btnPrev").addEventListener("click",this.previous.bind(this)),this.shadowRoot.getElementById("btnNext").addEventListener("click",this.next.bind(this))}disconnectedCallback(){this.observer.disconnect()}onMutation(t){var e=[];for(const s of t)e.push(...s.addedNodes);this.init()}init(){this.state.total=[...this.childNodes].filter(t=>t.nodeType===Node.ELEMENT_NODE).length,this.activate(this.state.current)}previous(){return this.activate(this.state.current-1)}next(){return this.activate(this.state.current+1)}activate(s){return(s=s<0?this.state.total-1:s)>=this.state.total&&(s=0),this.state.current=s,[...this.childNodes].filter(t=>t.nodeType===Node.ELEMENT_NODE).forEach((t,e)=>{e===s?t.removeAttribute("hidden"):t.setAttribute("hidden","hidden")}),this.state.current}}customElements.define("carousel-ithreads",CarouselIthreads);