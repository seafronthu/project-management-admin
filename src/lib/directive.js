import { isSameRoute } from '@l/businessUtils'
function routeChange (binding) {
  const {
    value: target,
    arg: routeName,
    modifiers
  } = binding
  const {
    $route,
    $route: {
      query,
      params,
      name
    },
    $store: {
      state: {
        app: {
          tabNavList
        }
      }
    }
  } = target
  let routeList = target.routeList
  if (name === routeName && !routeList.some(v => isSameRoute(v, $route))) {
    target.routeList.push({
      query,
      params,
      name
    })
    Object.keys(modifiers).forEach(key => {
      target[key]()
    })
  }
  let len = routeList.length
  while (len > 0) {
    let index = tabNavList.findIndex(v => isSameRoute(v, routeList[len - 1]))
    if (!~index) {
      target.routeList.splice(index, 1)
    }
    --len
  }
}
const singleTab = {
  name: 'single-tab',
  bind (el, binding, vnod) {
    // console.log('bind')
    let target = binding.value
    target.routeList = []
    routeChange(binding)
  },
  inserted (el, binding, vnod) {
    // console.log('inserted', this)
  },
  componentUpdated (el, binding, vnod) {
    // console.log('componentUpdated')
    routeChange(binding)
  },
  unbind (el, binding, vnod) {
    // console.log('unbind')
  }
}
function directive (Vue) {
  Vue.directive(singleTab.name, singleTab)
}
export default directive
