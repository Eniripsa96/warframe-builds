import {isModEnabled} from "./ModSettings";

export const Type = {
  RIFLE: 1,
  ASSAULT_RIFLE: 2,
  SHOTGUN: 4,
  PISTOL: 8,
  THROWING: 16,
  BOW: 64,
  NON_DAGGER: 128,
  DAGGER: 256,
  MELEE: 128 | 256,
  PRIMARY: 1 | 2 | 4 | 64,
  ALL: 511
};

export const ELEMENT_TYPE = 'eType';

export const Stat = {
  BONUS_DAMAGE: 'bonus',
  CHANNEL_DAMAGE: 'channelDmg',
  COMBO_CRIT: 'comboCrit',
  COMBO_DURATION: 'comboDuration',
  COMBO_STATUS: 'comboStatus',
  CRIT_CHANCE: 'crit',
  CRIT_DAMAGE: 'critM',
  CRIT_LEVEL: 'critLevel',
  DAMAGE_ALL: 'dmg',
  DAMAGE_BASE: 'baseDmg',
  DAMAGE_FLAT: 'flatdmg',
  DAMAGE_ELEMENT: 'eDmg',
  DAMAGE_IMPACT: 'iDmg',
  DAMAGE_PUNCTURE: 'pDmg',
  DAMAGE_SLASH: 'sDmg',
  MAGAZINE_SIZE: 'mag',
  MULTISHOT: 'multi',
  PUNCH_THROUGH: 'punch',
  RATE: 'rate',
  RELOAD_SPEED: 'reload',
  SLASH_PROCK: 'slashProck',
  STATUS_CHANCE: 'status',
  STATUS_DAMAGE: 'eStackDamage'
};

class Mod {
  constructor(name, type, stats) {
    this.name = name;
    this.type = type;
    this.stats = stats;
  }
}

export default Mod;

export function getModsForWeapon(weapon) {
  return MOD_LIST
    .filter(mod => (mod.type & weapon.data.type))
    .filter(mod => isModEnabled(mod.name))
    .filter(mod => !MOD_MAP['Primed ' + mod.name] || !isModEnabled('Primed ' + mod.name));
}

