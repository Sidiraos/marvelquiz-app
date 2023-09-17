import React , {useState , useEffect} from 'react';
import Stepper from 'react-stepper-horizontal'

const Levels = ({levels , levelCounter}) => {
  const [usersLevels , setUsersLevels] = useState(null)
  useEffect(() => {
    const stepsLevels = levels.map(level =>({title : level.toUpperCase()}))
    setUsersLevels(stepsLevels)
  } ,[levels])

  // console.log(usersLevels)
  
  return (
    <div className='levelsContainer' style={{background : "transparent"}}>
        {usersLevels && <Stepper 
         steps={usersLevels} 
         activeStep={ levelCounter }
         activeColor = '#d31017'
         completeBarColor = '#d31017'
         completeColor = '#d31017'
         circleTop =  {0}
         activeTitleColor = '#d31017'
         size = {45}
         circleFontSize = {20}
         /> } 
    </div>
  )
}

export default React.memo(Levels)