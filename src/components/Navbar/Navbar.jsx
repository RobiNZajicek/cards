
import React, { useState,useRef } from 'react'
import "./Navbar.css"
import { NavLink } from 'react-router-dom'
import { projectFirestore } from '../../firebase/config'
import { useReactToPrint } from 'react-to-print';
import musleLogo from "../../assets/musleLogo.png"
const Navbar = () => {
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });
  const deletos = () => {
    const cardCollection = projectFirestore.collection("card");

    // Get all documents in the "card" collection
    cardCollection.get().then((querySnapshot) => {
      // Iterate through each document and delete it
      querySnapshot.forEach((doc) => {
        cardCollection.doc(doc.id).delete();
      });
    }).catch((error) => {
      console.error("Error deleting documents:", error);
    });
  };
  return <header className='Navbar'>
    <img class="logo" src={musleLogo} alt="" />
    <nav>
      
     
      <NavLink id='li' to="" className={({ isActive }) =>
        isActive ? "activeLink link" : "nonactiveLink link"
      } >From</NavLink>

      <NavLink id='li' to="Card" className={({ isActive }) =>
        isActive ? "activeLink link" : "nonactiveLink link"
      }>Card</NavLink>
      <button>
    <span>CONFIRM DELETE</span>
    <svg onClick={deletos} xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
        <path stroke-linecap="round" stroke-linejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
    </svg>
</button>

          
        
      
    </nav>
    
  </header>
}
export default Navbar