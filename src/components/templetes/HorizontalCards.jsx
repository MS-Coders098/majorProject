import React from 'react'
import { Link } from 'react-router-dom'
import noimage from '/noimage.jpeg'

const HorizontalCards = ({ data }) => {
    return (


        <div className="w-full flex mt-2 overflow-y-hidden mb-3 p-4">
            {data.length > 0 ? data.map((card_data, index) => <Link to={`/${card_data.media_type}/details/${card_data.id}`} key={index} className='min-w-[15%] h-[38vh] bg-zinc-900 mr-3 mb-5'>
                <img className='w-full  object-cover' src={ card_data.backdrop_path ||
                    card_data.profile_path? `https://image.tmdb.org/t/p/original/${card_data.backdrop_path ||
                    card_data.profile_path}` : noimage } alt="" />
                <div className='text-white p-3 h-[45%] overflow-y-auto'>
                    <h1 className="font-bold text-lg">
                        {card_data.name || card_data.title || card_data.original_name || card_data.title}
                    </h1>
                    <p className="text-zinc-100">
                        {card_data.overview.slice(0, 50)} ...
                        <span className="text-zinc-400">more</span>
                    </p>
                </div>
            </Link>): <h1 className='text-3xl font-black text-white text-center'>Nothing To Display</h1> }
        </div>

    )
}

export default HorizontalCards