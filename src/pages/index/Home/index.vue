<template>
  <div class="main-admin">
    <num-panel :nums="nums" />
    <el-row :gutter="32">
      <el-col :xs="24" :sm="24" :lg="16">
        <div class="chart-wrapper">
          <line-chart :chart-data="touristChart" />
        </div>
      </el-col>
      <el-col :xs="24" :sm="24" :lg="8">
        <div class="chart-wrapper">
          <ArticleTable :data="articleData" />
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import NumPanel from './components/NumPanel';
  import LineChart from './components/LineChart';
  import ArticleTable from './components/ArticleTable';
  import {
    getTourists
  } from 'api/blog/tourist';
  export default {
    components: {
      NumPanel,
      LineChart,
      ArticleTable
    },
    data() {
      return {
        touristChart: {},
        nums: {},
        articleData: []
      }
    },
    mounted() {
      this.getTourists();
    },
    methods: {
      async getTourists() {
        const {
          data
        } = await getTourists();
        if (data && data.code === 0) {
          console.log(data)
          this.touristChart = data.data.touristChart;
          this.nums = data.data.nums;
          this.articleData = data.data.articles;
        }
      }
    },
  };
</script>
<style lang="scss" scoped>
  .chart-wrapper {
    box-shadow: 4px 4px 40px rgba(0, 0, 0, 0.05);
    border-color: rgba(0, 0, 0, 0.05);
    background: #fff;
    padding: 16px 16px 0;
    margin-bottom: 32px;
  }
</style>