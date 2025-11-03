import React, { useEffect, useState } from 'react'

function Datafetching() {
    const [images,setimages] = useState([])
    const [isonline,setisonline] = useState(navigator.onLine)

    useEffect(()=>{
        const handelOnline =()=> setisonline(true)
        const handelOOfline =()=> setisonline(false)

        window.addEventListener("online",handelOnline)
        window.addEventListener("offline",handelOOfline)

        return()=>{
            window.removeEventListener("online",handelOnline)
            window.removeEventListener("ofline",handelOOfline)
        }
    },[])

    useEffect(()=>{
        fetch("https://picsum.photos/v2/list?page=1&limit=600")
        .then((res)=>{
            if(!res.ok){
                return(
                    <div>
                        <h2 style={{color:"red"}}>Error Please Check the InterNet Connection...</h2>
                    </div>
                )
            }
            return res.json()
            
        })
        .then((result=>setimages(result)))
        .catch((e)=>{
            console.log("error api is not working",e)
        })
    },[])
    if(!isonline){
        return(
            <h2 style={{color:"red"}}>Please Check the Net connection</h2>
        )
    }


    if(images.length === 0){
        return(
            <h2>Loding.....</h2>
        )
    }

  return (
    <>
    {images.map((item)=>(
        <img
        style={{ width: "250px", height:"250px", margin: "10px",backgroundColor:"white",border:"3px solid gray" }}
         key={item.id}
          src={item.download_url} 
          alt="images" />
    ))}
    </>
  )
}

export default Datafetching;