import React, {Component} from 'react'

export default class Favourites extends Component {
	constructor(props){
		super(props)

		console.log('--Favourites console--')
	}
	componentDidMount () {
        console.log('--Favourites--')
    }

	render() {
        return(
          <div>
            <h2>Favourites</h2>
          </div>
        )
    }
}