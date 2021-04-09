<template>
  <div class="table-wrapper">
    <el-table
      v-loading="loading"
      style="width: 100%"
      v-bind="[$props, $attrs]"
      :data="tableData"
      v-on="$listeners"
    >
      <slot />
    </el-table>
    <v-pagination
      v-if="pagination"
      class="pagination"
      layout="prev, pager, next, jumper"
      hide-on-single-page
      :current-page.sync="currentPage"
      :page-size="pageSize"
      :pager-count="pagerCount"
      :total="totalCount"
      @current-change="loadTableData"
    />
  </div>
</template>

<script>
import VPagination from './VPagination'

export default {
  name: 'VTable',
  components: {
    VPagination
  },
  props: {
    loadData: {
      type: Function,
      default: () => new Promise()
    },
    pageSize: {
      type: Number,
      default: 10
    },
    pagerCount: {
      type: Number,
      default: 11
    },
    autoload: {
      type: Boolean,
      default: false
    },
    pagination: {
      type: Boolean,
      default: false
    },
    data: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      currentPage: 1,
      totalCount: 0,
      respData: [],
      loading: false
    }
  },
  computed: {
    tableData() {
      return [...this.data, ...this.respData]
    }
  },
  mounted() {
    if (this.autoload) {
      this.loadTableData()
    }
  },
  methods: {
    loadTableData(resetPage = false) {
      // NOTE: current-papge 触发时会回调传入当前页数，故这里判断是否为boolean再做重置页码操作
      if (typeof resetPage === 'boolean' && resetPage) {
        this.resetPage()
      }
      this.loading = true
      this.loadData(this.currentPage, this.pageSize).then((data) => {
        this.totalCount = data.count
        this.respData = data.list
        this.lastPage = this.currentPage
      }).catch(() => {
        this.currentPage = this.lastPage || 1
      }).finally(() => {
        this.loading = false
      })
    },
    resetPage() {
      this.currentPage = 1
    }
  }
}
</script>

<style lang="less" scoped>
.table-wrapper {
  /deep/ .el-table {
    font-size: 12px;
    thead {
      color: #666;
    }
    th {
      padding:5px;
      background-color: #e8f2ff;
    }

    .el-table__body {
      color: #333;
      tr {
        &:hover>td {
          background-color: transparent;
        }
      }
      .el-table__row--striped {
        &:hover > td {
          background-color: #fafafa;
        }
      }
    }
  }

  .pagination {
    margin-top: 100px;
    text-align: center;
    color: #999;
    height: 42px;

    /deep/ .el-pager {
      li {
        font-size: 14px;
        font-weight: normal;
        &.active {
          color: #4490f1;
          font-weight: bold;
        }
      }
    }
  }
}
</style>