export const MOD_LIST = [

  // All Primaries
  new Mod('Vigilante Armaments', Type.PRIMARY, { [Stat.MULTISHOT]: 0.6, [Stat.CRIT_LEVEL]: 0.05}),
  new Mod('Hunter Munitions', Type.PRIMARY, { [Stat.SLASH_PROCK]: 0.3}),

  // Throwing
  new Mod('Concealed Explosives', Type.THROWING, { [Stat.BONUS_DAMAGE]: 200}),

  // Rifles
  new Mod('Crash Course', Type.RIFLE, { [Stat.DAMAGE_IMPACT]: 1.2}),
  new Mod('Critical Delay', Type.RIFLE, { [Stat.CRIT_CHANCE]: 0.48, [Stat.RATE]: -0.36}),
  new Mod('Cryo Rounds', Type.RIFLE, { [Stat.DAMAGE_ELEMENT]: 0.9, [ELEMENT_TYPE]: 'COLD', group: 'E90' }),
  new Mod('Depleted [Stat.RELOAD_SPEED]', Type.RIFLE, { [Stat.MAGAZINE_SIZE]: -0.6, [Stat.RELOAD_SPEED]: 0.48}),
  new Mod('Fanged Fusillade', Type.RIFLE, { [Stat.DAMAGE_SLASH]: 1.2}),
  new Mod('Fast Hands', Type.RIFLE, { [Stat.RELOAD_SPEED]: 0.3}),
  new Mod('Hammer Shot', Type.RIFLE, { [Stat.CRIT_DAMAGE]: 0.6, [Stat.STATUS_CHANCE]: 0.4}),
  new Mod('Heavy Caliber', Type.RIFLE, {[Stat.DAMAGE_BASE]: 1.649}),
  new Mod('Hellfire', Type.RIFLE, {[Stat.DAMAGE_ELEMENT]: 0.9, [ELEMENT_TYPE]: 'HEAT', group: 'E90' }),
  new Mod('High Voltage', Type.RIFLE, {[Stat.DAMAGE_ELEMENT]: 0.6, [Stat.STATUS_CHANCE]: 0.6, [ELEMENT_TYPE]: 'ELECTRICITY', group: 'E60' }),
  new Mod('Infected Clip', Type.RIFLE, {[Stat.DAMAGE_ELEMENT]: 0.9, [ELEMENT_TYPE]: 'TOXIN', group: 'E90' }),
  new Mod('Magazine Warp', Type.RIFLE, {[Stat.MAGAZINE_SIZE]: 0.3}),
  new Mod('Malignant Force', Type.RIFLE, {[Stat.DAMAGE_ELEMENT]: 0.6, [Stat.STATUS_CHANCE]: 0.6, [ELEMENT_TYPE]: 'TOXIN', group: 'E60' }),
  new Mod('Metal Auger', Type.RIFLE, {[Stat.PUNCH_THROUGH]: 2.1}),
  new Mod('Piercing Caliber', Type.RIFLE, {[Stat.DAMAGE_PUNCTURE]: 1.2}),
  new Mod('Piercing Hit', Type.RIFLE, {[Stat.DAMAGE_PUNCTURE]: 0.3}),
  new Mod('Point Strike', Type.RIFLE, {[Stat.CRIT_CHANCE]: 1.5}),
  new Mod('Primed Bane', Type.RIFLE, {[Stat.DAMAGE_ALL]: 0.55}),
  new Mod('Primed Cryo Rounds', Type.RIFLE, {[Stat.DAMAGE_ELEMENT]: 1.65, [ELEMENT_TYPE]: 'COLD', group: 'E90' }),
  new Mod('Primed Fast Hands', Type.RIFLE, {[Stat.RELOAD_SPEED]: 0.55}),
  new Mod('Rifle Aptitude', Type.RIFLE, {[Stat.STATUS_CHANCE]: 0.15}),
  new Mod('Rime Rounds', Type.RIFLE, {[Stat.DAMAGE_ELEMENT]: 0.6, [Stat.STATUS_CHANCE]: 0.6, [ELEMENT_TYPE]: 'COLD', group: 'E60' }),
  new Mod('Rupture', Type.RIFLE, {[Stat.DAMAGE_IMPACT]: 0.3}),
  new Mod('Sawtooth Clip', Type.RIFLE, {[Stat.DAMAGE_SLASH]: 0.3}),
  new Mod('Serration', Type.RIFLE, {[Stat.DAMAGE_BASE]: 1.65}),
  new Mod('Shred', Type.RIFLE, {[Stat.RATE]: 0.3, [Stat.PUNCH_THROUGH]: 1.2}),
  new Mod('Speed Trigger', Type.RIFLE, {[Stat.RATE]: 0.6}),
  new Mod('Split Chamber', Type.RIFLE, {[Stat.MULTISHOT]: 0.9}),
  new Mod('Stormbringer', Type.RIFLE, {[Stat.DAMAGE_ELEMENT]: 0.9, [ELEMENT_TYPE]: 'ELECTRICITY', group: 'E90' }),
  new Mod('Thermite Rounds', Type.RIFLE, {[Stat.DAMAGE_ELEMENT]: 0.6, [Stat.STATUS_CHANCE]: 0.6, [ELEMENT_TYPE]: 'HEAT', group: 'E60' }),
  new Mod('Vile Acceleration', Type.RIFLE, {[Stat.RATE]: 0.9, [Stat.DAMAGE_BASE]: -0.15}),
  new Mod('Vital Sense', Type.RIFLE, {[Stat.CRIT_DAMAGE]: 1.2}),
  new Mod('Wildfire', Type.RIFLE, {[Stat.DAMAGE_ELEMENT]: 0.6, [Stat.MAGAZINE_SIZE]: 0.2, [ELEMENT_TYPE]: 'HEAT'}),

  // Assault Rifles
  new Mod('Tainted [Stat.MAGAZINE_SIZE]', Type.ASSAULT_RIFLE, {[Stat.MAGAZINE_SIZE]: 0.66, [Stat.RELOAD_SPEED]: -0.33}),

  // Shotguns
  new Mod('Accelerated Blast', Type.SHOTGUN, {[Stat.RATE]: 0.6, [Stat.DAMAGE_PUNCTURE]: 0.6}),
  new Mod('Ammo Stock', Type.SHOTGUN, {[Stat.MAGAZINE_SIZE]: 0.6}),
  new Mod('Blaze', Type.SHOTGUN, {[Stat.DAMAGE_BASE]: 0.6, [Stat.DAMAGE_ELEMENT]: 0.6, [ELEMENT_TYPE]: 'HEAT'}),
  new Mod('Blunderbuss', Type.SHOTGUN, {[Stat.CRIT_CHANCE]: 0.9}),
  new Mod('Breach Loader', Type.SHOTGUN, {[Stat.DAMAGE_PUNCTURE]: 1.2}),
  new Mod('Burdened Magazine', Type.SHOTGUN, {[Stat.MAGAZINE_SIZE]: 0.6, [Stat.RELOAD_SPEED]: -0.18}),
  new Mod('Charged Shell', Type.SHOTGUN, {[Stat.DAMAGE_ELEMENT]: 0.9, [ELEMENT_TYPE]: 'ELECTRICITY', group: 'E90' }),
  new Mod('Chilling Grasp', Type.SHOTGUN, {[Stat.DAMAGE_ELEMENT]: 0.9, [ELEMENT_TYPE]: 'COLD', group: 'E90' }),
  new Mod('Chilling Reload', Type.SHOTGUN, {[Stat.DAMAGE_ELEMENT]: 0.6, [Stat.RELOAD_SPEED]: 0.4, [ELEMENT_TYPE]: 'COLD'}),
  new Mod('Contagious Spread', Type.SHOTGUN, {[Stat.DAMAGE_ELEMENT]: 0.9, [ELEMENT_TYPE]: 'TOXIN', group: 'E90' }),
  new Mod('Critical Deceleration', Type.SHOTGUN, {[Stat.CRIT_CHANCE]: 0.48, [Stat.RATE]: -0.36}),
  new Mod('Disruptor', Type.SHOTGUN, {[Stat.DAMAGE_IMPACT]: 0.3}),
  new Mod('Flechette', Type.SHOTGUN, {[Stat.DAMAGE_PUNCTURE]: 0.3}),
  new Mod('Frail Momentum', Type.SHOTGUN, {[Stat.RATE]: 0.9, [Stat.DAMAGE_BASE]: -0.15}),
  new Mod('Frigid Blast', Type.SHOTGUN, {[Stat.DAMAGE_ELEMENT]: 0.6, [Stat.STATUS_CHANCE]: 0.6, [ELEMENT_TYPE]: 'COLD', group: 'E60' }),
  new Mod('Full Contact', Type.SHOTGUN, {[Stat.DAMAGE_IMPACT]: 1.2}),
  new Mod('Hell\'s Chamber', Type.SHOTGUN, {[Stat.MULTISHOT]: 1.2}),
  new Mod('Incendiary Coat', Type.SHOTGUN, {[Stat.DAMAGE_ELEMENT]: 0.9, [ELEMENT_TYPE]: 'HEAT', group: 'E90' }),
  new Mod('Point Blank', Type.SHOTGUN, {[Stat.DAMAGE_BASE]: 0.9}),
  new Mod('Primed Point Blank', Type.SHOTGUN, {[Stat.DAMAGE_BASE]: 1.65}),
  new Mod('Primed Ravage', Type.SHOTGUN, {[Stat.CRIT_DAMAGE]: 1.1}),
  new Mod('Ravage', Type.SHOTGUN, {[Stat.CRIT_DAMAGE]: 0.6}),
  new Mod('Scattering Inferno', Type.SHOTGUN, {[Stat.DAMAGE_ELEMENT]: 0.6, [Stat.STATUS_CHANCE]: 0.6, [ELEMENT_TYPE]: 'HEAT', group: 'E60' }),
  new Mod('Seeking Force', Type.SHOTGUN, {[Stat.PUNCH_THROUGH]: 2.1}),
  new Mod('Seeking Fury', Type.SHOTGUN, {[Stat.PUNCH_THROUGH]: 1.2, [Stat.RELOAD_SPEED]: 0.15}),
  new Mod('Shell Shock', Type.SHOTGUN, {[Stat.DAMAGE_ELEMENT]: 0.6, [Stat.STATUS_CHANCE]: 0.6, [ELEMENT_TYPE]: 'ELECTRICITY', group: 'E60' }),
  new Mod('Shredder', Type.SHOTGUN, {[Stat.DAMAGE_SLASH]: 0.3}),
  new Mod('Sweeping Serration', Type.SHOTGUN, {[Stat.DAMAGE_SLASH]: 1.2}),
  new Mod('Tactical Pump', Type.SHOTGUN, {[Stat.RELOAD_SPEED]: 0.3}),
  new Mod('Toxin Barrage', Type.SHOTGUN, {[Stat.DAMAGE_ELEMENT]: 0.6, [Stat.STATUS_CHANCE]: 0.6, [ELEMENT_TYPE]: 'TOXIN', group: 'E60' }),
  new Mod('Vicious Spread', Type.SHOTGUN, {[Stat.DAMAGE_BASE]: 0.9}),

  // Pistols
  new Mod('Anemic Agility', Type.PISTOL, {[Stat.RATE]: 0.9, [Stat.DAMAGE_BASE]: -0.15}),
  new Mod('Augur Pact', Type.PISTOL, {[Stat.DAMAGE_BASE]: 0.9}),
  new Mod('Barrel Diffusion', Type.PISTOL, {[Stat.MULTISHOT]: 1.2}),
  new Mod('Bore', Type.PISTOL, {[Stat.DAMAGE_PUNCTURE]: 1.2}),
  new Mod('Concussion Rounds', Type.PISTOL, {[Stat.DAMAGE_IMPACT]: 0.6}),
  new Mod('Convulsion', Type.PISTOL, {[Stat.DAMAGE_ELEMENT]: 0.9, [ELEMENT_TYPE]: 'ELECTRICITY', group: 'E90' }),
  new Mod('Creeping Bullseye', Type.PISTOL, {[Stat.CRIT_CHANCE]: 0.48, [Stat.RATE]: -0.36}),
  new Mod('Deep Freeze', Type.PISTOL, {[Stat.DAMAGE_ELEMENT]: 0.9, [ELEMENT_TYPE]: 'COLD', group: 'E90' }),
  new Mod('Frostbite', Type.PISTOL, {[Stat.DAMAGE_ELEMENT]: 0.6, [Stat.STATUS_CHANCE]: 0.6, [ELEMENT_TYPE]: 'COLD', group: 'E60' }),
  new Mod('Gunslinger', Type.PISTOL, {[Stat.RATE]: 0.72}),
  new Mod('Heated Charge', Type.PISTOL, {[Stat.DAMAGE_ELEMENT]: 0.9, [ELEMENT_TYPE]: 'HEAT', group: 'E90' }),
  new Mod('Hollow Point', Type.PISTOL, {[Stat.CRIT_DAMAGE]: 0.6, [Stat.DAMAGE_BASE]: -0.15}),
  new Mod('Hornet Strike', Type.PISTOL, {[Stat.DAMAGE_BASE]: 2.2}),
  new Mod('Ice Storm', Type.PISTOL, {[Stat.DAMAGE_ELEMENT]: 0.4, [Stat.MAGAZINE_SIZE]: 0.4, [ELEMENT_TYPE]: 'COLD' }),
  new Mod('Jolt', Type.PISTOL, {[Stat.DAMAGE_ELEMENT]: 0.6, [Stat.STATUS_CHANCE]: 0.6, [ELEMENT_TYPE]: 'ELECTRICITY', group: 'E60' }),
  new Mod('Lethal Torrent', {[Stat.MULTISHOT]: 0.6, [Stat.RATE]: 0.6}),
  new Mod('Magnum Force', {[Stat.DAMAGE_BASE]: 0.66}),
  new Mod('Maim', Type.PISTOL, {[Stat.DAMAGE_SLASH]: 0.6}),
  new Mod('No Return', Type.PISTOL, {[Stat.DAMAGE_PUNCTURE]: 0.6}),
  new Mod('Pathogen Rounds', Type.PISTOL, {[Stat.DAMAGE_ELEMENT]: 0.9, [ELEMENT_TYPE]: 'TOXIN', group: 'E90' }),
  new Mod('Pistol Gambit', Type.PISTOL, {[Stat.CRIT_CHANCE]: 1.2}),
  new Mod('Pistol Pestilence', Type.PISTOL, {[Stat.DAMAGE_ELEMENT]: 0.6, [Stat.STATUS_CHANCE]: 0.6, [ELEMENT_TYPE]: 'TOXIN', group: 'E60' }),
  new Mod('Primed Heated Charge', Type.PISTOL, {[Stat.DAMAGE_ELEMENT]: 1.65, [ELEMENT_TYPE]: 'HEAT', group: 'E90' }),
  new Mod('Primed Pistol Gambit', Type.PISTOL, {[Stat.CRIT_CHANCE]: 2.2}),
  new Mod('Primed Slip Magazine', Type.PISTOL, {[Stat.MAGAZINE_SIZE]: 0.55}),
  new Mod('Primed Target Cracker', Type.PISTOL, {[Stat.CRIT_DAMAGE]: 1.1}),
  new Mod('Pummel', Type.PISTOL, {[Stat.DAMAGE_IMPACT]: 1.2}),
  new Mod('Quickdraw', Type.PISTOL, {[Stat.RELOAD_SPEED]: 0.48}),
  new Mod('Razor Shot', Type.PISTOL, {[Stat.DAMAGE_SLASH]: 0.6}),
  new Mod('Scorch', Type.PISTOL, {[Stat.DAMAGE_ELEMENT]: 0.6, [Stat.STATUS_CHANCE]: 0.6, [ELEMENT_TYPE]: 'HEAT', group: 'E60'}),
  new Mod('Seeker', Type.PISTOL, {[Stat.PUNCH_THROUGH]: 2.4}),
  new Mod('Slip Magazine', Type.PISTOL, {[Stat.MAGAZINE_SIZE]: 0.3}),
  new Mod('Stunning Speed', Type.PISTOL, {[Stat.RELOAD_SPEED]: 0.4, [Stat.STATUS_CHANCE]: 0.1}),
  new Mod('Tainted Clip', Type.PISTOL, {[Stat.MAGAZINE_SIZE]: 0.6, [Stat.RELOAD_SPEED]: -0.3}),
  new Mod('Target Cracker', Type.PISTOL, {[Stat.CRIT_DAMAGE]: 0.6}),

  // Bows
  new Mod('Shred', Type.BOW, {[Stat.RATE]: 0.6, [Stat.PUNCH_THROUGH]: 1.2}),
  new Mod('Speed Trigger', Type.BOW, {[Stat.RATE]: 1.2}),
  new Mod('Thunderbolt', Type.BOW, {[Stat.BONUS_DAMAGE]: 75}),
  new Mod('Vile Acceleration', Type.BOW, {[Stat.RATE]: 1.8, [Stat.DAMAGE_BASE]: -0.15}),

  // Melee
  new Mod('Auger Strike', Type.MELEE, {[Stat.DAMAGE_PUNCTURE]: 1.2}),
  new Mod('Berserker', Type.MELEE, {[Stat.RATE]: 0.75}),
  new Mod('Blood Rush', Type.MELEE, {[Stat.COMBO_CRIT]: 1.65}),
  new Mod('Buzz Kill', Type.MELEE, {[Stat.DAMAGE_SLASH]: 1.2}),
  new Mod('Collision Force', Type.MELEE, {[Stat.DAMAGE_IMPACT]: 1.2}),
  new Mod('Condition Overload', Type.MELEE, {[Stat.STATUS_DAMAGE]: 0.6}),
  new Mod('Drifting Contact', Type.MELEE, {[Stat.STATUS_CHANCE]: 0.4, [Stat.COMBO_DURATION]: 10}),
  new Mod('Fever Strike', Type.MELEE, {[Stat.DAMAGE_ELEMENT]: 0.9, [ELEMENT_TYPE]: 'TOXIN', group: 'E90' }),
  new Mod('Focus Energy', Type.MELEE, {[Stat.DAMAGE_ELEMENT]: 0.6, [ELEMENT_TYPE]: 'ELECTRICITY' }),
  new Mod('Gladiator Might', Type.MELEE, {[Stat.COMBO_CRIT]: 0.15, [Stat.CRIT_DAMAGE]: 0.6}),
  new Mod('Gladiator Rush', Type.MELEE, {[Stat.COMBO_CRIT]: 0.15, [Stat.COMBO_DURATION]: 6}),
  new Mod('Gladiator Vice', Type.MELEE, {[Stat.COMBO_CRIT]: 0.15, [Stat.RATE]: 0.3}),
  new Mod('Primed Fury', Type.MELEE, {[Stat.RATE]: 0.55}),
  new Mod('Heavy Trauma', Type.MELEE, {[Stat.DAMAGE_IMPACT]: 0.9}),
  new Mod('Jagged Edge', Type.MELEE, {[Stat.DAMAGE_SLASH]: 0.9}),
  new Mod('Killing Blow', Type.MELEE, {[Stat.CHANNEL_DAMAGE]: 1.2}),
  new Mod('Molten Impact', Type.MELEE, {[Stat.DAMAGE_ELEMENT]: 0.9, [ELEMENT_TYPE]: 'HEAT', group: 'E90' }),
  new Mod('North Wind', Type.MELEE, {[Stat.DAMAGE_ELEMENT]: 0.9, [ELEMENT_TYPE]: 'COLD', group: 'E90' }),
  new Mod('Organ Shatter', Type.MELEE, {[Stat.CRIT_DAMAGE]: 0.9}),
  new Mod('Primed Fever Strike', Type.MELEE, {[Stat.DAMAGE_ELEMENT]: 1.65, [ELEMENT_TYPE]: 'TOXIN', group: 'E90' }),
  new Mod('Primed Pressure Point', Type.MELEE, {[Stat.DAMAGE_BASE]: 1.65}),
  new Mod('Rending Strike', Type.MELEE, {[Stat.DAMAGE_SLASH]: 0.6, [Stat.DAMAGE_PUNCTURE]: 0.8}),
  new Mod('Shocking Touch', Type.MELEE, {[Stat.DAMAGE_ELEMENT]: 0.9, [ELEMENT_TYPE]: 'ELECTRICITY', group: 'E90' }),
  new Mod('Spoiled Strike', Type.MELEE, {[Stat.DAMAGE_BASE]: 1, [Stat.RATE]: -0.2}),
  new Mod('Sundering Strike', Type.MELEE, {[Stat.DAMAGE_PUNCTURE]: 0.9}),
  new Mod('True Steel', Type.MELEE, {[Stat.CRIT_CHANCE]: 0.6}),
  new Mod('Vicious Frost', Type.MELEE, {[Stat.DAMAGE_ELEMENT]: 0.6, [Stat.STATUS_CHANCE]: 0.6, [ELEMENT_TYPE]: 'COLD', group: 'E60' }),
  new Mod('Virulent Scourge', Type.MELEE, {[Stat.DAMAGE_ELEMENT]: 0.6, [Stat.STATUS_CHANCE]: 0.6, [ELEMENT_TYPE]: 'TOXIN', group: 'E60' }),
  new Mod('Volcanic Edge', Type.MELEE, {[Stat.DAMAGE_ELEMENT]: 0.6, [Stat.STATUS_CHANCE]: 0.6, [ELEMENT_TYPE]: 'HEAT', group: 'E60' }),
  new Mod('Voltaic Strike', Type.MELEE, {[Stat.DAMAGE_ELEMENT]: 0.6, [Stat.STATUS_CHANCE]: 0.6, [ELEMENT_TYPE]: 'ELECTRICITY', group: 'E60' }),
  new Mod('Weeping Wounds', Type.MELEE, {[Stat.COMBO_STATUS]: 0.45}),

  // DAGGER
  new Mod('Covert Lethality', Type.DAGGER, {[Stat.DAMAGE_FLAT]: 100}),
];

const MOD_MAP = MOD_LIST.reduce((map, mod) => {
  map[mod.name] = mod;
  return map;
}, {});
