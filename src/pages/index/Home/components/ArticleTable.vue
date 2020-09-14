<template>
  <div>
    <div class="hot-title">近一周文章热度排行</div>
    <el-table :data="data" style="width: 100%;">
      <el-table-column label="标题" min-width="200" prop="title">
      </el-table-column>
      <el-table-column label="浏览量" width="195" align="center" prop="total">
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
  export default {
    props: {
      data: {
        type: Array,
        required: true
      }
    }
  }
</script>

<style lang="scss" scoped>
  .hot-title {
    color: rgb(64, 201, 198);
    font-size: 32px;
    text-align: center;
  }
</style>