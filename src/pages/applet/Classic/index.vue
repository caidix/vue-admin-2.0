<template>
  <content-component>
    <edit-component slot="header" @submit="fetchData" :datas="datas"></edit-component>
    <list-component :configs="tagConfig" :datas="datas" border v-loading="isLoading">
      <el-table-column fixed="right" label="操作">
        <template slot-scope="{row}">
          <edit-component isEdit :datas="datas" :editId="row.id" @submit="fetchData" :data="row">
          </edit-component>
          <el-button slot="reference" @click="delCategory(row)" type="danger" size="small">删除</el-button>
        </template>
      </el-table-column>
    </list-component>
    <div slot="footer" style="text-align:center">
      <el-pagination @size-change="handleLimitChange" @current-change="handlePageChange" :current-page="page"
        :page-size="limit" :page-sizes="[5, 10, 30, 50]" layout="total, prev, sizes, pager, next, jumper"
        :total="total">
      </el-pagination>
    </div>
  </content-component>
</template>

<script>
  import api from 'api/applet/classic'
  import {
    Message
  } from 'element-ui'
  import ContentComponent from '@/modules/components/content'
  import EditComponent from './editDialog'
  import ListComponent from 'modules/components/table-list'
  import TablePageMixins from 'modules/mixins/table-page'
  import {
    tagConfig
  } from '@/fields/applet/classic'
  export default {
    mixins: [TablePageMixins],
    components: {
      ContentComponent,
      EditComponent,
      ListComponent,
    },
    props: {
      id: {},
    },
    data() {
      return {
        configs: [{
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
        tagConfig: tagConfig.getFields()
      }
    },
    mounted() {
      this.fetchData()
    },
    methods: {
      async getDatas() {
        const params = {
          limit: this.limit,
          page: this.page
        }
        return await api.queryClassic(params)
      },
      handleEdit(item) {
        this.editItem = {
          ...item
        }
        this.showDialog = true
      },
      delCategory(item) {
        this.$confirm('确认删除该分类吗？')
          .then(async () => {
            const {
              data
            } = await api.delCategory({
              id: item.id
            })
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
          .catch(() => { })
      },
    },
  }
</script>

<style lang="scss" scoped></style>