import { useEffect } from 'react'
import useStorage from '../hooks/useStorage'
import { motion,  } from 'framer-motion'
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';


const Progress = ({file  , fileType , user ,setFile ,id}) => {
  const [progress, url, error ] = useStorage(file  , fileType , user.uid , setFile , id)
  useEffect(()=> {
    if(url)
    {
        setFile(null)
    }
 }, [url,setFile]) 
  return (
    <LinearProgress variant="determinate" value={progress} />

  )
}

export default Progress
