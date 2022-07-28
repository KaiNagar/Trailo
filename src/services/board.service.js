// import { storageService } from '@/services/storage.service.js'
import {socketService} from '@/services/socket.service.js'
// import Axios from 'axios'
// const axios = Axios.create({ withCredentials: true })
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

// function _getUrl(id = '') {
//   const BASE_URL =
//     process.env.NODE_ENV !== 'development'
//       ? '/api/board'
//       : '//localhost:5173/api/board'
//   return `${BASE_URL}/${id}`
// }

// const STORAGE_KEY = "boardDB";
// _setBoards();

// function _setBoards() {
//   let board = localStorage.getItem(STORAGE_KEY);
//   if (!board || !board.length)
//     localStorage.setItem(STORAGE_KEY, JSON.stringify(_createBoards()));
// }

async function query(filterBy = null) {
  return await httpService.get(`board`,filterBy)


  try {
    const res = await storageService.query(STORAGE_KEY)
    return res
    // const res = await axios.get(_getUrl(), { params: filterBy })
    // console.log(res.data)
    // return res.data
  } catch (err) {
    console.error('cannot get board :', err)
  }
}

async function getById(boardId) {
  return await httpService.get(`board/${boardId}`)
  // try {
  //   const res = await storageService.get(STORAGE_KEY, boardId);
  //   return res
  //   // const res = await axios.get(_getUrl(boardId))
  //   // return res.data
  // } catch (err) {
  //   console.error('cannot get board:', err)
  // }
}

async function save(board) {
  if (board._id) {
    socketService.emit('board updated', board)
    console.log('servise', board);
    return await httpService.put(`board/${board._id}`,board)
    
    
    // const res = await storageService.put(STORAGE_KEY, board);
    // return res
    // const res = await axios.put(_getUrl(board._id, board))
    // return res.data
  } else {
    // socketService.on(SOCKET_EVENT_USER_UPDATED, board)
    return await httpService.post(`board`,board)
    // // console.log("no id");
    // board._id = _makeId();
    // const res = await storageService.post(STORAGE_KEY, board);
    // return res
    // const res = await axios.post(_getUrl(), board)
    // console.log(res.data)
    // return res.data
  }
}

async function remove(boardId) {
  return await httpService.delete(`board/${boardId}`)

  // const res = await axios.delete(_getUrl(boardId))
  // return res.data

  // try {
  //   const res = await storageService.remove(STORAGE_KEY, boardId);
  //   return res;
  // } catch (err) {
  //   console.error("cannot remove board", err);
  // }
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


// function _createBoards() {
//   return [_createBoard(), _createBoard(), _createBoard()];
// }
function getEmptyBoard() {
  return {
    title: '',
    isStarred: false,
    createdAt: Date.now() - 100000,
    labelsOpen: false,
    bgCover:
      'https://images.unsplash.com/photo-1658279165324-454de0ee3da6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1064&q=80',
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

// function _createBoard() {
//   const boardId = _makeId();
//   return {
//     _id: boardId,
//     isStarred: false,
//     title: "Sprint",
//     createdAt: Date.now() - 100000,
//     labelsOpen: false,
//     bgCover:
//       "https://images.unsplash.com/photo-1421284621639-884f4129b61d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
//     createdBy: {
//       _id: "u101",
//       fullname: "s@r",
//       imgUrl: "url",
//     },
//     labels: [
//       {
//         id: "l101",
//         title: "done",
//         color: "#c377e0",
//       },
//       {
//         id: "l102",
//         title: "in progress",
//         color: "#51e898",
//       },
//       {
//         id: "l103",
//         title: "WIP",
//         color: "#ff78cb",
//       },
//     ],

//     members: [
//       {
//         _id: _makeId(),
//         username: "Rimonaldo",
//         email: "Rimons2804@gmail.com",
//         imgUrl: "url",
//         color:'#EF7564',
//       },
//       {
//         _id: _makeId(),
//         username: "Kai nagar",
//         email: "KaiNagar8@gmail.com",
//         imgUrll: "url",
//         color:'#F5DD29',
//       },
//       {
//         _id: _makeId(),
//         username: "Stav Kotlovsky",
//         email: "StavKot@gmail.com",
//         imgUrl: "url",
//         color:'#FFAF3F',
//       },
//     ],
//     groups: [
//       {
//         id: _makeId(),
//         title: "This is stav's list",
//         cards: [
//           {
//             members:[],
//             id: _makeId(),
//             title: "WTF",
//             labelIds: ["l101", "l102"],
//             style: {
//               bgImg:
//                 "https://images.unsplash.com/photo-1658250709337-46fb7cc5e74a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
//               bgColor: "",
//               isFull: false,
//             },
//           },
//           {
//             id: _makeId(),
//             title: "new card2",
//             labelIds: ["l101", "l102"],
//             style: { bgColor: "#47e18c", isFull: false, bgImg: null },
//             checklists: [
//               {
//                 id: "YEhmF",
//                 title: "Checklist",
//                 todos: [
//                   {
//                     id: "212jX",
//                     title: "To Do 1",
//                     isDone: false,
//                   },
//                 ],
//               },
//             ],
//           },
//         ],
//       },

//       {
//         id: _makeId(),
//         title: "These shoes are meant for walking",
//         cards: [
//           {
//             members:[],
//             id: _makeId(),
//             title: "And thats what they do",
//             labelIds: ["l101", "l102"],
//             style: {
//               bgImg:
//                 "https://images.unsplash.com/photo-1658279366986-4f188712a3e9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
//               bgColor: "",
//               isFull: true,
//             },
//           },
//           {
//             members:[],
//             id: _makeId(),
//             title: "My Trailo",
//             labelIds: ["l101", "l102"],
//             style: {
//               bgColor: "",
//               isFull: false,
//               bgImg:
//                 "https://images.unsplash.com/photo-1538471726790-0f6b031f1982?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
//             },
//           },
//         ],
//       },

//       {
//         id: _makeId(),
//         title: "This is stav's list",
//         cards: [
//           {
//             members:[],
//             id: _makeId(),
//             title: "WTF",
//             labelIds: ["l101", "l102"],
//             style: {
//               bgImg:
//                 "https://images.unsplash.com/photo-1658250709337-46fb7cc5e74a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
//               bgColor: "",
//               isFull: false,
//             },
//           },
//           {
//             members:[],
//             id: _makeId(),
//             title: "new card2",
//             labelIds: ["l101", "l102"],
//             style: { bgColor: "#47e18c", isFull: false, bgImg: null },
//             checklists: [
//               {
//                 id: "YEhmF",
//                 title: "Checklist",
//                 todos: [
//                   {
//                     id: "212jX",
//                     title: "To Do 1",
//                     isDone: false,
//                   },
//                 ],
//               },
//             ],
//           },
//         ],
//       },
//     ],
//   };
// }

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
