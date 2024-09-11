import { useEffect , useState } from "react";

const useFetch = (url ) => {
    const [datas , setDatas] = useState(null);
    const [isPending , setPending] = useState(true);
    const [error , setError] = useState('');

     
    
    useEffect(() => {
      
        fetch(url)
            .then((res) => 
                {
                    if(!res.ok) {
                        throw Error('fail to feach')
                    }
                   return res.json()
                }
                )
            .then((data) =>{
                setDatas(data);
                 setPending(false);
                 setError('')
                
              
                })
            .catch((err) => {
                setError(err.message);
                setPending(false)
                setDatas(null)
            })
   

} , [url])



  return (
     {datas , isPending , error}
  )
}

export default useFetch
