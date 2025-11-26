import '@mesqueeb/react-page-transition/animations.css'
import { useState } from 'react'
import { Tabs } from './Tabs'
import { Tabs as TabsStayAlive } from './TabsStayAlive'

function App() {
  const [selectedComponent, setSelectedComponent] = useState<'tabs' | 'tabsStayAlive'>('tabs')

  return (
    <>
      <div style={{ display: 'flex', gap: '16px', padding: '8px' }}>
        <h3>Select Component:</h3>
        <label>
          <input type="radio" name="component" value="tabs" checked={selectedComponent === 'tabs'} onChange={(e) => setSelectedComponent(e.target.value as 'tabs')} />
          Tabs
          <br />
          (components unmount/remount)
        </label>
        <label>
          <input type="radio" name="component" value="tabsStayAlive" checked={selectedComponent === 'tabsStayAlive'} onChange={(e) => setSelectedComponent(e.target.value as 'tabsStayAlive')} />
          TabsStayAlive
          <br />
          (components stay mounted)
        </label>
      </div>
      {selectedComponent === 'tabs' && <Tabs />}
      {selectedComponent === 'tabsStayAlive' && <TabsStayAlive />}
    </>
  )
}

export default App
