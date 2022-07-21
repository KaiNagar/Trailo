import { storageService } from '@/services/storage.service.js'

export const boardService = {
  query,
  getById,
  save,
  remove,
  getEmptyBoard,
  getCardById,
  getEmptyCard,
  getEmptyGroup,
  getEmptyChecklist,
}

const STORAGE_KEY = 'boardDB'
_setBoards()

let gCredentials = localStorage.getItem('credentials')

function _setBoards() {
  let board = localStorage.getItem(STORAGE_KEY)
  if (!board || !board.length)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(_createBoards()))
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
async function getCardById(credentials) {
  if (!credentials.boardId) return gCurrCard
  let board = await getById(credentials.boardId)
  let group = board.groups.find((group) => group.id === credentials.groupId)
  let card = group.cards.find((card) => card.id === credentials.cardId)
  card = {
    card,
    loc: credentials,
  }
  localStorage.setItem('currCard', JSON.stringify(card))
  return card
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

function getEmptyGroup() {
  return {
    id: _makeId(),
    title: '',
    style: {
      bgColor: '#000',
    },
    cards: [],
  }
}

function getEmptyCard() {
  return {
    id: _makeId(),
    title: 'new card',
    style: { bgImg: null, bgColor: null, isFull: false },
    labels: [],
  }
}

function getEmptyChecklist() {
  return {
    id: _makeId(),
    title: 'Checklist',
    todos: [],
  }
}

function getEmptyTodo() {
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

function _createBoards() {
  return [_createBoard(), _createBoard(), _createBoard()]
}

function _createBoard() {
  const boardId = _makeId()
  return {
    _id: boardId,
    title: 'board title new',
    createdAt: Date.now() - 100000,
    bgCover:
      'https://images.unsplash.com/photo-1654446138056-8996ca1e96a9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
    createdBy: {
      _id: 'u101',
      fullname: 's@r',
      imgUrl: 'url',
    },
    labels: [
      {
        id: 'l101',
        title: 'done',
        color: '#c377e0',
      },
      {
        id: 'l102',
        title: 'in progress',
        color: '#51e898',
      },
      {
        id: 'l103',
        title: 'WIP',
        color: '#ff78cb',
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
        title: "This is stav's list",
        boardId,
        style: {
          bgColor: '#000',
        },
        cards: [
          {
            id: _makeId(),
            title: 'WTF',
            labelIds: ['l101', 'l102'],
            style: {
              bgImg:
                'https://images.unsplash.com/photo-1658250709337-46fb7cc5e74a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
              bgColor: '',
              isFull: false,
            },
          },
          {
            id: _makeId(),
            title: 'new card2',
            labelIds: ['l101', 'l102'],
            style: { bgColor: '#47e18c', isFull: false, bgImg: null },
            checklists: [
              {
                id: 'YEhmF',
                title: 'Checklist',
                todos: [
                  {
                    id: '212jX',
                    title: 'To Do 1',
                    isDone: false,
                  },
                ],
              },
            ],
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
