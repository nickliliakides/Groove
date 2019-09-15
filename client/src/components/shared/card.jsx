import React from 'react'
import MyButton from './button';
import { connect } from 'react-redux';
import { addToBasket } from '../../store/actions/userActions';

const Card = props => {

  const renderCardImage = images => {
    if(images.length > 0){
      return images[0].url
    } else {
      return '/images/image_not_available.png'
    }
  }

  return (
    <div className={`card_item_wrapper ${props.grid}`}>
      <div 
        className="image" 
        style={{
          background:`url(${renderCardImage(props.images)}) no-repeat`
        }}
      >
      </div>
      <div className="action_container">
          <div className="tags">
            <div className="brand">{props.brand.name}</div>
            <div className="name">{props.name}</div>
            <div className="price">£{props.price}</div>
          </div>
      {
        props.grid &&
          <div className="description">
            <p>{props.description}</p>
          </div>
      }
      <div className="actions">
        <div className="button_wrapp">
          <MyButton
            type="default"
            altClass="card_link"
            title="View product"
            linkTo={`/product/${props._id}`}
            addStyles={{ margin: '10px 0 0 0' }}
          />
        </div>
        <div className="button_wrapp">
          <MyButton
            type="bag_link"
            runAction={() => {
              props.user.userData.isAuth && props.dispatch(addToBasket(props._id))
            }}
          />
        </div>
      </div>
      </div>
    </div>
  )
}

const mapStateToProps = state => {
  return {
    user: state.user
  };
};

export default connect(mapStateToProps)(Card)
