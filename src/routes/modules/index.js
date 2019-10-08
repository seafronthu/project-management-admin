import api from './api'
import user from './user'
import auth from './auth'
import log from './log'
export default { ...api, ...user, ...auth, ...log }
