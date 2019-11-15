<!-- 接口管理 -->
<template>
  <ContainerFluid
    full
    :spinning="spinning"
    class="api-project"
    scroll-background-color="white"
  >
    <template v-slot:header>
      <a-form>
        <a-row :gutter="24">
          <a-col
            :md="5"
            :sm="24"
          >
            <a-form-item>
              <a-input placeholder="请输入项目名称" />
            </a-form-item>
          </a-col>
          <a-col
            :md="8"
            :sm="24"
          >
            <a-form-item>
              <a-button type="primary">查询</a-button>
            </a-form-item>
          </a-col>
        </a-row>
      </a-form>
    </template>
    <template v-slot>
      <a-card :bordered="false">
        <a-row
          type="flex"
          :gutter="24"
        >
          <a-col
            :xxl="4"
            :lg="6"
            :md="8"
            :sm="12"
            :xs="24"
            style="padding: 12px;"
            v-for="(items, index) of projectList"
            :key="index"
          >
            <a-card
              hoverable
              class="text-center"
            >
              <!-- <img
            alt="example"
            src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
            slot="cover"
            @click="handleRouter(items)"
          /> -->
              <div @click="handleRouter(items)">
                <a-avatar
                  :style="bgColorArr[index]"
                  :size="100"
                >{{items.type}}</a-avatar>
                <a-card-meta
                  class="api-project-name"
                  :title="items.name"
                >
                  <!-- <a-avatar
              slot="avatar"
              src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
            /> -->
                </a-card-meta>
              </div>
              <template
                class="ant-card-actions"
                v-slot:actions
              >
                <a-icon
                  type="team"
                  @click="teamVisible = true"
                />
                <a-icon
                  type="edit"
                  @click="handleEdit({
              id: items,
              name: 'Card title',
              type: 'WEB',
              description: 'This is the description'
            })"
                />
                <a-icon type="ellipsis" />
              </template>
            </a-card>
          </a-col>
        </a-row>
      </a-card>
      <ApiProjectEdit v-model="projectVisible" />
      <ApiProjectTeam v-model="teamVisible" />
    </template>
  </ContainerFluid>
</template>
<script>
import {
  getRandomColor
} from '@/tools/utils'
import ApiProjectEdit from './components/api-project-edit'
import ApiProjectTeam from './components/api-project-team'
const projectList = [...Array(30).keys()].map((item, index) => {
  let inx = index + 1
  return {
    id: inx,
    name: `project ${inx}`,
    type: 'WEB',
    description: 'This is the description'
  }
})
export default {
  name: 'ApiProject',
  data () {
    return {
      spinning: false,
      projectVisible: false, // 项目modal（编辑和详情）
      teamVisible: false, // 团队modal
      projectList
    }
  },
  computed: {
    bgColorArr () {
      console.log(projectList.map(this.getRandomColor))
      return projectList.map(this.getRandomColor)
    }
  },
  components: {
    ApiProjectEdit,
    ApiProjectTeam
  },
  methods: {
    // 跳转到版本页
    handleRouter (items) {
      const {
        id, name: title
      } = items
      this.$routerPush({
        name: 'ApiVersion',
        refresh: true,
        query: {
          title,
          id
        } })
      // this.$router.push({ name: 'ApiVersion',
      //   query: {
      //     title: '项目一',
      //     id
      //   } }, function (to, from) {
      //   console.log('onComplete')
      //   console.log(to, from, this)
      // }, function (to, from) {
      //   console.log('onAbort')
      //   console.log(to, from, this)
      // })
    },
    // 修改项目
    handleEdit ({ id, name, type, description }) {
      this.projectVisible = true
    },
    getRandomColor () {
      return {
        backgroundColor: getRandomColor()
      }
    }
  },
  mounted () {
    console.log('api-project 缓存了吗')
  }
}

</script>
<style lang="stylus" scoped>
.api-project
  .api-project-name
    margin-top 10px
</style>
