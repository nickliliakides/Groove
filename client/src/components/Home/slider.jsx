import React from 'react'
import Slider from 'react-slick';
import MyButton from '../shared/button';

const HomeSlider = props => {
  const slides = [
    {
      img:'/images/fender_slide.jpg',
      lineOne:'Fender',
      lineTwo:'Custom Shop',
      linkTitle:'Shop Now',
      linkTo:'/shop'
    },
    {
      img:'/images/ibanez_slide.jpg',
      lineOne:'Ibanez',
      lineTwo:' Combo Special Discounts',
      linkTitle:'View Offers',
      linkTo:'/shop'
    },
    {
      img:'/images/yamaha_slide.jpg',
      lineOne:'Yamaha',
      lineTwo:'Deals on quality',
      linkTitle:'Shop Now',
      linkTo:'/shop'
    }
  ]

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow:1,
    slidesToScroll:1,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 4000
  }

  const generateSlides = () => (
    slides &&
      slides.map((item, i) => (
        <div key={i}>
          <div className="featured_image"
            style={{
              background:`url(${item.img})`,
              height: `${window.innerHeight}px`
            }} 
          >
            <div className="featured_action">
              <div className="tag title">{item.lineOne}</div>
              <div className="tag low_title">{item.lineTwo}</div>
              <div>
                <MyButton
                  type="default"
                  title={item.linkTitle}
                  linkTo={item.linkTo}
                  addStyles={{
                    margin:'10px 0 0 0'
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      ))
  )

  return (
    <div className="featured_container">
      <Slider {...settings}>
          {generateSlides()}
      </Slider>
    </div>
  )
}

export default HomeSlider
