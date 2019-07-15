
import {
  arrageRouterToMenu
} from '@l/menuManager'
import setRouter from '@l/routerManager'
import routers from '@/routes/modules'
setRouter({ routers })
const getters = {
  menuList: (state, getters) => arrageRouterToMenu(getters.routerList),
  routerList: state => {
    return setRouter({ routers, authorization: state.app.authorizationList })
  }
}
export default getters
