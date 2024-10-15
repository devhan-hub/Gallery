import { useEffect } from 'react'
import useStorage from '../hooks/useStorage'
import { motion } from 'framer-motion'

const Progress = ({file , setFile , fileType}) => {
  const {Progress , url} = useStorage(file  , fileType)

  return (
    <motion.div 
    initial={{width:0}}
    animate={{width:Progress +'%'}}
    className='h-5 mt-6 bg-[#efb6b2]'>
      
    </motion.div>
  )
}

export default Progress
