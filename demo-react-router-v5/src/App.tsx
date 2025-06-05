import { PageTransition } from '@mesqueeb/react-page-transition'
import { BrowserRouter, Link, Route, Switch, useLocation } from 'react-router-dom'

const Home = ({ className }: { className: string }) => (
  <div className={className} style={{ background: 'goldenrod' }}>
    <h1>Home</h1>
  </div>
)

const About = ({ className }: { className: string }) => (
  <div className={className} style={{ background: 'lightseagreen' }}>
    <h1>About</h1>
  </div>
)

function RoutesWrapper() {
  const location = useLocation()
  return (
    <PageTransition
      preset="moveToLeftFromRight"
      transitionKey={location?.pathname}
      className="fullscreen"
      contentClassName="fullscreen"
    >
      <Switch location={location}>
        <Route exact path="/">
          <Home className="fullscreen" />
        </Route>
        <Route exact path="/about">
          <About className="fullscreen" />
        </Route>
      </Switch>
    </PageTransition>
  )
}

function App() {
  return (
    <>
      <style lang="css">{globalStyles}</style>
      <BrowserRouter>
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
        <RoutesWrapper />
      </BrowserRouter>
    </>
  )
}

/** Global styles defined here just to keep the example self-contained */
const globalStyles = `
html, body, #root {
  margin: 0;
  width: 100dvw;
  height: 100dvh;
  display: flex;
  flex-direction: column;
  align-items: stretch;
}
.fullscreen {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: stretch;
}
`

export default App
