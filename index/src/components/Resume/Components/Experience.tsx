type ExperienceDateProps = {
  start: string
  end: string
}
export function ExperienceDate({ start, end }: ExperienceDateProps) {
  return (
    <div className="text-sm text-slate-500 dark:text-slate-400">
      {start} - {end}
    </div>
  )
}
