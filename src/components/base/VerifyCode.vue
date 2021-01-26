<template>
  <v-input
    ref="vInput"
    v-model="input"
    placeholder="请输入短信验证码"
    :autofocus="autofocus"
    v-on="$listeners"
    @keyup.native="input=input.replace(/[^\d]/g,'')"
  >
    <v-link
      slot="suffix"
      class="sendText"
      :selected="surplusTime <= 0"
      :clickable="surplusTime <= 0"
      @click="sendVerifyCode"
    >
      {{ displayText }}
    </v-link>
  </v-input>
</template>

<script>
import { Local } from '@/utils/storage'
import { VERIFY_CODE_TYPE } from '@/constants'
import { sendVerifyCode } from '@/api/common'

const prefix = 'SMS_'

export default {
  name: 'VerifyCode',
  props: {
    autofocus: {
      type: Boolean,
      default: false
    },
    mobile: {
      type: [String, Number],
      default: ''
    },
    type: {
      type: String,
      default: ''
    },
    autoSend: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      endTime: -1,
      surplusTime: 0,
      sended: false
    }
  },
  computed: {
    displayText() {
      if (this.surplusTime > 0) {
        return `${this.surplusTime}s`
      }
      if (this.sended) {
        return '重新发送'
      }
      return '获取验证码'
    },
    input: {
      get() {
        return this.$attrs.value
      },
      set(val) {
        this.$emit('input', val)
      }
    }
  },
  watch: {
    mobile() {
      if (this.autoSend) {
        this.init()
      }
    }
  },
  mounted() {
    this.init()
  },
  beforeDestroy() {
    if (this.timer) {
      clearInterval(this.timer)
    }
  },
  methods: {
    init() {
      if (this.mobile && this.mobile.length === 11) {
        const cachedData = Local.get(`${prefix}${this.mobile}_${this.type}`)
        if (cachedData) {
          this.sended = true
          this.surplusTime = Math.floor(cachedData / 1000)
          this.loop()
        } else if (this.autoSend) {
          this.sendVerifyCode()
        }
      }
    },
    sendVerifyCode() {
      const { uniqProductKey } = this.$route.query
      sendVerifyCode(this.mobile, VERIFY_CODE_TYPE[this.type], uniqProductKey).then((data) => {
        this.surplusTime = Math.floor(data.endMilliseconds / 1000)
        this.sended = true
        this.loop()
        Local.set(`${prefix}${this.mobile}_${this.type}`, data.endMilliseconds, data.endMilliseconds)
      }).catch(() => {})
    },
    loop() {
      if (this.timer) {
        clearInterval(this.timer)
      }
      this.timer = setInterval(this.countdown, 1000)
      this.countdown()
    },
    countdown() {
      if (this.surplusTime <= 0) {
        clearInterval(this.timer)
        this.timer = null
      } else {
        this.surplusTime = Math.floor(this.surplusTime - 1)
        Local.set(`${prefix}${this.mobile}_${this.type}`, Math.floor(this.surplusTime - 1) * 1000, Math.floor(this.surplusTime - 1) * 1000)
      }
    }
  }
}
</script>

<style lang="less" scoped>
.v-input {
  /deep/ .el-input__inner {
    padding-right: 90px;
  }
}

</style>
