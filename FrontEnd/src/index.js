//========💨AwalRegion_Import_Dependencies💨=====
// Import library React dan dependencies utama
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
//========💧AkhirRegion_Import_Dependencies💧=====

//========💨AwalRegion_App_Initialization💨=====
// Inisialisasi root element dan render aplikasi utama
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
//========💧AkhirRegion_App_Initialization💧=====
