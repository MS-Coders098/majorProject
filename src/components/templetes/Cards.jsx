import React from 'react'
import noimage from '/noimage.jpeg'
import { Link } from 'react-router-dom'

const Cards = ({ data, title }) => {
  return (
    <div className='flex flex-wrap w-full px-[5%] bg-[#1F1E24]'>

      {data.map((card, index) => (

        <Link to={`/${card.media_type || title}/details/${card.id}`} className='relative w-[25vh] mr-[5%] mb-[5%]' key={index}>

          <img className='h-[40vh] object-cover object-center shadow-[8px_17px_38px_2px_rgba(0,0,0,.5)]' src={ card.backdrop_path ||
            card.poster_path || card.profile_path ? `https://image.tmdb.org/t/p/original/${card.backdrop_path ||
            card.poster_path || card.profile_path})` : noimage } alt="" />

          <h1 className='text-lg mt-3 font-semibold text-zinc-400'>
            {card.name || card.title || card.original_name || card.title}

          </h1>
          {card.vote_average ? (<div className="text-white absolute right-[-10%] bottom-[25%] flex justify-center items-center bg-yellow-600 rounded-full w-[6vh] h-[6vh]">{(card.vote_average * 10).toFixed()}<sup>%</sup></div>) : ""}


        </Link>
      ))}
    </div>
  )
}

export default Cards