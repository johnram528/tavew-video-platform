export function fetchVideos() {
  return function(dispatch) {
    return fetch('/api/videos')
      .then(res => { return res.json()})
      .then(videos => {dispatch({type: 'FETCH_VIDEOS', videos})
    })
  };
};

export function fetchVideo(id) {
  return function(dispatch) {
    return fetch('/api/videos/'+id)
      .then(res => { return res.json()})
      .then(video => {dispatch({type: 'FETCH_VIDEO', video})
    })
  };
};

export function addVideo(formData) {
  return function(dispatch) {
    return fetch('/api/videos', {
      method: 'POST',
      body: formData
    })
      .then(response => response.json)
      .then(video => { dispatch({type: 'ADD_VIDEO', video})
      })
  }
}

export function increaseViews(vidInfo) {
  return function(dispatch) {
    return fetch('/api/videos/'+vidInfo.id, {
      method: 'PUT', 
      headers: {
    'Accept': 'application/json, text/plain, */*',
    'Content-Type': 'application/json'
      }, 
      body: JSON.stringify({video: {views: ++vidInfo.views}})
    })
      .then(response => response.json)
      .then(video => {dispatch({type: 'INCREASE_VIEWS', vidInfo})
    })
  }
}

export function increaseLikes(vidInfo){
  return function(dispatch) {
    return fetch('/api/videos/' + String(vidInfo.id), {
      method: 'PUT', 
      headers: {
    'Accept': 'application/json, text/plain, */*',
    'Content-Type': 'application/json'
      }, 
      body: JSON.stringify({video: {likes: ++vidInfo.likes}})
    })
      .then(response => response.json)
      .then(video => {dispatch({type: 'INCREASE_LIKES', vidInfo})
    })
  }
}

  export function decreaseLikes(vidInfo){
    return function(dispatch) {
      return fetch('/api/videos/' + String(vidInfo.id), {
        method: 'PUT', 
        headers: {
      'Accept': 'application/json, text/plain, */*',
      'Content-Type': 'application/json'
        }, 
        body: JSON.stringify({video: {likes: --vidInfo.likes}})
      })
        .then(response => response.json)
        .then(video => {dispatch({type: 'DECREASE_LIKES', vidInfo})
      })
    }
  }
  

