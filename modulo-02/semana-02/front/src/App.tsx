import React, { useState } from 'react';

import { Center } from './components/Center';
import { Header } from './components/Header';

function App() {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
      }}
    >
      <Header>
        <h1>Pizzaria divina pizza</h1>
      </Header>
      <main>body</main>
      <footer style={{ marginTop: 'auto' }}>footer</footer>
    </div>
  );
}

export default App;
