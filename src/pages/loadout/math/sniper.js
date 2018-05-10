/**
 * @param {WeaponBuild} weaponBuild - the current loadout being built
 * @param {object} settings - generation settings
 * @param {number} settings.sniperCombo - default consecutive hits for building sniper combo
 */
export function applySniperCombo(weaponBuild, settings) {
  const minCombo = weaponBuild.weapon.data.combo;
  if (minCombo > 0) {
    weaponBuild.multiplyAll(1 + (0.5 * Math.log(Math.max(1, settings.sniperCombo / minCombo)) / Math.log(3)));
  }
}
