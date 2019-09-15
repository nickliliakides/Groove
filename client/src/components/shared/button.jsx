import React from 'react'
import { Link } from 'react-router-dom'
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import faShoppingCart from '@fortawesome/fontawesome-free-solid/faShoppingCart'

const MyButton = props => {
  const buttons = () => {
    let template = '';

    switch(props.type){
      case "default":
        template = <Link
          className={props.altClass ? props.altClass : "link_default"}
          to={props.linkTo}
          {...props.addStyles}
        >
          {props.title}
        </Link>
        break;
      case "bag_link":
        template = 
          <div className="bag_link"
            onClick={() => {props.runAction()}}
          >
            <FontAwesomeIcon
              icon={faShoppingCart}
            />
          </div>
      break;
      case "add_to_cart":
          template = 
          <div className="add_to_cart_link"
            onClick={() => {props.runAction()}}
          >
            <FontAwesomeIcon
              icon={faShoppingCart}
            />
            Add to basket
          </div>
      break;
      default:
        template='';
    }

    return template
  }


  return (
    <div className="my_link">
      {buttons()}
    </div>
  )
}

export default MyButton
