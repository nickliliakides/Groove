import React from 'react'
import moment from 'moment'

const UserHistoryBlock = props => {

  const renderBlocks = () => (
    props.history && props.history.map((item,i) => (
      <tr key={i}>
        <td>{moment(item.purchaseDate).format("MMM Do YYYY")}</td>
        <td>{item.brand} - {item.name}</td>
        <td>£ {item.price}</td>
        <td>{item.quantity}</td>
      </tr>
    ))
  )

  return (
    <div className="history_blocks">
      <table>
        <thead>
          <tr>
            <th>Date of purchase</th>
            <th>Product</th>
            <th>Price</th>
            <th>Quantity</th>
          </tr>
        </thead>
        <tbody>
          {renderBlocks()}
        </tbody>
      </table>
    </div>
  )
}

export default UserHistoryBlock
