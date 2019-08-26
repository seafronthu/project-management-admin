<!-- 修改路由 -->
<template>
  <a-form
  class="edit-route"
    :form="form"
    @submit="handleSubmit"
  >
  <a-row>
    <a-col :span="11">
      <a-form-item>
        <template v-slot:label>
          <span class="text-ellipsis" title="parentId（父级ID）">parentId（父级ID）</span>
        </template>
        <a-input disabled :defaultValue="routeInfo.parentId" />
      </a-form-item>
    </a-col>
    <a-col :span="2"></a-col>
    <a-col :span="11">
      <a-form-item>
        <template v-slot:label>
          <span class="text-ellipsis" title="id（唯一主键，不可更改）">id（唯一主键，不可更改）</span>
        </template>
        <a-input disabled :defaultValue="routeInfo.id" />
      </a-form-item>
    </a-col>
  </a-row>
  <a-row>
    <a-col :span="11">
      <a-form-item>
        <template v-slot:label>
          <span class="text-ellipsis" title="component（权限名字，根据前台前台的名字修改且唯一）">component（权限名字，根据前台前台的名字修改且唯一）</span>
        </template>
        <a-input v-decorator="[
              'component',
              {
                rules: [{ required: true, message: 'component is required!' }],
              }
            ]" v-model="routeInfo.component"/>
      </a-form-item>
    </a-col>
    <a-col :span="2"></a-col>
    <a-col :span="11">
      <a-form-item>
        <template v-slot:label>
          <span class="text-ellipsis" title="genre（路由类型）">genre（路由类型）</span>
        </template>
        <a-select v-decorator="[
              'genre',
              {
                rules: [{ required: true, message: 'genre is required!' }],
              }
            ]">
          <a-select-option value="menu">menu</a-select-option>
          <a-select-option value="list">list</a-select-option>
          <a-select-option value="detail">detail</a-select-option>
          <a-select-option value="tab">tab</a-select-option>
          <a-select-option value="button">button</a-select-option>
        </a-select>
      </a-form-item>
    </a-col>
  </a-row>
  <a-row>
    <a-col :span="11">
      <a-form-item>
        <template v-slot:label>
          <span class="text-ellipsis" title="title（标题）">title（标题）</span>
        </template>
        <a-input v-decorator="[
              'title',
              {
                rules: [{ required: true, message: 'title is required!' }],
              }
            ]" />
      </a-form-item>
    </a-col>
    <a-col :span="2"></a-col>
    <a-col :span="11">
      <a-form-item>
        <template v-slot:label>
          <span class="text-ellipsis" title="keyword（关键字）">keyword（关键字）</span>
        </template>
        <a-input v-decorator="[
              'buttonType',
              {
                rules: [{ required: true, message: 'buttonType is required!' }],
              }
            ]" />
      </a-form-item>
    </a-col>
  </a-row>
  <a-form-item>
        <template v-slot:label>
          <span class="text-ellipsis" title="description（描述）">description（描述）</span>
        </template>
    <a-textarea v-decorator="[
              'description',
              {
                rules: [{ required: true, message: 'description is required!' }],
              }
            ]" placeholder="Autosize height based on content lines" :autosize="{minRows: 4}" />
  </a-form-item>
    <a-button
      type="primary"
      html-type="submit"
    >新增</a-button>
  </a-form>
</template>

<script>
export default {
  name: 'EditRoute',
  props: {
    routeInfo: {
      type: Object,
      default: () => ({})
    }
  },
  data () {
    return {
      form: this.$form.createForm(this)
    }
  },

  components: {},

  computed: {},

  methods: {
    handleSubmit (e) {
      e.preventDefault()
      this.form.validateFields((err, values) => {
        if (!err) {
          console.log('Received values of form: ', values)
        }
      })
    }
  },

  mounted () {
  }
}
</script>
<style lang="stylus">
.edit-route
  .ant-form-item-label
    width 100%
    text-align left
    label
      width 100%
      display flex
      flex-flow row nowrap
      justify-content flex-start
      align-items center

</style>
