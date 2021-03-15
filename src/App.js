import logo from './logo.svg';
import './App.css';
import Toolbar from './components/Toolbar';
import MessageList from './components/MessageList';

function App() {
  return (
    <div className="App">
      <Toolbar />
      <MessageList />
    </div>
  );
}

export default App;
