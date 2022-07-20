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
    title: "",
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
        id: 'l101',
        title: 'done',
        color: '#74ff54',
      },
      {
        id: 'l102',
        title: 'in progress',
        color: '#700f5b',
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
            title: 'new card1',
            labelIds: ['l101', 'l102'],
            style: { bgImg: null, bgColor: '#29cce5', isFull: false },
            labels: ['#c377e0', '#51e898', '#ff78cb'],
          },
          {
            id: _makeId(),
            title: 'new card2',
            labelIds: ['l101', 'l102'],
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
