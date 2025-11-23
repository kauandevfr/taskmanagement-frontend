import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import Footer from './components/Footer'
import { GlobalProvider } from './providers/globalContext'
import MainRoutes from './routes'
import './styles/global.scss'
import "./styles/responsiveness.scss"

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <GlobalProvider>
      <BrowserRouter>
        <MainRoutes />
        <Footer />
      </BrowserRouter>
    </GlobalProvider>
  </React.StrictMode>,
)
