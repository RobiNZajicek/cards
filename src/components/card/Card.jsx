import React from 'react'
import logo from '../../assets/NavbarLogo.jpg'
import './Card.css'
const Card = ({ id, celed, rod, druh, puvod, popsal}) => {
  return <div key={id} className='the-card'>
        {/* <div>
              {allAnswers.map((oneCard) => (
                    <Card key={oneCard.id} {...oneCard} />
              ))}
        </div> */}
        
        
      <div className='the-card-left'>
            <p className='under'>{celed}</p>
            <p className='under'>{rod}</p>
            <p className='under'>{druh}</p>
            <p className='under' >{puvod}</p>
            <p className='under'>{popsal}</p>
        </div>
            <div className='the-card-right'>
                   <img className='the-card-logo' src={logo} alt="" /> 
                   <span id='text-logo' className='mt-12'>emberizashells.cz</span>
            </div>
            </div>
    

}

export default Card