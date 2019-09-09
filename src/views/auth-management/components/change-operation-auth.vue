<!-- 改变操作权限 -->
<template>
  <a-tree
    checkable
    @expand="handleExpand"
    :expandedKeys="expandedKeys"
    :autoExpandParent="autoExpandParent"
    v-model="checkedKeys"
    @select="handleSelect"
    :selectedKeys="selectedKeys"
    :treeData="treeData"
  />
</template>

<script>
const treeData = [{
  title: '0-0',
  key: '0-0',
  children: [{
    title: '0-0-0',
    key: '0-0-0',
    children: [
      { title: '0-0-0-0', key: '0-0-0-0' },
      { title: '0-0-0-1', key: '0-0-0-1' },
      { title: '0-0-0-2', key: '0-0-0-2' }
    ]
  }, {
    title: '0-0-1',
    key: '0-0-1',
    children: [
      { title: '0-0-1-0', key: '0-0-1-0' },
      { title: '0-0-1-1', key: '0-0-1-1' },
      { title: '0-0-1-2', key: '0-0-1-2' }
    ]
  }, {
    title: '0-0-2',
    key: '0-0-2'
  }]
}, {
  title: '0-1',
  key: '0-1',
  children: [
    { title: '0-1-0-0', key: '0-1-0-0' },
    { title: '0-1-0-1', key: '0-1-0-1' },
    { title: '0-1-0-2', key: '0-1-0-2' }
  ]
}, {
  title: '0-2',
  key: '0-2'
}]
export default {
  name: 'ChangeOperationAuth',
  model: {
    prop: 'checkedKeys',
    event: 'trigger-change'
  },
  props: {
    checkedKeys: {
      type: Array,
      default: () => ([])
    }, // （受控）选中复选框的树节点
    selectedKeys: {
      type: Array,
      default: () => ([])
    }, // （受控）设置选中的树节点
    treeData: {
      type: Array,
      default: () => treeData
    } // 数据
  },
  data () {
    return {
      expandedKeys: [], // 打开的树目录
      autoExpandParent: true // 是否自动展开父节点
    }
  },
  components: {},
  watch: {
    expandedKeysArr (checkedKeys) {
      this.$emit('trigger-change', checkedKeys)
    }
  },

  computed: {},

  methods: {
    handleSelect () {}, // 点击内容触发
    // 展开收起触发
    handleExpand (expandedKeys) {
      this.expandedKeys = expandedKeys
      this.autoExpandParent = false
    }
  },

  mounted () {}
}
</script>
<style lang="stylus" scoped></style>
