import React, {Component} from 'react'
import Home from './Home'
import Favourites from './Favourites'


import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'

window.API = {
  fetchPopularRepos(pageId) {
    const encodedURI = encodeURI(`https://api.punkapi.com/v2/beers?page=${pageId}&per_page=6`)
    return fetch(encodedURI)
      .then((data) => data.json())
      .then((repos) => repos)
      .catch((error) => {
        return null
      });
  },
  fetchSearchRepos(searchKey) {
    const encodedURI = encodeURI(`https://api.punkapi.com/v2/beers?beer_name=${searchKey}`)
    return fetch(encodedURI)
      .then((data) => data.json())
      .then((repos) => repos)
      .catch((error) => {
        return null
      });
  }
}


class App extends React.Component {

  render() {
    return (
    	<Router>
    		
    		<div className='header'>
    			<h1>Beans Love Beers</h1>
    			<ul>
    				<li><Link to='/' className="active">Home</Link></li>
    				<li><Link to='/favourites'>Favourites</Link></li>
    			</ul>
    		</div>
    		
    		<Route exact path='/' component={Home} />
	      <Route path='/favourites' component={Favourites} />
		      
    	</Router>      
    )
  }
}

export default App;
