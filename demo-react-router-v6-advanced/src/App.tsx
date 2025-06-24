import { PageTransition, presets, presetsInfo, type Preset, type PresetId } from '@mesqueeb/react-page-transition'
import '@mesqueeb/react-page-transition/animations.css'
import { useState } from 'react'
import { BrowserRouter, Link, Route, Routes, useLocation, useNavigate, useSearchParams } from 'react-router-dom'
import { pages } from './pages'

function RoutesWrapper() {
  const location = useLocation()
  const [searchParams, setSearchParams] = useSearchParams()
  const [preset, setPreset] = useState<PresetId>((searchParams.get('preset') as PresetId) || 'moveToLeftFromRight')

  function selectPreset(x: 'next' | 'previous' | PresetId) {
    let nextPreset: PresetId | undefined
    if (x === 'next' || x === 'previous') {
      const presetEntries = Object.entries(presets) as [PresetId, Preset][]
      const currentPresetEntryIndex = presetEntries.findIndex(([key]) => key === preset)
      const nextPresetEntry = presetEntries[currentPresetEntryIndex + (x === 'next' ? 1 : -1)]
      if (nextPresetEntry) {
        nextPreset = nextPresetEntry[0]
      }
    } else {
      nextPreset = x
    }
    if (nextPreset) {
      setSearchParams({ preset: nextPreset })
      setPreset(nextPreset)
    }
  }

  return (
    <>
      <PageControls preset={preset} selectPreset={selectPreset} />
      <PageTransition preset={preset} transitionKey={location?.pathname} className="fullscreen" contentClassName="fullscreen">
        <Routes location={location}>
          {pages.map((page) => (
            <Route
              key={page.path}
              path={page.path}
              element={
                <div style={{ flex: 1, background: page.color, padding: '16px', color: 'white' }}>
                  <h1>{page.title}</h1>
                  <div className="fancy-title">{page.title}</div>
                </div>
              }
            />
          ))}
        </Routes>
      </PageTransition>
    </>
  )
}

function PageControls({ preset, selectPreset }: { preset: PresetId; selectPreset: (x: 'next' | 'previous' | PresetId) => void }) {
  const location = useLocation()
  const currentIndex = pages.findIndex((page) => page.path === location.pathname)
  const nextPage = pages[currentIndex + 1 === pages.length ? 0 : currentIndex + 1]

  const groups: { [groupName in string]: { value: string; label: string }[] } = {}
  for (const [key, info] of Object.entries(presetsInfo)) {
    groups[info.group] = groups[info.group] || []
    groups[info.group].push({ value: key, label: info.label })
  }
  const navigate = useNavigate()

  return (
    <div style={{ display: 'flex', gap: '16px', padding: '16px' }}>
      <button
        onClick={() => {
          selectPreset('next')
          setTimeout(() => navigate(nextPage.path + '?preset=' + preset), 0)
        }}
      >
        Next Preset and Page
      </button>
      OR
      <Link to={nextPage.path + '?preset=' + preset}>Next Page</Link>
      Preset:
      <button onClick={() => selectPreset('previous')}>←</button>
      <select value={preset} onChange={(e) => selectPreset(e.target.value as PresetId)}>
        {Object.entries(groups).map(([groupName, presets]) => (
          <optgroup key={groupName} label={groupName}>
            {presets.map(({ value, label }) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </optgroup>
        ))}
      </select>
      <button onClick={() => selectPreset('next')}>→</button>
    </div>
  )
}

function App() {
  return (
    <>
      <style lang="css">{globalStyles}</style>
      <BrowserRouter basename="/react-page-transition">
        <RoutesWrapper />
        <AuthorCredits />
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

function AuthorCredits() {
  return (
    <p style={{ padding: '16px', textAlign: 'center', position: 'fixed', bottom: 0, left: 0, right: 0, color: 'white' }}>
      Made with 💜 by Luca Ban - mesqueeb
      <a href="https://github.com/mesqueeb/react-page-transition#readme" style={{ color: 'LightSteelBlue', marginLeft: '8px' }}>
        GITHUB
      </a>
    </p>
  )
}

export default App
