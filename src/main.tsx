import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import AuthProvider from './context/AuthContext.tsx'
import { CarProvider } from './context/CarContex.tsx'

import { register } from 'swiper/element/bundle'

register();
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <CarProvider>
      <AuthProvider>
        <App />
      </AuthProvider>
    </CarProvider>
  </StrictMode>,
)
