import Lottie from 'lottie-react';
import reactAnime from '../Animation/components/reactAnime.json'


function Header({status}) {
    return (
      <header className='app-header'>
        {status !== 'active' ? (<Lottie animationData={reactAnime} loop={true}  style={{ width: '200px', height: '200px' }}/>) : <img src='logo512.png' alt='React logo' />}
        <h1>React Quiz</h1>
      </header>
    );
  }
  
  export default Header;
  