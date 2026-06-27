import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import './index.css'
import App from './App.jsx'
import { ThemeProvider } from './context/ThemeContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <ThemeProvider>
        <App />
        <Toaster 
          position="top-right"
          toastOptions={{
            style: {
              background: 'var(--clay-surface)',
              color: 'var(--clay-text-primary)',
              border: '1px solid var(--clay-border-light)',
              borderRadius: '12px',
              boxShadow: 'var(--clay-shadow-md)',
              fontWeight: '600',
              fontSize: '0.875rem',
            },
            success: {
              iconTheme: { primary: '#22c55e', secondary: 'white' },
            },
            error: {
              iconTheme: { primary: '#ef4444', secondary: 'white' },
            },
          }}
        />
      </ThemeProvider>
    </BrowserRouter>
  </StrictMode>,
)
