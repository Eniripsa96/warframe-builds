import {ELEMENTS} from "app/data/Element";

class ElementModifiers {
  /**
   * @param [elementModifiers] modifier to copy from
   */
  constructor(elementModifiers) {
    if (elementModifiers) {
      Object.assign(this, elementModifiers);
    }
  }

  /**
   * @param {string} type - key of the element to add
   * @param {number} value - element damage as a percent of base damage
   */
  add(type, value) {
    type = type.toUpperCase();
    this[type] = (this[type] || 0) + value;
  }

  has(type) {
    return !!this[type];
  }

  get(type) {
    return this[type] || 0;
  }

  asArray(baseDmg = 1) {
    return Object.keys(this).map(key => ({ type: ELEMENTS[key], value: this[key] * baseDmg }));
  }
}

export default ElementModifiers;
