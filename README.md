# React Page Transition ⚛️💨

<a href="https://www.npmjs.com/package/@mesqueeb/react-page-transition"><img src="https://img.shields.io/npm/v/@mesqueeb/react-page-transition.svg" alt="Total Downloads"></a>
<a href="https://www.npmjs.com/package/@mesqueeb/react-page-transition"><img src="https://img.shields.io/npm/dw/@mesqueeb/react-page-transition.svg" alt="Latest Stable Version"></a>

A React component that makes it easy to use the page transitions from the Codedrops Page Transitions Demo [See Original](https://tympanus.net/Development/PageTransitions/).

## Version Support

Many thanks to [@steveeeie/react-page-transition](https://github.com/Steveeeie/react-page-transition) for spearheading combining react-router with react-transition-group.

Improvements made:

- ✅ Added support for Vite & react-router v6
- ✅ Upgraded TypeScript to v5
- ✅ Converted to monorepo to easily manage multiple demo apps
- ✅ Deprecated reliance on styled-components in favour of vanilla React code
- ✅ Drop support for legacy CJS in favour of ESM

Currently supports:

- ✅ Vite + React 18 + react-router (aka react-router-dom) v5
- ✅ Vite + React 18 + react-router (aka react-router-dom) v6
- 🏗️ [WIP] Vite + React 18 + reach-router 1.3.4

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

```tsx
import { PageTransition } from '@mesqueeb/react-page-transition'
import React, { type CSSProperties } from 'react'
import { BrowserRouter, Link, Route, Routes, useLocation } from 'react-router-dom'

function RoutesWrapper() {
  const location = useLocation()
  return (
    <PageTransition preset="moveToLeftFromRight" transitionKey={location?.pathname}>
      {/* MUST pass `location` for it to work correctly! */}
      <Routes location={location}>
        <Route path="/" element={<h1>Home</h1>} />
        <Route path="/about" element={<h1>About</h1>} />
      </Routes>
    </PageTransition>
  )
}

function App() {
  return (
    <React.StrictMode>
      <style lang="css">{`html, body, #root { height: 100dvh }`}</style>
      <BrowserRouter>
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
        <RoutesWrapper />
      </BrowserRouter>
    </React.StrictMode>
  )
}
```

Wrap your routes inside the `PageTransition` component and pass one of the preset names to the `preset` prop. [View the presets](./react-page-transition/src/presets.ts) for the full list of presets.

You will also need to pass the current `location.path` to the `transitionKey` prop, this is so that the internal `TransitionGroup` can track which components are entering and exiting.

`PageTransition` is styled with `height: 100%`, so the parent containers need to be given a height for it to render correctly. In this code example we use `height: 100dvh`. If you have extra div layers, make sure they grow to their parent height.

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
