import React, {useEffect} from 'react'
import HomeSlider from './slider';
import HomePromotion from './promotion';
import CardBlock from '../shared/cardBlock';
import { connect } from 'react-redux';
import { getProductsBySell, getProductsByArrival } from '../../store/actions/productActions';


const Home = props => {
  useEffect(() => {
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
    props.dispatch(getProductsBySell());
    props.dispatch(getProductsByArrival());
  },[])

  return (
    <div>
      <HomeSlider/>
      <CardBlock
        products={props.product.itemsBySell}
        title="Best selling bass guitars"
      />
      <HomePromotion/>
      <CardBlock
        products={props.product.itemsByArrival}
        title="New arrivals"
      />
    </div>
  )
}

const mapStateToProps = state => {
  return {
    product: state.product
  }
}

export default connect(mapStateToProps)(Home)
