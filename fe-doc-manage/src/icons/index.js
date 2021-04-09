import Vue from 'vue'
import SvgIcon from '@/components/SvgIcon/index.vue'// svg component
/* 需要安装npm i svg-sprite-loader插件 */
// register globally
Vue.component('svg-icon', SvgIcon)

const req = require.context('./svg', false, /\.svg$/)
const requireAll = requireContext => requireContext.keys().map(requireContext)
requireAll(req);

