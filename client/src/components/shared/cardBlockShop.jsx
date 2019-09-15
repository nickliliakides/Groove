import React from 'react'
import Card from './card';


const CardBlockShop = props => {

  const renderCards = () => (
    props.list &&
      props.list.map(item => (
        <Card
          key={item._id}
          {...item}
          grid={props.grid}
        />
      ))
  )

  return (
    <div className="card_block_shop">
      <div>
        <div>
          {props.list && props.list.length === 0 && 
            <div className="no_result">
              Sorry, There are no results to display.
            </div>
          }
          { renderCards(props.list) }
        </div>
      </div>
    </div>
  )
}

export default CardBlockShop
