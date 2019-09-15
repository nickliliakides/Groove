import React from 'react'
import Card from './card';

const CardBlock = props => {

  const renderCards = items => (
    items && 
      items.map((card,i) => (
        <Card
          key={i}
          {...card}
        />
    ))
  ) 
  
  return (
    <div className="card_block">
      <div className="container">
        {
          props.title && 
          <div className="title">
            {props.title}
          </div>
        }
        <div style={{
          display:'flex',
          flexWrap:'wrap'
        }}>
          {renderCards(props.products)}
        </div>
      </div>
      
    </div>
  )
}

export default CardBlock
