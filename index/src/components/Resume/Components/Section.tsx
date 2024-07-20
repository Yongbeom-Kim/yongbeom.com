import classNames from 'classnames'
import React, { DetailedHTMLProps, HTMLAttributes } from 'react'

type TitleProps = DetailedHTMLProps<
  HTMLAttributes<HTMLHeadingElement>,
  HTMLHeadingElement
>
export const Title = ({ children, className, ...props }: TitleProps) => {
  return (
    <h1
      {...props}
      className={classNames(
        'text-4xl font-bold tracking-tight dark:text-slate-200 text-slate-900 sm:text-5xl',
        className
      )}
    >
      <a
        href="/"
        className="block hover:text-teal-500 hover:text-opacity-75 hover:scale-[105%] ease-in-out transform transition-transform"
      >
        {children}
      </a>
    </h1>
  )
}

type SectionProps = DetailedHTMLProps<
  HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
>

export const Section = ({ children, className, ...props }: SectionProps) => {
  return (
    <div {...props} className={classNames('mt-6 flex flex-col', className)}>
      {children}
    </div>
  )
}

type SectionHeaderProps = {
  sticky?: boolean
  children: string
} & Omit<
  DetailedHTMLProps<HTMLAttributes<HTMLHeadingElement>, HTMLHeadingElement>,
  'children'
>

export const SectionHeader = ({
  sticky,
  children,
  className,
  ...props
}: SectionHeaderProps) => {
  if (sticky === undefined) {
    sticky = true
  }
  return (
    <div className=" left-0 w-screen">
      <h2
        {...props}
        className={classNames(
          'text-lg font-medium tracking-tight dark:text-slate-200 text-slate-800 sm:text-xl mt-4 font-overpass',
          { 'sticky top-0 z-20': sticky },
          'bg-gradient-to-r dark:from-black/80 dark:to-blue-950/80 from-white/80 to-blue-100/80 py-4',
          'backdrop-filter backdrop-blur bg-opacity-50',
          'lg:bg-none lg:backdrop-blur-none lg:relative',
          '-translate-x-[max(15%,16px)] pl-[max(15%,16px)]', // Dumb hack to counteract padding in parent
          className
        )}
        id={children}
      >
        {children}
      </h2>
    </div>
  )
}

type SectionNavProps = { headers: string[] } & React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLElement>,
  HTMLElement
>
export const SectionNav = ({
  headers,
  className,
  ...props
}: SectionNavProps) => {
  return (
    <nav className={classNames('mt-10', className)} {...props}>
      {headers.map((item) => (
        <div>
          <a
            href={`#${item}`}
            className="font-overpass block hover:text-teal-500 hover:text-opacity-75 hover:scale-[105%] ease-in-out transform transition-transform"
          >
            {item}
          </a>
        </div>
      ))}
    </nav>
  )
}

type SectionDescriptionProps = DetailedHTMLProps<
  HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
>

export const SectionDescription = ({
  children,
  className,
  ...props
}: SectionDescriptionProps) => {
  return (
    <div
      {...props}
      className={classNames(
        'text-base leading-5 dark:text-slate-400 text-slate-700 flex flex-col gap-3',
        className
      )}
    >
      {children}
    </div>
  )
}

type SubSectionHeaderProps = {
  info?: string
  href?: string
} & DetailedHTMLProps<HTMLAttributes<HTMLHeadingElement>, HTMLHeadingElement>

export const SubSectionHeader = ({
  children,
  href,
  info,
  className,
  ...props
}: SubSectionHeaderProps) => {
  return (
    <div className={classNames('mt-8', className)} {...props}>
      {info !== undefined && (
        <div className="text-xs dark:text-slate-400 text-slate-700">{info}</div>
      )}
      <h3 className="font-medium dark:text-slate-200 text-slate-800">
        {href ? (
          <a className="hover:underline" href={href}>
            {children}
          </a>
        ) : (
          children
        )}
      </h3>
    </div>
  )
}

type SubSectionDescriptionProps = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLParagraphElement>,
  HTMLParagraphElement
>

export const SubSectionDescription = ({
  children,
  className,
  ...props
}: SubSectionDescriptionProps) => {
  return (
    <p
      className={classNames(
        'text-base leading-5 dark:text-slate-400 text-slate-700 flex flex-col gap-2',
        className
      )}
      {...props}
    >
      {children}
    </p>
  )
}

type SubSectionSkillsProps = {
  children: string[]
}
export const SubSectionSkills = ({ children }: SubSectionSkillsProps) => {
  return (
    <div className="text-sm dark:text-slate-300 text-slate-500 flex flex-row flex-wrap gap-2 mt-1.5 mb-2">
      {children.map((skill) => (
        <span className="py-1 px-2 dark:bg-teal-700 bg-teal-200 bg-opacity-40 dark:text-teal-300 text-teal-700 text-opacity-90 rounded-full">
          {skill}
        </span>
      ))}
    </div>
  )
}
