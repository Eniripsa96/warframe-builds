import StatusProck from "pages/loadout/model/StatusProck";

/**
 * @typedef {object} Stat
 * @type object
 * @property {number} base
 * @property {number} cold
 * @property {number} electricity
 * @property {number} heat
 * @property {number} toxin
 * @property {number} total
 */

/**
 * @typedef {function} ProckFunction
 * @function
 * @param {Stat} stats - damage stats
 * @param {number} weight - chance of the prock occurring
 * @return {StatusProck} prock details
 */

class Element {
  /**
   * @param {string} key - key for the element
   * @param {string} name - display name of the element
   * @param {boolean} combined - whether or not this element is already combined
   * @param {ProckFunction} [prock] - determines prock strength
   */
  constructor(key, name, combined, prock) {
    this.key = key;
    this.name = name;
    this.combined = combined;
    this.prock = prock;
  }
}

/**
 * Known elements available in builds with functions determining prock damage given damage per shot.
 *
 * @type {{COLD, ELECTRICITY, HEAT, TOXIN, BLAST, CORROSIVE, GAS, MAGNETIC, RADIATION, VIRAL, NONE}}
 */
export const ELEMENTS = {
  COLD: new Element('COLD', 'Cold', false),
  ELECTRICITY: new Element('ELECTRICITY', 'Electricity', false,
    ({electricity, base}, weight) => new StatusProck('Electricity', (electricity + base) / 2, ELEMENTS.ELECTRICITY, weight)),
  HEAT: new Element('HEAT', 'Heat', false,
    ({heat, base}, weight) => new StatusProck('Heat', (heat + base) * 3.5, ELEMENTS.HEAT, weight)),
  TOXIN: new Element('TOXIN', 'Toxin', false,
    ({toxin, base}, weight) => new StatusProck('Toxin', (base + toxin) * 4.5, ELEMENTS.TOXIN, weight)),

  BLAST: new Element('BLAST', 'Blast', true),
  CORROSIVE: new Element('CORROSIVE', 'Corrosive', true,
    (stats, weight) => new StatusProck('Corrosive', 0, null, weight)),
  GAS: new Element('GAS', 'Gas', true,
    ({toxin, base}, weight) => new StatusProck('Gas', (base + toxin) * 0.5 + (toxin || (base / 4)) * 9, ELEMENTS.TOXIN, weight)),
  MAGNETIC: new Element('MAGNETIC', 'Magnetic', true,
    (stats, weight) => new StatusProck('Magnetic', 0, null, weight)),
  RADIATION: new Element('RADIATION', 'Radiation', true),
  VIRAL: new Element('VIRAL', 'Viral', true,
    (stats, weight) => new StatusProck('Viral', 0, null, weight)),

  FINISHER: new Element('FINISHER', 'Finisher', true),
  NONE: new Element('NONE', 'None', true)
};

/**
 * @param {Element} e1 - first element
 * @param {Element} e2 - second element
 * @return {Element} combined element
 */
export function combine(e1, e2) {
  return COMBINATIONS[e1.key][e2.key] || COMBINATIONS[e2.key][e1.key];
}

function scale(seconds, duration) {
  if (seconds <= duration) {
    return seconds / (2 * duration);
  }
  return (seconds - 0.5 * duration) / seconds;
}

const COMBINATIONS = {
  COLD: {
    ELECTRICITY: ELEMENTS.MAGNETIC,
    HEAT: ELEMENTS.BLAST,
    TOXIN: ELEMENTS.VIRAL
  },
  ELECTRICITY: {
    HEAT: ELEMENTS.RADIATION,
    TOXIN: ELEMENTS.CORROSIVE
  },
  HEAT: {
    TOXIN: ELEMENTS.GAS
  },
  TOXIN: {}
};
