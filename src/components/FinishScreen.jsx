import Lottie from 'lottie-react';
import sad from '../Animation/components/sad.json'
import sheep from '../Animation/components/sheep.json'
import book from '../Animation/components/book.json'


const FinishScreen = ({points, maxPossiblePoints, highscore, dispatch}) => {
    const percentage = (points / maxPossiblePoints) * 100


    let emoji;

   
    if (percentage >= 80 && percentage <= 100) emoji = <Lottie animationData={book} loop={true}  style={{ width: '200px', height: '200px' }}/>;

    if (percentage >= 50 && percentage < 80) emoji = <Lottie animationData={sheep} loop={true}  style={{ width: '200px', height: '200px' }}/>;

    if (percentage >= 0 && percentage < 50) emoji = <Lottie animationData={sad} loop={true}  style={{ width: '200px', height: '200px' }}/>;
   


  return (
    <>
    <div style={{justifyContent: 'center', display: 'flex'}}>{emoji}</div>
    <p className="result"> You scored <strong>{points}</strong> out of {maxPossiblePoints} ({Math.ceil(percentage)}%)
    </p>

    <p className='highscore'>(Highscore: {highscore} points)</p>

    <button className="btn btn-ui" 
      onClick={()=>dispatch({type: 'restart'})}>Restart Quiz</button>
    </>
  );
}

export default FinishScreen;