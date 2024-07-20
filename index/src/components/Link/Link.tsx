import { IconArrowUpRight } from '@tabler/icons-react'
import classNames from 'classnames'

type LinkProps = React.DetailedHTMLProps<
  React.AnchorHTMLAttributes<HTMLAnchorElement>,
  HTMLAnchorElement
>

export default function StyledLink({
  children,
  className,
  ...props
}: LinkProps) {
  return (
    <a
      className={classNames(
        'm-0 p-0 bg-none outline-none hover:outline-none active:outline-none',
        'inline-flex flex-row group',
        'hover:text-teal-500 hover:text-opacity-75 hover:scale-[104%]',
        className
      )}
      {...props}
    >
      {children}
      <IconArrowUpRight
        className={classNames(
          'scale-[66%] translate-y-[5%] translate-x-[-15%]',
          'group-hover:translate-x-[0%] group-hover:translate-y-[-10%]',
          'ease-in-out transform transition-transform',
          '-mr-1 -mb-10' // mb prevents icon from moving text below.
        )}
      />
    </a>
  )
}
