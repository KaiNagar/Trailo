import { storageService } from '@/services/storage.service.js'

export const boardService = {
  query,
  getById,
  save,
  remove,
  getEmptyBoard,
}

const STORAGE_KEY = 'boardDB'
_setBoard()

function _setBoard() {
  let board = localStorage.getItem(STORAGE_KEY)
  if (!board || !board.length)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(_createBoard()))
}

async function query(filterBy = '') {
  try {
    const res = await storageService.query(STORAGE_KEY)
    return res
  } catch (err) {
    console.error('cannot get board :', err)
  }
}

async function getById(boardId) {
  try {
    const res = await storageService.get(STORAGE_KEY, boardId)
    return res
  } catch (err) {
    console.error('cannot get board:', err)
  }
}

async function save(board) {
  if (board._id) {
    const res = await storageService.put(STORAGE_KEY, board)
    return res
  } else {
    const res = await storageService.post(STORAGE_KEY.board)
    return res
  }
}

async function getEmptyBoard() {
  return {}
}

async function remove(boardId) {
  try {
    const res = await storageService.remove(STORAGE_KEY, boardId)
    return res
  } catch (err) {
    console.error('cannot remove board', err)
  }
}

function _createBoard() {
  return {
    _id: _makeId(),
    title: 'board title new',
    createdAt: Date.now() - 100000,
    createdBy: {
      _id: 'u101',
      fullname: 's@r',
      imgUrl: 'url',
    },
    style: {
      bgColor: '#fff',
    },
    labels: [
      {
        id: _makeId(),
        title: 'done',
        color: '#74ff54',
      },
      {
        id: _makeId(),
        title: 'in progress',
        color: '#7bff5b',
      },
    ],
    members: [
      {
        _id: _makeId(),
        fullname: 'r@sk',
        imgUrl: 'url',
      },
    ],
    groups: [
      {
        id: _makeId(),
        title: 'new group',
        style: {
          bgColor: '#000',
        },
        cards: [
          {
            id: _makeId(),
            title: 'new card1',
          },
          {
            id: _makeId(),
            title: 'new card2',
          },
        ],
      },
    ],
  }
}

// membersIds: ['u101'],
// dueDate: Date.now() + 100000,
// byMember: {
//   _id: 'u101',
//   fullname: 's@r',
//   imgUrl: 'url',
// },

function _makeId(length = 8) {
  var text = ''
  var possible =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  for (var i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length))
  }
  return text
}
