import classNames from 'classnames'
import React, { DetailedHTMLProps, HTMLAttributes } from 'react'

type TitleProps = DetailedHTMLProps<
  HTMLAttributes<HTMLHeadingElement>,
  HTMLHeadingElement
>
export const Title = ({ children, ...props }: TitleProps) => {
  return (
    <h1
      {...props}
      className="text-4xl font-bold tracking-tight dark:text-slate-200 text-slate-900 sm:text-5xl"
    >
      <a href="/">{children}</a>
    </h1>
  )
}

type SectionProps = DetailedHTMLProps<
  HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
>

export const Section = ({ children, ...props }: SectionProps) => {
  return (
    <div {...props} className="mt-6 flex flex-col">
      {children}
    </div>
  )
}

type SectionHeaderProps = { sticky?: boolean } & DetailedHTMLProps<
  HTMLAttributes<HTMLHeadingElement>,
  HTMLHeadingElement
>

export const SectionHeader = ({
  sticky,
  children,
  ...props
}: SectionHeaderProps) => {
  if (sticky === undefined) {
    sticky = true
  }
  return (
    <h2
      {...props}
      className={classNames(
        'text-lg font-medium tracking-tight dark:text-slate-200 text-slate-800 sm:text-xl mt-4 font-overpass',
        { 'sticky top-0 z-20': sticky },
        'w-screen bg-gradient-to-r dark:from-black/80 dark:to-blue-950/80 from-white/80 to-blue-100/80 py-4',
        'backdrop-filter backdrop-blur bg-opacity-50'
      )}
    >
      {children}
    </h2>
  )
}

type SectionDescriptionProps = DetailedHTMLProps<
  HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
>

export const SectionDescription = ({
  children,
  ...props
}: SectionDescriptionProps) => {
  return (
    <div
      {...props}
      className="text-base leading-5 dark:text-slate-400 text-slate-700 flex flex-col gap-3"
    >
      {children}
    </div>
  )
}

export const SubSection = ({
  children,
  ...props
}: DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>) => {
  return (
    <div {...props} className="flex flex-col">
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
    <div className={classNames('mt-2', className)} {...props}>
      {info !== undefined && (
        <div className="text-xs dark:text-slate-400">{info}</div>
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
}: SubSectionDescriptionProps) => {
  return (
    <p className="text-base leading-5 dark:text-slate-400 text-slate-700 flex flex-col gap-2">
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
        <span className="py-1 px-2 bg-teal-600 bg-opacity-50 text-teal-300 text-opacity-90 rounded-full">
          {skill}
        </span>
      ))}
    </div>
  )
}
