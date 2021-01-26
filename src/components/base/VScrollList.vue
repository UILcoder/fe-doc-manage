<template>
  <div class="v-scroll-list">
    <slot :list="list" />
    <div
      v-show="loading"
      v-loading="loading"
      class="loading-wrapper"
    />
    <no-data v-if="list.length === 0 && loaded" />
  </div>
</template>

<script>
import { NOOP } from '@/constants'
import NoData from '@/components/NoData'
import scroll from '@/utils/scroll'

export default {
  name: 'VScrollList',
  components: {
    NoData
  },
  props: {
    offsetBottom: {
      type: Number,
      default: 200
    },
    loadData: {
      type: Function,
      default: NOOP
    },
    autoload: {
      type: Boolean,
      default: true
    },
    pagination: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      loading: true,
      loaded: false,
      list: []
    }
  },
  mounted() {
    this.pageNo = 1
    this.pageSize = 20
    this.lastScrollTop = 0
    this.autoload && this.handlePageChange()
    this.$nextTick(() => {
      scroll.watch(this.handleScroll)
    })
  },
  beforeDestroy() {
    scroll.remove(this.handleScroll)
  },
  methods: {
    handleScroll() {
      const scrollTop = scroll.getTop()
      const scrollHeight = scroll.getHeight()
      const { clientHeight } = document.body
      // 向下滚动
      if (scrollTop >= this.lastScrollTop) {
        const isReachBootom = scrollTop >= scrollHeight - clientHeight - this.offsetBottom
        if (isReachBootom && this.pagination && !this.loading && !this.noMore) {
          this.pageNo += 1
          this.handlePageChange()
        }
      }
      this.lastScrollTop = scrollTop
    },
    async handlePageChange() {
      this.loading = true
      this.loaded = false
      try {
        const result = await this.loadData(this.pageNo, this.pageSize)
        this.count = result.count
        this.list = this.pageNo === 1 ? result.list : [...this.list, ...result.list]
        this.noMore = this.list.length === result.count
        this.$nextTick(() => {
          const scrollHeight = scroll.getHeight()
          if (scrollHeight <= document.body.clientHeight && !this.noMore) {
            this.pageNo += 1
            this.handlePageChange()
          }
        })
      } catch (e) {
        if (this.pageNo > 1) {
          this.pageNo -= 1
        }
      } finally {
        this.loading = false
        this.loaded = true
      }
    },
    load({ pageNo, pageSize = 20, callback = NOOP }) {
      this.pageNo = pageNo
      this.handlePageChange()
      setTimeout(() => {
        callback()
      }, 300)
    },
    reset() {
      this.list = []
      this.pageNo = 1
      this.noMore = false
      this.loading = false
      this.loaded = false
    }
  }
}
</script>

<style lang="less" scoped>
.v-scroll-list {
  .loading-wrapper {
    margin-top: 10px;
    height: 100px;
    width: 100%;
  }
}
</style>
