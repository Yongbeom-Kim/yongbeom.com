type touchControlIdsProps = {
  forward: string
  backward: string
  left: string
  right: string
}
export default function touchControls({
  forward,
  backward,
  left,
  right,
}: touchControlIdsProps) {
  return (
    <div className="fixed aspect-square size-auto left-10 bottom-10 z-10 grid grid-cols-3 gap-2">
      <div></div>
      <button
        className="bg-white aspect-square size-8 p-0 m-0 rounded-none"
        id={forward}
      ></button>
      <div></div>
      <button
        className="bg-white aspect-square size-8 p-0 m-0 rounded-none"
        id={left}
      ></button>
      <div></div>
      <button
        className="bg-white aspect-square size-8 p-0 m-0 rounded-none"
        id={right}
      ></button>
      <div></div>
      <button
        className="bg-white aspect-square size-8 p-0 m-0 rounded-none"
        id={backward}
      ></button>
      <div></div>
    </div>
  )
}
