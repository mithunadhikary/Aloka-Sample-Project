import React, {Component} from 'react'
import Card from './Card'
import Pagination from './Pagination'

export default class Home extends Component {

	constructor(props){
		super(props)

    this.state = {
      repos: [],
      input: '',
      currentPage:1
    }

    this.handleprev = this.handleprev.bind(this)
    this.handlenext = this.handlenext.bind(this)
    this.updateInput = this.updateInput.bind(this)
    this.handleSubmitForm = this.handleSubmitForm.bind(this)

	}

  handleprev(lang) { 
    var currentPage = this.state.currentPage - 1; 

    if(currentPage == 0){
      currentPage = 1
    } 
    this.setState({
      currentPage: currentPage
    })
  }

  handlenext(lang) {  
    var currentPage = this.state.currentPage + 1;  
      this.setState({
        currentPage: currentPage
      })
  }

  componentDidUpdate (prevProps, prevState) {
    if (prevState.currentPage !== this.state.currentPage) {
      if(this.state.input){
        this.fetchSearchRepos(this.state.input)
      }else{
        this.fetchRepos(this.state.currentPage)
      }
      
    }
  }

	componentDidMount (){
    this.fetchRepos(this.state.currentPage)
  }

  fetchRepos(pageId) {
    window.API.fetchPopularRepos(pageId)
      .then((data) => {
        this.setState({
          repos: data
        })
    })
  }

  fetchSearchRepos(searchKey) {
    window.API.fetchSearchRepos(searchKey)
      .then((data) => {
        this.setState({
          repos: data
        })
    })
  }


  updateInput(e) {
    const value = e.target.value
    this.setState({
      input: value
    })
  }

  handleSubmitForm(){

    this.setState((currentState) => {
      if(currentState.input){
        this.fetchSearchRepos(currentState.input)  
      }else{
        this.fetchRepos(this.state.currentPage)
      }      
    })

  }

  render() {
    return(
      <div>
        <div className="search">
           <div className="searchForm">
            <input 
              className="input-text"
              type="text"
              placeholder="Search for beer.."
              value={this.state.input}
              onChange={this.updateInput}
            />
            <input 
              className="submit" 
              type="submit" 
              name="submit" 
              value="Search"
              onClick={this.handleSubmitForm}
            />
          </div>
       </div>


        <Card repos={this.state.repos} />        
        <Pagination prev={this.state.currentPage} onPrev={this.handleprev} next={this.state.currentPage} onNext={this.handlenext} />
      </div>
    )
  }
}