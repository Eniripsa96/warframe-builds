import {Stat} from "app/data/Mod";

/**
 * @param {WeaponBuild} weaponBuild - the current loadout being built
 * @param {object} settings - generation settings
 * @param {boolean} settings.headShots - whether or not to assume every shot is a headshot
 */
export function applyCrits(weaponBuild, settings) {
  const headshotMultiplier = settings.headShots ? 2 : 1;
  const crit = weaponBuild.get(Stat.CRIT_CHANCE, 1);
  const critM = weaponBuild.get(Stat.CRIT_DAMAGE, 1);
  const critLevel = weaponBuild.get(Stat.CRIT_LEVEL, 1);

  if (crit <= 1) {
    weaponBuild.multiply('max', critM * headshotMultiplier);
    weaponBuild.multiply('avg', 1 + (critM - 1) * critLevel * crit * headshotMultiplier);
  } else {
    const level = (crit | 0) + critLevel;
    weaponBuild.multiply('max', (level * (critM - 1) + 1) * headshotMultiplier);
    weaponBuild.multiply('min', ((level - 1) * (critM - 1) + 1) * headshotMultiplier);

    const higherChance = crit - (crit | 0);
    weaponBuild.multiply('avg', headshotMultiplier * (1 + (critM - 1) * (level + higherChance)));
  }
}

/**
 * @param {WeaponBuild} weaponBuild - the current loadout being built
 */
export function applyMultishot(weaponBuild) {
  const multi = weaponBuild.get(Stat.MULTISHOT, 1);
  weaponBuild.multiply('avg', multi);
  weaponBuild.multiply('max', Math.ceil(multi));
  weaponBuild.multiply('min', Math.floor(multi));
}
