function t(t,e,i,s){var r,o=arguments.length,n=o<3?e:null===s?s=Object.getOwnPropertyDescriptor(e,i):s;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(t,e,i,s);else for(var a=t.length-1;a>=0;a--)(r=t[a])&&(n=(o<3?r(n):o>3?r(e,i,n):r(e,i))||n);return o>3&&n&&Object.defineProperty(e,i,n),n}"function"==typeof SuppressedError&&SuppressedError;const e=globalThis,i=e.ShadowRoot&&(void 0===e.ShadyCSS||e.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,s=Symbol(),r=new WeakMap;let o=class{constructor(t,e,i){if(this._$cssResult$=!0,i!==s)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const e=this.t;if(i&&void 0===t){const i=void 0!==e&&1===e.length;i&&(t=r.get(e)),void 0===t&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),i&&r.set(e,t))}return t}toString(){return this.cssText}};const n=i?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const i of t.cssRules)e+=i.cssText;return(t=>new o("string"==typeof t?t:t+"",void 0,s))(e)})(t):t,{is:a,defineProperty:l,getOwnPropertyDescriptor:c,getOwnPropertyNames:h,getOwnPropertySymbols:d,getPrototypeOf:p}=Object,u=globalThis,f=u.trustedTypes,g=f?f.emptyScript:"",$=u.reactiveElementPolyfillSupport,_=(t,e)=>t,x={toAttribute(t,e){switch(e){case Boolean:t=t?g:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t)}return t},fromAttribute(t,e){let i=t;switch(e){case Boolean:i=null!==t;break;case Number:i=null===t?null:Number(t);break;case Object:case Array:try{i=JSON.parse(t)}catch(t){i=null}}return i}},b=(t,e)=>!a(t,e),y={attribute:!0,type:String,converter:x,reflect:!1,useDefault:!1,hasChanged:b};Symbol.metadata??=Symbol("metadata"),u.litPropertyMetadata??=new WeakMap;let m=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=y){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(t,e),!e.noAccessor){const i=Symbol(),s=this.getPropertyDescriptor(t,i,e);void 0!==s&&l(this.prototype,t,s)}}static getPropertyDescriptor(t,e,i){const{get:s,set:r}=c(this.prototype,t)??{get(){return this[e]},set(t){this[e]=t}};return{get:s,set(e){const o=s?.call(this);r?.call(this,e),this.requestUpdate(t,o,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??y}static _$Ei(){if(this.hasOwnProperty(_("elementProperties")))return;const t=p(this);t.finalize(),void 0!==t.l&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(_("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(_("properties"))){const t=this.properties,e=[...h(t),...d(t)];for(const i of e)this.createProperty(i,t[i])}const t=this[Symbol.metadata];if(null!==t){const e=litPropertyMetadata.get(t);if(void 0!==e)for(const[t,i]of e)this.elementProperties.set(t,i)}this._$Eh=new Map;for(const[t,e]of this.elementProperties){const i=this._$Eu(t,e);void 0!==i&&this._$Eh.set(i,t)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const i=new Set(t.flat(1/0).reverse());for(const t of i)e.unshift(n(t))}else void 0!==t&&e.push(n(t));return e}static _$Eu(t,e){const i=e.attribute;return!1===i?void 0:"string"==typeof i?i:"string"==typeof t?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(t=>t(this))}addController(t){(this._$EO??=new Set).add(t),void 0!==this.renderRoot&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$EO?.delete(t)}_$E_(){const t=new Map,e=this.constructor.elementProperties;for(const i of e.keys())this.hasOwnProperty(i)&&(t.set(i,this[i]),delete this[i]);t.size>0&&(this._$Ep=t)}createRenderRoot(){const t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return((t,s)=>{if(i)t.adoptedStyleSheets=s.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet);else for(const i of s){const s=document.createElement("style"),r=e.litNonce;void 0!==r&&s.setAttribute("nonce",r),s.textContent=i.cssText,t.appendChild(s)}})(t,this.constructor.elementStyles),t}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(t=>t.hostConnected?.())}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach(t=>t.hostDisconnected?.())}attributeChangedCallback(t,e,i){this._$AK(t,i)}_$ET(t,e){const i=this.constructor.elementProperties.get(t),s=this.constructor._$Eu(t,i);if(void 0!==s&&!0===i.reflect){const r=(void 0!==i.converter?.toAttribute?i.converter:x).toAttribute(e,i.type);this._$Em=t,null==r?this.removeAttribute(s):this.setAttribute(s,r),this._$Em=null}}_$AK(t,e){const i=this.constructor,s=i._$Eh.get(t);if(void 0!==s&&this._$Em!==s){const t=i.getPropertyOptions(s),r="function"==typeof t.converter?{fromAttribute:t.converter}:void 0!==t.converter?.fromAttribute?t.converter:x;this._$Em=s;const o=r.fromAttribute(e,t.type);this[s]=o??this._$Ej?.get(s)??o,this._$Em=null}}requestUpdate(t,e,i,s=!1,r){if(void 0!==t){const o=this.constructor;if(!1===s&&(r=this[t]),i??=o.getPropertyOptions(t),!((i.hasChanged??b)(r,e)||i.useDefault&&i.reflect&&r===this._$Ej?.get(t)&&!this.hasAttribute(o._$Eu(t,i))))return;this.C(t,e,i)}!1===this.isUpdatePending&&(this._$ES=this._$EP())}C(t,e,{useDefault:i,reflect:s,wrapped:r},o){i&&!(this._$Ej??=new Map).has(t)&&(this._$Ej.set(t,o??e??this[t]),!0!==r||void 0!==o)||(this._$AL.has(t)||(this.hasUpdated||i||(e=void 0),this._$AL.set(t,e)),!0===s&&this._$Em!==t&&(this._$Eq??=new Set).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(t){Promise.reject(t)}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[t,e]of this._$Ep)this[t]=e;this._$Ep=void 0}const t=this.constructor.elementProperties;if(t.size>0)for(const[e,i]of t){const{wrapped:t}=i,s=this[e];!0!==t||this._$AL.has(e)||void 0===s||this.C(e,void 0,i,s)}}let t=!1;const e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),this._$EO?.forEach(t=>t.hostUpdate?.()),this.update(e)):this._$EM()}catch(e){throw t=!1,this._$EM(),e}t&&this._$AE(e)}willUpdate(t){}_$AE(t){this._$EO?.forEach(t=>t.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&=this._$Eq.forEach(t=>this._$ET(t,this[t])),this._$EM()}updated(t){}firstUpdated(t){}};m.elementStyles=[],m.shadowRootOptions={mode:"open"},m[_("elementProperties")]=new Map,m[_("finalized")]=new Map,$?.({ReactiveElement:m}),(u.reactiveElementVersions??=[]).push("2.1.2");const v=globalThis,w=t=>t,A=v.trustedTypes,E=A?A.createPolicy("lit-html",{createHTML:t=>t}):void 0,S="$lit$",C=`lit$${Math.random().toFixed(9).slice(2)}$`,P="?"+C,k=`<${P}>`,O=document,U=()=>O.createComment(""),R=t=>null===t||"object"!=typeof t&&"function"!=typeof t,H=Array.isArray,M="[ \t\n\f\r]",T=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,N=/-->/g,z=/>/g,j=RegExp(`>|${M}(?:([^\\s"'>=/]+)(${M}*=${M}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),L=/'/g,D=/"/g,B=/^(?:script|style|textarea|title)$/i,I=(t=>(e,...i)=>({_$litType$:t,strings:e,values:i}))(1),q=Symbol.for("lit-noChange"),V=Symbol.for("lit-nothing"),W=new WeakMap,F=O.createTreeWalker(O,129);function K(t,e){if(!H(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==E?E.createHTML(e):e}const Z=(t,e)=>{const i=t.length-1,s=[];let r,o=2===e?"<svg>":3===e?"<math>":"",n=T;for(let e=0;e<i;e++){const i=t[e];let a,l,c=-1,h=0;for(;h<i.length&&(n.lastIndex=h,l=n.exec(i),null!==l);)h=n.lastIndex,n===T?"!--"===l[1]?n=N:void 0!==l[1]?n=z:void 0!==l[2]?(B.test(l[2])&&(r=RegExp("</"+l[2],"g")),n=j):void 0!==l[3]&&(n=j):n===j?">"===l[0]?(n=r??T,c=-1):void 0===l[1]?c=-2:(c=n.lastIndex-l[2].length,a=l[1],n=void 0===l[3]?j:'"'===l[3]?D:L):n===D||n===L?n=j:n===N||n===z?n=T:(n=j,r=void 0);const d=n===j&&t[e+1].startsWith("/>")?" ":"";o+=n===T?i+k:c>=0?(s.push(a),i.slice(0,c)+S+i.slice(c)+C+d):i+C+(-2===c?e:d)}return[K(t,o+(t[i]||"<?>")+(2===e?"</svg>":3===e?"</math>":"")),s]};class J{constructor({strings:t,_$litType$:e},i){let s;this.parts=[];let r=0,o=0;const n=t.length-1,a=this.parts,[l,c]=Z(t,e);if(this.el=J.createElement(l,i),F.currentNode=this.el.content,2===e||3===e){const t=this.el.content.firstChild;t.replaceWith(...t.childNodes)}for(;null!==(s=F.nextNode())&&a.length<n;){if(1===s.nodeType){if(s.hasAttributes())for(const t of s.getAttributeNames())if(t.endsWith(S)){const e=c[o++],i=s.getAttribute(t).split(C),n=/([.?@])?(.*)/.exec(e);a.push({type:1,index:r,name:n[2],strings:i,ctor:"."===n[1]?tt:"?"===n[1]?et:"@"===n[1]?it:X}),s.removeAttribute(t)}else t.startsWith(C)&&(a.push({type:6,index:r}),s.removeAttribute(t));if(B.test(s.tagName)){const t=s.textContent.split(C),e=t.length-1;if(e>0){s.textContent=A?A.emptyScript:"";for(let i=0;i<e;i++)s.append(t[i],U()),F.nextNode(),a.push({type:2,index:++r});s.append(t[e],U())}}}else if(8===s.nodeType)if(s.data===P)a.push({type:2,index:r});else{let t=-1;for(;-1!==(t=s.data.indexOf(C,t+1));)a.push({type:7,index:r}),t+=C.length-1}r++}}static createElement(t,e){const i=O.createElement("template");return i.innerHTML=t,i}}function Y(t,e,i=t,s){if(e===q)return e;let r=void 0!==s?i._$Co?.[s]:i._$Cl;const o=R(e)?void 0:e._$litDirective$;return r?.constructor!==o&&(r?._$AO?.(!1),void 0===o?r=void 0:(r=new o(t),r._$AT(t,i,s)),void 0!==s?(i._$Co??=[])[s]=r:i._$Cl=r),void 0!==r&&(e=Y(t,r._$AS(t,e.values),r,s)),e}class G{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:e},parts:i}=this._$AD,s=(t?.creationScope??O).importNode(e,!0);F.currentNode=s;let r=F.nextNode(),o=0,n=0,a=i[0];for(;void 0!==a;){if(o===a.index){let e;2===a.type?e=new Q(r,r.nextSibling,this,t):1===a.type?e=new a.ctor(r,a.name,a.strings,this,t):6===a.type&&(e=new st(r,this,t)),this._$AV.push(e),a=i[++n]}o!==a?.index&&(r=F.nextNode(),o++)}return F.currentNode=O,s}p(t){let e=0;for(const i of this._$AV)void 0!==i&&(void 0!==i.strings?(i._$AI(t,i,e),e+=i.strings.length-2):i._$AI(t[e])),e++}}class Q{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,e,i,s){this.type=2,this._$AH=V,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=i,this.options=s,this._$Cv=s?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return void 0!==e&&11===t?.nodeType&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=Y(this,t,e),R(t)?t===V||null==t||""===t?(this._$AH!==V&&this._$AR(),this._$AH=V):t!==this._$AH&&t!==q&&this._(t):void 0!==t._$litType$?this.$(t):void 0!==t.nodeType?this.T(t):(t=>H(t)||"function"==typeof t?.[Symbol.iterator])(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==V&&R(this._$AH)?this._$AA.nextSibling.data=t:this.T(O.createTextNode(t)),this._$AH=t}$(t){const{values:e,_$litType$:i}=t,s="number"==typeof i?this._$AC(t):(void 0===i.el&&(i.el=J.createElement(K(i.h,i.h[0]),this.options)),i);if(this._$AH?._$AD===s)this._$AH.p(e);else{const t=new G(s,this),i=t.u(this.options);t.p(e),this.T(i),this._$AH=t}}_$AC(t){let e=W.get(t.strings);return void 0===e&&W.set(t.strings,e=new J(t)),e}k(t){H(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let i,s=0;for(const r of t)s===e.length?e.push(i=new Q(this.O(U()),this.O(U()),this,this.options)):i=e[s],i._$AI(r),s++;s<e.length&&(this._$AR(i&&i._$AB.nextSibling,s),e.length=s)}_$AR(t=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);t!==this._$AB;){const e=w(t).nextSibling;w(t).remove(),t=e}}setConnected(t){void 0===this._$AM&&(this._$Cv=t,this._$AP?.(t))}}class X{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,i,s,r){this.type=1,this._$AH=V,this._$AN=void 0,this.element=t,this.name=e,this._$AM=s,this.options=r,i.length>2||""!==i[0]||""!==i[1]?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=V}_$AI(t,e=this,i,s){const r=this.strings;let o=!1;if(void 0===r)t=Y(this,t,e,0),o=!R(t)||t!==this._$AH&&t!==q,o&&(this._$AH=t);else{const s=t;let n,a;for(t=r[0],n=0;n<r.length-1;n++)a=Y(this,s[i+n],e,n),a===q&&(a=this._$AH[n]),o||=!R(a)||a!==this._$AH[n],a===V?t=V:t!==V&&(t+=(a??"")+r[n+1]),this._$AH[n]=a}o&&!s&&this.j(t)}j(t){t===V?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}}class tt extends X{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===V?void 0:t}}class et extends X{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==V)}}class it extends X{constructor(t,e,i,s,r){super(t,e,i,s,r),this.type=5}_$AI(t,e=this){if((t=Y(this,t,e,0)??V)===q)return;const i=this._$AH,s=t===V&&i!==V||t.capture!==i.capture||t.once!==i.once||t.passive!==i.passive,r=t!==V&&(i===V||s);s&&this.element.removeEventListener(this.name,this,i),r&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}}class st{constructor(t,e,i){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(t){Y(this,t)}}const rt=v.litHtmlPolyfillSupport;rt?.(J,Q),(v.litHtmlVersions??=[]).push("3.3.3");const ot=globalThis;class nt extends m{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=((t,e,i)=>{const s=i?.renderBefore??e;let r=s._$litPart$;if(void 0===r){const t=i?.renderBefore??null;s._$litPart$=r=new Q(e.insertBefore(U(),t),t,void 0,i??{})}return r._$AI(t),r})(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return q}}nt._$litElement$=!0,nt.finalized=!0,ot.litElementHydrateSupport?.({LitElement:nt});const at=ot.litElementPolyfillSupport;at?.({LitElement:nt}),(ot.litElementVersions??=[]).push("4.2.2");const lt={attribute:!0,type:String,converter:x,reflect:!1,hasChanged:b},ct=(t=lt,e,i)=>{const{kind:s,metadata:r}=i;let o=globalThis.litPropertyMetadata.get(r);if(void 0===o&&globalThis.litPropertyMetadata.set(r,o=new Map),"setter"===s&&((t=Object.create(t)).wrapped=!0),o.set(i.name,t),"accessor"===s){const{name:s}=i;return{set(i){const r=e.get.call(this);e.set.call(this,i),this.requestUpdate(s,r,t,!0,i)},init(e){return void 0!==e&&this.C(s,void 0,t,e),e}}}if("setter"===s){const{name:s}=i;return function(i){const r=this[s];e.call(this,i),this.requestUpdate(s,r,t,!0,i)}}throw Error("Unsupported decorator location: "+s)};function ht(t){return(e,i)=>"object"==typeof i?ct(t,e,i):((t,e,i)=>{const s=e.hasOwnProperty(i);return e.constructor.createProperty(i,t),s?Object.getOwnPropertyDescriptor(e,i):void 0})(t,e,i)}const dt={F:"window",B:"floorwindow",T:"door",O:"gate",L:"empty"},pt=["window","floorwindow","door","gate"],ut=["front","back","left","right"],ft={front:"Vorne",back:"Hinten",left:"Links",right:"Rechts"};function gt(t){if(!t)return[];if(Array.isArray(t))return t.map(t=>({...t}));let e="",i=[];if("string"==typeof t)e=t;else{const s=t;e=s.layout??"",i=s.entities??[]}const s=e.toUpperCase().replace(/[^FBTOL]/g,"").split("");let r=0;return s.map(t=>{const e=dt[t]??"empty";if(pt.includes(e)){const t=i[r];return r+=1,{type:e,entity:t}}return{type:e}})}const $t={window:I`<svg viewBox="0 0 24 24" part="picto"><rect x="4" y="4" width="16" height="16" rx="1.5"/><line x1="12" y1="4" x2="12" y2="20"/><line x1="4" y1="12" x2="20" y2="12"/></svg>`,floorwindow:I`<svg viewBox="0 0 24 24" part="picto"><rect x="6" y="2" width="12" height="20" rx="1.5"/><line x1="12" y1="2" x2="12" y2="22"/></svg>`,door:I`<svg viewBox="0 0 24 24" part="picto"><rect x="6" y="3" width="12" height="19" rx="1.5"/><circle cx="14.5" cy="12.5" r="1"/></svg>`,gate:I`<svg viewBox="0 0 24 24" part="picto"><rect x="3" y="5" width="18" height="15" rx="1"/><line x1="3" y1="9.5" x2="21" y2="9.5"/><line x1="3" y1="13" x2="21" y2="13"/><line x1="3" y1="16.5" x2="21" y2="16.5"/></svg>`,empty:V};let _t=class extends nt{setConfig(t){if(!t)throw new Error("Ungueltige Konfiguration");const e=Number(t.floors);if(!Number.isInteger(e)||e<1)throw new Error('rolladen-card: "floors" muss eine ganze Zahl >= 1 sein');this._config={...t,floors:e}}getCardSize(){return(this._config?.floors??3)+1}shouldUpdate(t){return t.has("_config")||t.has("hass")}_position(t){if(!t.entity||!this.hass)return null;const e=this.hass.states[t.entity];if(!e)return null;const i=e.attributes?.current_position;let s;s="number"==typeof i?i:"open"===e.state?100:"closed"===e.state?0:50;return(t.invert_position??this._config?.invert_position??!1)&&(s=100-s),Math.max(0,Math.min(100,s))}_call(t,e){e&&this.hass&&this.hass.callService("cover",t,{entity_id:e})}_renderElement(t){if("empty"===t.type)return I`<div class="cell empty"></div>`;const e=!!t.entity,i=e&&!!this.hass&&!this.hass.states[t.entity],s=this._position(t),r=null===s?100:100-s,o=e&&!i,n=e&&this.hass?this.hass.states[t.entity]:void 0,a=t.name??n?.attributes?.friendly_name??t.entity??"",l=i?"missing":e?"":"static";return I`
      <div class="cell type-${t.type} ${l}" title=${a}>
        <div class="frame">
          ${$t[t.type]}
          ${o?I`<div class="shutter" style="height:${r}%"></div>`:V}
          ${i?I`<div class="warn">?</div>`:V}
          ${o?I`<div class="btns">
                <button class="btn" title="Hoch" @click=${()=>this._call("open_cover",t.entity)}>▲</button>
                <button class="btn" title="Stop" @click=${()=>this._call("stop_cover",t.entity)}>■</button>
                <button class="btn" title="Runter" @click=${()=>this._call("close_cover",t.entity)}>▼</button>
              </div>`:V}
        </div>
      </div>
    `}_renderSide(t,e){const i=this._config.floors,s=[];for(let t=0;t<i;t++){const i=gt(e.floors?.[t]);s.push(I`
        <div class="floor">
          ${i.length?i.map(t=>this._renderElement(t)):I`<div class="cell empty"></div>`}
        </div>
      `)}return I`
      <div class="side">
        <div class="side-label">${e.label??ft[t]}</div>
        <div class="building">
          <div class="roof"></div>
          <div class="chimney"></div>
          <div class="gutter"></div>
          <div class="downpipe left"></div>
          <div class="downpipe right"></div>
          <div class="wall">${s}</div>
        </div>
      </div>
    `}render(){if(!this._config)return V;const t=this._config.sides??{},e=ut.filter(e=>(t[e]?.enabled??!0)&&t[e]);return I`
      <ha-card>
        ${this._config.title?I`<div class="card-title">${this._config.title}</div>`:V}
        <div class="house">
          ${e.length?e.map(e=>this._renderSide(e,t[e])):I`<div class="hint">Keine aktiven Seiten konfiguriert.</div>`}
        </div>
      </ha-card>
    `}};_t.styles=((t,...e)=>{const i=1===t.length?t[0]:e.reduce((e,i,s)=>e+(t=>{if(!0===t._$cssResult$)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+t[s+1],t[0]);return new o(i,t,s)})`
    :host {
      --rc-bg: #f6f7fb;
      --rc-wall: #eae7f1;
      --rc-wall-edge: #d6d3e4;
      --rc-ground: #bfc2d1;
      --rc-roof: #cf9f89;
      --rc-roof-edge: #b9866f;
      --rc-frame: #ffffff;
      --rc-shutter-a: #c4c8d6;
      --rc-shutter-b: #d9dce6;
      --rc-accent: #a5b4fc;
      --rc-window: #dbeafe;
      --rc-floorwindow: #d6f3e0;
      --rc-door: #fde8d7;
      --rc-gate: #e7e2fb;
      --rc-line: #7c88a3;
      --rc-metal-a: #9ea5b4;
      --rc-metal-b: #cdd2dc;
    }
    ha-card { padding: 16px; background: var(--rc-bg); }
    .card-title {
      font-size: 1.05rem; font-weight: 600; color: #475569; margin: 0 0 14px 2px;
    }
    .house {
      display: flex; flex-wrap: wrap; gap: 24px 34px;
      justify-content: center; align-items: flex-start;
    }
    .side { flex: 0 0 auto; display: flex; flex-direction: column; align-items: center; }
    .side-label {
      font-size: 0.82rem; font-weight: 600; color: #64748b;
      letter-spacing: 0.04em; margin-bottom: 8px;
    }
    .building { position: relative; display: inline-block; padding-top: 58px; }
    .roof {
      position: absolute; top: 0; left: -24px; right: -24px; height: 66px;
      background-color: #c06a4a;
      background-image:
        repeating-linear-gradient(0deg, rgba(75,22,8,0.20) 0 1px, transparent 1px 7px),
        repeating-linear-gradient(90deg, rgba(75,22,8,0.12) 0 1px, transparent 1px 14px),
        linear-gradient(180deg, rgba(255,255,255,0.22) 0%, rgba(0,0,0,0.18) 100%);
      clip-path: polygon(50% 0, 100% 100%, 0 100%);
      filter: drop-shadow(0 3px 3px rgba(30,41,59,0.28)); z-index: 3;
    }
    .chimney {
      position: absolute; top: 6px; left: 64%; width: 12px; height: 30px;
      background: linear-gradient(90deg, #9c5540 0%, #834632 100%);
      border-radius: 1px 1px 0 0; z-index: 2;
    }
    .chimney::before {
      content: ''; position: absolute; top: -4px; left: -3px; right: -3px; height: 5px;
      background: #6f3a2a; border-radius: 2px;
    }
    .gutter {
      position: absolute; top: 56px; left: -6px; right: -6px; height: 6px;
      background: linear-gradient(180deg, var(--rc-metal-b) 0%, var(--rc-metal-a) 100%);
      border-radius: 1px 1px 4px 4px;
      box-shadow: inset 0 1px 0 rgba(255,255,255,0.6), 0 1px 2px rgba(30,41,59,0.25);
      z-index: 2;
    }
    .downpipe {
      position: absolute; top: 60px; bottom: 3px; width: 5px;
      background: linear-gradient(90deg, var(--rc-metal-a) 0%, var(--rc-metal-b) 45%, var(--rc-metal-a) 100%);
      border-radius: 2px;
      box-shadow: 0 1px 2px rgba(30,41,59,0.25);
      z-index: 2;
    }
    .downpipe.left { left: -3px; }
    .downpipe.right { right: -3px; }
    .wall {
      display: flex; flex-direction: column;
      background: var(--rc-wall);
      border: 1px solid var(--rc-wall-edge);
      border-bottom: 4px solid var(--rc-ground);
      border-radius: 4px;
      padding: 8px 14px;
      box-shadow: 0 1px 3px rgba(30,41,59,0.09);
    }
    .floor {
      display: flex; justify-content: center; align-items: flex-end;
      gap: 12px; padding: 10px 0;
    }
    .floor + .floor { border-top: 1px dashed rgba(124,136,163,0.30); }
    .cell {
      flex: 0 0 auto; width: 58px; display: flex; align-items: flex-end; justify-content: center;
    }
    .cell.empty { width: 58px; height: 1px; }
    .frame {
      position: relative; width: 48px; height: 62px; border-radius: 3px;
      background: var(--rc-frame);
      border: 3px solid #ffffff;
      box-shadow: 0 0 0 1.5px #b7c1d4, 0 4px 0 -1px #d3c7b7, 0 7px 6px rgba(30,41,59,0.16);
      overflow: hidden;
    }
    .type-window .frame { background: var(--rc-window); }
    .type-floorwindow .frame { background: var(--rc-floorwindow); height: 80px; }
    .type-door .frame { background: var(--rc-door); height: 82px; }
    .type-gate .frame { background: var(--rc-gate); height: 50px; }
    svg[part='picto'] {
      position: absolute; inset: 0; margin: auto; width: 72%; height: 72%;
      fill: none; stroke: var(--rc-line); stroke-width: 1.5; stroke-linecap: round;
      opacity: 0.72; z-index: 1;
    }
    .shutter {
      position: absolute; top: 3px; left: 3px; right: 3px;
      border-radius: 4px 4px 2px 2px;
      background: repeating-linear-gradient(180deg, #c7cbd8 0 3px, #d8dbe5 3px 4.5px);
      box-shadow: inset 0 1px 0 rgba(255,255,255,0.65), inset 0 -1px 2px rgba(30,41,59,0.12), 0 1px 2px rgba(30,41,59,0.16);
      border-bottom: 1px solid rgba(90,98,120,0.38);
      transition: height 0.45s ease; z-index: 2;
    }
    .btns {
      position: absolute; inset: 0; z-index: 3;
      display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 3px;
      opacity: 0.55; transition: opacity 0.15s ease;
    }
    .btn {
      width: 16px; height: 16px; padding: 0; border: none; border-radius: 50%;
      display: flex; align-items: center; justify-content: center;
      font-size: 0.62rem; line-height: 1; cursor: pointer;
      color: #4b5563; background: rgba(255,255,255,0.95);
      box-shadow: 0 1px 2px rgba(30,41,59,0.28); transition: background 0.15s, transform 0.05s;
    }
    .btn:hover { background: var(--rc-accent); color: #fff; }
    .btn:active { transform: translateY(1px); }
    .cell:hover .btns { opacity: 1; }
    .warn {
      position: absolute; inset: 0; margin: auto; width: 1em; height: 1.2em;
      z-index: 3; font-weight: 700; color: #dc2626; text-align: center;
    }
    .missing .frame { outline: 2px dashed #f87171; outline-offset: -2px; }
    .hint { color: #94a3b8; font-size: 0.85rem; padding: 8px; }
  `,t([ht({attribute:!1})],_t.prototype,"hass",void 0),t([function(t){return ht({...t,state:!0,attribute:!1})}()],_t.prototype,"_config",void 0),_t=t([(t=>(e,i)=>{void 0!==i?i.addInitializer(()=>{customElements.define(t,e)}):customElements.define(t,e)})("rolladen-card")],_t),window.customCards=window.customCards||[],window.customCards.push({type:"rolladen-card",name:"Rolladen Card",description:"Haus-Fassaden mit Live-Rolladensteuerung (F/B/T/O/L, Pastell)",preview:!1}),console.info("%c ROLLADEN-CARD %c v0.1.1 ","background:#a5b4fc;color:#fff;border-radius:3px 0 0 3px;padding:2px 4px","background:#eef1f8;color:#475569;border-radius:0 3px 3px 0;padding:2px 4px");export{_t as RolladenCard};
