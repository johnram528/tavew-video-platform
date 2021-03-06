// import update from 'react-addons-update'; 

// export default (state = [], action) => {
  
//   function videoMatch(video) {
//     return video.id === parseInt(action.vidInfo.id, 10)
//   }

//   let video = state.find(videoMatch)
//   const vidIndex = state.indexOf(video)

//   switch (action.type) {

//     case 'FETCH_VIDEOS':
//       return action.videos;
//     case 'INCREASE_LIKES':

//       video.likes++
//       return update(state, { 
//         [vidIndex]: {
//          likes: {$set: video.likes}
//         }
//       })
//     case 'DECREASE_LIKES':
//       video.likes--
//       return update(state, { 
//         [vidIndex]: {
//          likes: {$set: video.likes}
//         }
//       })
//     case 'FETCH_VIDEO':
//       return action.video;
//     case 'ADD_VIDEO':
//       video = Object.assign({}, action.video, { id: state.length + 1} );
//       return [ ...state, video ];
//     default:
//       return state
//   }
// } 


import update from 'react-addons-update'; 

export default (state = [], action) => {
  function videoMatch(video) {
    return video.id === parseInt(action.vidInfo.id, 10)
  }
  switch (action.type) {

    case 'FETCH_VIDEOS':
      return action.videos;
    case 'INCREASE_LIKES':
      let video = state.find(videoMatch)
      let vidIndex = state.indexOf(video)
      video.likes++
      return update(state, { 
        [vidIndex]: {
         likes: {$set: video.likes}
        }
      })
    case 'DECREASE_LIKES':
      video = state.find(videoMatch)
      vidIndex = state.indexOf(video)
      video.likes--
      return update(state, { 
        [vidIndex]: {
         likes: {$set: video.likes}
        }
      })
    case 'INCREASE_VIEWS':
      // debugger
      video = state
      // vidIndex = state.indexOf(video)
      video.views++
      return update(state, { 
         views: {$set: video.views}
      })
    case 'FETCH_VIDEO':
      return action.video;
    case 'ADD_VIDEO':
      video = Object.assign({}, action.video, { id: state.length + 1} );
      return [ ...state, video ];
    default:
      return state;
    }
}