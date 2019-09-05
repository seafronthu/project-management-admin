
import { mapState } from 'vuex'
import { DEVICE_TYPE, deviceEnquire } from './device'
// 窗口判断设备
const deviceMixin = {
  computed: {
    ...mapState({
      device: state => state.app.device
    }),
    isMobile () {
      return this.device === DEVICE_TYPE.MOBILE
    },
    isTablet () {
      return this.device === DEVICE_TYPE.TABLET
    },
    isLaptop () {
      return this.device === DEVICE_TYPE.LAPTOP
    },
    isDesktop () {
      return this.device === DEVICE_TYPE.DESKTOP
    }
  }
}
// 全局使用的方法
const mixin = {
  created () {
    const { $store } = this
    deviceEnquire((deviceType) => {
      $store.commit('APP_TOGGLEDEVICE_MUTATE', deviceType)
    })
  }
}
export {
  mixin,
  deviceMixin
}
