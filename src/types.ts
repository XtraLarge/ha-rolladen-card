import { LovelaceCardConfig } from './ha-types';

export type ElementType = 'window' | 'floorwindow' | 'door' | 'gate' | 'empty';

/** Ein einzelnes Fassaden-Element (strukturierte Variante). */
export interface ElementConfig {
  type: ElementType;
  entity?: string;
  invert_position?: boolean;
  name?: string;
}

/** String-Kurzform je Etage: layout "FTF" + parallele entities-Liste. */
export interface StringFloorConfig {
  layout: string;
  entities?: string[];
}

/** Eine Etage ist entweder eine strukturierte Element-Liste, eine String-Kurzform
 *  ({layout,entities}) oder ein reiner Layout-String. */
export type FloorConfig = ElementConfig[] | StringFloorConfig | string;

export type SideKey = 'front' | 'back' | 'left' | 'right';

export interface SideConfig {
  enabled?: boolean;
  label?: string;
  /** Etagen von OBEN nach UNTEN; Laenge sollte der globalen floors-Zahl entsprechen. */
  floors?: FloorConfig[];
}

export interface RolladenCardConfig extends LovelaceCardConfig {
  type: string;
  title?: string;
  /** Globale Etagenzahl (gilt fuer alle Seiten). */
  floors: number;
  /** Globaler Default fuer invertierte Positionsmeldung. */
  invert_position?: boolean;
  sides?: Partial<Record<SideKey, SideConfig>>;
}

/** Zeichen -> Elementtyp fuer die String-Kurzform. */
export const CHAR_TO_TYPE: Record<string, ElementType> = {
  F: 'window',
  B: 'floorwindow',
  T: 'door',
  O: 'gate',
  L: 'empty',
};

export const CONTROLLABLE: ElementType[] = ['window', 'floorwindow', 'door', 'gate'];
export const SIDE_ORDER: SideKey[] = ['front', 'back', 'left', 'right'];
export const SIDE_DEFAULT_LABEL: Record<SideKey, string> = {
  front: 'Vorne',
  back: 'Hinten',
  left: 'Links',
  right: 'Rechts',
};
