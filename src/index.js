import os from 'os'

import pkg from '../package.json'

function convertBytesToMegaBytes (bytes) {
  return Math.ceil(bytes / 1000000)
}

function convertUptimeToSeconds (uptime) {
  return Math.ceil(uptime)
}

function stringifySeconds (seconds) {
  return `${seconds}s`
}

function stringifyMilliseconds (ms) {
  return `${ms}ms`
}

function stringifyMegabytes (mb) {
  return `${mb}Mb`
}

function stringifyLoadAvg (avgs) {
  const cpuCount = os.cpus().length
  return avgs.map((avg) => `Load: ${avg}, CPUs: ${cpuCount}`)
}

module.exports.register = (server, {
  tags: tags = [],
  auth: auth = false
}, next) => {
  server.route([
    {
      method: 'GET',
      path: '/metrics',
      config: {
        auth,
        tags,
        handler (req, reply) {
          reply({
            upTime: stringifySeconds(convertUptimeToSeconds(process.uptime())),
            totalMem: stringifyMegabytes(convertBytesToMegaBytes(os.totalmem())),
            loadAvg: stringifyLoadAvg(os.loadavg()),
            serverLoad: {
              eventLoopDelay: stringifyMilliseconds(server.load.eventLoopDelay),
              heapUsed: stringifyMegabytes(convertBytesToMegaBytes(server.load.heapUsed)),
              memUsed: stringifyMegabytes(convertBytesToMegaBytes(server.load.rss))
            }
          })
        }
      }
    },

    {
      method: 'GET',
      path: '/metrics/uptime',
      config: {
        auth,
        tags,
        handler (req, reply) {
          reply({ upTime: stringifySeconds(convertUptimeToSeconds(process.uptime())) })
        }
      }
    },

    {
      method: 'GET',
      path: '/metrics/totalmem',
      config: {
        auth,
        tags,
        handler (req, reply) {
          reply({ totalMem: stringifyMegabytes(convertBytesToMegaBytes(os.totalmem())) })
        }
      }
    },

    {
      method: 'GET',
      path: '/metrics/loadavg',
      config: {
        auth,
        tags,
        handler (req, reply) {
          reply({ loadAvg: stringifyLoadAvg(os.loadavg()) })
        }
      }
    },

    {
      method: 'GET',
      path: '/metrics/serverload',
      config: {
        auth,
        tags,
        handler (req, reply) {
          reply({
            eventLoopDelay: stringifyMilliseconds(server.load.eventLoopDelay),
            heapUsed: stringifyMegabytes(convertBytesToMegaBytes(server.load.heapUsed)),
            memUsed: stringifyMegabytes(convertBytesToMegaBytes(server.load.rss))
          })
        }
      }
    },

    {
      method: 'GET',
      path: '/metrics/serverload/eventloopdelay',
      config: {
        auth,
        tags,
        handler (req, reply) {
          reply({
            eventLoopDelay: stringifyMilliseconds(server.load.eventLoopDelay)
          })
        }
      }
    },

    {
      method: 'GET',
      path: '/metrics/serverload/heapused',
      config: {
        auth,
        tags,
        handler (req, reply) {
          reply({
            heapUsed: stringifyMegabytes(convertBytesToMegaBytes(server.load.heapUsed))
          })
        }
      }
    },

    {
      method: 'GET',
      path: '/metrics/serverload/memused',
      config: {
        auth,
        tags,
        handler (req, reply) {
          reply({
            memUsed: stringifyMegabytes(convertBytesToMegaBytes(server.load.rss))
          })
        }
      }
    }
  ])

  next()
}

module.exports.register.attributes = {
  name: 'jasper-hapi-metrics',
  version: pkg.version
}
