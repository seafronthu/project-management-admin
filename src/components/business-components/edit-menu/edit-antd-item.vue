<!-- 菜单栏 -->
<template>
  <span class="edit-antd-item">
    <template v-if="edit">
      <i class="ant-menu-submenu-arrow edit-antd-submenu-arrow"></i>
      <a-dropdown>
        <a-icon
          type="bars"
          class="edit-icon"
        />
        <a-menu slot="overlay" v-if="itemData.trigger">
          <a-menu-item v-for="item of itemData.trigger" :key="item.id" @click="handleClick">
            <span>{{item.name}}</span>
          </a-menu-item>
        </a-menu>
      </a-dropdown>
      <span>{{itemData.title}}</span>
    </template>
    <template v-else>
      <a-icon :type="itemData.icon" />
      <span>{{itemData.title}}</span>
    </template>
  </span>
</template>

<script>
export default {
  name: 'EditAntdItem',
  props: {
    itemData: Object
  },
  data () {
    return {
    }
  },
  inject: ['edit', 'editClick'],
  components: {},

  computed: {},

  methods: {
    handleClick ({ item, key, keyPath }) {
      const { itemData } = this
      this.editClick({ item, key, keyPath, itemData })
    }
  },

  mounted () {
  }
}
</script>
