import { useState } from 'react';
import { Button, TextField, Box, Container, Typography, Link } from '@mui/material';
import { signInWithEmailAndPassword } from "firebase/auth";
import { createUserWithEmailAndPassword } from "firebase/auth";
import {firebaseAuth}  from '../firebase/Config'
const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLogin, setIsLogin] = useState(true);
  const [user , setUser]= useState(null)

const handeSignUp = (e) => {
  e.preventDefault()
  createUserWithEmailAndPassword(firebaseAuth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      console.log(user)
       setUser(user)
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.error(errorCode, errorMessage);
      console.log('man')
    });
};

const handelSignIn = (e) => {
  e.preventDefault()
  signInWithEmailAndPassword(firebaseAuth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      setUser(user)
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.error(errorCode, errorMessage);
    });
};
  return (
    <Container maxWidth='sm' className='mt-24'>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          marginTop: 8,
          padding: 3,
          border: '1px solid lightgray',
          borderRadius: '8px',
          backgroundColor: 'white'
        }}
      >
        <Typography variant="h5" gutterBottom sx={{ color: '#ff6f61' }}>
          {isLogin ? <span>Sign In</span> : <span>Sign Up</span>}
        </Typography>
        
        <form  className='w-full space-y-8 p-2'>
          <TextField
            required
            id="outlined-required"
            label="Email"
            margin='normal'
            fullWidth
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            sx={{
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: '#ff6f61',
                },
                '&:hover fieldset': {
                  borderColor: '#ff6f61',
                },
                '&.Mui-focused fieldset': {
                  borderColor: '#ff6f61',
                },
              },
              '& .MuiInputLabel-root': {
                color: '#ff6f61',
              },
              '& .MuiInputLabel-root.Mui-focused': {
                color: '#ff6f61',
              },

            }}
          />
          
          <TextField
            required
            variant='outlined'
            label='Password'
            type='password'
            margin='normal'
            fullWidth
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            sx={{
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: '#ff6f61',
                },
                '&:hover fieldset': {
                  borderColor: '#ff6f61',
                },
                '&.Mui-focused fieldset': {
                  borderColor: '#ff6f61',
                },
              },
              '& .MuiInputLabel-root': {
                color: '#ff6f61',
              },              '& .MuiInputLabel-root.Mui-focused': {
                color: '#ff6f61',
              },

            }}
          />
          
          {isLogin ? (
            <Link
              component="button"
              underline="hover"
              variant="body2"
              onClick={() => {
                setIsLogin(false);
                setEmail('');
                setPassword('')
              }}
              sx={{ color: '#ff6f61' }}
            >
              Create account
            </Link>
          ) : (
            <div className='flex items-center gap-2'>
              <span>Already have an account? </span>
              <Link
                component="button"
                underline="hover"
                variant="body2"
                onClick={() => {
                  setIsLogin(true);
                  setEmail('');
                  setPassword('')
                }}
                sx={{ color: '#ff6f61' }}
              >
                Sign In
              </Link>
            </div>
          )}
          
          <Button
            type="submit"
            variant="contained"
            fullWidth
            onClick={(e)=> isLogin?handelSignIn(e):handeSignUp(e)}
            sx={{
              backgroundColor: '#ff6f61', 
              color: 'white',
              '&:hover': {
                backgroundColor: '#ff524d', 
              },
            }}
          >
            
            {isLogin ? <span>Sign In</span> : <span>Sign Up</span>}
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default LoginForm;
