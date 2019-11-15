<!-- api项目团队管理  -->
<template>
  <a-modal title="项目成员" :visible="visible" width="1000px" @cancel="handleCancel">
    <a-list :dataSource="data" v-bind="listProps">
      <template v-slot:renderItem="item">
            <a-list-item>
              <a-list-item-meta
                description="Ant Design, a design language for background applications, is refined by Ant UED Team"
              >
              <template v-slot:title>
                <a href="https://vue.ant.design/">{{item.title}}</a>
              </template>
                <a-avatar
                  slot="avatar"
                  src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
                />
              </a-list-item-meta>
            </a-list-item>
      </template>
  </a-list>
  </a-modal>
</template>

<script>
export default {
  name: 'ApiProjectTeam',
  model: {
    prop: 'visible',
    event: 'trigger-change'
  },
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    fields: {
      type: Object,
      default: () => ({})
    }
  },
  data () {
    return {
      listProps: {
        itemLayout: 'horizontal',
        grid: {
          // gutter: 16,
          xs: 1, sm: 2, md: 4, lg: 4, xl: 6, xxl: 3
        }
      },
      data: [
        {
          title: 'Ant Design Title 1'
        },
        {
          title: 'Ant Design Title 2'
        },
        {
          title: 'Ant Design Title 3'
        },
        {
          title: 'Ant Design Title 4'
        }
      ]
    }
  },

  components: {},

  computed: {},

  methods: {
    log (val) {
      return console.log(val)
    },
    handleClose () {
      this.$emit('trigger-change', false)
    },
    handleCancel () {
      this.handleClose()
    }
  },

  mounted () {}
}
</script>
<style lang="stylus" scoped>
</style>
