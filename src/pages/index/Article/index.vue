<template>
  <div class="article-container">
    <h1>文章列表</h1>
    <el-row type="flex" class="search-input">
      <el-col :span="3">文章搜索：</el-col>
      <el-col :span="16">
        <el-autocomplete class="inline-input" v-model="searchValue" :fetch-suggestions="querySearch" placeholder="请输入标题"
          :trigger-on-focus="false" @select="handleSelect" :debounce="500" prefix-icon="el-icon-search"
          :clearable="true"></el-autocomplete>
      </el-col>
    </el-row>
    <el-table :data="datas" v-loading="isLoading" border>
      <el-table-column type="expand">
        <template slot-scope="{row}">
          <el-form label-position="left" inline class="table-expand">
            <el-form-item label="类型">
              <span>{{ row.origin|originFilter }}</span>
            </el-form-item>
            <el-form-item label="喜欢">
              <span>{{ row.likes }}</span>
            </el-form-item>
            <el-form-item label="文章描述">
              <span>{{ row.introduction }}</span>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column prop="title" label="标题"></el-table-column>
      <el-table-column prop="author" label="作者"></el-table-column>
      <el-table-column prop="viewCount" label="阅读量"></el-table-column>
      <el-table-column prop="createdAt" label="添加时间">
        <template slot-scope="{row}">
          {{ row.createdAt | mapTimer }}
        </template>
      </el-table-column>
      <el-table-column prop="updatedAt" label="更新时间">
        <template slot-scope="{row}">
          {{ row.updatedAt | mapTimer }}
        </template>
      </el-table-column>
      <el-table-column prop="draft" label="状态">
        <template slot-scope="{row}">
          <el-tag :type="row.draft | statusFilter">{{ row.draft | draftFilter }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column fixed="right" width="250" label="操作">
        <template slot-scope="scope">
          <el-button type="primary" size="small" plain @click="editArticle(scope.row)">编辑</el-button>
          <el-button @click="handleDel(scope.row)" type="danger" size="small">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination @size-change="handleLimitChange" @current-change="handlePageChange" :current-page="page"
      :page-size="limit" :page-sizes="[5, 10, 30, 50]" layout="total, prev, sizes, pager, next, jumper" :total="total">
    </el-pagination>
  </div>
</template>


<script>
  import api from "api/blog/article.js";
  import TablePageMixins from 'modules/mixins/table-page'
  import moment from 'moment';
  export default {
    mixins: [TablePageMixins],
    filters: {
      originFilter(value) {
        const originMap = ["原创", "转载", "混合"];
        return originMap[value];
      },
      draftFilter(draft) {
        const statusMap = ["已发布", "草稿"];
        return statusMap[draft];
      },
      statusFilter(status) {
        const statusMap = ["success", "info"];
        return statusMap[status];
      },
      mapTimer(time) {
        return moment(time).format('YYYY-MM-DD HH:mm:ss')
      }
    },
    data() {
      return {
        searchValue: "",
        limitSearch: 0,
      };
    },
    mounted() {
      this.fetchData();
    },
    methods: {
      async querySearch(queryString, cb) {
        let {
          data
        } = await api.fuzzySearch({
          title: queryString
        });
        if (data.code === 0) {
          let res = data.data.reduce((prev, next) => {
            prev.push({
              value: next.title,
              _id: next._id
            });
            return prev;
          }, []);
          cb(res);
        } else {
          cb([]);
        }
      },
      handleSelect(value) {
        this.editArticle(value);
      },
      getDatas() {
        return api.getArticle({
          limit: this.limit,
          page: this.page
        });
      },
      editArticle(row) {
        this.$router.push(`/article/edit/${row._id}`);
      },
      async handleDel(row) {
        try {
          await this.$confirm(`此操作将永久删除文章：${row.title}, 是否继续?`, "提示", {
            type: "warning"
          })
        } catch (error) {
          return;
        }
        let {
          data
        } = await api.delArticle(row._id);
        if (data.code === 0) {
          this.fetchData();
          this.$message({
            type: "success",
            message: "删除成功!"
          });
        } else {
          this.$message({
            message: data.message || "删除失败",
            type: "error"
          });
        }
      },
    }
  };
</script>
<style lang="scss">
  .article-container {
    .table-expand {
      font-size: 0;
    }

    .table-expand label {
      width: 90px;
      color: #99a9bf;
    }

    .table-expand .el-form-item {
      margin-right: 0;
      margin-bottom: 0;
      width: 50%;
    }

    .search-input {
      align-items: center;
      margin-bottom: 20px;

      .inline-input {
        min-width: 450px;
      }
    }
  }
</style>