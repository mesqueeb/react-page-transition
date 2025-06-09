import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './styles.css'

createRoot(document.getElementById('root')!).render(<App />)

// for some reason adding `StrictMode` adds a white border at the bottom of the browser,
// the root element won't stretch to the bottom anymore, so we're not going to use StrictMode for this demo.
