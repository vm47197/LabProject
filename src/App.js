import AppProvider from './providers/AppProvider.js';
import Routes from './Routes';
import { useEffect } from 'react';
import axios from 'axios';
import './App.css';
import {Button} from 'react-bootstrap';
function App() {
  return (
    <AppProvider>
      <Routes></Routes>
    </AppProvider>
  );
}

export default App;
