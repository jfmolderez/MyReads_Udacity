import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import Bookshelf from './Bookshelf'
import { Link } from 'react-router-dom'
import { Route } from 'react-router-dom'

class BooksApp extends React.Component {
  state = {
	booksOnShelves: [],
    searchResults : [], 
    query : ''
  }

  componentDidMount() {
    const booksOnShelves = [];
    BooksAPI.getAll()
    	.then((books) => {
    		for (const book of books) {
				booksOnShelves.push(book);
  			}
			this.setState({booksOnShelves});
		})
	}

  changeShelf = (id, to) => {
    const booksOnShelves = [...this.state.booksOnShelves]
    let [movingBook] = booksOnShelves.filter((book) => id === book.id)
    if (movingBook) { // book is on a shelf !!!
      movingBook.shelf = to
      this.setState({booksOnShelves})
    }
    BooksAPI.update(movingBook, to)
  }
      

  updateQuery = (query) => {
    this.setState(() => ({query: query}));
    if (query.trim() === '') {
      this.setState({searchResults: []})
    } else {
      if (this.state.query.length > 0)
      	this.searchBooks(this.state.query)
    }
  }

  searchBooks(query) {
  	BooksAPI.search(query)
    	.then((books) => {
			this.setState({searchResults: books})
        }).catch(
      		() => { 
              console.log("unfulfilled promise - BooksAPI.search"); 
              this.setState({searchResults:[]});    
            }
      	);
  }

  render() {
   	const shelves = {
    	currentlyReading: ['Currently Reading', 'currentlyReading'],
    	wantToRead: ['Want to Read', 'wantToRead'],
    	read: ['Read', 'read']
  	}   

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
				header='Search Results'
				shelf={(s) => true}
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
                	{Object.keys(shelves).map((shelf) =>
                		<Bookshelf 
                        	key={shelf}
                            header={shelves[shelf][0]}
        					shelf={(s) => s === shelves[shelf][1]}
        					books={ this.state.booksOnShelves }
        					onChangeShelf={ this.changeShelf }/>
					)}
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
