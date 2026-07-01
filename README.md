# ha-rolladen-card

Home Assistant **Lovelace Custom Card** zur Darstellung von Haus-Fassaden mit
Rolladensteuerung. Vier Hausseiten nebeneinander (Vorne · Hinten · Links ·
Rechts), globale Etagenzahl, pro Seite/Etage frei konfigurierbares Element-Layout,
Live-Rolladenstand und hoch/stop/runter-Buttons. Clean, pastellfarben, responsive.

> Stufe 1. Positions-Slider, GUI-Editor und weitere Gerätetypen folgen in
> späteren Ausbaustufen.

## Elemente

| Kürzel | Typ | Steuerbar | Beschreibung |
|--------|-----|-----------|--------------|
| `F` | `window` | ja | Fenster |
| `B` | `floorwindow` | ja | Bodenhohes Fenster |
| `T` | `door` | ja | Tür |
| `O` | `gate` | ja | Tor |
| `L` | `empty` | nein | Leerraum (keine Entität, keine Buttons) |


Steuerbare Elemente (`F/B/T/O`) **ohne** `entity` werden als **statisches Piktogramm** gezeichnet (kein Rolladen-Overlay, keine Buttons) – für Fenster/Türen ohne Rolladen. Ein `?`-Hinweis erscheint nur, wenn eine `entity` konfiguriert ist, in HA aber nicht existiert.

Steuerbare Elemente nutzen die HA-Standard-Services `cover.open_cover`,
`cover.stop_cover`, `cover.close_cover`. Der Rolladenstand wird live aus dem
Attribut `current_position` gelesen (HA-Konvention: `0` = zu, `100` = offen).
Der Rolladen füllt das Element visuell von oben um `100 − position` %.

## Installation

1. `dist/rolladen-card.js` nach `config/www/` kopieren (oder via HACS als
   Custom Repository einbinden).
2. Als Lovelace-Ressource registrieren:
   ```yaml
   url: /local/rolladen-card.js
   type: module
   ```
3. Karte hinzufügen (`type: custom:rolladen-card`).

## Konfiguration

### Karten-Optionen

| Option | Typ | Default | Beschreibung |
|--------|-----|---------|--------------|
| `type` | string | — | `custom:rolladen-card` |
| `title` | string | — | Optionaler Titel über der Karte |
| `floors` | number | — | **Pflicht.** Globale Etagenzahl (gilt für alle Seiten) |
| `invert_position` | bool | `false` | Globaler Default für invertierte Positionsmeldung |
| `sides` | map | — | Seiten `front` / `back` / `left` / `right` |

### Seiten-Optionen (`sides.<front|back|left|right>`)

| Option | Typ | Default | Beschreibung |
|--------|-----|---------|--------------|
| `enabled` | bool | `true` | Seite ein-/ausblenden (z. B. Reihenhaus) |
| `label` | string | Vorne/Hinten/Links/Rechts | Anzeigename |
| `floors` | list | — | Etagen von **oben nach unten**, Länge = globale `floors` |

Elemente einer Etage werden **gleichverteilt** über die volle Seitenbreite gelegt.

### Etagen-Layout — empfohlene Variante (strukturiert)

Typ und Entität gehören zusammen → robust, keine Verschiebungsfehler:

```yaml
type: custom:rolladen-card
title: Mein Haus
floors: 2
invert_position: false
sides:
  front:
    label: Vorne
    floors:
      # Etage oben (OG): Fenster – Tür – Fenster
      - - { type: window, entity: cover.og_bad }
        - { type: door,   entity: cover.og_balkon }
        - { type: window, entity: cover.og_kind }
      # Etage unten (EG): bodenhohes Fenster – Leer – Tor
      - - { type: floorwindow, entity: cover.eg_wohnen }
        - { type: empty }
        - { type: gate, entity: cover.eg_garage, invert_position: true }
  back:
    enabled: false   # bei Reihenhaus abgeschaltet
  left:
    floors:
      - [ { type: window, entity: cover.links_og } ]
      - [ { type: window, entity: cover.links_eg } ]
  right:
    enabled: false
```

Elementfelder: `type` (`window|floorwindow|door|gate|empty`), `entity`
(HA `cover.*`), optional `invert_position` (überschreibt den Karten-Default je
Element), optional `name` (Tooltip).

### Etagen-Layout — Schnell-Option (String)

Kurzform je Etage: Layout-String plus parallele `entities`-Liste. Die Entities
werden den **steuerbaren** Positionen (nicht `L`) von links nach rechts zugeordnet:

```yaml
sides:
  front:
    floors:
      - { layout: "FTF", entities: [cover.og_bad, cover.og_balkon, cover.og_kind] }
      - { layout: "BLO", entities: [cover.eg_wohnen, cover.eg_garage] }  # L verbraucht keine entity
```

Ein reiner String (`- "FTF"`) ist ebenfalls erlaubt, dann ohne Entitäten
(Darstellung ohne Steuerung).

## Entwicklung

```bash
npm install
npm run lint    # tsc --noEmit
npm run build   # -> dist/rolladen-card.js (Rollup, minifiziert)
npm run watch   # Auto-Rebuild
```

## Lizenz

MIT
