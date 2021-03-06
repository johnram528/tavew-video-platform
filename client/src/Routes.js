import React from 'react'
import { Route, IndexRoute } from 'react-router'
import App from './components/App'
import VideosPage from './containers/VideosPage'
import VideosNew from './containers/VideosNew'
import VideosShow from './containers/VideosShow'



export default (
    <Route path="/" component={App}>
      <IndexRoute component={VideosPage}/>
      <Route path="/videos" component={VideosPage}/> 
      <Route path="/videos/new" component={VideosNew}/> 
      <Route path="/videos/:videoId" component={VideosShow}/> 
    </Route>
  )

