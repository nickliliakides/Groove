import React, { Component } from 'react';
import Dropzone from 'react-dropzone';
import {
  addImage,
  clearImage,
  removeImage
} from '../../store/actions/productActions';
import { connect } from 'react-redux';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import faPlusCircle from '@fortawesome/fontawesome-free-solid/faPlusCircle';
import faTimesCircle from '@fortawesome/fontawesome-free-solid/faTimesCircle';
import CircularProgress from '@material-ui/core/CircularProgress';

const dropzoneStyles = {
  float: 'left',
  width: '25%',
  height: '180px',
  padding: '10px',
  cursor: 'pointer'
};

const wrap = {
  background: '#eaeaea',
  height: '100%',
  width: '100%',
  textAlign: 'center',
  padding: '15px',
  boxSizing: 'border-box',
  fontSize: '49px',
  border: '1px solid #eaeaea'
};

const delIconStyles = {
  position: 'absolute',
  right: '4px',
  top: '4px',
  color: 'red',
  width: '32px',
  height: '32px',
  opacity: '0.8',
  cursor: 'pointer'
}

class FileUpload extends Component {
  
  state = {
    uploadedFiles: [],
    uploading: false
  };

  static getDerivedStateFromProps(props, state){
    if(props.reset){
      return state = {
        uploadedFiles: [],
        uploading:false
      }
    }
  }

  handleDrop = files => {
    this.setState({
      uploading: true
    });

    this.props.dispatch(addImage(files[0])).then(res => {
      this.setState(
        {
          uploading: false,
          uploadedFiles: [...this.state.uploadedFiles, res.payload]
        },
        () => {
          this.props.imgHandler(this.state.uploadedFiles);
        }
      );
      setTimeout(() => {
        this.props.dispatch(clearImage());
      }, 3000);
    });
  };

  onRemove = imgId => {
    this.props.dispatch(removeImage(imgId)).then(res => {
      let newImagesArray = this.state.uploadedFiles.filter(img => {
        return img.public_id !== imgId;
      });
      this.setState({ uploadedFiles: newImagesArray }, () => {
        this.props.imgHandler(newImagesArray);
      });
    });
  };

  showUploadedImages = () =>
    this.state.uploadedFiles.map(img => (
      <div className="dropzone_box" key={img.public_id}>
        <div
          className="wrap"
          style={{
            background: `url(${img.url}) no-repeat`,
            position: 'relative'
          }}
        >
          <div>
            <FontAwesomeIcon
              icon={faTimesCircle}
              onClick={() => this.onRemove(img.public_id)}
              style={delIconStyles}
            />
          </div>
        </div>
      </div>
    ));

  render() {
    return (
      <div style={{ marginBottom: '22px' }}>
        <section>
          <div className="dropzone clear">
            <Dropzone
              onDrop={e => this.handleDrop(e)}
              multiple={false}
              accept="image/jpeg, image/jpg, image/png"
              maxSize={2000000}
              style={dropzoneStyles}
            >
              {({ getRootProps, getInputProps }) => (
                <div
                  {...getRootProps({ className: 'dropzone' })}
                  style={dropzoneStyles}
                >
                  <input {...getInputProps()} />

                  <FontAwesomeIcon icon={faPlusCircle} style={wrap} />
                </div>
              )}
            </Dropzone>
            {this.state.uploadedFiles.length !== 0 && this.showUploadedImages()}
            {this.state.uploading && (
              <div
                className="dropzone_box"
                styles={{
                  textAlign: 'center',
                  paddingTop: '50px'
                }}
              >
                <CircularProgress style={{ color: '#00bcd5' }} thickness={7} />
              </div>
            )}
          </div>
        </section>
      </div>
    );
  }
}

export default connect()(FileUpload);
