import { LitElement, html, css, TemplateResult, nothing, PropertyValues } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { HomeAssistant } from './ha-types';
import {
  RolladenCardConfig,
  SideConfig,
  SideKey,
  ElementConfig,
  ElementType,
  SIDE_ORDER,
  SIDE_DEFAULT_LABEL,
} from './types';
import { normalizeFloor } from './parse';

const PICTO: Record<ElementType, TemplateResult | typeof nothing> = {
  // Fenster: Rahmen mit Sprossenkreuz
  window: html`<svg viewBox="0 0 24 24" part="picto"><rect x="4" y="4" width="16" height="16" rx="1.5"/><line x1="12" y1="4" x2="12" y2="20"/><line x1="4" y1="12" x2="20" y2="12"/></svg>`,
  // Bodenhohes Fenster: hoher Rahmen, senkrechte Sprosse
  floorwindow: html`<svg viewBox="0 0 24 24" part="picto"><rect x="6" y="2" width="12" height="20" rx="1.5"/><line x1="12" y1="2" x2="12" y2="22"/></svg>`,
  // Tuer: Rahmen mit Knauf
  door: html`<svg viewBox="0 0 24 24" part="picto"><rect x="6" y="3" width="12" height="19" rx="1.5"/><circle cx="14.5" cy="12.5" r="1"/></svg>`,
  // Tor: breiter Rahmen mit Lamellen
  gate: html`<svg viewBox="0 0 24 24" part="picto"><rect x="3" y="5" width="18" height="15" rx="1"/><line x1="3" y1="9.5" x2="21" y2="9.5"/><line x1="3" y1="13" x2="21" y2="13"/><line x1="3" y1="16.5" x2="21" y2="16.5"/></svg>`,
  empty: nothing,
};

@customElement('rolladen-card')
export class RolladenCard extends LitElement {
  @property({ attribute: false }) public hass?: HomeAssistant;
  @state() private _config?: RolladenCardConfig;

  public setConfig(config: RolladenCardConfig): void {
    if (!config) throw new Error('Ungueltige Konfiguration');
    const floors = Number(config.floors);
    if (!Number.isInteger(floors) || floors < 1) {
      throw new Error('rolladen-card: "floors" muss eine ganze Zahl >= 1 sein');
    }
    this._config = { ...config, floors };
  }

  public getCardSize(): number {
    return (this._config?.floors ?? 3) + 1;
  }

  protected shouldUpdate(changed: PropertyValues): boolean {
    return changed.has('_config') || changed.has('hass');
  }

  private _position(el: ElementConfig): number | null {
    if (!el.entity || !this.hass) return null;
    const st = this.hass.states[el.entity];
    if (!st) return null;
    const raw = st.attributes?.current_position;
    let pos: number;
    if (typeof raw === 'number') pos = raw;
    else if (st.state === 'open') pos = 100;
    else if (st.state === 'closed') pos = 0;
    else pos = 50;
    const invert = el.invert_position ?? this._config?.invert_position ?? false;
    if (invert) pos = 100 - pos;
    return Math.max(0, Math.min(100, pos));
  }

  private _call(service: string, entity?: string): void {
    if (!entity || !this.hass) return;
    this.hass.callService('cover', service, { entity_id: entity });
  }

  private _renderElement(el: ElementConfig): TemplateResult {
    if (el.type === 'empty') {
      return html`<div class="cell empty"></div>`;
    }
    const hasEntity = !!el.entity;
    const missing = hasEntity && !!this.hass && !this.hass.states[el.entity as string];
    const pos = this._position(el);
    const coverPct = pos === null ? 100 : 100 - pos; // Rolladen fuellt von oben
    const showControls = hasEntity && !missing; // statische Elemente (kein entity) = nur Piktogramm
    const st = hasEntity && this.hass ? this.hass.states[el.entity as string] : undefined;
    const title = el.name ?? st?.attributes?.friendly_name ?? el.entity ?? '';
    const cls = missing ? 'missing' : (!hasEntity ? 'static' : '');
    return html`
      <div class="cell type-${el.type} ${cls}" title=${title}>
        <div class="frame">
          ${PICTO[el.type]}
          ${showControls ? html`<div class="shutter" style="height:${coverPct}%"></div>` : nothing}
          ${missing ? html`<div class="warn">?</div>` : nothing}
          ${showControls
            ? html`<div class="btns">
                <button class="btn" title="Hoch" @click=${() => this._call('open_cover', el.entity)}>▲</button>
                <button class="btn" title="Stop" @click=${() => this._call('stop_cover', el.entity)}>■</button>
                <button class="btn" title="Runter" @click=${() => this._call('close_cover', el.entity)}>▼</button>
              </div>`
            : nothing}
        </div>
      </div>
    `;
  }

  private _renderSide(key: SideKey, side: SideConfig): TemplateResult {
    const floors = this._config!.floors;
    const rows: TemplateResult[] = [];
    for (let i = 0; i < floors; i++) {
      const els = normalizeFloor(side.floors?.[i]);
      rows.push(html`
        <div class="floor">
          ${els.length
            ? els.map((el) => this._renderElement(el))
            : html`<div class="cell empty"></div>`}
        </div>
      `);
    }
    return html`
      <div class="side">
        <div class="side-label">${side.label ?? SIDE_DEFAULT_LABEL[key]}</div>
        <div class="building ${key}">
          <div class="roof"></div>
          <div class="chimney"></div>
          <div class="gutter"></div>
          <div class="downpipe left"></div>
          <div class="downpipe right"></div>
          <div class="wall">${rows}</div>
        </div>
      </div>
    `;
  }

  protected render(): TemplateResult | typeof nothing {
    if (!this._config) return nothing;
    const sides = this._config.sides ?? {};
    const active = SIDE_ORDER.filter((k) => (sides[k]?.enabled ?? true) && sides[k]);
    return html`
      <ha-card>
        ${this._config.title ? html`<div class="card-title">${this._config.title}</div>` : nothing}
        <div class="house">
          ${active.length
            ? active.map((k) => this._renderSide(k, sides[k]!))
            : html`<div class="hint">Keine aktiven Seiten konfiguriert.</div>`}
        </div>
      </ha-card>
    `;
  }

  static styles = css`
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
    .building.left .roof,
    .building.right .roof {
      clip-path: polygon(23% 0, 77% 0, 100% 100%, 0 100%);
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
    .building.front .chimney,
    .building.right .chimney { left: 68%; }
    .building.back .chimney,
    .building.left .chimney { left: 32%; }
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
  `;
}

/* Karte im Lovelace-Karten-Picker registrieren */
(window as unknown as { customCards?: unknown[] }).customCards =
  (window as unknown as { customCards?: unknown[] }).customCards || [];
((window as unknown as { customCards: unknown[] }).customCards).push({
  type: 'rolladen-card',
  name: 'Rolladen Card',
  description: 'Haus-Fassaden mit Live-Rolladensteuerung (F/B/T/O/L, Pastell)',
  preview: false,
});

/* eslint-disable no-console */
console.info(
  '%c ROLLADEN-CARD %c v0.1.1 ',
  'background:#a5b4fc;color:#fff;border-radius:3px 0 0 3px;padding:2px 4px',
  'background:#eef1f8;color:#475569;border-radius:0 3px 3px 0;padding:2px 4px'
);

declare global {
  interface HTMLElementTagNameMap {
    'rolladen-card': RolladenCard;
  }
}
