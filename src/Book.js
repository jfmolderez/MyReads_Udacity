import React from 'react';

const book = (props) => {
  const { bookId, title, authors, imageLink, shelf, onChangeShelf } = props;
  return (
  	<li>
  		<div className="book">
  			<div className="book-top">
  				<div className="book-cover" style={{ width: 128, height: 193, backgroundImage:`url(${imageLink})`}}>
  				</div>
  				<div className="book-shelf-changer">
            		<select value={shelf} onChange={(event) => onChangeShelf(bookId, event.target.value)}>
						<option disabled> Move to... </option>
						<option value="currentlyReading"> Currently Reading </option>
						<option value="wantToRead"> Want to Read </option>
						<option value="read"> Read </option>
						<option value="none"> None </option>
                 	</select>
            	 </div>
 		 	</div>
         	<div className="book-title">{title}</div>
         	<div className="book-authors">{authors}</div>
     	</div>
  	</li>  
	);
}

export default book;


                            
                          