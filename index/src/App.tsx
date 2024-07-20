import classNames from 'classnames'
import DarkModeButton from './components/DarkModeButton/DarkModeButton'
import Resume from './components/Resume/Resume'

function App() {
  return (
    <div
      className={classNames(
        'h-screen w-screen fixed top-0 left-0 overflow-auto scroll-smooth no-scrollbar',
        'bg-gradient-to-r dark:from-black dark:to-blue-950 from-white to-blue-100',
        'dark:text-white text-black',
        'px-[max(15%,16px)]'
      )}
    >
      <DarkModeButton className="fixed top right-0 z-50" />
      <Resume />
    </div>
  )
}

export default App
