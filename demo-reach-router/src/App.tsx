import { PageTransition } from '@mesqueeb/react-page-transition'
import { Link, Location, Router, type RouteComponentProps } from '@reach/router'

const Home = ({ className }: { className: string } & RouteComponentProps) => (
  <div style={{ background: 'goldenrod' }} className={className}>
    <h1>Home</h1>
  </div>
)

const About = ({ className }: { className: string } & RouteComponentProps) => (
  <div style={{ background: 'lightseagreen' }} className={className}>
    <h1>About</h1>
  </div>
)

function App() {
  return (
    <>
      <style lang="css">{globalStyles}</style>
      <div className="fullscreen">
        <Link to="/">Home</Link>
        <Link to="about">About</Link>
        <Location>
          {({ location }) => (
            <Router className="fullscreen" primary={false} location={location}>
              <PageTransition
                // @ts-expect-error requirement by the now deprecated @reach/router
                path="/"
                preset="moveToLeftFromRight"
                transitionKey={location?.pathname}
                className="fullscreen"
                // Adding fullscreen-child styles is a requirement because @reach/router adds an extra div you can't disable
                contentClassName="fullscreen fullscreen-child"
              >
                <Home path="/" className="fullscreen" />
                <About path="about" className="fullscreen" />
              </PageTransition>
            </Router>
          )}
        </Location>
      </div>
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
.fullscreen-child > * {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: stretch;
}
`

export default App
