import { PageTransition } from '@mesqueeb/react-page-transition'
import '@mesqueeb/react-page-transition/animations.css'
import { Link, Location, Router, useLocation, type RouteComponentProps } from '@reach/router'

const NestedPage = ({ className, pageNumber }: { className: string; pageNumber: number } & RouteComponentProps) => (
  <div style={{ background: `hsl(${(pageNumber * 123) % 360},100%,50%)`, color: 'white', padding: '1rem' }} className={className}>
    <h1>Page {pageNumber}</h1>
  </div>
)

const RelativeNestingExample = ({ className }: { className: string } & RouteComponentProps) => {
  const location = useLocation()
  return (
    <div style={{ background: 'goldenrod', padding: '1rem' }} className={className}>
      <div style={{ padding: '1rem', display: 'flex', gap: '1rem', alignItems: 'center' }}>
        <h1>Nested Via Relative Paths</h1>
        <Link to="page-1">Page 1</Link>
        <Link to="/relative-nesting/page-2">Page 2</Link>
        pathname: {location?.pathname}
      </div>
      <Router className="fullscreen" primary={false} location={location}>
        <PageTransition
          // @ts-expect-error requirement by the now deprecated @reach/router
          path="/"
          preset="cubeToLeft"
          transitionKey={location?.pathname}
          className="fullscreen"
          // Adding fullscreen-child styles is a requirement because @reach/router adds an extra div you can't disable
          contentClassName="fullscreen fullscreen-child"
        >
          <NestedPage path="page-1" className="fullscreen" pageNumber={1} />
          <NestedPage path="page-2" className="fullscreen" pageNumber={2} />
        </PageTransition>
      </Router>
    </div>
  )
}

const SomeOtherPage = ({ className }: { className: string } & RouteComponentProps) => {
  return (
    <div style={{ background: 'lightseagreen', padding: '1rem' }} className={className}>
      <h1>Some Other Page</h1>
    </div>
  )
}

function App() {
  return (
    <>
      <style lang="css">{globalStyles}</style>
      <div className="fullscreen">
        <div style={{ padding: '1rem', display: 'flex', gap: '1rem' }}>
          <Link to="relative-nesting">Nested Via Sub Paths</Link>
          <Link to="other-page">Some Other Page</Link>
        </div>
        <Location>
          {({ location }) => (
            <Router className="fullscreen" primary={false} location={location}>
              <PageTransition
                // @ts-expect-error requirement by the now deprecated @reach/router
                path="/"
                preset="moveToLeftFromRight"
                transitionKey={location?.pathname.split('/').filter(Boolean)[0]} // this is to make sure there is no transition when the route changes between JUST nested routes
                className="fullscreen"
                // Adding fullscreen-child styles is a requirement because @reach/router adds an extra div you can't disable
                contentClassName="fullscreen fullscreen-child"
              >
                <RelativeNestingExample path="relative-nesting/*" className="fullscreen" />
                <SomeOtherPage path="other-page" className="fullscreen" />
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
