import WEAPONS from '../generated/weapons';

class Weapon {
  constructor(data) {
    this.data = data;
    this.isZaw = false;

    this.baseDmg = data.element + data.puncture + data.impact + data.slash;
  }

  getName() {
    return this.data.name;
  }

  getDamageShare(type) {
    return this.data[type] / this.baseDmg;
  }

  isMelee() {
    return this.data.slot === 'MELEE';
  }

  isZaw() {
    return this.isZaw;
  }
}

let weaponList = null;
let weaponMap = null;
let zaws = null;

export function getWeapons() {
  loadWeapons();
  return weaponList;
}

export function getWeapon(name) {
  loadWeapons();
  return weaponMap[name];
}

function loadWeapons() {
  if (weaponList) return;

  weaponList = Object.keys(WEAPONS).map(key => new Weapon(WEAPONS[key]));

  let lastName = weaponList[0].getName();
  let isZaw = false;
  zaws = {strikes: {}, links: {}, grips: {}};
  weaponMap = weaponList.reduce((map, weapon) => {
    map[weapon.getName()] = weapon;
    isZaw = isZaw || weapon.getName()[0] < lastName[0];
    weapon.isZaw = isZaw;
    if (isZaw) {
      const pieces = weapon.getName().split('/');
      zaws.strikes[pieces[0]] = true;
      zaws.grips[pieces[1]] = true;
      zaws.links[pieces[2]] = true;
    }
    lastName = weapon.getName();
    return map;
  }, {});
}
