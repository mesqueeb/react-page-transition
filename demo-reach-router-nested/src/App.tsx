import { PageTransition } from '@mesqueeb/react-page-transition'
import '@mesqueeb/react-page-transition/animations.css'
import { Link, Location, Router, useLocation, useMatch, type RouteComponentProps } from '@reach/router'

const NestedPage = ({ className, pageNumber }: RouteComponentProps<{ className: string; pageNumber?: number }>) => {
  const match = useMatch('*')
  return (
    <div style={{ background: `hsl(${((pageNumber ?? 1) * 123) % 360},100%,50%)`, padding: '1rem' }} className={className}>
      <h1>Nested Page {pageNumber}</h1>
      <strong>match: {JSON.stringify(match)}</strong>
    </div>
  )
}

const EmbeddedNestedPage = ({ className, x }: RouteComponentProps<{ className: string; x?: number }>) => {
  const match = useMatch('*')
  return (
    <div style={{ background: `hsl(${((x ?? 1) * 123) % 360},100%,50%)`, padding: '1rem' }} className={className}>
      <h1>Embedded Nested Page {x}</h1>
      <strong>match: {JSON.stringify(match)}</strong>
    </div>
  )
}

const EmbeddedRouter = ({ className, pageNumber }: RouteComponentProps<{ className: string; pageNumber?: number }>) => {
  const location = useLocation()
  const match = useMatch('*')
  const transitionKey = (match?.['*'] ?? '').split('/').filter(Boolean)[0]
  return (
    <div style={{ background: `hsl(${(((pageNumber ?? 1) + 10) * 123) % 360},100%,50%)`, padding: '1rem' }} className={className}>
      <div style={{ padding: '1rem', display: 'flex', gap: '1rem', alignItems: 'center' }}>
        <h1>Embedded Page {pageNumber}</h1>
        <Link to="page-a">Page A</Link>
        <Link to="page-b">Page B</Link>
        <Link to="page-c">Page C</Link>
        pathname: <strong>{location?.pathname}</strong> transitionKey: <strong>{transitionKey}</strong>
        match: <strong>{JSON.stringify(match)}</strong>
      </div>
      <Router className="fullscreen" primary={false} location={location}>
        <PageTransition
          // @ts-expect-error requirement by the now deprecated @reach/router
          path="/"
          preset="fall"
          transitionKey={transitionKey}
          className="fullscreen"
          // Adding fullscreen-child styles is a requirement because @reach/router adds an extra div you can't disable
          contentClassName="fullscreen fullscreen-child"
        >
          <EmbeddedNestedPage path="page-a" className="fullscreen" x={100} />
          <EmbeddedNestedPage path="page-b" className="fullscreen" x={101} />
          <EmbeddedNestedPage path="page-c" className="fullscreen" x={102} />
        </PageTransition>
      </Router>
    </div>
  )
}

const RelativeNestingExample = ({ className, title, background }: RouteComponentProps<{ className: string; title: string; background: string }>) => {
  const location = useLocation()
  const match = useMatch('*')
  const transitionKey = (match?.['*'] ?? '').split('/').filter(Boolean).slice(0, 2).join('/')
  return (
    <div style={{ background, padding: '1rem' }} className={className}>
      <div style={{ padding: '1rem', display: 'flex', gap: '1rem', alignItems: 'center' }}>
        <h1>{title}</h1>
        <Link to="fixed-page">Fixed Page</Link>
        <Link to="page/1">Page 1</Link>
        <Link to="page/2">Page 2</Link>
        <Link to="embedded/1">Embedded Router 1</Link>
        <Link to="embedded/2">Embedded Router 2</Link>
        pathname: <strong>{location?.pathname}</strong> transitionKey: <strong>{transitionKey}</strong>
        match: <strong>{JSON.stringify(match)}</strong>
      </div>
      <Router className="fullscreen" primary={false} location={location}>
        <PageTransition
          // @ts-expect-error requirement by the now deprecated @reach/router
          path="/"
          preset="cubeToLeft"
          transitionKey={transitionKey}
          className="fullscreen"
          // Adding fullscreen-child styles is a requirement because @reach/router adds an extra div you can't disable
          contentClassName="fullscreen fullscreen-child"
        >
          <NestedPage path="fixed-page" className="fullscreen" pageNumber={0} />
          <NestedPage path="page/:pageNumber" className="fullscreen" />
          <EmbeddedRouter path="embedded/:pageNumber/*" className="fullscreen" />
        </PageTransition>
      </Router>
    </div>
  )
}

const Page404 = ({ className }: RouteComponentProps<{ className?: string }>) => {
  return (
    <div style={{ background: 'black', color: 'white', padding: '1rem' }} className={className}>
      <h1>404</h1>
    </div>
  )
}

const HomePage = ({ className }: RouteComponentProps<{ className?: string }>) => {
  return (
    <div style={{ background: 'white', color: 'black', padding: '1rem' }} className={className}>
      <h1>Preview</h1>
      <p>Select from the menu above to dig into the nested routes</p>
    </div>
  )
}

function App() {
  return (
    <>
      <style lang="css">{globalStyles}</style>
      <div className="fullscreen">
        <div style={{ padding: '1rem', display: 'flex', gap: '1rem' }}>
          <Link to="some-page">A Top Level Page</Link>
          <Link to="another-page">Some Other Page</Link>
        </div>
        <Location>
          {({ location }) => (
            <Router className="fullscreen" location={location}>
              <PageTransition
                // @ts-expect-error requirement by the now deprecated @reach/router
                path="/"
                preset="moveToLeftFromRight"
                transitionKey={location?.pathname.split('/').filter(Boolean)[0]} // this is to make sure there is no transition when the route changes between JUST nested routes
                className="fullscreen"
                // Adding fullscreen-child styles is a requirement because @reach/router adds an extra div you can't disable
                contentClassName="fullscreen fullscreen-child"
              >
                <RelativeNestingExample title="A Top Level Page" path="some-page/*" className="fullscreen" background="goldenrod" />
                <RelativeNestingExample title="Some Other Page" path="another-page/*" className="fullscreen" background="lightseagreen" />
                <HomePage className="fullscreen" path="/" />
                <Page404 className="fullscreen" default />
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
