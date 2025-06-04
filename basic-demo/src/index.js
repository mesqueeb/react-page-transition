import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Switch, Route, Link } from "react-router-dom";
import { PageTransition } from "@steveeeie/react-page-transition";
import "./styles.css";

const Links = () => (
  <>
    <Link to="/">Home</Link>
    <Link to="/about">About</Link>
  </>
);

const Home = () => <h1>Home</h1>;

const About = () => <h1>About</h1>;

function App() {
  return (
    <React.StrictMode>
      <BrowserRouter>
        <Links />
        <Route
          render={({ location }) => {
            return (
              <PageTransition
                preset="moveToLeftFromRight"
                transitionKey={location.pathname}
              >
                <Switch location={location}>
                  <Route exact path="/" component={Home} />
                  <Route exact path="/about" component={About} />
                </Switch>
              </PageTransition>
            );
          }}
        />
      </BrowserRouter>
    </React.StrictMode>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));
