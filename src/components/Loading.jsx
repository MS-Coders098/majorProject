import React from 'react'
import loading from '/Loading.gif'

const Loading = () => {
    return (
        <div className='w-screen h-screen flex justify-center items-center bg-black'>
            <img className='h-[60%] object-cover' src={loading} alt="Loading" />
        </div>
    )
}

export default Loading