import React,{useState} from 'react'
import {connect} from 'react-redux'
import { Link, withRouter } from 'react-router-dom';
import { logoutUser } from '../../../store/actions/userActions';

const Header = (props) => {
  const [state, setState] = useState({
    page:[
      {
        name:'Home',
        linkTo:'/',
        public:true
      },
      {
        name:'Shop',
        linkTo:'/shop',
        public:true
      }
    ],
    user: [
      {
        name:'My Basket',
        linkTo:'/user/cart',
        public:false
      },
      {
        name:'My Account',
        linkTo:'/user/dashboard',
        public:false
      },
      {
        name:'Log in',
        linkTo:'/register_login',
        public:true
      },
      {
        name:'Log out',
        linkTo:'/user/logout',
        public:false
      }
    ]
  })

  const { user: {userData}, history } = props

  const logoutHandler = () => {
    props.dispatch(logoutUser()).then(res => {
      if(res.payload.logoutSuccess){
        history.push('/')
      }
    })
  }

  const defaultLink = (item, i) => (
    item.name === 'Log out' ? 
      <div className="log_out_link"
       key={i}
       onClick={() => logoutHandler()}
      >   
        {item.name}
      </div>
    :
    <Link to={item.linkTo} key={i}>
      {item.name}
    </Link>
  )

  const cartLink = (item, i) => {

    return(
      <div key={i} className="cart_link">
        <span>{userData.cart ? userData.cart.length : 0}</span>
        <Link to={item.linkTo} key={i}>
          {item.name}
        </Link>
      </div>
    )
  }

  const showLinks = type => {
    let list = [];

    if(userData){
      type.forEach(item => {
        if(!userData.isAuth){
          if(item.public === true){
            list.push(item)
          }
        } else {
          if(item.name !== 'Log in'){
            list.push(item)
          }
        }
      })
    }

    return list.map((item, i) => {
      if(item.name !== 'My Basket'){
        return defaultLink(item, i)
      } else {
        return cartLink(item, i)
      }
      
    })
  }

  return (
    <header className="bck_b_light">
      <div className="container">
        <div className="left">
          <div className="logo">
            GROOVE
          </div>
        </div>
        <div className="right">
          <div className="top">
          {showLinks(state.user)}
          </div>
          <div className="bottom">
            {showLinks(state.page)}
          </div>
        </div>
      </div>
    </header>
  )
}

const mapStateToProps = state => {
  return{
    user: state.user
  }
}

export default connect(mapStateToProps)(withRouter(Header))
