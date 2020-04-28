<template>
  <content-component>
    <edit-component
      slot="header"
      :btnText="'创建'"
      :configs="configs"
    ></edit-component>
    <el-button>按钮</el-button>
  </content-component>
</template>

<script>
import tagDialog from './tagDialog'
import api from '@/api/tag'
import { Message } from 'element-ui'
import ContentComponent from '@/modules/components/content'
import EditComponent from 'modules/components/edit-form-dialog'
export default {
  components: {
    tagDialog,
    ContentComponent,
    EditComponent,
  },
  props: {
    id: {},
  },
  data() {
    return {
      item: [],
      listLoading: false,
      search: '',
      showDialog: false,
      editItem: {},
      delVisible: false,
      configs: [
        {
          prop: 'name',
          label: '标签名称',
          type: 'input',
          required: true,
        },
        {
          prop: 'desc',
          label: '分类描述',
          type: 'input',
          required: true,
        },
      ],
      params: {},
    }
  },
  methods: {
    async getList() {
      this.listLoading = true
      let { data } = await api.getTag()
      if (data.code === 0) {
        this.item = data.data
      }
      this.listLoading = false
    },
    handleEdit(item) {
      this.editItem = { ...item }
      this.showDialog = true
    },
    delTag(item) {
      this.$confirm('确认删除该分类吗？')
        .then(async () => {
          const { data } = await api.delTag({ id: item.id })
          if (data.code === 0) {
            Message({
              message: data.message || '删除成功',
              type: 'success',
            })
            this.getList()
          } else {
            Message({
              message: data.message || '删除失败',
              type: 'error',
            })
          }
        })
        .catch(() => {})
    },
    closeDialog() {
      this.editItem = {}
      this.showDialog = false
    },
  },
  created() {
    // this.id && this.fetch();
    // this.fetchParents();
    // this.getList()
  },
}
</script>

<style lang="scss" scoped></style>
