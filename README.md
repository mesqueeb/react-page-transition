# React Page Transition

⚛️💨 A React component that makes it easy to use the page transitions from the Codedrops Page Transitions Demo [See Original](https://tympanus.net/Development/PageTransitions/).

## Version Support

This package was forked from [@steveeeie/react-page-transition](https://github.com/Steveeeie/react-page-transition).

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

### 1. Install Package

`npm i @mesqueeb/react-page-transition`

### 2. Install Peer Dependencies

`npm i react-router-dom@^6.30.1`

### 3. Code Example

#### App.js

```tsx
import { PageTransition } from '@mesqueeb/react-page-transition'
import React, { type CSSProperties } from 'react'
import { BrowserRouter, Link, Route, Routes, useLocation } from 'react-router-dom'

function RoutesWrapper() {
  const location = useLocation()
  return (
    <PageTransition preset="moveToLeftFromRight" transitionKey={location?.pathname}>
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

#### styles.css

```css
html,
body,
#root {
  height: 100dvh;
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
