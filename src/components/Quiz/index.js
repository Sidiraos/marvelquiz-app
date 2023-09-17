import React , {Component} from 'react';
import Levels from '../Levels';
import ProgressBar from '../ProgressBar';
import {QuizMarvel} from '../quizMarvel';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import QuizOver from '../QuizOver';
import EndGame from '../EndGame';
import {TiChevronRight} from 'react-icons/ti';
class Quiz extends Component {
  constructor() {
    super();
    this.initialState = {
      levelCounter : 0,
      questions : [],
      question : '',
      options : [],
      counterQuestion : 0,
      isNotAnswerSelected : true,
      userAnswer : '',
      score : 0,
      totalScore : 0,
      totalQuestions : 0,
      isCompletedLevel : false,
      canNextLevel : false ,
      btnMsg : '' ,
      isSuccesOrEndGameBtnClassName : '' ,
      congrugatsMsg : '',
      scorePercent : '',
      isGameFinish : false ,
      canCheckFinalResult : false
    }

    this.state = this.initialState;
    this.levels = ["beginner" , "intermediate" , "expert"];
    this.optionRef = React.createRef(null);
    this.ques = React.createRef(null)
    this.answer = React.createRef(null);
    this.scoreForNextLevel = 70;
  }



  componentDidMount(){
    console.log('cdm')

   const {levelCounter,counterQuestion } = this.state
    this.ques.current = this.loadDataQuestions(QuizMarvel);
    const questionsOfCurrentLevel = this.ques.current[this.levels[levelCounter]]
    // console.log(this.ques.current)
    this.answer.current = questionsOfCurrentLevel[counterQuestion].answer
    // console.log(this.answer)
    const questionsWithoutAnswer = questionsOfCurrentLevel.map(({answer , ...rest}) => rest)
    // console.log(questionsWithoutAnswer)
    this.setState(()=>{
       return {questions : questionsWithoutAnswer }
    })
  }

  componentDidUpdate(prevProps , prevState){
    console.log('cdu')
    const {
      levelCounter,
      questions ,
      counterQuestion ,
      score ,
      totalScore ,
      totalQuestions ,
      isCompletedLevel ,
      scorePercent ,
    } = this.state

    const questionsOfCurrentLevel = this.ques.current[this.levels[levelCounter]];
    // console.log(questionsOfCurrentLevel)

    if((prevState.questions !== questions || prevState.counterQuestion !== counterQuestion) && questions.length)
    {
      this.setState(()=>{
        return {
          options : questions[counterQuestion].options,
          question : questions[counterQuestion].question,
        }
      })
      this.answer.current = questionsOfCurrentLevel[counterQuestion].answer
    }

    // when finish level , we calculate percentage , we update totalscore and totalquestions
    if(prevState.isCompletedLevel !== isCompletedLevel && isCompletedLevel)
    {
      this.setState(()=>{
         return {
          scorePercent : this.calculateScore(),
          totalScore : score + totalScore ,
          totalQuestions : totalQuestions +  questions.length,
          isGameFinish : levelCounter === this.levels.length-1 ? true : false
          }
      })
    }
    // update btnMsg , congrugatsMSG , si percentage > scoreForNextLevel we can pass to next level otherwise we redo, state if score percent change
    if(prevState.scorePercent !== scorePercent)
    {
      this.setState(()=>{
        return {
          btnMsg : scorePercent >= this.scoreForNextLevel ? (levelCounter === this.levels.length - 1 ? 'Check Result' : 'Next level') : 'Play again' ,
          congrugatsMsg : scorePercent >= this.scoreForNextLevel ?  (levelCounter === this.levels.length - 1 ? 'Congratulations You have Finished this game you are an expert' : 'Congratulations You pass to next level') : 'You failed',
          canNextLevel : scorePercent >= this.scoreForNextLevel ? true : false,
          // if this.state.scorePercent >= this.scoreForNextLevel == true means that canNextLevel is also True
          isSuccesOrEndGameBtnClassName : scorePercent >= this.scoreForNextLevel ? (levelCounter === this.levels.length - 1 ? 'gameOver' : 'success') : 'failure' ,
        }

      })
    }
    // update state when levelCounter change , if we are in the next level , we load questions for this level
    if((prevState.levelCounter !== levelCounter)){this.setState(()=>{return {questions : this.loadQuestionsWithoutAnswers()}})}
  }


  calculateScore = ()=>{
    const {
      questions ,
      score ,
      isCompletedLevel ,

    } = this.state
    if(isCompletedLevel) {
         const scorePercent = Math.floor((score / questions.length) * 100)
        return scorePercent
    }
    return null
  }

  loadDataQuestions = (quiz) => {
    const quizs = quiz[0].quiz
    // Filtrer les questions en fonction du niveau actuel
    return quizs
  }

