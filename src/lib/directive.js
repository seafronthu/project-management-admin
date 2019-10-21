import { isSameRoute } from '@l/businessUtils'
function routeChange (binding) {
  let target = binding.value
  let foo = binding.arg
  const {
    $route,
    $route: {
      query,
      param,
      name
    },
    state: {
      app: {
        tabNavList
      }
    }
  } = target
  let routeList = target.routeList
  console.log(routeList)
  if (!routeList.some(v => isSameRoute(v, $route))) {
    target.routeList.push({
      query,
      param,
      name
    })
    target[foo]()
  }
  let len = routeList.length
  while (len > 0) {
    let index = tabNavList.findIndex(v => isSameRoute(v, routeList[len - 1]))
    if (!~index) {
      target.routeList.splice(index, 1)
    } else {
      --len
    }
  }
}
const singleTab = {
  name: 'single-tab',
  bind (el, binding, vnod) {
    console.log(binding, 'bind')
    // let target = binding.value
    // target.routeList = []
    // routeChange(binding)
  },
  inserted (el, binding, vnod) {
    console.log('inserted', this)
  },
  componentUpdated (el, binding, vnod) {
    console.log(binding, 'componentUpdated')
    // routeChange(target)
  },
  unbind (el, binding, vnod) {
    console.log('unbind')
  }
}
function directive (Vue) {
  console.log(singleTab.name, singleTab)
  Vue.directive(singleTab.name, singleTab)
}
export default directive
