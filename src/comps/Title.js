import React from 'react';
import { ReactComponent as Logo} from '../images/OnlyPetslogo.svg';


const Title = () => {
  return (
    <div className="title">
      <Logo />
      <h2>Your Pictures</h2>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
    </div>
  )
}

export default Title;