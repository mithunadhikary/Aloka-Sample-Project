import React from 'react'

export default function Search(props) {
	return <div className="search">
			   <form>
			   		<input className="input-text" type="text" name="searchText" placeholder="Search for beer.." value={props.input} />
			   		<input className="submit" type="submit" name="submit" value="Search" />
			   </form>
		   </div>
}