import Main from './Main';
import LoginForm from './LoginForm'
import useAuth from '../hooks/useAuth'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ClipLoader } from 'react-spinners';
import { Navigate } from 'react-router-dom';



const App = () => {
const [user , loading] = useAuth();

if(loading){
  return (
     <div className="loader h-screen flex items-center justify-center">
  <ClipLoader size={50} color="#ff6f61" />
  <p>Loading...</p>
</div>
)
}
  return (  
     
     <div>
      {
        user?<Main user={user}/>:Navigate('./Login')

      }
      <ToastContainer/>
     </div>
  );
};

export default App;

