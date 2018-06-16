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
    					title={book.title}
    					authors={book.authors}
    					imageLinks={book.imageLinks}
    					imageLink={book.imageLinks.thumbnail} />
    			))}
			</ol>
		</div>
    </div>
    )
}

export default bookshelf ;

