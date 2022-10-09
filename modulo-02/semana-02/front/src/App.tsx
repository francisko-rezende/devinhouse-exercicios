import { Header } from './components/Header';
import { Icon } from './components/Icon';

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
        <h1 style={{ display: 'flex', gap: '1rem' }}>
          <Icon />
          Pizzaria divina pizza
        </h1>
      </Header>
      <main>body</main>
      <footer style={{ marginTop: 'auto' }}>footer</footer>
    </div>
  );
}

export default App;
