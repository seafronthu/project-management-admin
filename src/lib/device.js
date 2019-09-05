import enquireJs from 'enquire.js'
const DEVICE_TYPE = {
  MOBILE: 'screen and (max-width: 768px)', // 手机
  TABLET: 'screen and (min-width: 768px) and (max-width: 992px)', // 平板
  LAPTOP: 'screen and (min-width: 920px) and (max-width: 1200px)', // 笔记本
  DESKTOP: 'screen and (min-width: 1200px)' // 台式
}
const deviceEnquire = function (callback) {
  const matchDesktop = {
    match: () => {
      callback && callback(DEVICE_TYPE.DESKTOP)
    }
  }

  const matchLaptop = {
    match: () => {
      callback && callback(DEVICE_TYPE.LAPTOP)
    }
  }
  const matchTablet = {
    match: () => {
      callback && callback(DEVICE_TYPE.TABLET)
    }
  }

  const matchMobile = {
    match: () => {
      callback && callback(DEVICE_TYPE.MOBILE)
    }
  }

  // screen and (max-width: 1087.99px)
  enquireJs
    .register(DEVICE_TYPE.MOBILE, matchMobile)
    .register(DEVICE_TYPE.TABLET, matchTablet)
    .register(DEVICE_TYPE.LAPTOP, matchLaptop)
    .register(DEVICE_TYPE.DESKTOP, matchDesktop)
}
export {
  DEVICE_TYPE,
  deviceEnquire
}
