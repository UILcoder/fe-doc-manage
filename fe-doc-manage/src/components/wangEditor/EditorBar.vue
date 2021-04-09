<template lang="html">
  <div class="editor">
    <div ref="toolbar" class="toolbar">
    </div>
    <div ref="editor" class="text">
    </div>
  </div>
</template>

<script>
import E from 'wangeditor'
import store from '@/store'

export default {
  name: 'EditorBar',
  data() {
    return {
      // uploadPath,
      editor: null,
      info_: null,
      upTypeStr: '',
      wordCount: 0
    }
  },
  model: {
    prop: 'value',
    event: 'change'
  },
  props: {
    value: {
      type: String,
      default: ''
    },
    clearTag: {
      type: Boolean,
      default: false
    },
    upType: {
      type: String,
      default: ''
    }
  },
  watch: {
    clearTag(val) {
      // console.log('enter')
      if (val) {
        this.editor.txt.clear()
        this.info_ = null
      }
    },
    value(value) {
      if (value !== this.editor.txt.html()) {
        this.editor.txt.html(this.value)
      }
    }
  },
  mounted() {
    this.seteditor()
    this.editor.txt.html(this.value)
  },
  methods: {
    seteditor() {
      this.editor = new E(this.$refs.toolbar, this.$refs.editor)
      this.editor.customConfig.uploadImgShowBase64 = false // base 64 存储图片
      this.editor.customConfig.uploadImgServer = `${process.env.BASE_API}/file/upload`// 配置服务器端地址
      this.editor.customConfig.uploadImgHeaders = {
        Authorization: `Bearer ${store.getters.token}`
      }// 自定义 header
      this.editor.customConfig.uploadFileName = 'files' // 后端接受上传文件的参数名
      this.editor.customConfig.uploadImgMaxSize = 2 * 1024 * 1024 // 将图片大小限制为 2M
      this.editor.customConfig.uploadImgMaxLength = 20 // 限制一次最多上传 20 张图片
      this.editor.customConfig.uploadImgTimeout = 3 * 60 * 1000 // 设置超时时间

      this.editor.customConfig.uploadImgParams = {
        type: this.upType
      }

      // 配置菜单
      this.editor.customConfig.menus = [
        'head', // 标题
        'bold', // 粗体
        'fontSize', // 字号
        'fontName', // 字体
        'italic', // 斜体
        // 'underline', // 下划线
        // 'strikeThrough', // 删除线
        // 'foreColor', // 文字颜色
        // 'backColor', // 背景颜色
        'link', // 插入链接
        'list', // 列表
        'justify', // 对齐方式
        // 'quote', // 引用
        // 'emoticon', // 表情
        'image', // 插入图片
        'table', // 表格
        // 'video', // 插入视频
        // 'code', // 插入代码
        'undo', // 撤销
        'redo' // 重复
        // 'fullscreen' // 全屏
      ]

      this.editor.customConfig.uploadImgHooks = {
        // fail: (xhr, editor, result) => {
        //   // 插入图片失败回调
        // },
        // success: (xhr, editor, result) => {
        //   // 图片上传成功回调
        // },
        // timeout: (xhr, editor) => {
        //   // 网络超时的回调
        // },
        // error: (xhr, editor) => {
        //   // 图片上传错误的回调
        // },
        customInsert: (insertImg, result) => {
          // 图片上传成功，插入图片的回调
          const url = result.data
          insertImg(url)
        }
      }
      this.editor.customConfig.onchange = (html) => {
        // 绑定当前逐渐地值
        this.info_ = html
        this.wordCount = this.editor.txt.text().replace(/\\&.*?\\;/g, ' ').length
        // 将内容同步到父组件中
        this.$emit('change', this.info_, this.wordCount)
      }
      // 创建富文本编辑器
      this.editor.create()
    }
  }
}
</script>

<style lang="css">
  .editor {
    width: 100%;
    margin: 0 auto;
    position: relative;
    z-index: 0;
  }
  .toolbar {
    border: 1px solid #ccc;
  }
  .text {
    border: 1px solid #ccc;
    min-height: 500px;
  }
</style>
