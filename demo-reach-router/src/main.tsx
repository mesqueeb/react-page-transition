import { createRoot } from 'react-dom/client'
import App from './App.tsx'

/**
 * `@reach/router` does work with React v18 but not with `StrictMode`!
 *
 * @see https://github.com/reach/router/issues/504
 */
createRoot(document.getElementById('root')!).render(<App />)
