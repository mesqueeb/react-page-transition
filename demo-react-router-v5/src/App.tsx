import { PageTransition } from '@mesqueeb/react-page-transition'
import React from 'react'
import { BrowserRouter, Link, Route, Switch } from 'react-router-dom'
import './styles.css'

const Home = () => <h1>Home</h1>

const About = () => <h1>About</h1>

function App() {
  return (
    <React.StrictMode>
      <BrowserRouter>
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
        <Route
          render={({ location }) => {
            return (
              <PageTransition preset="moveToLeftFromRight" transitionKey={location.pathname}>
                <Switch location={location}>
                  <Route exact path="/" component={Home} />
                  <Route exact path="/about" component={About} />
                </Switch>
              </PageTransition>
            )
          }}
        />
      </BrowserRouter>
    </React.StrictMode>
  )
}

export default App
