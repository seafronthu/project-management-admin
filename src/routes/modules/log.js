const Log = {
  path: 'log',
  name: 'Log',
  meta: {
    title: '日志',
    icon: 'calendar'
  }
}
const ErrorLog = {
  path: 'error-log',
  name: 'ErrorLog',
  component: () => import(/* webpackChunkName: "ErrorLog" */ '@v/log/error-log.vue'),
  meta: {
    title: '错误日志'
  }
}
export default {
  Log,
  ErrorLog
}
