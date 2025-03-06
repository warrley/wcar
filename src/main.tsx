import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import AuthProvider from './context/AuthContext.tsx'
import { CarProvider } from './context/CarContex.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <CarProvider>
      <AuthProvider>
        <App />
      </AuthProvider>
    </CarProvider>
  </StrictMode>,
)
