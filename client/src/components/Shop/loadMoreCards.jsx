import React from 'react'
import CardBlockShop from '../shared/cardBlockShop';

const LoadMoreCards = props => {
  return (
    <div>
      <div>
        <CardBlockShop
          grid={props.grid}
          list={props.products}
        />
      </div>
      {
        props.size > 0 && props.size >= props.limit &&
        <div className="load_more_container">
          <span onClick={() => props.loadMore()}>
            More Products
          </span>
        </div>
      }
    </div>
  )
}

export default LoadMoreCards
