import React from 'react'
import MyButton from '../shared/button';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import faTruck from '@fortawesome/fontawesome-free-solid/faTruck'
import faCheck from '@fortawesome/fontawesome-free-solid/faCheck'
import faTimes from '@fortawesome/fontawesome-free-solid/faTimes'

const ProductInfo = props => {

  const showItemTags = item => (
    <div className="product_tags">
      {
        item.shipping &&
          <div className="tag">
            <div><FontAwesomeIcon icon={faTruck}/></div>
            <div className="tag_text">
              <div>Free shipping</div>
              <div>And return</div>
            </div>
          </div>
      }
      {
        <div className="tag">
          <div><FontAwesomeIcon icon={item.available ? faCheck : faTimes}/></div>
          <div className="tag_text">
            <div>{item.available ? 'Available' : 'Not available'}</div>
            <div>{item.available ? 'In store' : 'Preorder only'}</div>
          </div>
        </div>
      }
    </div>
  )

  const showItemActions = item => (
    <div className="product_actions">
      <div className="price">£ {item.price}</div>
      <div className="cart">
        <MyButton
          type="add_to_cart"
          runAction={() => props.addToCart(item._id)}
        />
      </div>
    </div>
  )

  const showItemSpecs = item => (
    <div className="product_specifications">
      <h2>Specs:</h2>
      <div>
        <div className="item">
          <strong>Strings:</strong> {detail.strings}
        </div>
        <div className="item">
          <strong>Body material:</strong> {detail.wood.name}
        </div>
      </div>
    </div>
  )

  const {detail} = props;

  return (
    <div>
      <h1>{detail.brand.name} {detail.name}</h1>
      <p>{detail.description}</p>
      {showItemTags(detail)}
      {showItemActions(detail)}
      {showItemSpecs(detail)}
    </div>
  )
}

export default ProductInfo