  handleAnswer = (e )=>{
    const userAnswer = e.target.textContent
    this.setState(()=>{
      return {userAnswer , isNotAnswerSelected : false}
    })
  }


  handleNextBtn = (questions , e , answer)=> {
    const {
      userAnswer ,
      score ,
  
    } = this.state

    if(userAnswer == answer)
    {
        this.setState(()=>{
          return {score : score + 1}
        })
       toast.success('Bravo +1', {
        position: "top-right",
        autoClose: 500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        });
    } else {
      toast.error('Lost', {
        position: "top-right",
        autoClose: 500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        bodyClassName : 'tostify-error'

        });
    }
    // next Question
    this.setState((prevState)=>{
      return {
        counterQuestion : prevState.counterQuestion < questions.length - 1 ? prevState.counterQuestion + 1 : 0,
        isNotAnswerSelected : true ,
        isCompletedLevel : prevState.counterQuestion < questions.length - 1 ? false : true,

      }
    })
  }


  handleNextLevel = ()=>{
    const {
      levelCounter,
      canNextLevel  ,
      scorePercent ,
      isGameFinish 
    } = this.state

    if(isGameFinish && scorePercent >= this.scoreForNextLevel)
    // if we finised final level and we validate the score , we can see final result otherwise if game not finish 
    {
      this.setState(()=>{
        return {
          canCheckFinalResult : true,
        }
      })
    } 
    else 
    {
      this.setState(()=>{
            return {
            levelCounter : canNextLevel ? levelCounter + 1 : levelCounter,
            isGameFinish : false,
            canNextLevel : false ,
            isCompletedLevel : false,
            score : 0,
            counterQuestion : 0,
            isNotAnswerSelected : true,
            btnMsg : '' ,
            congrugatsMsg : '',
            scorePercent : ''
          }
      })
    }
  }

  loadQuestionsWithoutAnswers = ()=>{
    const {levelCounter} = this.state
    const questionsOfCurrentLevel = this.ques.current[this.levels[levelCounter]] 
    const questionsWithoutAnswer = questionsOfCurrentLevel.map(({answer , ...rest}) => rest)
    return questionsWithoutAnswer
  }

  
  playAgain = ()=>{
      this.setState(()=>{
        return {
        ...this.initialState,
          questions : this.loadQuestionsWithoutAnswers() , 
        }
      })

  }

  render() {

    const {pseudo} = this.props.userData;
    // state destructured
    const {
      levelCounter,
      questions ,
      question ,
      options ,
      counterQuestion ,
      isNotAnswerSelected ,
      userAnswer ,
      score ,
      totalScore ,
      totalQuestions ,
      isCompletedLevel ,
      canNextLevel  ,
      btnMsg ,
      isSuccesOrEndGameBtnClassName ,
      congrugatsMsg ,
      scorePercent ,
      canCheckFinalResult,
    } = this.state

    const questionsOfCurrentLevel = isCompletedLevel ? this.ques.current[this.levels[levelCounter]]  : null


    return (
      <>
            {
              canCheckFinalResult ? 

              (
                
                  <>
                      <EndGame playAgain= {this.playAgain} totalScore = {totalScore} pseudo={pseudo} totalQuestions = {totalQuestions}/>
                  </>
              
              
              ) :
              
              (
                <>
                    <h2>{pseudo}</h2>
                    <Levels levels = {this.levels} levelCounter = {levelCounter} />
                    {
                       isCompletedLevel ? 
                        (
                              <>
                                <QuizOver 
                                  score = {score} 
                                  totalQuestions = {questions.length} 
                                  scorePercentage = {scorePercent} 
                                  handleNextLevel = {this.handleNextLevel} 
                                  btnMsg = {btnMsg}
                                  congrugatsMsg = {congrugatsMsg}
                                  canNextLevel = {canNextLevel}
                                  ref = {questionsOfCurrentLevel}
                                  isSuccesOrEndGameBtnClassName = {isSuccesOrEndGameBtnClassName}
                                />
                              </>
                        )
                            :

                        (
                            <>
                                <ProgressBar progressLevel = {counterQuestion} totalQuestion = {questions.length} />
                                <ToastContainer/>
                                <h2 >{question}</h2>
                                <div ref = {this.optionRef}>
                                  {options && options.map((option , index) => {
                                    // 
                                      return <p key={index} onClick={(e)=> this.handleAnswer(e)} className={`answerOptions ${userAnswer == option ? 'selected' : null}`}><TiChevronRight size={'30px'} />{option}</p>
                                  } )} 
                                </div>
                                <button onClick={(e)=>this.handleNextBtn(questions , e , this.answer.current)} disabled={isNotAnswerSelected} className='btnSubmit'>{counterQuestion < questions.length - 1 ? 'Next Question' : 'Finish'}</button>
                            </>
                      )
                    }
                </>
              )
            }

            

      </>
    )


  }

}

export default React.memo(Quiz)
