import React from 'react'
import Book from './Book'

const bookshelf = (props) => {
  return (
    <div className="bookshelf">
    	<h2 className="bookshelf-title">{props.category}</h2>
    	<div className="bookshelf-books">
    		<ol className="books-grid">
    			{props.books.map((book) => (
    				<Book
    					key={book.id}
    					bookId={book.id}
    					title={book.title}
    					authors={book.authors}
    					imageLink={book.imageLinks.thumbnail} 
    					shelf={book.shelf}
    					moveTo={props.moveTo}/>
    			))}
			</ol>
		</div>
    </div>
    )
}

export default bookshelf ;

