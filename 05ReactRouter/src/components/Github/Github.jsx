import React, { useEffect, useState } from 'react'
import { useLoaderData } from 'react-router-dom'

function Github() {

    const data = useLoaderData()

    // const [data, setData] = useState([])
    // useEffect(() => {
    //     fetch(`https://api.github.com/users/bahadur123470`)
    //     .then(res => res.json())
    //     .then(data => {
    //         console.log(data);
    //         setData(data)
    //     })
    // }, [])
    

    return (
        <div 
        className='bg-gray-600 text-white m-4 p-4 text-3xl text-center'>
            Github following: {data.following}
            <img className='rounded-full ' 
            src={data.avatar_url}
            alt='Github Profile'
            width={300}
            height={300}
            />
        </div>
    )
}

export default Github

export const preLoader = async () => {
    const response = await fetch(`https://api.github.com/users/bahadur123470`)
    return response.json()
}