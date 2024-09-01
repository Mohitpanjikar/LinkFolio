import React,{ useEffect,useState }  from 'react'
import { useRouter } from 'next/router'
import { toast } from 'react-toastify';
import LinkTree from '../components/Linktree'
import Link from 'next/link';
import SocialTree from '../components/socialTree';
import ShareButton from '../components/ShareButton';
const Handle = () => {
    const router = useRouter();
    const [data,setdata] = useState({});
    const [userFound,setUserFound] = useState(false);

    const [social,setSocial] = useState({
        facebook:'',
        instagram:'',
        youtube:'',
        twitter:'',
        linkedin:'',
        github:''
    })

    useEffect(() => {
        if(router.query?.handle){
             fetch(`https://localhost:8080 /get/${router.query.handle}`)
             .then (res=>res.json())
             .then(data=>{
                if(data.status === 'error') return toast.error(data.error);
                if(data.status === 'success'){
                    setdata(data.userData);
                    setUserFound(true);
                }
             }).catch(err=>{
                console.log(err); 
             })
        }
    },[router.query])

    useEffect(()=>{
        if(router.query?.handle){
            fetch(`https://localhost:8080 /get/socials/${router.query.handle}`)
            .then (res=>res.json())
            .then(data=>{
               if(data.status === 'error') return toast.error(data.error);
               if(data.status === 'success'){
                    setSocial(data.socials); 
               }
            }).catch(err=>{
               console.log(err); 
            })
       }
    },[router.query])
    
    if(!userFound){
        return(
            <div className = 'flex justify-center items-center h-screen '>
               <div className = "not-found px-3">
                    <h1 className = 'font-bold text-lg'>User Not Found 😭</h1>
                    <p>If you are looking for a page double check the spelling <Link className="bg-indigo-600 px-2 ml-2 text-white hover:bg-indigo-400 transition-all duration-500" href="/apply" > LinkFolio ⛓️‍💥 </Link> </p>
               </div>
            </div>
        )
    }
    return(
        <div>
            <ShareButton/>
            <Linktree data={data}/>
            <SocialTree social ={social}/>
        </div>
    )
}



export default Handle