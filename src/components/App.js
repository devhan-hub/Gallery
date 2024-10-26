import Main from './Main';
import LoginForm from './LoginForm'
import useAuth from '../hooks/useAuth'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



const App = () => {
const [user] = useAuth();
  return (  
     
     <div>
      {
        user?<Main user={user}/>:<LoginForm/>

      }
      <ToastContainer/>
     </div>
  );
};

export default App;

