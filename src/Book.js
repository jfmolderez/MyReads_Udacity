import React from 'react';
import Option from './Option';

const book = (props) => {
  const { title, authors, imageLink, shelf } = props;
  const options = ["Move to...", "Currently Reading", "Want to Read", "Read", "None"];
  return (
  	<li>
  	<div className="book">
  		<div className="book-top">
  			<div className="book-cover" style={{ width: 128, height: 193, backgroundImage:`url(${imageLink})`}}>
  			</div>
  			<div className="book-shelf-changer">
            	<select>
					{ options.map((option, index) => (
						<Option
							key={index}
							optionValue={shelf}
							optionText={option}/>		
						))
					}
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


                            
                          