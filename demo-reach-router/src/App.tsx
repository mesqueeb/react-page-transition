import { Link, Router } from '@reach/router'
import './styles.css'

// const Home = ({ style }: { style: CSSProperties }) => (
//   <div style={{ ...style, background: 'goldenrod' }}>
//     <h1>Home</h1>
//   </div>
// )

// const About = ({ style }: { style: CSSProperties }) => (
//   <div style={{ ...style, background: 'lightseagreen' }}>
//     <h1>About</h1>
//   </div>
// )

// function RoutesWrapper() {
//   const location = useLocation()
//   return (
//     // <PageTransition
//     //   preset="moveToLeftFromRight"
//     //   transitionKey={location?.pathname}
//     //   style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'stretch' }}
//     //   contentStyle={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'stretch' }}
//     // >
//     <Router style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'stretch' }}>
//       {/* <Routes location={location}> */}
//       <Home path="/" style={{ flex: 1 }} />
//       <About path="/about" style={{ flex: 1 }} />
//       {/* </Routes> */}
//     </Router>
//     // </PageTransition>
//   )
// }

// function App() {
//   return (
//     <React.StrictMode>
//       <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'stretch' }}>
//         <Link to="/">Home</Link>
//         <Link to="about">About</Link>
//         <Router
//           style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'stretch' }}
//         >
//           {/* <Link to="/">Home</Link>
//         <Link to="/about">About</Link> */}
//           <Home path="/" style={{ flex: 1 }} />
//           <About path="about" style={{ flex: 1 }} />
//         </Router>
//       </div>
//     </React.StrictMode>
//   )
// }

// FROM: https://codesandbox.io/p/sandbox/lyzwj8w0qz?file=%2Fsrc%2Findex.js%3A5%2C1&from-embed
const App = ({ children }) => (
  <div>
    <nav>
      <Link to="/">Home</Link> <Link to="dashboard">Dashboard</Link>
    </nav>
    <Router>
      <Home path="/" />
      <Dashboard path="dashboard" />
    </Router>
  </div>
)

const Home = () => (
  <div>
    <h2>Welcome</h2>
  </div>
)

const Dashboard = () => (
  <div>
    <h2>Dashboard</h2>
  </div>
)

export default App
