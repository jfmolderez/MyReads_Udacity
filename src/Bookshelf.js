import React from 'react'
import Book from './Book'

const bookshelf = (props) => {
  console.log(props.books);
  return (
    <div className="bookshelf">
    	<h2 className="bookshelf-title"> {props.header} </h2>
    	<div className="bookshelf-books">
    		<ol className="books-grid">
    			{props.books
    				.filter((book) => props.shelf(book.shelf))
    				.map((book) => (
    				<Book
    					key={book.id}
    					bookId={book.id}
    					title={book.title}
    					authors={book.authors?book.authors:''}
    					imageLink={book.imageLinks?book.imageLinks.thumbnail:''} 
    					shelf={book.shelf}
    					onChangeShelf={props.onChangeShelf}/>
    			))}
			</ol>
		</div>
    </div>
    )
}

export default bookshelf ;

