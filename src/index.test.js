import hapi from 'hapi'
import test from 'ava'

import plugin from './index'

const server = new hapi.Server()
server.connection()

server.register(plugin, (error) => {
  if (error) return

  test('[GET] /metrics', (t) => {
    return new Promise((resolve) => {
      server.inject({
        method: 'GET',
        url: '/metrics'
      }, (response) => {
        if (response.error) t.fail(response.error)
        else t.pass(response.result)
        resolve()
      })
    })
  })

  test('[GET] /metrics/totalmem', (t) => {
    return new Promise((resolve) => {
      server.inject({
        method: 'GET',
        url: '/metrics/totalmem'
      }, (response) => {
        if (response.error) t.fail(response.error)
        else t.pass(response.result)
        resolve()
      })
    })
  })

  test('[GET] /metrics/uptime', (t) => {
    return new Promise((resolve) => {
      server.inject({
        method: 'GET',
        url: '/metrics/uptime'
      }, (response) => {
        if (response.error) t.fail(response.error)
        else t.pass(response.result)
        resolve()
      })
    })
  })

  test('[GET] /metrics/loadavg', (t) => {
    return new Promise((resolve) => {
      server.inject({
        method: 'GET',
        url: '/metrics/loadavg'
      }, (response) => {
        if (response.error) t.fail(response.error)
        else t.pass(response.result)
        resolve()
      })
    })
  })

  test('[GET] /metrics/serverload', (t) => {
    return new Promise((resolve) => {
      server.inject({
        method: 'GET',
        url: '/metrics/serverload'
      }, (response) => {
        if (response.error) t.fail(response.error)
        else t.pass(response.result)
        resolve()
      })
    })
  })

  test('[GET] /metrics/serverload/eventloopdelay', (t) => {
    return new Promise((resolve) => {
      server.inject({
        method: 'GET',
        url: '/metrics/serverload/eventloopdelay'
      }, (response) => {
        if (response.error) t.fail(response.error)
        else t.pass(response.result)
        resolve()
      })
    })
  })

  test('[GET] /metrics/serverload/heapused', (t) => {
    return new Promise((resolve) => {
      server.inject({
        method: 'GET',
        url: '/metrics/serverload/heapused'
      }, (response) => {
        if (response.error) t.fail(response.error)
        else t.pass(response.result)
        resolve()
      })
    })
  })

  test('[GET] /metrics/serverload/memused', (t) => {
    return new Promise((resolve) => {
      server.inject({
        method: 'GET',
        url: '/metrics/serverload/memused'
      }, (response) => {
        if (response.error) t.fail(response.error)
        else t.pass(response.result)
        resolve()
      })
    })
  })
})
