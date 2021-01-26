const serviceFiles = require.context('../services', false, /\.js$/)

const getServiceName = path => path.replace(/^\.\/(.*)\.\w+$/, '$1')

const getAllService = () => {
  // 排除index
  const pathList = serviceFiles.keys().filter(path => getServiceName(path) !== 'index')

  const serviceAll = pathList.reduce((services, path) => {
    const serviceName = getServiceName(path)
    const value = serviceFiles(path).default
    services[`${serviceName}Service`] = value
    return services
  }, {})
  return serviceAll
}

function plugin(Vue) {
  if (plugin.installed) {
    return
  }

  const services = getAllService()

  Object.keys(services).forEach(serviceName => {
    const prototypeName = `$${serviceName}`
    !Vue.prototype[prototypeName] && Object.defineProperties(Vue.prototype, {
      [prototypeName]: {
        get() {
          services[serviceName].vm = this
          return services[serviceName]
        }
      }
    })
  })
}

export default plugin
