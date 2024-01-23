import {useState,useEffect} from 'react';
const useFetch= (url) =>{
    const [isPending,setIsPending] = useState(true);
    const [error,setError] = useState(null);
    const [data, setData] = useState(null);
    useEffect(()=>{
        fetch(url).then((res)=>{
            if(!res.ok)
            {
                throw Error('Could not fetch the data');
            }
            return res.json();
        }).then((data)=>{
            setData(data);
            setError(null);
            setIsPending(false);
        }).catch((err)=>{
            setIsPending(false);
            setError(err.message);
        })
         
    },[url])
    return {data,isPending,error};
}
export default useFetch;