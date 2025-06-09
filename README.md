# React Page Transition ⚛️💨

<a href="https://www.npmjs.com/package/@mesqueeb/react-page-transition"><img src="https://img.shields.io/npm/v/@mesqueeb/react-page-transition.svg" alt="Total Downloads"></a>
<a href="https://www.npmjs.com/package/@mesqueeb/react-page-transition"><img src="https://img.shields.io/npm/dw/@mesqueeb/react-page-transition.svg" alt="Latest Stable Version"></a>

A React component that makes it easy to use the page transitions from the Codedrops Page Transitions Demo [See Original](https://tympanus.net/Development/PageTransitions/).

Many thanks to [@steveeeie/react-page-transition](https://github.com/Steveeeie/react-page-transition) for spearheading combining react-router with react-transition-group.

## Motivation

Rewritten to make the following improvements:

- ✅ Completely rewrote:
  - how css is applied to use CSS based on the original definitions (this fixed several animation bugs and added missing transitions)
  - how animations queue when rapidly changing routes (they now nicely queue to animate all with their respective durations and animations)
- ✅ Added support for Vite & react-router v6
- ✅ Upgraded TypeScript to v5
- ✅ Converted to monorepo to easily manage multiple demo apps
- ✅ Deprecated reliance on styled-components in favour of vanilla React code
- ✅ Drop support for legacy CJS in favour of ESM

Currently supports:

- ✅ Vite + React 18 + react-router (aka react-router-dom) v6
- ✅ Vite + React 18 + react-router (aka react-router-dom) v5
- ✅ Vite + React 18 + @reach/router (works but with caveats, see below)

---

<p align="center">
<img src="./assets/preview-1.gif?raw=true" alt="preview" width="100%" />  <br/>
<img src="./assets/preview-2.gif?raw=true" alt="preview" width="100%" />
</p>

---

## Usage with `react-router`

```sh
npm i @mesqueeb/react-page-transition
npm i react-router-dom@^6.30.1
```

### Code Example

The following is a minimal example of how to use `PageTransition` with `react-router` v6.

```tsx
import '@mesqueeb/react-page-transition/animations.css'
import { PageTransition } from '@mesqueeb/react-page-transition'
import { BrowserRouter, Link, Route, Routes, useLocation } from 'react-router-dom'

function RoutesWrapper() {
  const location = useLocation()
  return (
    <PageTransition preset="moveToLeftFromRight" transitionKey={location?.pathname} className="fullscreen" contentClassName="fullscreen">
      <Routes location={location}>
        <Route
          path="/"
          element={
            <div className="fullscreen" style={{ background: 'goldenrod' }}>
              <h1>Home</h1>
            </div>
          }
        />
        <Route
          path="/about"
          element={
            <div className="fullscreen" style={{ background: 'lightseagreen' }}>
              <h1>About</h1>
            </div>
          }
        />
      </Routes>
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
```

Wrap your routes inside the `PageTransition` component and pass one of the preset names to the `preset` prop. [View the presets](./react-page-transition/src/presets.ts) for the full list of presets.

You will also need to pass the current `location.path` to the `transitionKey` prop, this is so that the internal `TransitionGroup` can track which components are entering and exiting.

`PageTransition` is styled with `height: 100%`, so the parent containers need to be given a height for it to render correctly. In this code example we use `height: 100dvh`. If you have extra div layers, make sure they grow to their parent height.

## Usage with `@reach/router`

Not recommended, as `@reach/router` technically doesn't support React v18, but I did manage to make it work...

```sh
npm i @mesqueeb/react-page-transition
npm i @reach/router --force # because npm says it's not compatible with React v18
```

For the code example see [demo-reach-router](./demo-reach-router/src/App.tsx) for the minimal implementation. And remember to not use `StrictMode` anywhere, as that breaks `@reach/router` completely.

## Demo Apps

It's easy to see the demo apps:

```sh
git clone https://github.com/mesqueeb/react-page-transition.git
npm i
# then you can run the demo with:
npm run dev:demo-react-router-v6-advanced
# or
npm run dev:demo-react-router-v6
# or
npm run dev:demo-react-router-v5
```

## Props

| Prop             | Required | Type              | Description                                                         |
| ---------------- | -------- | ----------------- | ------------------------------------------------------------------- |
| `preset`         | No       | String            | Sets the enter and exit animations \*                               |
| `enterAnimation` | No       | String            | Sets the enter animation \*                                         |
| `exitAnimation`  | No       | String            | Sets the exit animation \*                                          |
| `transitionKey`  | Yes      | Unique Identifier | Used internally to track which components are entering and exiting. |
