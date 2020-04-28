<template>
  <content-component>
    <edit-component
      slot="header"
      :btnText="'创建'"
      :configs="configs"
      @submit="createTag"
    ></edit-component>
    <list-component
      :configs="tagConfig"
      :datas="datas"
      border
      v-loading="isLoading"
    >
      <el-table-column fixed="right" label="操作">
        <template slot-scope="scope">
          <el-button type="primary" size="small" @click="handleEdit(scope.row)"
            >编辑</el-button
          >
          <el-button
            slot="reference"
            @click="delTag(scope.row)"
            type="danger"
            size="small"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </list-component>
    <div slot="footer" style="text-align:center">
      <el-pagination
        @size-change="handleLimitChange"
        @current-change="handlePageChange"
        :current-page="page"
        :page-size="limit"
        layout="total, prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination>
    </div>
  </content-component>
</template>

<script>
import tagDialog from './tagDialog'
import api from 'api/blog/tag'
import { Message } from 'element-ui'
import ContentComponent from '@/modules/components/content'
import EditComponent from 'modules/components/edit-form-dialog'
import ListComponent from 'modules/components/table-list'
import TablePageMixins from 'modules/mixins/table-page'
import { tagConfig } from '@/fields/blog/tag'
export default {
  mixins: [TablePageMixins],
  components: {
    tagDialog,
    ContentComponent,
    EditComponent,
    ListComponent,
  },
  props: {
    id: {},
  },
  data() {
    return {
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
      tagConfig,
    }
  },
  mounted() {
    this.fetchData()
  },
  methods: {
    async getDatas() {
      return await api.getTag()
    },
    handleEdit(item) {
      this.editItem = { ...item }
      this.showDialog = true
    },
    createTag({params, callback}) {
      console.log(params)
      callback()
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
  },
}
</script>

<style lang="scss" scoped></style>
