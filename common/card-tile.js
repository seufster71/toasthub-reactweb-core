import React from 'react';
import PropTypes from 'prop-types';

const CardTile = ({title, pickupDesc, imgSrc, url, urlDesc, data, background}) => {
	
  let tileStyle = {
    display: 'flex',
    padding: '20px',
    background:'#00c292',
    color:'#fff'
  };
  if (background != null) {
    tileStyle.background = background;
  }

	
  return (
	<div className="col mb-5">
        <div className="card h-100">
           {/* Product image */}
            <img className="card-img-top" src={imgSrc} alt="..." />
            {/* Product details */}
            <div className="card-body p-4">
                <div className="text-center">
                    {/* Product name */}
                    <h5 className="fw-bolder">{title}</h5>
                    {/* Pickup */}
                    {pickupDesc}
                </div>
            </div>
            {/* Product actions */}
            <div className="card-footer p-4 pt-0 border-top-0 bg-transparent">
                <div className="text-center"><a className="btn btn-outline-dark mt-auto" href={url}>{urlDesc}</a></div>
            </div>
        </div>
    </div>
  );
};

CardTile.propTypes = {
  title: PropTypes.string.isRequired,
  pickupDesc: PropTypes.string.isRequired,
  imgSrc: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  urlDesc: PropTypes.string.isRequired,
  data: PropTypes.object.isRequired,
  background: PropTypes.string,
};

export default CardTile;
