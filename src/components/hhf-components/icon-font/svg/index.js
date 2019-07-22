// let svgObj = {
//   'dot': <path d="M512 512m-512 0a512 512 0 1 0 1024 0 512 512 0 1 0-1024 0Z" p-id="918"></path>
// }
function SvgIcon (h, type) {
  let svgObj = {
    'dot': <path d="M512 512m-512 0a512 512 0 1 0 1024 0 512 512 0 1 0-1024 0Z" p-id="918"></path>
  }
  console.log(type)
  const PathIcon = svgObj[type]
  // const { width = '1em', height = '1em', color, type } = {}
  // const PathIcon = svgObj[type]
  return PathIcon
}
export default {
  props: {
    width: {
      type: String,
      default: '1em'
    },
    height: {
      type: String,
      default: '1em'
    },
    color: String,
    type: {
      type: String,
      required: true
    }
  },
  render (h) {
    const { width = '1em', height = '1em', type } = this
    // const SvgIcon = svgObj[type]
    const SIcon = SvgIcon(h, type)
    return <svg width={width} height={height} fill="currentColor" viewBox="0 0 1024 1024">{SIcon}</svg>
  }
}
