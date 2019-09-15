import React,{useEffect} from 'react'
import PageTop from '../shared/pageTop';
import ProductInfo from './productInfo';
import ProductImg from './productImg';
import { connect } from 'react-redux';
import { getProductById } from '../../store/actions/productActions'
import { addToBasket } from '../../store/actions/userActions';
import CircularProgress from '@material-ui/core/CircularProgress';


const ProductPage = props => {

  useEffect(()=> {
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
    const id = props.match.params.id;
    props.dispatch(getProductById(id)).then(res => {
      if(!res.payload){
        props.history.push('/');
      }
    });
  }, [])

  const handleAddToCart = id => {
    props.user.userData.isAuth && props.dispatch(addToBasket(id))
  }

  return (
    <div>
      <PageTop
        title="Product detail"
      />
      <div className="container">
        {
          props.product.item ?
            <div className="product_detail_wrapper">
              <div className="left">
                <div style={{width: '500px'}}>
                  <ProductImg
                    detail={props.product.item}
                  />
                </div>
              </div>
              <div className="right">
                <ProductInfo
                  detail={props.product.item}
                  addToCart={id => handleAddToCart(id)}               
                />
              </div>
            </div>
          : <CircularProgress
              style={{ color: '#00bcd5' }} 
              thickness={7}
            />
        }
      </div>
    </div>
  )
}

const mapStateToProps = state => {
  return {
    product: state.product,
    user: state.user
  };
};

export default connect(mapStateToProps)(ProductPage)
