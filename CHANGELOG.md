# Changelog

Alle nennenswerten Änderungen an diesem Projekt werden hier festgehalten.  
Format: [Keep a Changelog](https://keepachangelog.com/de/1.1.0/), Versionierung: [Semantic Versioning](https://semver.org/lang/de/).

## [Unreleased]

### Added
- View Panel-Modus: Card rendert direkt als Panel-Seite (ohne Card-Container)
- CI-Gate: Naming-Guard / Secrets-Leak-Scan (`scripts/naming-guard.sh`)
- `.gitignore`-Erweiterung: `.env`-Muster als Vorsorge ausgeschlossen

### Changed
- Dachform seitenabhängig: Dreieck (Giebel) vorne/hinten, Trapez (First) links/rechts
- Steiles Giebeldach mit Überstand, Dachziegel-Textur und Schattierung
- Regenrinne an der Traufe + Fallrohre an beiden Seiten (metallischer Look)
- Schornstein positionsgerecht gespiegelt je Seite (vorne rechts / hinten links / …)
- Gleiche Wandhöhe auf allen Seiten (feste Etagenhöhe, leere Etagen klappen nicht mehr zusammen)
- Traufseiten-Dach als flaches Band (Trapez)
- Einheitliche Element-Breite (gleicher Slot-Raster, Spalten-Ausrichtung über Etagen)
- Rollo deckend und eingerückt (Pastell-Rahmen sichtbar, keine Sprossen-Durchscheinen)
- Realistischeres Ziegeldach (steiler, Textur, Schattierung)
- Fenster-Look: klarer Rahmen + Fensterbank, halbtransparenter Rollo, dezente Hover-Buttons
- Tore breit + groß (Garagentor-Optik), bodenhohe Fenster schmal + hoch — klar unterscheidbar
- Element-Größen fein justiert (Fenster / Tür / Tor / bodenhohes Fenster klar unterscheidbar)
- CSS-Farbtippfehler behoben

## [0.1.1] — 2026-07-01

### Added
- Steuerbare Elemente (`F/B/T/O`) **ohne** `entity` werden als statisches Piktogramm
  dargestellt (kein Rolladen-Overlay, keine Buttons, kein `?`-Hinweis)
- Smoke-Tests für statische Elemente erweitert

### Fixed
- Konsolen-Versionsstring auf `v0.1.1` korrigiert

## [0.1.0] — 2026-07-01

Erste stabile Veröffentlichung (Stufe 1).

### Added
- Fassaden-Darstellung mit 4 Hausseiten (Vorne / Hinten / Links / Rechts)
- Konfigurierbare globale Etagenzahl; pro Seite/Etage frei belegbares Element-Layout
- Elemente: `F` (Fenster), `B` (bodenhohes Fenster), `T` (Tür), `O` (Tor), `L` (Leerraum)
- Live-Rolladenstand aus HA-Attribut `current_position` (0 = zu, 100 = offen)
- Steuerbuttons: hoch / stop / runter (`cover.open_cover / stop_cover / close_cover`)
- Zwei Konfigurations-Varianten: strukturiert (`{type, entity}`) und Kurzform (`layout`-String + `entities`-Liste)
- `invert_position`-Option (global + je Element) für invertierte Positionsmeldung
- Seiten ein-/ausblenden (`enabled: false`, z. B. Reihenhaus)
- Pastellfarben-Design, responsiv (CSS Grid)
- jsdom-Smoke-Tests: Rendering, Parser, Live-Position, invert, Button → Service-Wiring
- HACS-kompatibel (`hacs.json`, `filename: rolladen-card.js`)

---

> **Hinweis zu `.env`-Dateien:** Dieses Projekt verwendet keine Umgebungsvariablen.  
> Die Card ist ein rein clientseitiges Lovelace-Modul (Lit + TypeScript → gebündeltes JS).  
> Eine `.env.example` wäre hier irreführend und wird daher bewusst nicht mitgeliefert.

[Unreleased]: https://github.com/XtraLarge/ha-rolladen-card/compare/v0.1.1...HEAD
[0.1.1]: https://github.com/XtraLarge/ha-rolladen-card/compare/v0.1.0...v0.1.1
[0.1.0]: https://github.com/XtraLarge/ha-rolladen-card/releases/tag/v0.1.0
