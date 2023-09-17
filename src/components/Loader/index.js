import React from 'react'

const Loader = ({loaderText}) => {
  return (
    <>
     <div className='loader'></div>
     <p className='loaderText'>{loaderText}</p>
    </>
  )
}

export default Loader