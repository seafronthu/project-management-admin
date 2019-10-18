<!-- 接口管理 -->
<template>
  <ContainerFluid
    full
    :spinning="spinning"
    scroll-background-color="white"
  >
  <template v-slot:header>
    <a-form>
      <a-row :gutter="24">
        <a-col :md="5" :sm="24">
          <a-form-item>
            <a-input placeholder="请输入项目名称"/>
          </a-form-item>
        </a-col>
        <a-col :md="8" :sm="24">
          <a-form-item>
            <a-button type="primary">查询</a-button>
          </a-form-item>
        </a-col>
      </a-row>
    </a-form>
  </template>
  <template v-slot>
    <a-card :bordered="false">
      <a-row type="flex" :gutter="24">
        <a-col :xxl="4" :lg="6" :md="8" :sm="12" :xs="24" style="padding: 12px;" v-for="items of Array(30).keys()" :key="items">
        <a-card hoverable>
          <img
            alt="example"
            src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
            slot="cover"
            @click="handleRouter(items)"
          />
          <template class="ant-card-actions" slot="actions">
            <a-icon type="setting" />
            <a-icon type="edit" />
            <a-icon type="ellipsis" />
          </template>
          <a-card-meta title="Card title" description="This is the description">
            <!-- <a-avatar
              slot="avatar"
              src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
            /> -->
          </a-card-meta>
        </a-card>
        </a-col>
      </a-row>
    </a-card>
  </template>
  </ContainerFluid>
</template>
<script>
export default {
  name: 'ApiProject',
  data () {
    return {
      spinning: false
    }
  },
  methods: {
    handleRouter (id) {
      console.log(111)
      this.$router.push({ name: 'ApiVersion',
        query: {
          title: '项目一',
          id
        } })
    }
  }
}

</script>
<style lang="stylus" scoped>
</style>
