import {
  CHAR_TO_TYPE,
  CONTROLLABLE,
  ElementConfig,
  FloorConfig,
  StringFloorConfig,
} from './types';

/** Normalisiert eine Etagen-Konfiguration (strukturiert | {layout,entities} | string)
 *  zu einer einheitlichen Element-Liste. */
export function normalizeFloor(floor: FloorConfig | undefined): ElementConfig[] {
  if (!floor) return [];

  // Strukturierte Variante: bereits Element-Liste
  if (Array.isArray(floor)) {
    return floor.map((el) => ({ ...el }));
  }

  // String-Kurzform
  let layout = '';
  let entities: string[] = [];
  if (typeof floor === 'string') {
    layout = floor;
  } else {
    const sf = floor as StringFloorConfig;
    layout = sf.layout ?? '';
    entities = sf.entities ?? [];
  }

  const chars = layout.toUpperCase().replace(/[^FBTOL]/g, '').split('');
  let entIdx = 0;
  return chars.map((ch): ElementConfig => {
    const type = CHAR_TO_TYPE[ch] ?? 'empty';
    if (CONTROLLABLE.includes(type)) {
      const entity = entities[entIdx];
      entIdx += 1;
      return { type, entity };
    }
    return { type };
  });
}
