import { useState } from 'react';
import { Button, TextField, Box, Typography, Link } from '@mui/material';
import { signInWithEmailAndPassword } from "firebase/auth";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { firebaseAuth, firebaseFirestore } from '../firebase/Config';
import { styled } from '@mui/material/styles';
import { doc, setDoc } from 'firebase/firestore';
import { SignInValidate, SignUpValidate } from './Validate';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const TextFieldStyled = styled(TextField)({
  '& .MuiFilledInput-root': {
    backgroundColor: 'white',
    borderRadius: 4,
    '&:hover': {
      backgroundColor: '#f9f9f9',
    },
    '&.Mui-focused': {
      backgroundColor: 'white',
    },
    '&:before': {
      borderBottom: '1px solid #ff6f61',
    },
    '&:after': {
      borderBottom: '2px solid #ff6f61',
    },
  },
  '& .MuiInputLabel-root': {
    color: 'black',
  },
  '& .MuiInputLabel-root.Mui-focused': {
    color: '#ff6f61',
  },
});


const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [conifPsswrd, setConifPsswrd] = useState('');
  const [isLogin, setIsLogin] = useState(true);
  const [user, setUser] = useState(null);


  const handleSignUp = async (e) => {
    e.preventDefault();

    const validateError = SignUpValidate(firstName, lastName, email, password, conifPsswrd);

    if (validateError) {
      toast.error(validateError);
      return;
    }

    try {
      await toast.promise (

      createUserWithEmailAndPassword(firebaseAuth, email, password).then( async (userCredential)=>{
        const user = userCredential.user;
        setUser(user);
  
        const userDoc = doc(firebaseFirestore, `users/${user.uid}`);
        const userInfo = {
          firstName: firstName,
          lastName: lastName,
          email: email,
          userId: user.uid,
        };
  
        await setDoc(userDoc, userInfo);
      }),
      {
        pending: 'Signing up...',
        success: 'Successfully signed up! 🎉',
      }
      );

    } catch (error) {
      toast.error('auth/email-already-in-use' ? 'Email already registered' : 'Unable to sign up. Please try again.');
         }
    
    };    
  
    const handleSignIn = async (e) => {
      e.preventDefault();
          const validateError = SignInValidate(email, password);
      if (validateError) {
        toast.error(validateError);
        return;
      }
      try {

      await toast.promise(
        signInWithEmailAndPassword(firebaseAuth, email, password).then((userCredential)=>{
          const user = userCredential.user;
          setUser(user);
        }),
        {
          pending: 'Signing in...',
          success:'Successfully signed in! 🎉',
         
        }
        );
       
        } catch (error) {
          toast.error('auth/invalid-credential' ? 'Email or password is incorrect' : 'Unable to sign up. Please try again.');
             }
        
        }
 
  const toggleAuthMode = () => {
    setIsLogin(!isLogin);
    setEmail('');
    setPassword('');
  };
  return (
    <div className="h-screen relative" style={{ backgroundImage: "url('/Images/galery3.png')" }}>
       <div className='w-full bg-black bg-opacity-80 h-screen p-4 flex justify-center items-center'>
         <div className='flex flex-col items-center gap-0'>
        <img src="Images/logow.png" alt="" className=' max-w-80 ' />
        <Box
          id='sign'
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 2,
            borderRadius: '8px',
            marginTop: '-19px'
          }}
        >
          <Typography variant="h5" gutterBottom sx={{ color: 'white' }}>
            {isLogin ? <span>Welcome back : ) </span> : <span className=''>Register</span>}
          </Typography>
          <form className='w-full flex flex-col gap-0  space-y-4 p-2 '>
            {!isLogin && (
              <div className='flex items-center gap-2'>
                <TextFieldStyled

                  variant='filled'
                  label="Firstname"
                  margin='normal'
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
                <TextFieldStyled
                  variant='filled'
                  label="LastName"
                  margin='normal'
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </div>
            )}
            <TextFieldStyled
              variant='filled'
              label="Email"
              margin='normal'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextFieldStyled

              variant='filled'
              label='Password'
              type='password'
              margin='normal'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {!isLogin && (
              <TextFieldStyled
                variant='filled'
                label='Confirm Password'
                type='password'
                margin='normal'
                fullWidth
                value={conifPsswrd}
                onChange={(e) => setConifPsswrd(e.target.value)}
              />
            )}     
            {isLogin ? (
              <Link
                component="button"
                underline="hover"
                variant="body2"
                onClick={toggleAuthMode}
                sx={{ color: '#ff6f61', fontSize: 16 }}
                className='self-start text-xl'
              >
                <span className='text-white'>Don't have an account ? </span>   Sign up
              </Link>
            ) : (
              <div className='flex items-center gap-2 text-white'>
                <span>Already have an account? </span>
                <Link
                  component="button"
                  underline="hover"
                  variant="body2"
                  onClick={toggleAuthMode}
                  sx={{ color: '#ff6f61' }}
                >
                  Sign In
                </Link>
              </div>


            )}
            <Button type="submit" variant="contained" fullWidth onClick={(e) => (isLogin ? handleSignIn(e) : handleSignUp(e))}
              sx={{ backgroundColor: '#ff6f61', color: 'white', '&:hover': { backgroundColor: '#ff524d' } }}>
              {isLogin ? 'Sign In' : 'Sign Up'}
            </Button>
          </form>
        </Box>
      </div>
    </div>
    </div>
  );
};

export default LoginForm;
