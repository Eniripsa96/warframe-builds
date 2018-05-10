const MOD_KEY = "enabled_mods";

let enabledMods;

function getEnabledMods() {
  if (!enabledMods) {
    enabledMods = JSON.parse(localStorage.getItem(MOD_KEY) || "{}");
  }
  return enabledMods;
}

export function isModEnabled(name) {
  return getEnabledMods()[name] !== false;
}

export function setModEnabled(name, enabled) {
  getEnabledMods()[name] = enabled;
  localStorage.setItem(MOD_KEY, JSON.stringify(enabledMods));
}
