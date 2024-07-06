import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from '../../utils/axios'
import noimage from '/noimage.jpeg'

const Topnav = () => {
    const [query, setquery] = useState('')
    const [searches, setsearches] = useState([])

    const GetSearches = async () => {
        try {
            const { data } = await axios.get(`/search/multi?query=${query}`)
            setsearches(data.results)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        GetSearches()
    }, [query])

    return (
        <div className='w-[80%] h-[10vh] relative flex justify-start ml-auto items-center rounded '>
            <i className="ri-search-eye-fill text-zinc-400 text-3xl cursor-pointer"></i>
            <input onChange={(e) => setquery(e.target.value)} value={query} type="text" placeholder='Search Anything' className='w-[50%] text-zinc-200 p-3 m-10 outline-none border-none bg-transparent' />
            {query.length > 0 ? (<i onClick={() => setquery("")} className="ri-close-line text-zinc-400 text-3xl cursor-pointer"></i>) : ""}


            <div className='w-[50%] max-h-[50vh] z-50 absolute bg-zinc-200 top-full left-[7%] overflow-auto'>
                {searches.map((search, index) => <Link to={`/${search.media_type}/details/${search.id}`} key={index} className='text-zinc-600 hover:text-black hover:bg-zinc-300 font-semibold p-10 flex justify-start border-b-2 items-center w-full border-zinc-100'>

                    <img className='w-[10vh] h-[10vh] object-cover rounded mr-5' src={search.backdrop_path || search.profile_path ? `https://image.tmdb.org/t/p/original/${search.backdrop_path || search.profile_path}` : noimage} alt="" />

                    <span>{search.name || search.title || search.original_name || search.title}</span>
                </Link>)}
                


            </div>
        </div>
    )
}

export default Topnav
