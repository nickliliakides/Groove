import React from 'react'
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import faExclamationCircle from '@fortawesome/fontawesome-free-solid/faExclamationCircle';

const notFound = () => {
  return (
    <div className="container">
      <div className="not_found_container">
        <FontAwesomeIcon icon={faExclamationCircle} />
        <div>
          Sorry... Page not found!
        </div>
      </div>
    </div>
  )
}

export default notFound
