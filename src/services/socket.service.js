import io from 'socket.io-client'

const baseUrl = (process.env.NODE_ENV === 'production')? '' : '//127.0.0.1:5173'

export const socketService = createSocketService()
// export const socketService = createDummySocketService()

// For DEBUG:
window.socketService = socketService

socketService.setup()


function createSocketService() {
  let socket = null
  const socketService = {
   async setup() {
      socket = io(baseUrl)
    },
    on(eventName, cb) {
      socket.on(eventName, cb)
    },
    off(eventName, cb=null) {
      if (!socket) return;
      if (!cb) socket.removeAllListeners(eventName)
      else socket.off(eventName, cb)
    },
    emit(eventName, data) {
      data = JSON.parse(JSON.stringify(data))
      socket.emit(eventName, data)
    },
    terminate() {
      socket = null
    }
  }
  return socketService
}

// eslint-disable-next-line
function createDummySocketService() {
  var listenersMap = {}
  const socketService = {
    listenersMap,
    async setup() {
      listenersMap = {}
      // window.mapmap = listenersMap
    },
    terminate() {
      this.setup()
    },
    on(eventName, cb) {
      listenersMap[eventName] = [...(listenersMap[eventName] || []), cb]
    },
    off(eventName, cb) {
      if (!listenersMap[eventName]) return
      if (!cb) delete listenersMap[eventName]
      else listenersMap[eventName] = listenersMap[eventName].filter(l => l !== cb)
    },
    emit(eventName, data) {
      if (!listenersMap[eventName]) return
      listenersMap[eventName].forEach(listener => {
        listener(data)
      })
    },
    debugMsg() {
      this.emit('chat addMsg', {from: 'Someone', txt: 'Aha it worked!'})
    },
  }
  return socketService
}



