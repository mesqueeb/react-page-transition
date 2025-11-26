import { PageTransition } from '@mesqueeb/react-page-transition'
import '@mesqueeb/react-page-transition/animations.css'
import { useState } from 'react'

const Home = ({ className }: { className: string }) => (
  <div className={className} style={{ background: 'goldenrod' }}>
    <h1>Home</h1>
  </div>
)

const About = ({ className }: { className: string }) => (
  <div className={className} style={{ background: 'lightseagreen' }}>
    <h1>About</h1>
  </div>
)

function TabsWrapper({ activeTab }: { activeTab: string }) {
  return (
    <PageTransition preset="moveToLeftFromRight" transitionKey={activeTab} className="fullscreen" contentClassName="fullscreen">
      {activeTab === 'home' && <Home className="fullscreen" />}
      {activeTab === 'about' && <About className="fullscreen" />}
    </PageTransition>
  )
}

export function Tabs() {
  const [activeTab, setActiveTab] = useState('home')

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
}
`
