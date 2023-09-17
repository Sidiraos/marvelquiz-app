import React from 'react'

const ProgressBar = (props) => {
  const {progressLevel , totalQuestion} = props
  const progessPercent = ((progressLevel + 1) / totalQuestion) * 100
  return (
    <>
    <div className='percentage'>
        <div className='progressPercent'>Question: {progressLevel + 1}/{totalQuestion}</div>
        <div className='progressPercent'>Progress: {progessPercent} %</div>
    </div>
    <div className='progressBar'>
        <div className='progressBarChange' style={{width: progessPercent + "%"}}></div>
    </div>
    </>

  )
}

export default React.memo(ProgressBar)