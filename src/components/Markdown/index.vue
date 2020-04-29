<template>
  <div>
    <mavon-editor
      v-model="content"
      ref="md"
      @change="change"
      @imgAdd="upadateImg"
      style="min-height: 600px"
      @navigationToggle="toggle"
    />
    <el-button type="success" @click="submit">提交</el-button>
  </div>
</template>
<script>
import { mavonEditor } from "mavon-editor";
import "mavon-editor/dist/css/index.css";
import api from "api/blog/article";
export default {
  // 注册
  components: {
    mavonEditor
  },
  props: ["currentContent"],
  watch: {
    currentContent(val) {
      this.content = val;
    }
  },
  data() {
    return {
      content: "", // 输入的markdown
      html: "" // 及时转的html
    };
  },
  methods: {
    // 所有操作都会被解析重新渲染
    toggle(result, as){
      console.log(result,as)
    },
    change(value, render) {
      // render 为 markdown 解析后的结果[html]
      this.html = render;
    },
    async upadateImg(pos, $file) {
      let formData = new FormData();
      formData.append("file", $file);
      let { data } = await api.uploadImg(formData);
      if (data.code === 0) {
        this.$refs.md.$img2Url(pos, data.data.url);
      }
    },
    // 提交
    submit() {
      this.$emit("submit-article", {
        content: this.content,
        html: this.html
      });
    }
  },
  mounted() {}
};
</script>