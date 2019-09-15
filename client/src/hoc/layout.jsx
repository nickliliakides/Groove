import React, {useEffect} from 'react'
import Header from '../components/Header_Footer/Header'
import Footer from '../components/Header_Footer/Footer';
import { connect } from "react-redux";
import { getSiteInfo } from '../store/actions/siteActions';

const Layout = props => {
  useEffect(() => {
    if(Object.keys(props.site).length === 0){
      props.dispatch(getSiteInfo())
    }
  }, [])
  return (
    <div>
      <Header />
      <div className="page_container">
        {props.children}
      </div>
      <Footer data={props.site}/>
    </div>
  )
}

const mapStateToProps = state => {
  return {
    site: state.site
  }
}

export default connect(mapStateToProps)(Layout)