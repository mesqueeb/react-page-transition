# React Page Transition

⚛️💨 A React component that makes it easy to use the page transitions from the Codedrops Page Transitions Demo [See Original](https://tympanus.net/Development/PageTransitions/).

## Version Support

This package was forked from [@steveeeie/react-page-transition](https://github.com/Steveeeie/react-page-transition).

Currently supports:

- ✅ Vite + React 18 + react-router & react-router-dom ^5.2.0
- 🏗️ [WIP] Vite + React 18 + reach-router 1.3.4

---

<p align="center">
<img src="./assets/preview-1.gif?raw=true" alt="preview" width="100%" />  <br/>
<img src="./assets/preview-2.gif?raw=true" alt="preview" width="100%" />
</p>

---

## Usage with `react-router`

### 1. Install Package

`npm i @mesqueeb/react-page-transition`

### 2. Install Peer Dependencies

`npm i react-router@^5.2.0 react-router-dom@^5.2.0`

### 3. Code Example

#### App.js

```jsx
import React from 'react'
import { BrowserRouter, Switch, Route, Link } from 'react-router-dom'
import { PageTransition } from '@mesqueeb/react-page-transition'
import './styles.css'

const Home = (props) => <h1>Home</h1>

const About = (props) => <h1>About</h1>

export default function App() {
  return (
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
  )
}
```

Wrap your routes inside the `PageTransition` component and pass one of the preset names to the `preset` prop. [View the advanced demo](https://codesandbox.io/s/advanced-react-page-transition-demo-z8hmd) for the full list of presets.

You will also need to pass the current `location.path` to the `transitionKey` prop, this is so that the internal `TransitionGroup` can track which components are entering and exiting.

#### styles.css

```css
html,
body,
#root {
  height: 100%;
}
```

`PageTransition` is styled with `height: 100%`. The parent containers need to be given a height for it to render correctly because of this.

## Props

| Prop             | Required | Type              | Description                                                         |
| ---------------- | -------- | ----------------- | ------------------------------------------------------------------- |
| `preset`         | No       | String            | Sets the enter and exit animations \*                               |
| `enterAnimation` | No       | String            | Sets the enter animation \*                                         |
| `exitAnimation`  | No       | String            | Sets the exit animation \*                                          |
| `transitionKey`  | Yes      | Unique Identifier | Used internally to track which components are entering and exiting. |

##### \* [View the advanced demo](https://codesandbox.io/s/advanced-react-page-transition-demo-z8hmd) for the full list of presets and animations.
