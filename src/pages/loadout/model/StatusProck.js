class StatusProck {
  /**
   * @param {string} source - name of the prock type
   * @param {number} damage - amount of damage dealt with one prock
   * @param {Element} damageType - type of damage dealt
   * @param {number} chance - chance of the prock occurring when a normal prock occurs
   * @param {number} [bonusChance=0] - chance of the prock occurring ignoring other procks
   */
  constructor(source, damage, damageType, chance, bonusChance = 0) {
    this.source = source;
    this.damage = damage;
    this.damageType = damageType;
    this.chance = chance;
    this.bonusChance = bonusChance;
  }

  /**
   * @returns {number} amount of damage dealt per shot on average
   */
  get avgDamage() {
    return this.damage * (this.chance + this.bonusChance);
  }
}

export default StatusProck;
