import Request from './request'
import config from '@/config'
const { baseUrl: {
  dev,
  pro
} } = config
// const apiUrl = location.origin.indexOf('mct.api') > -1 ? `${location.origin}/index.php/web/` : `${location.origin}/merchant/index.php/web/`
const baseUrl = process.env.NODE_ENV === 'development' ? dev : pro
const https = new Request(baseUrl)
export default https
