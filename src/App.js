import './App.css';
import RegisterForm from './pages/register';
import { AlertProvider } from './services/alertService';

function App() {
  return (
    <AlertProvider>
      <div className='container'>
        <RegisterForm />
      </div>
    </AlertProvider>
  );
}

export default App;
