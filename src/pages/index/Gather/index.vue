<template>
  <div class="tag">
    <h1>归档集合列表</h1>
    <div class="filter-container">
      <el-button type="primary" icon="el-icon-edit" size="small" @click="handleEdit">新建标签</el-button>
    </div>
    <div>
      <el-table
        v-loading="listLoading"
        fit
        border
        style="width: 100%"
        :data="item.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()))"
      >
        <el-table-column prop="id" label="ID" width="100"></el-table-column>
        <el-table-column prop="name" label="归档名称" width="120"></el-table-column>
        <el-table-column prop="desc" label="归档描述" min-width="300"></el-table-column>
        <el-table-column prop="img" label="封面地址">
          <template slot-scope="scope">
            <img style="width:50px;height:50px" class="avatar" :src="scope.row.img" alt="">
          </template>
        </el-table-column>
        <el-table-column prop="update_time" label="修改日期" width="180"></el-table-column>
        <el-table-column fixed="right">
          <template slot="header" slot-scope="scope">
            <el-input v-model="search" size="mini" placeholder="输入归档名搜索" />
          </template>
          <template slot-scope="scope">
            <el-button type="primary" size="small" @click="handleEdit(scope.row)">编辑</el-button>
            <el-button
              slot="reference"
              @click="delTag(scope.row)"
              type="danger"
              size="small"
            >删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <gatherDialog
      :dialogVisibie="showDialog"
      :item="editItem"
      @dialog-close="closeDialog"
      @change-success="getList"
      :parents="item"
    />
  </div>
</template>

<script>
import gatherDialog from "./gatherDialog";
import api from "api/blog/gather";
import { Message } from "element-ui";
export default {
  components: {
    gatherDialog
  },
  props: {
    id: {}
  },
  data() {
    return {
      item: [],
      listLoading: false,
      search: "",
      showDialog: false,
      editItem: {},
      delVisible: false
    };
  },
  methods: {
    async getList() {
      this.listLoading = true;
      let { data } = await api.getGather();
      if (data.code === 0) {
        this.item = data.data;
      }
      this.listLoading = false;
    },
    handleEdit(item) {
      this.editItem = { ...item };
      this.showDialog = true;
    },
    async delTag(item) {
      this.$confirm("确认删除该分类吗？")
        .then(async _ => {
          const { data } = await api.delGather({ id: item.id });
          if (data.code === 0) {
            Message({
              message: data.message || "删除成功",
              type: "success"
            });
            this.getList();
          } else {
            Message({
              message: data.message || "删除失败",
              type: "error"
            });
          }
        })
        .catch(_ => {});
    },
    closeDialog() {
      this.editItem = {};
      this.showDialog = false;
    }
  },
  created() {
    // this.id && this.fetch();
    // this.fetchParents();
    this.getList();
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