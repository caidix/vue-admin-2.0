<template>
  <div class="list">
    <h1>管理员列表</h1>
    <div class="filter-container">
      <el-button type="primary" icon="el-icon-edit" size="small" @click="handleEdit">新建用户</el-button>
    </div>
    <el-table :data="item" border v-loading="listLoading">
      <el-table-column prop="_id" label="ID" width="130"></el-table-column>
      <el-table-column prop="username" label="用户名"></el-table-column>
      <el-table-column prop="introduce" label="简述" width="400"></el-table-column>
      <el-table-column prop="avatar" label="头像">
        <template slot-scope="scope">
          <img :src="scope.row.avatar" style="height:3rem" alt />
        </template>
      </el-table-column>
      <el-table-column prop="username" label="权限类型">
        <template slot-scope="{row}">
          <el-tag :type="row.type | typeFilter">{{row.type|typeMeanFilter}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column fixed="right" width="250" label="操作">
        <template slot-scope="scope">
          <el-button type="primary" size="small" @click="edit(scope.row)" plain>编辑
          </el-button>
          <el-button @click="handleDel(scope.row)" type="danger" size="small">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination @size-change="handleLimitChange" @current-change="handlePageChange" :current-page="page"
      :page-size="limit" :page-sizes="[5, 10, 30, 50]" layout="total, prev, sizes, pager, next, jumper" :total="total">
    </el-pagination>
    <UserDialog :show.sync="dialogShow" @add-success="fetch" :is-edit.sync="isEdit" :edit-form="editForm" />
  </div>
</template>

<script>
  import api from "api/user.js";
  import UserDialog from "./userDialog";
  import TablePageMixins from 'modules/mixins/table-page'
  export default {
    mixins: [TablePageMixins],
    components: {
      UserDialog
    },
    filters: {
      typeMeanFilter(value) {
        const typeMap = ["普通用户", "管理员"];
        return typeMap[value];
      },
      typeFilter(value) {
        const typeMap = ["info", "success"];
        return typeMap[value];
      }
    },
    data() {
      return {
        item: [],
        listLoading: false,
        dialogShow: false,
        isEdit: false,
        editForm: {}
      };
    },
    mounted() {
      this.fetch();
    },
    methods: {
      handleEdit() {
        this.isEdit = false;
        this.dialogShow = true;
      },
      edit(value) {
        this.isEdit = true;
        this.editForm = {
          ...value
        };
        this.dialogShow = true;
      },
      async fetch() {
        this.listLoading = true;
        let {
          data
        } = await api.list({
          limit: this.limit,
          page: this.page
        });
        if (data.code === 0) {
          this.item = data.data.data;
          this.total = data.data.total;
          this.$message({
            type: "success",
            message: data.message
          });
        } else {
          this.$message({
            type: "error",
            message: "获取列表失败!"
          });
        }
        this.listLoading = false;
      },
      handleDel(row) {
        this.$confirm(`是否删除?`, "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(async () => {
          let {
            data
          } = await api.delUser(row._id);
          this.$message({
            type: data.code === 0 ? "success" : "error",
            message: data.message
          });
          this.fetch();
        });
      }
    },
  };
</script>

<style lang="scss" scoped>
  .filter-container {
    margin: 20px 0;
  }
</style>