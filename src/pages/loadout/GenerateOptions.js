import React from 'react';
import Card, {CardContent} from 'material-ui/Card';
import {Link} from 'react-router-dom';
import {getWeapons} from 'app/data/Weapon';

const GenerateOptions = () => (
  <Card>
    <CardContent>
      <h2>By Weapon Slot</h2>
      {blockLink("/slot/primary", "Primary")}
      {blockLink("/slot/secondary", "Secondary")}
      {blockLink("/slot/melee", "Melee")}

      <h2>By Weapon Class</h2>
      <p>To be added...</p>

      <h2>By Weapon</h2>
      {getWeapons().filter(weapon => !weapon.isZaw).map(renderWeaponLink)}
    </CardContent>
  </Card>
);

function renderWeaponLink(weapon) {
  return blockLink(`/weapon/${weapon.getName()}`, weapon.getName());
}

function blockLink(to, text) {
  return <div key={text}>
    <Link to={'/generate' + to}>{text}</Link>
  </div>
}

export default GenerateOptions;
