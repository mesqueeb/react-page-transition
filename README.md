# React Page Transition ⚛️💨

<a href="https://www.npmjs.com/package/@mesqueeb/react-page-transition"><img src="https://img.shields.io/npm/v/@mesqueeb/react-page-transition.svg" alt="Total Downloads"></a>
<a href="https://www.npmjs.com/package/@mesqueeb/react-page-transition"><img src="https://img.shields.io/npm/dw/@mesqueeb/react-page-transition.svg" alt="Latest Stable Version"></a>

```sh
npm i @mesqueeb/react-page-transition
```

A React component that makes it easy to use the page transitions from the Codedrops Page Transitions Demo. See original demo: [tympanus.net/Development/PageTransitions/](https://tympanus.net/Development/PageTransitions/).

Many thanks to [@steveeeie](https://github.com/Steveeeie/react-page-transition) for spearheading combining react-router with react-transition-group.

---

<p align="center">
<img src="./assets/preview-1.gif?raw=true" alt="preview" width="48%" />
<img src="./assets/preview-2.gif?raw=true" alt="preview" width="48%" />
</p>

---

## Motivation

I've started from a base of steveeeie but ended up completely rewriting all the code from scratch to make sure of the following support and improvements:

React support:

- ✅ Vite + React 18 + react-router (aka react-router-dom) v6
- ✅ Vite + React 18 + react-router (aka react-router-dom) v5
- ✅ Vite + React 18 + @reach/router (works but with caveats, see below)

Features:

- ✅ This is a CSS based implementation, where it relies on a `page-transition-` classes (you can [bring your own](#bring-your-own-animations) animations)
- ✅ Page transitions are queued so rapidly changing the route will animate all transitions in order with their respective durations and animations.
- ✅ Support for Vite & react-router v6
- ✅ Monorepo hosts all demo apps to easily verify version support
- ✅ The reactJS official [react-transition-group](https://github.com/reactjs/react-transition-group) as only dependency
- ✅ ESM only, to help move the industry forward

## Usage with `react-router`

```sh
npm i @mesqueeb/react-page-transition
npm i react-router-dom@^6.30.1
```

### Code example

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

## List of presets

The available presets are all those from the original Codrops demo. You can choose a preset by passing it to the `preset` prop, like so:

```tsx
<PageTransition preset="moveToLeftFromRight">
```

Some of my favourites:

```ts
export type PresetId = 'fall' | 'newspaper' | 'moveToLeftFromRight' | 'moveToRightFromLeft' | 'slide' | 'cubeToLeft' | 'cubeToRight'
// and many more
```

Full list available at [presets](./react-page-transition/src/presets.ts).

I added four new presets as well:

```ts
;'slideOverToLeftFromRight' | 'slideOverToRightFromLeft' | 'slideOverToTopFromBottom' | 'slideOverToBottomFromTop'
```

And you can bring your own.

## Bring your own animations

If you look at the [animations.css](./react-page-transition/src/animations.css) file you'll see the css defined for the transitions as per the original Codrops demo. To defining your own, you can copy some of the definitions and tweak them to your liking. Make sure those styles are somewhere available in your app's stylesheets.

<!-- prettier-ignore-start -->
```css
@keyframes myAnimationToLeft     { from { } to { transform: translateX(-100%) }/* tweak these */ } .page-transition-myAnimationToLeft     { animation: moveToLeft .6s ease both     }
@keyframes myAnimationFromLeft   { from { transform: translateX(-100%) }       /* tweak these */ } .page-transition-myAnimationFromLeft   { animation: moveFromLeft .6s ease both   }
@keyframes myAnimationToRight    { from { } to { transform: translateX(100%) } /* tweak these */ } .page-transition-myAnimationToRight    { animation: moveToRight .6s ease both    }
@keyframes myAnimationFromRight  { from { transform: translateX(100%) }        /* tweak these */ } .page-transition-myAnimationFromRight  { animation: moveFromRight .6s ease both  }
```
<!-- prettier-ignore-end -->

Then you would run the transition like so:

<!-- prettier-ignore-start -->
```tsx
<PageTransition
  preset={{
    exit: { name: 'myAnimationToLeft' },
    enter: { name: 'myAnimationFromLeft', delay: 100, onTop: true }
  }}
  transitionKey={location?.pathname}
  className="fullscreen"
  contentClassName="fullscreen"
>
  <Routes location={location}>{/* ... */}</Routes>
</PageTransition>
```
<!-- prettier-ignore-end -->

The fullscreen classes are optional and do not come bundled with this package, so if you need to make the page transition fullscreen, you'll need to define them yourself.

The `preset` prop is typed as follows:

```ts
export type AnimationMeta = {
  name: AnimationName
  delay?: number
  onTop?: boolean
}
export type Preset = {
  exit: AnimationMeta
  enter: AnimationMeta
}
```

## Demo apps

It's easy to open and play with the demo app(s):

```sh
git clone https://github.com/mesqueeb/react-page-transition.git
npm i
# then you can run the demo with:
npm run dev:demo-react-router-v6-advanced
```

There are also other demos for version support testing:

```sh
npm run dev:demo-react-router-v6
npm run dev:demo-react-router-v5
npm run dev:demo-reach-router
```

# License

```
WWWWWW||WWWWWW
 W W W||W W W
      ||
    ( OO )__________
     /  |           \
    /o o|    MIT     \
    \___/||_||__||_|| *
         || ||  || ||
        _||_|| _||_||
       (__|__|(__|__|
```
