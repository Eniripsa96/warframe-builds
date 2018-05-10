import {Stat} from "app/data/Mod";

/**
 * @param {WeaponBuild} weaponBuild - the current loadout being built
 * @param {object} settings - generation settings
 * @param {number} settings.meleeCombo - default consecutive melee hits for building combo multiplier
 * @param {number} settings.meleeComboScale - additional consecutive hits attainable per second of extra combo duration
 */
export function applyMeleeCombo(weaponBuild, settings) {
  if (!weaponBuild.weapon.isMelee()) return;

  let combo = settings.meleeCombo + settings.meleeComboScale * weaponBuild.get(Stat.COMBO_DURATION);
  let avgMeleeMultiplier = Math.log(Math.max(1, combo / 5)) / Math.log(3);

  weaponBuild.multiply(Stat.CRIT_CHANCE, 1 + (weaponBuild.get(Stat.COMBO_CRIT) * avgMeleeMultiplier));
  weaponBuild.multiply(Stat.STATUS_CHANCE, 1 + (weaponBuild.get(Stat.COMBO_STATUS) * avgMeleeMultiplier));
  weaponBuild.multiplyAll(avgMeleeMultiplier);
}

/**
 * @param {WeaponBuild} weaponBuild - the current loadout being built
 * @param {object} settings - generation settings
 * @param {number} settings.berserkerCrit - crit chance threshold for effectively using the berserker mod
 */
export function restrictBerserker(weaponBuild, settings) {
  const critChance = weaponBuild.get(Stat.CRIT_CHANCE);
  if (weaponBuild.berserker && critChance < settings.berserkerCrit) {
    weaponBuild.add(Stat.RATE, 0.75 * (critChance / settings.berserkerCrit - 1));
  }
}

/**
 * @param {WeaponBuild} weaponBuild - the current loadout being built
 * @param {object} settings - generation settings
 * @param {boolean} settings.channeling - whether or not channeling should be considered
 */
export function applyChanneling(weaponBuild, settings) {
  if (!settings.channeling) return;
  weaponBuild.multiplyAll(1 + (weaponBuild.weapon.data.channel - 1) * weaponBuild.getModBonus(Stat.CHANNEL_DAMAGE, 1));
}

/**
 * Determines the average bonus from condition overload depending on the weapon and what
 * elements fit onto the weapon. The number of different types of procks, how long they last,
 * how often they prock, and what the status chance is all impact how effective elemental overload
 * can be.
 *
 * This formula ends up being:
 *
 * Chance To Refresh = 1 - (1 - prock_chance) ^ (avg_rate / prock_duration))
 * Average Time To Reapply = 0.5 = (1 - prock_chance) ^ (n)
 *
 * @param {WeaponBuild} weaponBuild - the current loadout being built
 * @param {object} settings - generation settings
 */
export function applyConditionOverload(weaponBuild, settings) {
  // TODO - implement, this should be called during element determination

  // shots_per_prock = prock_duration / avg_rate
  // average_reapply_shots = 1 / prock_chance
  // average_reapply_time = 1 / (avg_rate * prock_chance)
  // probability(x) = (prock_chance)*(1-prock_chance)^(x-1)

  // refresh_weight(x) = probability(x) * x / avg_rate
  // reapply_weight = (1 - Σ probability(n) for n = {1, shots_per_prock}) * (prock_duration + average_reapply_time)
  // reapply_uptime = prock_duration / (prock_duration + average_reapply_time)

  // avg_uptime = (refresh_weight + reapply_uptime * reapply_weight) / (refresh_weight + reapply_weight)

  // Compute the above for each possible status and sum the results for average total status applied

  /**
   * Old Code:
   let elementCount = Object.keys(weaponBuild.elements).length >> 1;
   if (iDmg > 0) elementCount++;
   if (sDmg > 0) elementCount++;
   if (pDmg > 0) elementCount++;
   let statuses = Math.min(status * settings.conditionOverloadScale, elementCount);
   let overload = weaponBuild.get('eStackDmg') * (settings.conditionOverloadBase + statuses);
   */
}
