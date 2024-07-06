import React from 'react'
import ReactPlayer from 'react-player'
import { useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'
import Notfound from '../Notfound'

const Trailer = () => {
    const Navigate = useNavigate()
    const { pathname } = useLocation()
    const category = pathname.includes("movie") ? "movie" : "tv"
    const ytvideo = useSelector(state => state[category].info.video)

    return (
        <div className='absolute top-0 left-0 bg-[rgba(0,0,0,.9)] w-screen h-screen flex items-center justify-center'>4

            <i onClick={() => Navigate(-1)} className="absolute text-3xl right-[5%] top-[5%] font-semibold text-zinc-400 ri-close-fill ml-2 cursor-pointer"></i>

            {ytvideo ? <ReactPlayer width={1300} height={650} controls url={`https://www.youtube.com/watch?v=${ytvideo.key}`} /> : <Notfound />}

        </div>
    )
}

export default Trailer