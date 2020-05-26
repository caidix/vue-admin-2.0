<template>
  <div class="edit-container">
    <h1 style="margin-bottom:0">{{id?'编辑文章':'新建文章'}}</h1>
    <el-row>
      <el-col :span="24">
        <el-form
          :model="postForm"
          :rules="rules"
          ref="postForm"
          v-loading.fullscreen.lock="loading"
        >
          <el-form-item style="margin-bottom: 20px;" prop="title">
            <MDinput v-model="postForm.title" :maxlength="100" name="name">标题</MDinput>
          </el-form-item>
          <div class="postInfo-container">
            <el-row>
              <el-col :span="8">
                <el-form-item
                  label-width="120px"
                  prop="author"
                  label="作者:"
                  class="postInfo-container-item"
                >
                  <el-input
                    v-model="postForm.author"
                    filterable
                    default-first-option
                    remote
                    placeholder="请输入作者名"
                  >
                    <!-- :remote-method="getRemoteUserList" -->
                    <el-option
                      v-for="(item,index) in userListOptions"
                      :key="item+index"
                      :label="item"
                      :value="item"
                    />
                  </el-input>
                </el-form-item>
              </el-col>

              <el-col :span="8">
                <el-form-item label-width="120px" label="发布时间:" class="postInfo-container-item">
                  <el-date-picker
                    v-model="displayTime"
                    type="datetime"
                    format="yyyy-MM-dd HH:mm:ss"
                    placeholder="Select date and time"
                  />
                </el-form-item>
              </el-col>

              <el-col :span="8">
                <el-form-item
                  label-width="120px"
                  prop="keyword"
                  label="关键字:"
                  class="postInfo-container-item"
                >
                  <el-input v-model="postForm.keyword" placeholder="请输入关键字"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </div>
          <div>
            <el-row>
              <el-col :span="8">
                <el-form-item label-width="120px" prop="category" label="文章分类">
                  <el-select v-model="postForm.category" multiple placeholder="请选择文章分类">
                    <template v-for="(item, index) in categoryList">
                      <el-option :label="item.name" :value="item._id" :key="index"></el-option>
                    </template>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label-width="120px" prop="origin" label="文章来源">
                  <el-select v-model="postForm.origin" placeholder="请选择文章来源">
                    <el-option label="原创" :value="0"></el-option>
                    <el-option label="转载" :value="1"></el-option>
                    <el-option label="混合" :value="2"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label-width="120px" prop="draft" label="是否发布">
                  <el-select v-model="postForm.draft" placeholder="是否发布">
                    <el-option label="草稿" :value="1"></el-option>
                    <el-option label="正文" :value="0"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label-width="120px" prop="tags" label="标签">
                  <el-select v-model="postForm.tags" multiple placeholder="请选择标签分类">
                    <template v-for="(item, index) in tagList">
                      <el-option :label="item.name" :value="item._id" :key="index"></el-option>
                    </template>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label-width="120px" prop="gather" label="归档">
                  <el-select v-model="postForm.gather" placeholder="请选择归档分类">
                    <template v-for="(item, index) in gatherList">
                      <el-option :label="item.name" :value="item._id" :key="index"></el-option>
                    </template>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col　:span="16">
                 <el-form-item label-width="120px" prop="img_url" label="文章封面">
                  <el-upload
                      class="avatar-uploader"
                      :action="'/api/admin/upload'"
                      :on-success="upload"
                    >
                      <img v-if="postForm.img_url" :src="postForm.img_url" class="avatar">
                      <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                  </el-upload>
                 </el-form-item>
              </el-col>
            </el-row>
            <el-form-item label-width="120px" label="简述" prop="introduction">
              <el-input type="textarea" v-model="postForm.introduction"></el-input>
            </el-form-item>
          </div>
        </el-form>
      </el-col>
      <el-col :span="24">
        <Markdown @submit-article="submit" :currentContent="content" />
      </el-col>
    </el-row>
  </div>
</template>

<script>
import MDinput from "@/components/MDinput";
import Markdown from "@/components/Markdown";
import api from "api/blog/article";
import cat from "api/blog/category";
import tag from "api/blog/tag";
import gat from "api/blog/gather";
export default {
  components: {
    MDinput,
    Markdown
  },
  props: {
    id: {}
  },
  computed: {
    displayTime: {
      get() {
        return +new Date(this.postForm.addTime);
      },
      set(val) {
        this.postForm.addTime = new Date(val);
      }
    }
  },
  data() {
    const validateRequire = (rule, value, callback) => {
      if (!value) {
        this.$message({
          message: rule.field + "为必传项",
          type: "error",
          duration: 2000
        });
        callback(new Error(rule.field + "为必传项"));
      } else {
        callback();
      }
    };
    return {
      postForm: {
        addTime: new Date(),
        keyword: "",
        author: "",
        title: "",
        category: [],
        origin: 0,
        author: "",
        introduction: "",
        draft: 0,
        tags: 0,
        img_url: '',
        gather: ''
      },
      loading: false,
      userListOptions: [],
      rules: {
        title: [{ validator: validateRequire }],
        keyword: [{ validator: validateRequire }],
        // author: [{ validator: validateRequire }],
        content: [{ validator: validateRequire }]
      },
      content: "",
      categoryList: [],
      tagList: [],
      gatherList: []
    };
  },
  created() {
    this.getCategory();
    this.getTag();
    this.getGather();
    this.id && this.fetch();
  },
  methods: {
    upload(data){
      this.$set(this.postForm, 'img_url', data.data.url)
    },
    async fetch() {
      this.loading = true;
      let { data } = await api.findOneArticle({ id: this.id });
      if (data.code === 0) {
        this.$message({
          message: data.message,
          type: "success",
          duration: 2000
        });
        data = data.data;
        let category = data.category.map(val => val._id);
        this.postForm = {
          title: data.title,
          category,
          origin: data.origin,
          author: data.author,
          introduction: data.introduction,
          draft: data.draft,
          keyword: data.keyword,
          addTime: data.addTime,
          tags:data.tags
        };
        this.content = data.articleContent.content;
      }
      this.loading = false;
    },
    async getCategory() {
      let { data } = await cat.getCategories({all: true});
      if (data.code === 0) {
        this.categoryList = data.data.data;
      }
    },
    async getGather() {
      let { data } = await gat.getGather({all: true});
      if (data.code === 0) {
        this.gatherList = data.data.data;
      }
    },
    async getTag() {
      let { data } = await tag.getTag({all: true});
      if (data.code === 0) {
        this.tagList = data.data.data;
      }
    },
    async submit(articleContent) {
      this.$refs.postForm.validate(async valid => {
        if (valid) {
          if (!articleContent.content) {
            this.$message({
              message: "文章内容不能为空",
              type: "error",
              duration: 2000
            });
            return false;
          }
          let params = Object.assign({}, this.postForm);
          params.articleContent = articleContent;
          if (this.id) {
            params._id = this.id;
          }
          this.loading = true;
          let { data } = this.id
            ? await api.editArticle(params)
            : await api.addArticle(params);
          if (data.code === 0) {
            this.$message({
              message: data.message,
              type: "success",
              duration: 2000
            });
            this.$router.push("/article/list");
          } else {
            this.$message({
              message: data.message,
              type: "error",
              duration: 2000
            });
          }
          this.loading = false;
        } else {
          return false;
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.edit-container {
  .postInfo-container {
    position: relative;
    margin-bottom: 10px;

    .postInfo-container-item {
      float: left;
    }
  }
  .avatar{
    width: 100px;
    height: 100px;
  }
}
</style>