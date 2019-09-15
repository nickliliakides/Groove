import React,{ useState, useEffect, Fragment } from 'react'
import Carousel, { Modal, ModalGateway } from 'react-images';

const ProductImg = props => {

  const [state, setState] = useState({ 
    modalIsOpen: false,
    currentIndex: 1,
    images: []
    });

  useEffect(() => {
    let images = [];
    if(props.detail.images.length > 0){
      
      props.detail.images.forEach(item => {
        images.push({src: `${item.url}`})
      })
    }
    setState({
      ...state,
      images
    })
  }, [props.detail])

  const renderItemImg = images => {
    if(images.length > 0){
      return images[0].url
    } else {
      return '/images/image_not_available.png'
    }
  }

  // const toggleModal = () => { 
    
  //   setLightboxController({
  //   ...lightboxController,
  //   modalIsOpen: !lightboxController.modalIsOpen, 
  //   }); 
  //   }

  const openLightBox = (index) => {
    if(state.images.length > 0) {
      setState({
        ...state,
        currentIndex: index,
        modalIsOpen: true,
        // currentImage: pos
      })
    }
  }

  // const closeLightBox = () => {
  //   setState({
  //     ...state,
  //     lightboxIsOpen: false
  //   })
  // }

  const toggleModal = () => {
    setState(({...state, modalIsOpen: !state.modalIsOpen }));
  };

  // const openLightbox = () => {
  //   if(lightboxController.lightboxImages.length > 0){
  //     setLightboxController({
  //       ...lightboxController,
  //       lightbox: true
  //     })
  //   }
  // }

  const showThumbs = () => (
    state.images.map((item,i) => (
      i > 0 && 
      <div
        key={i}
        className="thumb"
        onClick={() => openLightBox(i+1)}
        style={{background: `url(${item.src}) no-repeat`}}
      >
      </div>  
    ))
  )


  const {detail} = props;
  // console.log(lightboxController.lightboxImages)

  return (
    
    <div className="product_image_container">
      <div className="main_pic">
        <div
          style={{background: `url(${renderItemImg(detail.images)}) no-repeat`}}
          onClick={() => openLightBox(1)}
        >
        </div>
      </div>
      <div className="main_thumbs">
      {showThumbs()}
      </div>
      <ModalGateway>
     {state.modalIsOpen && (
       <Modal onClose={toggleModal}>
         <Carousel views={state.images} />
       </Modal>
     )}
   </ModalGateway>
    </div>
   
  )
}

export default ProductImg
