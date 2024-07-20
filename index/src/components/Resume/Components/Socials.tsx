import {
  Icon,
  IconBrandGithub,
  IconBrandLinkedin,
  IconHome,
  IconMail,
  IconProps,
} from '@tabler/icons-react'
import classNames from 'classnames'

import {
  DetailedHTMLProps,
  HTMLAttributes,
  ForwardRefExoticComponent,
  RefAttributes,
  AnchorHTMLAttributes,
} from 'react'

type TablerIcon = ForwardRefExoticComponent<IconProps & RefAttributes<Icon>>

type SocialIconProps = {
  icon: TablerIcon
} & AnchorHTMLAttributes<HTMLAnchorElement>

function SocialIcon({ icon, ...props }: SocialIconProps) {
  const SvgIcon = icon
  return (
    <a
      className="stroke-slate-400 hover:stroke-slate-200"
      {...props}
      {...(props.href !== '/' && { target: '_blank' })}
    >
      <SvgIcon
        size={32}
        stroke={2}
        className="dark:stroke-slate-300 stroke-slate-600 hover:stroke-teal-500 hover:stroke-opacity-75 hover:scale-[115%]"
      />
    </a>
  )
}

export default function Socials({
  className,
  ...props
}: DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>) {
  return (
    <div {...props} className={classNames('flex flex-row gap-1', className)}>
      <SocialIcon icon={IconHome} href="/" />
      <SocialIcon icon={IconMail} href="mailto:yongbeom.sg@gmail.com" />
      <SocialIcon
        icon={IconBrandLinkedin}
        href="https://www.linkedin.com/in/kim-yongbeom-1812371ba/"
      />
      <SocialIcon
        icon={IconBrandGithub}
        href="https://github.com/Yongbeom-Kim"
      />
    </div>
  )
}
