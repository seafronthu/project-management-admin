<!-- 接口管理 -->
<template>
  <ContainerFluid
    class="bg-color-f"
    :spinning="spinning"
    full
  >
  <a-card hoverable style="width: 300px" v-for="items of Array(30).keys()" :key="items">
    <img
      alt="example"
      src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
      slot="cover"
    />
    <template class="ant-card-actions" slot="actions">
      <a-icon type="setting" />
      <a-icon type="edit" />
      <a-icon type="ellipsis" />
    </template>
    <a-card-meta title="Card title" description="This is the description">
      <a-avatar
        slot="avatar"
        src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
      />
    </a-card-meta>
  </a-card>
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
  methods: {}
}

</script>
<style lang="stylus" scoped>
</style>
