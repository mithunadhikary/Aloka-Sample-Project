import React from 'react'

export default function Pagination(props) {	
    return (
    	<div className="pagination">
    		<div className="page previous" onClick={() => props.onPrev(props.currentPage)}>Previous</div>
    		<div className="page next" onClick={() => props.onNext(props.currentPage)}>Next</div>
      	</div>      
    )
}