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
        </div>
        ${showControls
          ? html`<div class="btns">
              <button class="btn up" title="Hoch" @click=${() => this._call('open_cover', el.entity)}>▲</button>
              <button class="btn stop" title="Stop" @click=${() => this._call('stop_cover', el.entity)}>■</button>
              <button class="btn down" title="Runter" @click=${() => this._call('close_cover', el.entity)}>▼</button>
            </div>`
          : nothing}
      </div>
    `;
  }

  private _renderSide(key: SideKey, side: SideConfig): TemplateResult {
    const floors = this._config!.floors;
    const rows: TemplateResult[] = [];
    for (let i = 0; i < floors; i++) {
      const els = normalizeFloor(side.floors?.[i]);
      rows.push(html`
        <div class="floor" style="grid-template-columns:repeat(${Math.max(els.length, 1)},1fr)">
          ${els.length
            ? els.map((el) => this._renderElement(el))
            : html`<div class="cell empty"></div>`}
        </div>
      `);
    }
    return html`
      <div class="side">
        <div class="side-label">${side.label ?? SIDE_DEFAULT_LABEL[key]}</div>
        <div class="facade">${rows}</div>
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
      --rc-facade: #eceef6;
      --rc-frame: #ffffff;
      --rc-shutter-a: #ccd0dc;
      --rc-shutter-b: #dee1ea;
      --rc-accent: #a5b4fc;
      --rc-window: #dbeafe;
      --rc-floorwindow: #d6f3e0;
      --rc-door: #fde8d7;
      --rc-gate: #e7e2fb;
      --rc-line: #8b93a7;
    }
    ha-card { padding: 14px; background: var(--rc-bg); }
    .card-title {
      font-size: 1.05rem; font-weight: 600; color: #475569; margin: 0 0 12px 2px;
    }
    .house {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
      gap: 14px;
      align-items: start;
    }
    .side { min-width: 0; }
    .side-label {
      text-align: center; font-size: 0.82rem; font-weight: 600; color: #64748b;
      letter-spacing: 0.04em; margin-bottom: 6px;
    }
    .facade {
      display: flex; flex-direction: column; gap: 8px;
      background: var(--rc-facade); border-radius: 14px; padding: 10px;
    }
    .floor { display: grid; gap: 8px; justify-items: center; align-items: start; }
    .cell {
      display: flex; flex-direction: column; align-items: stretch; gap: 5px;
      width: 100%; max-width: 82px; min-width: 0;
    }
    .cell.empty { min-height: 8px; }
    .frame {
      position: relative; aspect-ratio: 1 / 1.15; border-radius: 10px;
      background: var(--rc-frame); overflow: hidden;
      box-shadow: inset 0 0 0 1.5px rgba(148,163,184,0.28), 0 1px 2px rgba(30,41,59,0.06);
      display: flex; align-items: center; justify-content: center;
    }
    .type-window .frame { background: var(--rc-window); }
    .type-floorwindow .frame { background: var(--rc-floorwindow); }
    .type-door .frame { background: var(--rc-door); }
    .type-gate .frame { background: var(--rc-gate); }
    svg[part='picto'] {
      width: 56%; height: 56%; fill: none; stroke: var(--rc-line);
      stroke-width: 1.4; stroke-linecap: round; opacity: 0.7; z-index: 1;
    }
    .shutter {
      position: absolute; top: 3px; left: 3px; right: 3px;
      border-radius: 7px 7px 4px 4px;
      background: repeating-linear-gradient(180deg,
        var(--rc-shutter-a) 0 3px, var(--rc-shutter-b) 3px 5px);
      box-shadow: inset 0 1px 0 rgba(255,255,255,0.5), 0 2px 3px rgba(30,41,59,0.15);
      transition: height 0.45s ease; z-index: 2;
    }
    .warn {
      position: absolute; z-index: 3; font-weight: 700; color: #dc2626; font-size: 1.1rem;
    }
    .missing .frame { outline: 2px dashed #f87171; outline-offset: -2px; }
    .btns {
      display: grid; grid-template-columns: repeat(3, 1fr); gap: 3px; width: 100%;
    }
    .btn {
      border: none; border-radius: 7px; padding: 4px 0; font-size: 0.66rem; line-height: 1;
      cursor: pointer; color: #4b5563; background: #ffffff;
      box-shadow: 0 1px 2px rgba(30,41,59,0.08); transition: background 0.15s, transform 0.05s;
    }
    .btn:hover { background: var(--rc-accent); color: #fff; }
    .btn:active { transform: translateY(1px); }
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
