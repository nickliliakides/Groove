import React, { useState, useEffect } from 'react';
import PageTop from '../shared/pageTop';
import CollapseCheckbox from '../shared/collapseCheckbox';
import CollapseRadio from '../shared/collapseRadio';
import LoadMoreCards from './loadMoreCards';
import { strings, price } from '../../utils/fixedCategories';
import { connect } from 'react-redux';
import {
  getBrands,
  getWoods,
  getFilteredProducts
} from '../../store/actions/productActions';
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import faBars from '@fortawesome/fontawesome-free-solid/faBars'
import faTh from '@fortawesome/fontawesome-free-solid/faTh'

const Shop = props => {
  const [state, setState] = useState({
    grid: '',
    limit: 6,
    skip: 0,
    filters: {
      brand: [],
      strings: [],
      woods: [],
      price: []
    }
  });

  const { limit, skip, filters, grid } = state;
  const { product } = props;

  useEffect(() => {
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
    props.dispatch(getBrands());
    props.dispatch(getWoods());
    props.dispatch(getFilteredProducts(limit, skip, filters));
  }, []);

  const handlePrice = value => {
    let array;

    for (let key in price) {
      if (price[key]._id === parseInt(value)) {
        array = price[key].array;
      }
    }
    return array;
  };

  const handleFilters = (filters, cat) => {
    const newFilters = { ...state.filters };
    newFilters[cat] = filters;

    if (cat === 'price') {
      let priceValues = handlePrice(filters);
      newFilters[cat] = priceValues;
    }

    showFilteredResults(newFilters);
    setState({
      ...state,
      skip: 0,
      filters: newFilters
    });
  };

  const showFilteredResults = fltrs => {
    props.dispatch(getFilteredProducts(limit, 0, fltrs));
  };

  const handleLoadMore = () => {
    let skipCards = skip + limit;

    props.dispatch(
      getFilteredProducts(limit, skipCards, filters, product.items)
    ).then(()=> {
      setState({
        ...state, 
        skip: skipCards
      })
    });
  };

  const handleGridClick = () => {
    setState({
      ...state,
      grid: !grid ? 'grid_bars' : ''
    })
  }

  return (
    <div>
      <PageTop title="Browse Products" />
      <div className="container">
        <div className="shop_wrapper">
          <div className="left">
            <CollapseCheckbox
              initState={true}
              title="Brands"
              list={product.brands}
              handleFilters={filters => handleFilters(filters, 'brand')}
            />
            <CollapseCheckbox
              initState={false}
              title="Strings"
              list={strings}
              handleFilters={filters => handleFilters(filters, 'strings')}
            />
            <CollapseCheckbox
              initState={false}
              title="Woods"
              list={product.woods}
              handleFilters={filters => handleFilters(filters, 'wood')}
            />
            <CollapseRadio
              initState={true}
              title="Price"
              list={price}
              handleFilters={filters => handleFilters(filters, 'price')}
            />
          </div>
          <div className="right">
            <div className="shop_options">
              <div className="shop_grids clear">
                <div
                  className={`grid_btn ${grid ? '' : 'active' }`}
                  onClick={() => handleGridClick()}
                >
                  <FontAwesomeIcon className="fai" icon={faTh}/>
                </div>
                <div
                  className={`grid_btn ${!grid ? '' : 'active' }`}
                  onClick={() => handleGridClick()}
                >
                  <FontAwesomeIcon className="fai" icon={faBars}/>
                </div>
              </div>
            </div>
            <div>
              <LoadMoreCards
                grid={grid}
                limit={limit}
                size={product.size}
                products={product.items}
                loadMore={() => handleLoadMore()}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    product: state.product
  };
};

export default connect(mapStateToProps)(Shop);
