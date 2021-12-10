import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';

function Navigation({ isLoaded }){
  const sessionUser = useSelector(state => state.session.user);

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <ProfileButton user={sessionUser} />
    );
  } else {
    sessionLinks = (
      <>
        <NavLink id="login" to="/login">Log In</NavLink>
        <NavLink id="signup" to="/signup">Sign Up</NavLink>
      </>
    );
  }

  return (
    <ul className="navbar">
      <li>
        <NavLink exact to="/"><img id='logo' src='https://cdn.shopify.com/s/files/1/0077/0270/8279/products/DnDAmpersand_white_2048x.jpg?v=1567120972'></img></NavLink>
        {isLoaded && sessionLinks}
      </li>
    </ul>
  );
}

export default Navigation;