import React from 'react'

const option = (props) => {
  let { optionValue, optionText } = props; // destructuring props
  switch(optionText) {
    case "Move to...":
      optionValue = "move";
      return <option value={optionValue} disabled>{optionText}</option>
    case "Currently Reading":
      if (optionValue === "currentlyReading") {
        return <option value={optionValue} selected>{optionText}</option>
      } else {
        return <option value={optionValue}>{optionText}</option>
      }
    case "Want to Read":
      if (optionValue === "wantToRead") {
        return <option value={optionValue} selected>{optionText}</option>
      } else {
        return <option value={optionValue}>{optionText}</option>
      }
    case "Read":
      if (optionValue === "read") {
        return <option value={optionValue} selected>{optionText}</option>
      } else {
        return <option value={optionValue}>{optionText}</option>
      }
    case "None":
        optionValue = "none";
        return <option value={optionValue}>{optionText}</option>
    default:
      console.log("Option.js : should never reach here !!!");
	}
  }
  

export default option ;

                	