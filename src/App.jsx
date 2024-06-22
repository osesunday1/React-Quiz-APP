import { useEffect, useReducer } from 'react';
import Central from './Central';
import Header from './components/Header';
import Loader from './components/Loader';
import Error from './components/Error';
import StartScreen from './components/StartScreen';
import Question from './components/Question';
import NextButton from './components/NextButton';
import Progress from './components/Progress';
import FinishScreen from './components/FinishScreen';
import Animation from './Animation/Animation';
import Timer from './components/Timer';
import Footer from './components/Footer';



const secondsPerQuestion = 30

const initialState={
  //all questions
  questions:[],
  // different status: 'loading', error, ready, active, finished
  status: 'loading',
  //array index
  index: 0,
  //answer points
  points:0,
  highscore: 0,
  secondsRemaining: null,

}

function reducer (state, action){
  switch(action.type){
    case 'dataReceived':
      return {
        ...state,
        questions: action.payload,
        status: "ready",
      };
    case 'dataFailed':
      return{
        ...state,
        status: 'error',
      };
    case 'startQuiz':
      return {
        ...state,
        status: "active",
        secondsRemaining: state.questions.length * secondsPerQuestion
      };

    case 'endQuiz':
        return {
          ...state,
          status: "finished",
          highscore: state.points > state.highscore? state.points : state.highscore
        };

    case 'restart':
      return{ 
        ...state,
        status: 'ready',
        index: 0,
        points:0,
        highscore: 0,
        answer: null
      }
    case 'tick':
      return {
        ...state,
        secondsRemaining: state.secondsRemaining -1,
        status: state.secondsRemaining=== 0 ? 'finished' : state.status
      }

    case 'newAnswer':{
      const currentQuestion = state.questions.at(state.index);
      const isCorrect = action.payload === currentQuestion.correctOption;
      const additionalPoints = isCorrect ? currentQuestion.points || 0 : 0;

      return   (
      {
        ...state, 
        answer: action.payload,
        points: state.points + additionalPoints
      }
        )}
      
      case 'nextQuestion':
        return{
          ...state, 
          index: state.index + 1,
          answer: null
        }

      default:
        throw new Error("Action Unknown")
  }
}



function App() {
  const [{questions, status, index, answer, points, highscore, secondsRemaining}, dispatch] = useReducer(reducer, initialState)


  const numQuestions = questions.length
  const maxPossiblePoints= questions.reduce((prev, cur) => prev + cur.points, 0)

 

  useEffect(() => {
    fetch("../../data/questions.json")
      .then(res => res.json())
      .then((data) => dispatch({type: 'dataReceived', payload: data.questions}))
      .catch((err) => dispatch({type: 'dataFailed', payload: err}));
  }, []);

  return (
    <>
      <div className='app'>
        <Header status={status} />

        {status !== 'active' && status !== 'finished' &&<Animation />}
       
       <Central> 
        {status === 'loading' && <Loader /> } 
        {status === 'error' && <Error /> } 
        {status === 'ready' && <StartScreen numQuestions= {numQuestions} dispatch= {dispatch}/> } 
        {status === 'active' && (
          <>

          <Progress 
          index= {index} 
          numQuestions= {numQuestions} 
          points={points}
          maxPossiblePoints= {maxPossiblePoints}
          />

          <Question 
          question={questions[index]} 
          dispatch= {dispatch} 
          answer={answer}
          />

          <Footer>

          <Timer dispatch= {dispatch} secondsRemaining={secondsRemaining}/>

          <NextButton 
          dispatch={dispatch} 
          answer={answer} 
          numQuestions={numQuestions} 
          index= {index} 
          />

          </Footer>

          </>
          )} 

          {status === 'finished' &&
          <FinishScreen 
          points={points}
          maxPossiblePoints= {maxPossiblePoints}
          highscore= {highscore}
          dispatch= {dispatch} 
          />}
          
        </Central>
      </div>
    </>
  )
}

export default App
