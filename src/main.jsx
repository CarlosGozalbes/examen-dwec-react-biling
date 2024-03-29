import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import ImagesProvider from './context/galeria.jsx'
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ImagesProvider>
    <App />
    </ImagesProvider>
  </React.StrictMode>,
)
