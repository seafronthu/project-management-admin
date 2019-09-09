<!-- 修改路由 -->
<template>
  <a-form
    class="edit-route"
    :form="form"
    @submit="handleSubmit"
  >
    <a-row :gutter="24">
      <a-col :md="24" :lg="12">
        <a-form-item>
          <template v-slot:label>
            <span
              class="text-ellipsis"
              title="parentId（父级ID）"
            >parentId（父级ID）</span>
          </template>
          <a-input
            disabled
            v-model="routeInfo.parentId"
          />
        </a-form-item>
      </a-col>
      <a-col :md="24" :lg="12">
        <a-form-item>
          <template v-slot:label>
            <span
              class="text-ellipsis"
              title="component（父级权限名字，根据前台前台的名字修改且唯一）"
            >component（父级权限名字）</span>
          </template>
          <a-input
            disabled
            v-model="routeInfo.component"
          />
        </a-form-item>
      </a-col>
    </a-row>
    <a-row :gutter="24">
      <a-col :md="24" :lg="12">
        <a-form-item>
          <template v-slot:label>
            <span
              class="text-ellipsis"
              title="title（父级标题）"
            >title（父级标题）</span>
          </template>
          <a-input
            disabled
            v-model="routeInfo.title"
          />
        </a-form-item>
      </a-col>
      <a-col :md="24" :lg="12">
        <a-form-item>
          <template v-slot:label>
            <span
              class="text-ellipsis"
              title="id（唯一主键，不可更改）"
            >id（唯一主键，不可更改）</span>
          </template>
          <a-input
            disabled
            v-model="routeInfo.id"
          />
        </a-form-item>
      </a-col>
    </a-row>
    <a-row :gutter="24">
      <a-col :md="24" :lg="12">
        <a-form-item>
          <template v-slot:label>
            <span
              class="text-ellipsis"
              title="component（权限名字，根据前台前台的名字修改且唯一）"
            >component（权限名字，根据前台的名字修改且唯一）</span>
          </template>
          <a-input v-decorator="[
              'component',
              {
                rules: [{ required: true, message: 'component is required!' }],
              }
            ]" />
        </a-form-item>
      </a-col>
      <a-col :md="24" :lg="12">
        <a-form-item>
          <template v-slot:label>
            <span
              class="text-ellipsis"
              title="genre（路由类型）"
            >genre（路由类型）</span>
          </template>
          <a-select v-decorator="[
              'genre',
              {
                rules: [{ required: true, message: 'genre is required!' }],
              }
            ]">
            <a-select-option value="MENU">MENU</a-select-option>
            <a-select-option value="LIST">LIST</a-select-option>
            <a-select-option value="DETAIL">DETAIL</a-select-option>
            <a-select-option value="TAB">TAB</a-select-option>
            <a-select-option value="BUTTON">BUTTON</a-select-option>
          </a-select>
        </a-form-item>
      </a-col>
    </a-row>
    <a-row :gutter="24">
      <a-col :md="24" :lg="12">
        <a-form-item>
          <template v-slot:label>
            <span
              class="text-ellipsis"
              title="buttonType（按钮类型）"
            >buttonType（按钮类型）</span>
          </template>
          <a-select v-decorator="[
              'buttonType',
              {
                rules: [{ required: true, message: 'buttonType is required!' }],
              }
            ]">
            <a-select-option value="OTHER">OTHER</a-select-option>
            <a-select-option value="INSERT">INSERT</a-select-option>
            <a-select-option value="DELETE">DELETE</a-select-option>
            <a-select-option value="UPDATE">UPDATE</a-select-option>
            <a-select-option value="EXPORT">EXPORT</a-select-option>
            <a-select-option value="IMPORT">IMPORT</a-select-option>
          </a-select>
        </a-form-item>
      </a-col>
      <a-col :md="24" :lg="12">
        <a-form-item>
          <template v-slot:label>
            <span
              class="text-ellipsis"
              title="title（标题）"
            >title（标题）</span>
          </template>
          <a-input v-decorator="[
              'title',
              {
                rules: [{ required: true, message: 'title is required!' }],
              }
            ]" />
        </a-form-item>
      </a-col>
    </a-row>
    <a-form-item>
      <template v-slot:label>
        <span
          class="text-ellipsis"
          title="description（描述）"
        >description（描述）</span>
      </template>
      <a-textarea
        v-decorator="[
              'description',
              {
                rules: [{ required: true, message: 'description is required!' }],
              }
            ]"
        placeholder="Autosize height based on content lines"
        :autosize="{minRows: 4}"
      />
    </a-form-item>
    <div style="width:100px;">
      <a-button
        type="primary"
        html-type="submit"
        block
      >{{buttonName}}</a-button>
    </div>
  </a-form>
</template>

<script>
export default {
  name: 'EditRoute',
  props: {
    routeInfo: {
      type: Object,
      default: () => ({})
    },
    fields: {
      type: Object,
      default: () => ({})
    }
  },
  data () {
    return {
    }
  },
  watch: {
    fields (val) {
      let formField = {}
      for (let key in val) {
        formField[key] = this.$form.createFormField({
          value: val[key]
        })
      }
      this.form.updateFields(formField)
    }
  },
  components: {},

  computed: {
    buttonName () {
      return this.routeInfo.id ? '修改' : '新增'
    }
  },

  methods: {
    handleSubmit (e) {
      const { routeInfo, fields } = this
      e.preventDefault()
      // console.log(routeInfo, fields)
      this.form.validateFields((err, values) => {
        if (!err) {
          this.$emit('trigger-confirm', { routeInfo, fields })
        }
      })
    }
  },
  created () {
    this.form = this.$form.createForm(this, {
      // props: {
      //   component: this.fields.value.component
      // },
      onFieldsChange: (props, fields) => {
        // console.log(props, fields, 'onFieldsChange')
        // this.$emit('trigger-change', fields)
      },
      mapPropsToFields: () => {
        return {
          component: this.$form.createFormField({
            value: this.fields.component
          }),
          genre: this.$form.createFormField({
            value: this.fields.genre
          }),
          title: this.$form.createFormField({
            value: this.fields.title
          }),
          buttonType: this.$form.createFormField({
            value: this.fields.buttonType
          }),
          description: this.$form.createFormField({
            value: this.fields.description
          })
        }
      },
      onValuesChange: (_, values) => {
        this.$emit('trigger-change', values)
        // Synchronize to vuex store in real time
        // this.$store.commit('update', values)
      }
    })
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
