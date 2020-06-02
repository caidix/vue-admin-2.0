<template>
  <div class="tag">
    <h1>归档集合列表</h1>
    <div class="filter-container">
      <el-button type="primary" icon="el-icon-edit" size="small" @click="handleEdit">新建标签</el-button>
    </div>
    <list-component :configs="config" :datas="datas" border v-loading="isLoading">
      <el-table-column fixed="right" label="操作">
        <template slot-scope="{row}">
          <el-button type="primary" size="small" @click="handleEdit(row)">编辑</el-button>
          <el-button slot="reference" @click="delTag(row)" type="danger" size="small">删除</el-button>
        </template>
      </el-table-column>
    </list-component>
    <el-pagination @size-change="handleLimitChange" @current-change="handlePageChange" :current-page="page"
      :page-size="limit" :page-sizes="[5, 10, 30, 50]" layout="total, prev, sizes, pager, next, jumper" :total="total">
    </el-pagination>
    <gatherDialog :dialogVisibie="showDialog" :item="editItem" @dialog-close="closeDialog" @change-success="fetchData"
      :parents="item" />
  </div>
</template>

<script>
  import gatherDialog from "./gatherDialog";
  import api from "api/blog/gather";
  import {
    config
  } from '@/fields/blog/gather'
  import ListComponent from 'modules/components/table-list'
  import TablePageMixins from 'modules/mixins/table-page'
  import {
    Message
  } from "element-ui";
  export default {
    mixins: [TablePageMixins],
    components: {
      gatherDialog,
      ListComponent,
      TablePageMixins
    },
    props: {
      id: {}
    },
    data() {
      return {
        item: [],
        config: Object.freeze(config.getFields()),
        showDialog: false,
        editItem: {},
      };
    },
    methods: {
      async getDatas() {
        const params = {
          limit: this.limit,
          page: this.page
        }
        return await api.getGather(params)
      },
      handleEdit(item = {}) {
        this.editItem = {
          ...item
        };
        this.showDialog = true;
      },
      async delTag(item) {
        this.$confirm("确认删除该分类吗？")
          .then(async () => {
            const {
              data
            } = await api.delGather(item._id);
            if (data.code === 0) {
              Message({
                message: data.message || "删除成功",
                type: "success"
              });
              this.fetchData();
            } else {
              Message({
                message: data.message || "删除失败",
                type: "error"
              });
            }
          })
          .catch(() => {});
      },
      closeDialog() {
        this.editItem = {};
        this.showDialog = false;
      }
    },
    created() {
      // this.id && this.fetch();
      // this.fetchParents();
      this.fetchData()
    }
  };
</script>

<style lang="scss" scoped>
  .tag {
    min-height: calc(100vh - 127px);
    width: 100%;
    padding: 0 10px;

    .filter-container {
      margin: 20px 0;
    }
  }
</style>