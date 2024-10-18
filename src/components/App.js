import Main from './Main';
import LoginForm from './LoginForm'
import useAuth from '../hooks/useAuth'

const App = () => {
const [user] = useAuth();
  return (  
     
     <div>
      {
        user?<Main user={user}/>:<LoginForm/>
      }
     </div>
  );
};

export default App;

