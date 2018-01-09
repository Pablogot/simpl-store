import React from 'react';


const Header = (props) => {
  return (
    <header className="top">
      <h1>
        Simp
        <span className="slush">/</span>
      </h1>
      <h3 className="tagline"><span>{props.tagline}</span></h3>
    </header>
  )
}



Header.PropTypes = {
  tagline: React.PropTypes.string.isRequired
}


export default Header;
