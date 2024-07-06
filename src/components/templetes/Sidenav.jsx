import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'

const Sidenav = () => {



    return (
        <div className='w-[20%] h-full  border-r-2 border-zinc-400 p-6'>
            <h1 className='text-2xl text-white font-bold'>
                <i className="text-[#6556CD] ri-tv-fill mr-3"></i>
                <span className=''>SCSDB</span>
            </h1>
            <nav className='flex flex-col text-zinc-400 text-sm gap-3'>
                <h1 className='text-white font-semibold text-xl mt-8 mb-4'>New Feeds</h1>
                <Link to='/trending' className='hover:bg-[#6556CD] hover:text-white duration-300 p-5 rounded-lg'><i className="mr-2 ri-fire-fill"></i>Trending</Link>
                <Link to='/popular' className='hover:bg-[#6556CD] hover:text-white duration-300 p-5 rounded-lg'><i className="mr-2 ri-bard-fill"></i>Popular</Link>
                <Link to="/movie" className='hover:bg-[#6556CD] hover:text-white duration-300 p-5 rounded-lg'><i className="ri-movie-2-fill mr-2"></i>Movies</Link>
                <Link to='/tvshows' className='hover:bg-[#6556CD] hover:text-white duration-300 p-5 rounded-lg'><i className="ri-tv-2-fill mr-2"></i>Tv Shows</Link>
                <Link to="/person" className='hover:bg-[#6556CD] hover:text-white duration-300 p-5 rounded-lg'><i className="ri-team-fill mr-2"></i>People</Link>
            </nav>
            <hr className='h-[1px] border-none bg-zinc-400' />
            <nav className='flex flex-col text-zinc-400 text-sm gap-3'>
                <h1 className='text-white font-semibold text-xl mt-8 mb-4'>Website Information</h1>
                <Link className='hover:bg-[#6556CD] hover:text-white duration-300 p-5 rounded-lg'><i className="mr-2 ri-information-fill"></i>About Us</Link>
                <Link className='hover:bg-[#6556CD] hover:text-white duration-300 p-5 rounded-lg'><i className="mr-2 ri-phone-fill"></i>Contact Us</Link>
            </nav>
        </div>
    )
}

export default Sidenav
