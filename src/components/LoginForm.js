import { useState } from 'react';
import { Button, TextField, Box, Container, Typography, Link, Snackbar } from '@mui/material';
import { signInWithEmailAndPassword } from "firebase/auth";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { firebaseAuth, firebaseFirestore } from '../firebase/Config';
import { motion } from 'framer-motion';
import { styled } from '@mui/material/styles';
import { addDoc, doc, setDoc } from 'firebase/firestore';
import { SignInValidate, SignUpValidate } from './Validate';

const TextFieldStyled = styled(TextField)( {
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
});

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [conifPsswrd, setConifPsswrd] = useState('');
  const [isLogin, setIsLogin] = useState(true);
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  const handleSignUp = async (e) => {
    e.preventDefault();
    setError(null);

    const validateError = SignUpValidate(firstName, lastName, email, password, conifPsswrd);

    if (validateError) {
      setError(validateError);
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(firebaseAuth, email, password);
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
    } catch (error) {
      if (error.code === 'auth/email-already-in-use') {
        setError('Email already registered');
      } else {
        setError('Unable to sign up. Please try again.');
      }
    }
  };

  const handleSignIn = async (e) => {
    e.preventDefault();
    setError(null);
    const validateError = SignInValidate(email, password, setError);
    if (validateError) {
      setError(validateError);
      return;
    }

    try {
      const userCredential = await signInWithEmailAndPassword(firebaseAuth, email, password);
      const user = userCredential.user;
      setUser(user);
    } catch {
      setError('Email or password is incorrect');
    }
  };

  return (
    <div>
      <div className='flex justify-between items-center px-4 mt-2'>
        <a href="" className='ml-2 inline-block'>
          <Link path=''><img src='Images/logo6.png' className='-m-16 -ml-14'></img></Link>
        </a>
        <a href="#sign" className='md:hidden text-xl text-[#ff6f61] font-extrabold'>Sign In</a>
      </div>
      <div className='flex flex-col md:flex-row items-center px-10 md:px-6 lg:px-10'>
        <motion.div className='relative'
          initial={{ left: '-1000px' }}
          animate={{ left: '0' }}
          transition={{ duration: 0.5 }}>
          <p className='text-3xl mx-auto italic text-[#ff6f61] p-2 text-center md:mt-0 mt-8'>Turn Moments into Memories. Sign Up to Start.</p>
          <img src="Images/gallery2.jpg" alt="" />
        </motion.div>
        <Container maxWidth='sm' className='mt-16 shadow-2xl border-2 border-[#f59c94]' id='sign'>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              marginTop: 8,
              padding: 2,
              borderRadius: '8px',
              backgroundColor: 'white'
            }}
          >
            <Typography variant="h5" gutterBottom sx={{ color: '#ff6f61' }}>
              {isLogin ? <span>Sign In</span> : <span>Create new account</span>}
            </Typography>
            <form className='w-full space-y-8 p-2 '>
              {!isLogin && (
                <div className='flex items-center gap-2'>
                  <TextFieldStyled
                    required
                    id="outlined-required"
                    label="Firstname"
                    margin='normal'
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                  <TextFieldStyled
                    required
                    id="outlined-required"
                    label="LastName"
                    margin='normal'
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </div>
              )}
              <TextFieldStyled
                required
                id="outlined-required"
                label="Email"
                margin='normal'
                fullWidth
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <TextFieldStyled
                required
                variant='outlined'
                label='Password'
                type='password'
                margin='normal'
                fullWidth
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {!isLogin && (
                <TextFieldStyled
                  required
                  variant='outlined'
                  label='Confirm Password'
                  type='password'
                  margin='normal'
                  fullWidth
                  value={conifPsswrd}
                  onChange={(e) => setConifPsswrd(e.target.value)}
                />
              )}
             
              {error && <p className='text-blue-900 self-end italic'>{error}</p> }
              {isLogin ? (
                <Link
                  component="button"
                  underline="hover"
                  variant="body2"
                  onClick={() => {
                    setIsLogin(false);
                    setEmail('');
                    setPassword('');
                    setError(null);
                  }}
                  sx={{ color: '#ff6f61', fontSize: 18 }}
                  className='self-start text-xl'
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
                      setPassword('');
                      setError(null);
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
                onClick={(e) => (isLogin ? handleSignIn(e) : handleSignUp(e))}
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
      </div>
    </div>
  );
};

export default LoginForm;
