import { PageTransition } from '@mesqueeb/react-page-transition'
import React, { type CSSProperties } from 'react'
import { BrowserRouter, Link, Route, Routes, useLocation } from 'react-router-dom'
import './styles.css'

const Home = ({ style }: { style: CSSProperties }) => (
  <div style={{ ...style, background: 'goldenrod' }}>
    <h1>Home</h1>
  </div>
)

const About = ({ style }: { style: CSSProperties }) => (
  <div style={{ ...style, background: 'lightseagreen' }}>
    <h1>About</h1>
  </div>
)

function RoutesWrapper() {
  const location = useLocation()
  return (
    <PageTransition
      preset="moveToLeftFromRight"
      transitionKey={location?.pathname}
      style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'stretch' }}
      contentStyle={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'stretch' }}
    >
      <Routes location={location}>
        <Route path="/" element={<Home style={{ flex: 1 }} />} />
        <Route path="/about" element={<About style={{ flex: 1 }} />} />
      </Routes>
    </PageTransition>
  )
}

function App() {
  return (
    <React.StrictMode>
      <BrowserRouter>
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
        <RoutesWrapper />
      </BrowserRouter>
    </React.StrictMode>
  )
}

export default App
