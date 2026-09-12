import React from 'react'
import ReactDOM from 'react-dom/client'
import { MotionConfig } from 'motion/react'
import App from './App'
import SmoothScrollProvider from './providers/SmoothScrollProvider'
import './styles/global.css'
import './styles/tailwind.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <MotionConfig reducedMotion="user">
      <SmoothScrollProvider>
        <App />
      </SmoothScrollProvider>
    </MotionConfig>
  </React.StrictMode>
)
