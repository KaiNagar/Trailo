import {socketService} from '@/services/socket.service.js'
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
    console.log('board update board-service',board);
    return await httpService.put(`board/${board._id}`,board)
  } else {
    return await httpService.post(`board`,board)

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
  }
}

function getEmptyChecklist() {
  return {
    id: _makeId(),
    title: 'Checklist',
    todos: [],
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
    labels: [],
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
