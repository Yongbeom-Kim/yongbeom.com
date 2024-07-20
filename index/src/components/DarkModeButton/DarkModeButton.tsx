import { IconBulb, IconBulbFilled } from '@tabler/icons-react'
import {
  ButtonHTMLAttributes,
  DetailedHTMLProps,
  useEffect,
  useState,
} from 'react'
import { isMobile } from '../../util/screen'
import classNames from 'classnames'

type Theme = 'light' | 'dark'

export default function DarkModeButton({
  className,
  ...props
}: DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>) {
  const [theme, setTheme] = useState<Theme>(getBrowserTheme())
  const toggleTheme = () => {
    setTheme((theme) => (theme === 'light' ? 'dark' : 'light'))
  }

  const [isButtonHover, setButtonHover] = useState<boolean>(false)

  useEffect(() => {
    setBrowserTheme(theme)
  }, [theme])

  return (
    <button
      className={classNames(
        'bg-transparent hover:bg-none outline-none hover:outline-none focus:outline-none border-transparent focus:dark:border-white focus:border-blue-950 rounded-full aspect-square p-3',
        className
      )}
      onClick={toggleTheme}
      onMouseEnter={() => setButtonHover(true)}
      onMouseLeave={() => setButtonHover(false)}
      {...props}
    >
      {!isMobile() && !isButtonHover && (
        <IconBulb {...(theme == 'dark' && { color: 'white' })} />
      )}
      {(isMobile() || isButtonHover) && (
        <IconBulbFilled {...(theme == 'dark' && { color: 'white' })} />
      )}
    </button>
  )
}

function getBrowserTheme(): Theme {
  if (localStorage.getItem('theme') !== 'null') {
    return localStorage.getItem('theme') as Theme
  }
  if (window.matchMedia('(prefers-color-scheme: light)').matches) {
    localStorage.setItem('theme', 'light')
    return 'light'
  }
  localStorage.setItem('theme', 'dark')
  return 'dark'
}

function setBrowserTheme(theme: Theme) {
  localStorage.setItem('theme', theme)
  if (theme === 'light') {
    document.querySelector('html')?.classList.remove('dark')
  } else {
    document.querySelector('html')?.classList.add('dark')
  }
}
