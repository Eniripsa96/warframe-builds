import {Stat} from "app/data/Mod";
import {ELEMENT_TYPE} from "../../../app/data/Mod";
import {sumArray} from "app/utils";
import ElementModifiers from "pages/loadout/model/ElementModifiers";

const DAMAGE_KEY_MAP = {
  'iDmg': 'impact',
  'sDmg': 'slash',
  'pDmg': 'puncture',
  'eDmg': 'element'
};

const STAT_CAPS = {
    [Stat.STATUS_CHANCE]: 1
};

const STAT_FREEZE = {
  [Stat.MAGAZINE_SIZE]: 1
};

/**
 * Combined mod stats
 */
class WeaponBuild {

  /**
   * @param {Weapon} weapon - weapon details
   * @param {Mod[]} loadout - mods on the weapon
   */
  constructor(weapon, loadout) {
    this.weapon = weapon;
    this.loadout = loadout.slice(0);
    this.berserker = !!loadout.find(mod => mod.name === 'Berserker');
    /** @type {object.<string, object>} */
    this.elements = new ElementModifiers();
    /** @type {object.<string, number>} */
    this.data = {};
    /** @type {object.<string, number>} */
    this.multipliers = {};
    /** @type {StatusProck[]} */
    this.procks = [];

    loadout.filter(mod => mod.stats[ELEMENT_TYPE])
      .forEach(mod => this.elements.add(mod.stats[ELEMENT_TYPE], mod.stats[Stat.DAMAGE_ELEMENT]));

    loadout.forEach(mod => Object.keys(mod.stats).forEach(key => this.add(key, mod.stats[key])));

    this.baseDmg = this.get(Stat.DAMAGE_BASE, 1) + this.get(Stat.DAMAGE_FLAT);
    this.iDmg = this.baseDmg * (this.get(Stat.DAMAGE_IMPACT, 1) * this.weapon.getDamageShare("impact"));
    this.pDmg = this.baseDmg * (this.get(Stat.DAMAGE_PUNCTURE, 1) * this.weapon.getDamageShare("puncture"));
    this.sDmg = this.baseDmg * (this.get(Stat.DAMAGE_SLASH, 1) * this.weapon.getDamageShare("slash"));
    this.eDmg = this.baseDmg * (this.get(Stat.DAMAGE_ELEMENT, 0) + this.weapon.getDamageShare("element"));
    this.physicalDmg = this.iDmg + this.pDmg + this.sDmg;
    this.totalDmg = this.iDmg + this.pDmg + this.sDmg + this.eDmg;
    this.statusWeight = 4 * this.physicalDmg + this.eDmg;
  }

  get dps() {
    if (this._dps) return this._dps;
    const prockDmg = sumArray(this.procks, 'avgDamage');
    const mag = Math.ceil(this.get(Stat.MAGAZINE_SIZE, 1));
    const timePerClip = (mag / this.get(Stat.RATE, 1) + this.getInverse(Stat.RELOAD_SPEED));
    return this._dps = (this.totalDmg + prockDmg) * (mag / timePerClip) * this.multiplier('avg');
  }

  minShotDmg() {
    const prockDmg = sumArray(this.procks.filter(prock => prock.chance < 1 && prock.bonusChanace < 1), 'damage');
    return (this.totalDmg + prockDmg) * this.multiplier('min');
  }

  maxShotDmg() {
    const bonusProckDmg = sumArray(this.procks.filter(prock => prock.bonusChanace > 0), 'damage');
    const sorted = this.procks.filter(prock => prock.chance > 0).sort((a,  b) => b.damage - a.damage);
    const bestProck = sorted.length ? sorted[0].damage : 0;
    return (this.totalDmg + bestProck + bonusProckDmg) * this.multiplier('max');
  }

  /**
   * @param {string} key - identifier for the stat to add to
   * @param {number} value - amount to add
   */
  add(key, value) {
    this.data[key] = (this.data[key] || 0) + value;
  }

  /**
   * @param {string} type - key of the element to add
   * @param {number} value - element damage as a percent of base damage
   */
  addElement(type, value) {
    type = type.toUpperCase();
    this.elements[type] = (this.elements[type] || 0) + value;
  }

  /**
   * @param {string} key - damage key (should be one of: baseDmg, iDmg, pDmg, sDmg, eDmg)
   * @returns {number} percentage of each shot made up of that type (not including procks)
   */
  getDamageShare(key) {
    return this[key] / this.totalDmg;
  }

  /**
   * @param {string} key - identifier of the stat to get a value for
   * @param {number} base - starting value of the stat
   * @returns {number} the current value of the stat including multipliers
   */
  get(key, base = 0) {
    const weap = this.weapon[key] || this.weapon.data[key];
    if (STAT_FREEZE[key] && weap === STAT_FREEZE[key]) return STAT_FREEZE[key];

    const weaponStat = weap === undefined ? 1 : weap;
    const value = weaponStat * this.multiplier(key) * this.getModBonus(key, base);
    return STAT_CAPS[key] ? Math.min(STAT_CAPS[key], value) : value;
  }

  getInverse(key) {
    const weaponStat = this.weapon.data[key] === undefined ? 1 : this.weapon.data[key];
    return weaponStat / (this.multiplier(key) * this.getModBonus(key, 1));
  }

  /**
   * * @param {string} key - identifier of the stat to get a value for
   * @param {number} base - starting value of the stat
   * @returns {number} the bonus to the stat from mods
   */
  getModBonus(key, base = 0) {
    return (this.data[key] || 0) + base;
  }

  /**
   * @param {string} key - identifier of the stat to get a multiplier for
   * @returns {number} the multiplier for the stat or 1 if no multiplier was found
   */
  multiplier(key) {
    return this.multipliers[key] || 1;
  }

  /**
   * @param {string} key - identifier of the stat to add a multiplier for
   * @param {number} value - the multiplier amount
   */
  multiply(key, value) {
    this.multipliers[key] = this.multiplier(key) * value;
  }

  multiplyAll(value) {
    this.multiply('avg', value);
    this.multiply('max', value);
    this.multiply('min', value);
  }
}

export default WeaponBuild;
