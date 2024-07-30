import classNames from 'classnames'
import DarkModeButton from './components/DarkModeButton/DarkModeButton'
import Resume from './components/Resume/Resume'
import HoverGlowEffectOverlay from './components/HoverGlowEffectOverlay/HoverGlowEffectOverlay'

function App() {
  return (
    <>
      <div
        className={classNames(
          'h-screen w-screen fixed top-0 left-0 overflow-auto scroll-smooth no-scrollbar',
          'bg-gradient-to-r dark:from-black dark:to-[#00001F] from-white to-blue-100',
          'dark:text-white text-black',
          'px-[max(15%,16px)]' // When changing, change in SectionHeader (Section.tsx) too.
        )}
      >
        <DarkModeButton className="fixed top right-0 z-50" />
        <Resume />
      </div>
      <HoverGlowEffectOverlay />
    </>
  )
}

export default App
