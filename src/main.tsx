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
import 'swiper/css/scrollbar'
import { Toaster } from 'react-hot-toast'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
        <Toaster
          position="top-center"
          reverseOrder={false}
        />
    <CarProvider>
      <AuthProvider>
        <App />
      </AuthProvider>
    </CarProvider>
  </StrictMode>,
)
