import { JSDOM } from 'jsdom';

const dom = new JSDOM('<!DOCTYPE html><html><body></body></html>', { pretendToBeVisual: true });
const { window } = dom;
// Globals fuer LitElement / Custom Elements
for (const k of ['window','document','HTMLElement','customElements','CustomEvent','Event','Node','Element','DocumentFragment','Document','ShadowRoot','NodeFilter','navigator','getComputedStyle','MutationObserver','requestAnimationFrame','cancelAnimationFrame','CSSStyleSheet']) {
  if (window[k] !== undefined) globalThis[k] = window[k];
}
if (typeof globalThis.CSSStyleSheet === 'undefined') { globalThis.CSSStyleSheet = class CSSStyleSheet { replaceSync(){} }; }
globalThis.requestAnimationFrame = (cb) => window.setTimeout(() => cb(Date.now?.() ?? 0), 0);
globalThis.cancelAnimationFrame = (id) => window.clearTimeout(id);

await import('../dist/rolladen-card.js');

const calls = [];
const hass = {
  states: {
    'cover.a': { entity_id:'cover.a', state:'open',   attributes:{ current_position:100, friendly_name:'Bad' } },
    'cover.b': { entity_id:'cover.b', state:'closed', attributes:{ current_position:0 } },
    'cover.c': { entity_id:'cover.c', state:'open',   attributes:{ current_position:30 } },
    'cover.inv': { entity_id:'cover.inv', state:'open', attributes:{ current_position:0 } }, // invertiert
    // cover.missing existiert absichtlich NICHT
  },
  callService: (d,s,data) => { calls.push([d,s,data.entity_id]); return Promise.resolve(); },
};

const card = window.document.createElement('rolladen-card');
card.setConfig({
  type:'custom:rolladen-card',
  title:'Testhaus',
  floors:2,
  sides:{
    front:{ label:'Vorne', floors:[
      [ {type:'window',entity:'cover.a'}, {type:'empty'}, {type:'door',entity:'cover.missing'} ],
      { layout:'BLO', entities:['cover.b','cover.inv'] },
    ]},
    back:{ enabled:false, floors:[ [{type:'window',entity:'cover.x'}] ] },
    left:{ floors:[ [{type:'window',entity:'cover.c',invert_position:false}], [{type:'gate',entity:'cover.inv',invert_position:true}] ] },
    // right nicht konfiguriert -> nicht gerendert
  },
});
card.hass = hass;
window.document.body.appendChild(card);
await card.updateComplete;

const sr = card.shadowRoot;
let fail = 0;
const chk = (label, cond) => { console.log((cond?'PASS':'FAIL')+' '+label); if(!cond) fail++; };

const sides = sr.querySelectorAll('.side');
chk('nur 2 aktive Seiten (front+left; back disabled, right fehlt)', sides.length===2);
chk('Titel gerendert', sr.querySelector('.card-title')?.textContent==='Testhaus');
chk('front Label = Vorne', sr.querySelector('.side .side-label')?.textContent==='Vorne');

// front, floor0: window(a,pos100)->shutter 0%, empty, door(missing)->missing markiert
const frontFloors = sides[0].querySelectorAll('.floor');
chk('front hat 2 Etagen', frontFloors.length===2);
const f0cells = frontFloors[0].querySelectorAll('.cell');
chk('front floor0 hat 3 Zellen', f0cells.length===3);
chk('mitte = Leerraum', f0cells[1].classList.contains('empty'));
chk('rechts (cover.missing) als missing markiert', f0cells[2].classList.contains('missing'));
const shutterA = f0cells[0].querySelector('.shutter');
chk('cover.a pos=100 -> shutter height 0%', shutterA.style.height==='0%');

// front floor1 aus String "BLO" + entities [b,inv]: floorwindow(b pos0->100%), empty, gate(inv pos0)
const f1cells = frontFloors[1].querySelectorAll('.cell');
chk('front floor1 String BLO -> 3 Zellen', f1cells.length===3);
chk('B->floorwindow typ', f1cells[0].classList.contains('type-floorwindow'));
chk('L in Mitte leer', f1cells[1].classList.contains('empty'));
chk('O->gate typ', f1cells[2].classList.contains('type-gate'));
chk('cover.b pos=0 -> shutter 100%', f1cells[0].querySelector('.shutter').style.height==='100%');

// left floor1: gate cover.inv invert_position:true, state pos=0 -> invert -> 100 -> shutter 0%
const leftFloors = sides[1].querySelectorAll('.floor');
const gInv = leftFloors[1].querySelector('.cell .shutter');
chk('invert_position: cover.inv pos0 invertiert -> shutter 0%', gInv.style.height==='0%');
// left floor0: cover.c pos=30 -> shutter 70%
chk('cover.c pos=30 -> shutter 70%', leftFloors[0].querySelector('.shutter').style.height==='70%');

// Buttons: 3 pro steuerbarem Element; Leerraum/missing-Buttons?
const aBtns = f0cells[0].querySelectorAll('.btn');
chk('steuerbares Element hat 3 Buttons', aBtns.length===3);
chk('Leerraum hat KEINE Buttons', f0cells[1].querySelectorAll('.btn').length===0);

// Klick-Verdrahtung gegen Mock (keine echte HA!)
aBtns[0].click(); aBtns[1].click(); aBtns[2].click();
chk('hoch -> open_cover cover.a', JSON.stringify(calls[0])===JSON.stringify(['cover','open_cover','cover.a']));
chk('stop -> stop_cover cover.a', JSON.stringify(calls[1])===JSON.stringify(['cover','stop_cover','cover.a']));
chk('runter -> close_cover cover.a', JSON.stringify(calls[2])===JSON.stringify(['cover','close_cover','cover.a']));

console.log(fail===0 ? '\nALLE SMOKE-TESTS BESTANDEN' : `\n${fail} FEHLER`);
process.exit(fail===0?0:1);
