import { Header } from './components/Header';
import { Icon } from './components/Icon';
import { Main } from './components/Main';

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
        <h1 style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
          <Icon />
          Pizzaria divina pizza
        </h1>
      </Header>
      <Main />
      <footer style={{ marginTop: 'auto' }}>footer</footer>
    </div>
  );
}

export default App;
