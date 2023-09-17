import React  from 'react';
import styled from 'styled-components';

const EndGame = ({pseudo , totalScore , totalQuestions , playAgain}) => {

const GoodByeMsg = styled.h1`
font-size: clamp(5px , 5vw , 50px);
color: white;

`;
const TotalScore = styled.h2`
    font-size: clamp(5px , 5vw , 30px);
    color: white;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`
const PlayAgain = styled.button`
    padding: 10px;
    border: 1px solid #fff;
    border-radius: 5px;
    cursor: pointer;
    font-size: 20px;

`
const percentSucess = Math.floor((totalScore / totalQuestions) * 100)

  return (
    <div className='pyro' >
        <div className="before"></div>
        <div className="after"></div>
        <GoodByeMsg>
                Congratulations {pseudo}
            </GoodByeMsg>

            <TotalScore>
                <span>Your Global Score : {totalScore} / {totalQuestions}</span>
                <span>Your Sucess : {percentSucess}% </span>
            </TotalScore>

            <PlayAgain className='btnplayAgain' onClick={playAgain}>Play again</PlayAgain>
    </div>
  )
}

export default React.memo(EndGame) 