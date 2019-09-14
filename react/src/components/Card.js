import React from 'react'
import { ReactComponent as Star } from '../images/star.png';

export default function Card(props) {

	return (
		
	    <div className="details-data">
		    {props.repos.map((beer) => (
				<div key={beer.id} className="card">
					<div className="favourites">
						<img src={require('../images/star.png')} alt="favourites" />
					</div>
					<img src={beer.image_url}/>
					<div className="card-details">
						<h2>{beer.name}</h2>
						
						<p>{beer.description.substring(0, 100)}...</p>
					</div>
				</div>
			))}
	    </div>

	    
	   	
	)
}