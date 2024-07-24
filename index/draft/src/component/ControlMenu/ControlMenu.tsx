import {
  IconDeviceDesktop,
  IconDeviceMobile,
  IconMouse2,
} from '@tabler/icons-react'
import classNames from 'classnames'
import { useState } from 'react'

export type Controls = 'keyboard' | 'touch'

type ControlMenuProps = {
  controlsChosenCallback: (controls: Controls) => void
}

export default function ControlMenu({
  controlsChosenCallback,
}: ControlMenuProps) {
  const [isPortraitMode, setIsPortraitMode] = useState(
    window.innerHeight > window.innerWidth
  )
  window.addEventListener('resize', () => {
    setIsPortraitMode(window.innerHeight > window.innerWidth)
  })

  return (
    <div
      className={classNames(
        'fixed inset-0 m-0 p-0 z-10 bg-white bg-opacity-20',
        'flex items-stretch justify-center gap-4 p-4',
        { 'flex-col': isPortraitMode, 'flex-row': !isPortraitMode }
      )}
      onTouchStart={(e) => (e.preventDefault(), e.stopPropagation())}
      onMouseDown={(e) => (e.preventDefault(), e.stopPropagation())}
      onClick={(e) => (e.preventDefault(), e.stopPropagation())}
    >
      <div
        className="hover:bg-white/30 flex-grow items-center justify-center flex cursor-pointer border-white border-solid border-4 rounded-xl"
        onClick={() => controlsChosenCallback('touch')}
      >
        <IconDeviceMobile className="size-12" color="white" />
      </div>
      <div
        className="hover:bg-white/30 flex-grow items-center justify-center flex cursor-pointer border-white border-solid border-4 rounded-xl"
        onClick={() => controlsChosenCallback('keyboard')}
      >
        <IconDeviceDesktop className="size-12" color="white" />
        <IconMouse2
          className="size-8 -translate-x-[6px] translate-y-[4px]"
          color="white"
          stroke={2}
        />
      </div>
    </div>
  )
}
