import update from 'react-addons-update'; 

export default (state = [], action) => {
  
  function videoMatch(video) {
    return video.id == action.vidInfo.id
  }

  let video = state.find(videoMatch)
  const vidIndex = state.indexOf(video)

  switch (action.type) {

    case 'FETCH_VIDEOS':
      return action.videos;
    case 'INCREASE_LIKES':

      video.likes++
      return update(state, { 
        [vidIndex]: {
         likes: {$set: video.likes}
        }
      })
    case 'DECREASE_LIKES':
      video.likes--
      return update(state, { 
        [vidIndex]: {
         likes: {$set: video.likes}
        }
      })
    case 'FETCH_VIDEO':
      return action.video;
    case 'ADD_VIDEO':
      const vid = Object.assign({}, action.video, { id: state.length + 1} );
      return [ ...state, vid ];
    default:
      return state;
    };

};