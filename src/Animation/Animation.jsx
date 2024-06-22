import Lottie from 'lottie-react';
import bear from './components/bear.json';



const Animation = () => {
    return (
      <div style={{ width: '200px', height: '200px'}}> {/* Adjust size as needed */}
        <Lottie animationData={bear} loop={true} style={{ width: '200px', height: '200px' }}/>
      </div>
    );
  };
  
  export default Animation;