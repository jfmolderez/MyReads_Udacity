import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import Bookshelf from './Bookshelf'
import { Link } from 'react-router-dom'
import { Route } from 'react-router-dom'

// ids = ["nggnmAEACAAJ", "sJf1vQAACAAJ", "evuwdDLfAyYC", "74XNzF_al3MC", "jAUODAAAQBAJ", "IOejDAAAQBAJ", "1wy49i-gQjIC"]
class BooksApp extends React.Component {
  state = {
    none : [],
    currentlyReading : [],
    wantToRead : [],
    read : [],
    searchResults : [], 
    query : ''
  }

  componentDidMount() {
    BooksAPI.getAll()
    	.then((books) => {
    		const currentlyReading = [];
    		const wantToRead = [];
    		const read = [];
    		for (const book of books) {
    			const { id, authors, title, imageLinks, shelf } = book ; // Destructuring
				const b = { id, authors, title, imageLinks, shelf };  // Object literal shorthand
				switch(shelf) {
                  case "wantToRead" :
                  	wantToRead.push(b);
                  	break;
                  case "currentlyReading" :
                  	currentlyReading.push(b);
                  	break;
                  case "read" :
                  	read.push(b);
                  	break;
                  default:
                  	console.log("App.js - componentDidMount: should never reach here!!!");
                }
  			}
			this.setState({wantToRead, currentlyReading, read});
		})
	}

  onChangeShelf = (from, to, id) => {
    console.log('from : ', from, ' to : ', to);
    const fromBooks = [...this.state[from]]  
    const movingBook = (fromBooks.filter((book) => book.id === id))[0];
    movingBook.shelf = to;
    const updatedFromBooks = fromBooks.filter((book) => book.id !== id);
    const toBooks = [...this.state[to]]  
    const updatedToBooks = [...toBooks, movingBook];  // moving references !!!!
    this.setState({[from]: updatedFromBooks, [to]: updatedToBooks});

    BooksAPI.update(movingBook, to);
  }

  updateQuery = (query) => {
    if (query.trim() === '') {
      this.setState({searchResults: [], query: ''})
    } else {
      console.log(query);
      this.setState(() => ({query: query}));
      this.searchBooks()
    }
  }

  searchBooks = () => {
  	BooksAPI.search(this.state.query)
    	.then((books) => {
      		const results = [];
      		const newBooks = [];
      		for (const book of books) {
              if (!book.shelf) {
                book.shelf="none";
                newBooks.push(book);
                BooksAPI.update(book, "none");
              }
              results.push(book);
            }
      		this.setState({searchResults:results, none:newBooks });
        }).catch(
      		() => { 
              console.log("unfulfilled promise - BooksAPI.search"); 
              this.setState({searchResults:[]});    
            }
      	);
  }
    


  render() {
        
    return (
      <div className="app">
        <Route path="/search" render={() => (
          <div className="search-books">
            <div className="search-books-bar">
    		  <Link to='/' className="close-search"> Close </Link> 
              <div className="search-books-input-wrapper">
                {/*
                  NOTES: The search from BooksAPI is limited to a particular set of search terms.
                  You can find these search terms here:
                  https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                  However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                  you don't find a specific author or title. Every search is limited by search terms.
                */}
                <input 
					type="text" 
					placeholder="Search by title or author"
					value={this.state.query}
					onChange={(event) => this.updateQuery(event.target.value)}/>

              </div>
            </div>
            <div className="search-books-results">
              <Bookshelf
				category='Search Results'
				moveTo={this.onChangeShelf}
				books={this.state.searchResults}/>
            </div>
          </div>
        )} />
		<Route exact path="/" render={() => (
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <div>
          		<Bookshelf
          			category='Currently Reading'
          			moveTo={this.onChangeShelf}
          			books={this.state.currentlyReading}/>   
				<Bookshelf
					category='Want To Read'
					moveTo={this.onChangeShelf}
					books={this.state.wantToRead} />
				<Bookshelf
					category='Read'
					moveTo={this.onChangeShelf}
					books={this.state.read} />
              </div>
            </div>
            <div className="open-search">
          	  <Link to='/search'> Add a book </Link> 
            </div>
          </div>
        )} />
      </div>
    )
  }
}

export default BooksApp
