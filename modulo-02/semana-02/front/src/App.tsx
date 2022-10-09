import React, { useState } from 'react';

import { Center } from './components/Center';

function App() {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
      }}
    >
      <header style={{ marginBottom: 'auto' }}>
        <h1>Pizzaria divina pizza</h1>
      </header>
      <main>body</main>
      <footer style={{ marginTop: 'auto' }}>footer</footer>
    </div>
  );
}

export default App;
