import { PageTransition, presets } from '@mesqueeb/react-page-transition'
import { useState } from 'react'
import { BrowserRouter, Link, Route, Routes, useLocation } from 'react-router-dom'
import { pages } from './pages'

function RoutesWrapper({ preset }: { preset: string }) {
  const location = useLocation()
  return (
    <PageTransition
      preset={preset}
      transitionKey={location?.pathname}
      className="fullscreen"
      contentClassName="fullscreen"
    >
      <Routes location={location}>
        {pages.map((page) => (
          <Route
            key={page.path}
            path={page.path}
            element={
              <div style={{ flex: 1, background: page.color, padding: '16px', color: 'white' }}>
                <h1>{page.title}</h1>
              </div>
            }
          />
        ))}
      </Routes>
    </PageTransition>
  )
}

function PageControls({
  preset,
  selectNextPreset,
  setPreset,
}: {
  preset: string
  selectNextPreset: () => void
  setPreset: (preset: string) => void
}) {
  const location = useLocation()
  const currentIndex = pages.findIndex((page) => page.path === location.pathname)

  return (
    <div style={{ display: 'flex', gap: '16px', padding: '16px' }}>
      <Link to={pages[currentIndex + 1 === pages.length ? 0 : currentIndex + 1].path}>
        Next Page
      </Link>
      <button onClick={selectNextPreset}>Next Preset</button>
      <select value={preset} onChange={(e) => setPreset(e.target.value)}>
        {Object.keys(presets).map((key) => (
          <option key={key} value={key}>
            {key}
          </option>
        ))}
      </select>
    </div>
  )
}

function App() {
  const [preset, setPreset] = useState('moveToLeftFromRight')
  function selectNextPreset() {
    const presetEntries = Object.entries(presets)
    const currentPresetEntryIndex = presetEntries.findIndex(([key]) => key === preset)
    const nextPresetEntry = presetEntries[currentPresetEntryIndex + 1]
    if (nextPresetEntry) {
      setPreset(nextPresetEntry[0])
    }
  }
  return (
    <>
      <style lang="css">{globalStyles}</style>
      <BrowserRouter>
        <PageControls preset={preset} setPreset={setPreset} selectNextPreset={selectNextPreset} />
        <RoutesWrapper preset={preset} />
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
