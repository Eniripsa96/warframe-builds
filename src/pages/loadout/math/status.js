import {Stat} from "app/data/Mod";
import {combine, ELEMENTS} from "app/data/Element";
import StatusProck from 'pages/loadout/model/StatusProck';

/**
 * @param {WeaponBuild} weaponBuild - the current loadout being built
 * @param {object} settings - generation settings
 */
export function applyPhysicalProcks(weaponBuild, settings) {
  const slashDmg = weaponBuild.baseDmg * 2.45;
  const crit = Math.min(1, weaponBuild.get(Stat.CRIT_CHANCE, 1));
  const slashChance = getProckChance(weaponBuild, Stat.DAMAGE_SLASH);
  const bonusChance = weaponBuild.get(Stat.SLASH_PROCK) * crit;

  if (slashChance || bonusChance) {
    weaponBuild.procks.push(new StatusProck('Slash', slashDmg, null, slashChance, bonusChance));
  }
}

export function getElementOrderOptions(elements) {
  const [a, b, c, d, e] = elements;
  if (elements.length === 0) {
    return [[]];
  } else if (elements.length < 4) {
    return [elements];
  } else if (elements.length === 4) {
    return [
      [a, b, c, d],
      [a, c, b, d],
      [b, c, a, d]
    ];
  } else {
    return [
      [a, b, c, d, e],
      [a, c, b, d, e],
      [a, d, b, c, e]
    ];
  }
}

export function generateProcks(stats, elements, statusChance) {
  const procks = [];
  if (elements.length === 0) {
    return procks;
  }

  for (let i = 0; i < elements.length - 1 && !elements[i + 1].type.combined; i += 2) {
    const e1 = elements[i], e2 = elements[i + 1];
    const combinedElement = combine(e1.type, e2.type);
    computeProck(procks, combinedElement, stats, (e1.value + e2.value) * statusChance);
  }
  const last = elements[elements.length - 1];
  if (elements.length % 2 === 1) {
    computeProck(procks, last.type, stats, last.value * statusChance);
  } else if (last.type.combined) {
    const e = elements[elements.length - 2];
    computeProck(procks, e.type, stats, e.value * statusChance);
    computeProck(procks, last.type, stats, last.value * statusChance);
  }

  return procks;
}

/**
 * @param {WeaponBuild} weaponBuild
 */
export function buildStats(weaponBuild) {
  const base = weaponBuild.baseDmg;
  const elements = weaponBuild.elements;
  const cold = base * elements.get('COLD');
  const electricity = base * elements.get('ELECTRICITY');
  const heat = base * elements.get('HEAT');
  const toxin = base * elements.get('TOXIN');

  return {
    base, cold, electricity, heat, toxin,
    total: base + cold + electricity + heat + toxin,
  };
}

/**
 * @param {WeaponBuild} weaponBuild - the current loading being built
 * @param {string} key - stat key for the damage type
 * @param {number} factor - weight of the status type (4 for physical, 1 for elemental)
 * @returns {number} computed prock weight
 */
function getProckChance(weaponBuild, key, factor = 4) {
  return weaponBuild.get(Stat.STATUS_CHANCE, 1) * weaponBuild[key] * factor / weaponBuild.statusWeight;
}

/**
 * @param {StatusProck[]} procks - the list of current procks
 * @param {Element} element - element to get the prock for
 * @param {{base:number, cold:number, electricity:number, heat:number, toxin:number, total:number}} stats - damage stats
 * @param {number} weight - chance of the prock happening per shot
 */
function computeProck(procks, element, stats, weight) {
  const prock = element.prock ? element.prock(stats, weight) : null;
  if (prock) {
    procks.push(prock);
  }
}
