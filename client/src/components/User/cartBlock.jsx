import React from 'react'

const CartBlock = props => {

  const renderItemImage = images => {
    if(images.length > 0){
      return images[0].url
    } else {
      return '/images/image_not_available.png'
    }
  }

  const renderItems = () => (
    props.products.cartData &&
      props.products.cartData.map(p => (
        <div key={p._id} className="user_product_block">
          <div className="item">
            <div
             className="image"
             style={{background: `url(${renderItemImage(p.images)}) no-repeat`}}
            ></div>
          </div>
          <div className="item">
            <h4>Product Name</h4>
            <div>{p.brand.name} - {p.name}</div>
          </div>
          <div style={{textAlign: 'center'}} className="item">
            <h4>Quantity</h4>
            <div >{p.quantity}</div>
          </div>
          <div style={{textAlign: 'center'}} className="item">
            <h4>Price</h4>
            <div >£ {p.price}</div>
          </div>
          <div className="item btn">
            <div className="cart_remove_btn" onClick={() => props.removeItem(p._id)}>
              Remove
            </div>
          </div>
        </div>
      ))
  )

  return (
    <div>
      {renderItems()}
    </div>
  )
}

export default CartBlock
