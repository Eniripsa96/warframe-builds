import React from 'react';

import GenerateOptions from '../loadout/GenerateOptions';
import withStyle from 'app/style';

import './home.scss';

const Home = () => (
  <div id="home">
    <aside>
      <GenerateOptions/>
    </aside>

    <main>
      <h1>You are here</h1>
      <p>
        Use the controls on the left to select what category to generate for.
      </p>
    </main>
  </div>
);

export default withStyle(Home);
