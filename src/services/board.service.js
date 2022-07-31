import { socketService } from '@/services/socket.service.js'
import { httpService } from './http.service'

export const boardService = {
  query,
  getById,
  save,
  remove,
  getEmptyBoard,
  getEmptyGroup,
  getEmptyCard,
  getEmptyChecklist,
  getEmptyTodo,
  getEmptyLabel,
  getEmptyActivity,
}

async function query(filterBy = null) {
  return await httpService.get(`board`, filterBy)
}

async function getById(boardId) {
  return await httpService.get(`board/${boardId}`)
}

async function save(board) {
  if (board._id) {
    socketService.emit('board updated', board)
    return await httpService.put(`board/${board._id}`, board)
  } else {
    return await httpService.post(`board`, board)
  }
}

async function remove(boardId) {
  return await httpService.delete(`board/${boardId}`)
}

function getEmptyGroup() {
  return {
    id: _makeId(),
    title: '',
    cards: [],
  }
}
function getEmptyTodo() {
  return {
    id: _makeId(),
    title: '',
    isDone: false,
  }
}
function getEmptyLabel() {
  return {
    id: _makeId(),
    color: null,
    title: '',
  }
}

function getEmptyCard() {
  return {
    id: _makeId(),
    title: '',
    style: { bgImg: null, bgColor: null, isFull: false },
    checklists: [],
    labelIds: [],
    members:[],
  }
}

function getEmptyChecklist() {
  return {
    id: _makeId(),
    title: 'Checklist',
    todos: [],
  }
}

function getEmptyActivity(){
  return {
    id:_makeId(),
    txt:'',
    createdAt: Date.now(),
    byMember:{},
    card:{}
  }
}

function getEmptyBoard() {
  return {
    title: '',
    isStarred: false,
    createdAt: Date.now() - 100000,
    labelsOpen: false,
    style: {
      bgImg:
        'https://images.unsplash.com/photo-1658279165324-454de0ee3da6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1064&q=80',
      bgColor: null,
    },
    createdBy: {},
    labels: [
      { id: 'l101', color: '#61bd4f', title: '' },
      { id: 'l102', color: '#f2d600', title: '' },
      { id: 'l103', color: '#ff9f1a', title: '' },
      { id: 'l104', color: '#eb5a46', title: '' },
      { id: 'l105', color: '#c377e0', title: '' },
      { id: 'l106', color: '#0079bf', title: '' },
    ],
    members: [],
    groups: [
      { id: _makeId(), title: 'To do', cards: [] },
      {
        id: _makeId(),
        title: 'Doing',
        cards: [],
      },
      {
        id: _makeId(),
        title: 'Done',
        cards: [],
      },
    ],
    activities:[],
  }
}

function _makeId(length = 8) {
  var text = ''
  var possible =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  for (var i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length))
  }
  return text
}
