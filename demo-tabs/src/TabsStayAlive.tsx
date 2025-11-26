import { useTabs } from '@mesqueeb/react-page-transition'
import '@mesqueeb/react-page-transition/animations.css'
import { useState, type CSSProperties } from 'react'

const Home = ({ className, style }: { className: string; style: CSSProperties }) => {
  const [count, setCount] = useState(0)

  return (
    <div className={className} style={{ background: 'goldenrod', ...style }}>
      <h1>Home</h1>
      <p>Count: {count}</p>
      <button onClick={() => setCount((c) => c + 1)}>+</button>
    </div>
  )
}

const About = ({ className, style }: { className: string; style: CSSProperties }) => {
  const [count, setCount] = useState(0)

  return (
    <div className={className} style={{ background: 'lightseagreen', ...style }}>
      <h1>About</h1>
      <p>Count: {count}</p>
      <button onClick={() => setCount((c) => c + 1)}>+</button>
    </div>
  )
}

type TAB = 'home' | 'about'

function TabsWrapper({ activeTab }: { activeTab: TAB }) {
  const { tabs } = useTabs({
    activeTab,
    tabNames: ['home', 'about'],
    animation: 'slide',
  })

  const absolute: CSSProperties = { position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }
  return (
    <div className="fullscreen" style={{ position: 'relative', overflow: 'hidden' }}>
      <Home className={tabs.home.className} style={{ ...tabs.home.style, ...absolute }} />
      <About className={tabs.about.className} style={{ ...tabs.about.style, ...absolute }} />
    </div>
  )
}

export function Tabs() {
  const [activeTab, setActiveTab] = useState<TAB>('home')

  return (
    <>
      <style lang="css">{globalStyles}</style>
      <button onClick={() => setActiveTab('home')}>Home</button>
      <button onClick={() => setActiveTab('about')}>About</button>
      <TabsWrapper activeTab={activeTab} />
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
  position: relative;
}
`
