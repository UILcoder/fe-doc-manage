<template>
  <img :src="imgSrc">
</template>

<script>
import { STATIC_URL } from '@/config'

const defaultSrc = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAMAAABHPGVmAAAAeFBMVEUAAAD////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////v7+/29vb8/Pz6+vrx8fHz8/PaNMSPAAAAIXRSTlMA+ZAh7efayZ1eEt/28dLGvK6HhWxYTzkwJxwaFw0F4D0kHwq0AAAEEElEQVRo3qyXC3biMAxF7ZB/KP9C+XX6sOzsf4fT5LTjARzZJL4L8D3Sk5QTEUp9qDbr5aJJpUybxXK9qQ61iMm5Khs4aMrqHMdw3OZgyLfHqYZ6V8BLsZvSuFMyRxDz5DRSMSslgpHlbITimki8hEyurzreM7xM9v5ap1YYxeqFnu1TjCTdByo+E0wg+QxxXApMorgExJFjIrk3mI8Mk8k+eMfXGyLw9sXWYR3TLEwtswyRyAZzueSIRn4Z2I8CESnc+5IgKonzliAye0foKSKTPoe/QnRWT98PID4P35drhmBIa6Va09EqRdy2XEdNFillbvcYpcMmbCYRgO4ELtohjfw/+zLc0DXJmEfbUNdK6zhJb5dM3xdNsMncdc5odyknm4hX8S0gZ3nWQnwq9ZzvEzdC9E/TEhzM6x/Jjp9XAov+tWi42P1ICk4CizY9j3Vpw5VSiJ5j8I4MZPzbMYKLYy/ZTpXAcP3a9pJ8skRxkrxznDFZorl2ofvjq3ybrsgnISZ4oPKcFFLGvumTKAyflj+Mwj7plxiCm0aIGhbX/CtAqw57qlrVo+kuE40hanHgYzYADRx4+2xr77CLg6j4UVIBEs01q09+w48rBUgU78BGrNnbqsBJrEODYS2W/GX1S7SnDmApFnjGPkteiTbdFrIsRINn1C1Yopm5souSOgp5+Kb2e9Kq9va8J6qLw0cqJFeIIfZA0rea4EX+Jc4MdhqIYSDKDWgRCIRUFU7ZmYn//w9RshXuto5pL8GHalVFepvMOrLHEcT8RFKIECEIXEKi46oO0RhCKURU49Vx7QNJPJBABiUSAuFfoyTxYAgJg7K29+gTfsshdiOEQl/OMBnfc8iCCBITlorBtfIRQzzAYd3lBF/J6IJ8ToTPNXAdHCEguuoPQ4jH6eVZuAWgblYQ8T12eNiFeRJwIJFkKSQl2NkqExtyVEzsokICyziu+x9DJ9RhUbQPSyItd4QBqGlT9xQWd7Tl3nBEoLuXqflWQFn7qf3BSGzOML2Mv73gzrei9p+KrD/gXDeDGoEUEBbco9ZB16miWllg7WHB72tA9K/NNG4djuVPSmVRq/NgbDQVmcsOS3P2OG7nsFW1Ya2wQ4BGulX3x6wxxQUE/ZAqJPFipxVJ8/qZtdibl0Vhg5z+AgtOmWlYAUPIyy43CwiHsMlN+Pe8XiY9JABKLJzc9lCelW6yjB2cr8DAiW2bPLJMfLrNimLGqeaap1aUq5KBYOeoukrugESR++xBUmuQLB6pPTjD6Jxh2U4xn2fY6DMGAlNGGzOGNDPGTTMGZzNGgP8/zPwZdaZlB8cEM+VT5YNn0p+i5QuDbSEGmUtKBufiGFKX+QzuBUv0WXqFWESGdbBdnshFZHRZDgcAQ8D5618VE5sAAAAASUVORK5CYII='

export default {
  name: 'VImg',
  props: {
    src: {
      type: String,
      default: ''
    },
    original: {
      type: Boolean,
      default: false
    },
    default: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      imgSrc: ''
    }
  },
  watch: {
    src() {
      this.processImg()
    }
  },
  created() {
    this.imgSrc = this.default ? defaultSrc : ''
    this.processImg()
  },
  methods: {
    processImg() {
      const originSrc = this.original ? `${this.src}` : `${STATIC_URL}${this.src}`
      this.exists(originSrc).then((exist) => {
        if (exist) {
          this.imgSrc = originSrc
        }
      })
    },
    exists(src) {
      return new Promise((resolve) => {
        let img = new Image()
        img.onload = function () {
          if (this.complete) {
            resolve(true)
            img = null
          }
        }

        img.onerror = function () {
          resolve(false)
          img = null
        }
        img.setAttribute('src', src)
      })
    }
  }
}
</script>
