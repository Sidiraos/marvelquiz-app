import React from 'react';
import batman from '../../images/batman.png';
import { styled } from 'styled-components';

const ErrorPage = () => {

    const H2 = styled.h2 `
        text-align: center;
        margin-top: 30px;
    
    ` ;
    const ErrorPageContainer = styled.div `
        min-height: 500px;
    ` ;

    const BatImg = styled.img`
        display: block;
        margin: 40px auto;
    
    `
  return (
    <ErrorPageContainer className='quiz-bg'>
        <div className='container'>
            <H2>
                Oups 😅 , this page doesn't exist
            </H2>
            <BatImg src={batman} alt="error page" />
        </div>
    </ErrorPageContainer>
  )
}

export default ErrorPage