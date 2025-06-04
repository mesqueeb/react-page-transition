import { PageTransition } from '@mesqueeb/react-page-transition'
import React, { type CSSProperties } from 'react'
import { BrowserRouter, Link, Route, Switch, useLocation } from 'react-router-dom'
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
      <Switch location={location}>
        <Route exact path="/">
          <Home style={{ flex: 1 }} />
        </Route>
        <Route exact path="/about">
          <About style={{ flex: 1 }} />
        </Route>
      </Switch>
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
