import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { asyncLoadperson, removeperson } from '../store/actions/personAction'
import { Link, Outlet, useLocation, useNavigate, useParams } from 'react-router-dom'
import HorizontalCards from './templetes/HorizontalCards'
import Loading from './Loading'
import Dropdown from './templetes/Dropdown'

const Persondetails = () => {
  const { pathname } = useLocation()
  const Navigate = useNavigate()
  const info = useSelector(state => state.person.info)
  const dispatch = useDispatch()
  const { id } = useParams()
  const [category, setcategory] = useState('movie')

  useEffect(() => {
    dispatch(asyncLoadperson(id));

    return () => {
      dispatch(removeperson())
    }

  }, [id])

  return info ? (

    <div className='px-[10%] w-screen bg-[#1F1E24] h-[170vh]'>

      {/* Navigation */}
      <nav className='w-full text-zinc-300 flex gap-10 text-2xl font-bold items-center h-[10vh]'>
        <i onClick={() => Navigate(-1)} className="text-2xl font-semibold text-zinc-400 ri-arrow-left-line ml-2 cursor-pointer"></i>

      </nav>

      {/* Image */}
      <div className='w-full flex'>

        <div className="w-[20%]">

          <img className='h-[38vh] w-[35vh] object-cover object-center shadow-[8px_17px_38px_2px_rgba(0,0,0,.5)]' src={`https://image.tmdb.org/t/p/original/${info.details.profile_path})`} alt="" />
          <hr className='mt-7 border-none bg-zinc-500 h-[1px]' />
          {/* link */}
          <div className='text-xl text-white flex gap-x-10'>

            <a target='_blank' href={`https://www.wikidata.org/wiki/${info.externalId.wikidata_id}`}>
              <i className="ri-earth-line"></i>
            </a>

            <a target='_blank' href={`https://www.facebook.com/${info.externalId.facebook_id}`}>
              <i className="ri-facebook-box-fill"></i>
            </a>

            <a target='_blank' href={`https://www.instagram.com/${info.externalId.instagram_id}`}>
              <i className="ri-instagram-fill"></i>
            </a>

            <a target='_blank' href={`https://www.twitter.com/${info.externalId.twitter_id}`}>
              <i className="ri-twitter-fill"></i>
            </a>

          </div>

          <h1 className='text-2xl text-zinc-400 font-semibold my-5'>Personal Info</h1>
          <h1 className='text-lg text-zinc-400 font-semibold'>Known For</h1>
          <h1 className=' text-zinc-400 '>{info.details.known_for_department}</h1>

          <h1 className='text-lg text-zinc-400 font-semibold mt-3'>Gender</h1>
          <h1 className=' text-zinc-400 '>{info.details.gender === 2 ? "Male" : "Female"}</h1>

          <h1 className='text-lg text-zinc-400 font-semibold mt-3'>Birthday</h1>
          <h1 className=' text-zinc-400 '>{info.details.birthday}</h1>

          <h1 className='text-lg text-zinc-400 font-semibold mt-3'>Death Day</h1>
          <h1 className=' text-zinc-400 '>{info.details.deathday ? info.details.deathday : "Still Alive"}</h1>

          <h1 className='text-lg text-zinc-400 font-semibold mt-3'>Place of Birth</h1>
          <h1 className=' text-zinc-400 '>{info.details.place_of_birth}</h1>

          <h1 className='text-lg text-zinc-400 font-semibold mt-3'>Also known as</h1>
          <h1 className=' text-zinc-400 '>{info.details.also_known_as.join(", ")}</h1>

        </div>

        <div className='w-[80%] ml-[5%]'>

          <h1 className='text-5xl text-zinc-400 font-black my-5'>{info.details.name}</h1>
          <h1 className='text-xl text-zinc-400 font-semibold'>Biography</h1>
          <p className='text-zinc-400 mt-3'>{info.details.biography}</p>
          <h1 className='text-lg text-zinc-400 font-semibold mt-5'>Summary</h1>
          <HorizontalCards data={info.combinedCredits.cast} />

          <div className='w-full flex justify-between'>
            <h1 className='text-xl text-zinc-400 font-semibold mt-5'>Acting Career</h1>
            <Dropdown title={category} options={["tv", "movie"]} func={(e) => setcategory(e.target.value)} />
          </div>

          <div className=' h-[50vh] border-2 border-zinc-700 list-disc text-zinc-400 overflow-x-hidden overflow-y-auto shadow-xl shadow-white mt-5'>

            {info[category + "Credits"].cast.map((myCast, index) => (
              <li key={index} className='hover:text-white hover:bg-zinc-800 duration-300 cursor-pointer  mb-3'>
                <Link to={`/${category}/details/${id}`} className='' >
                  <span>{myCast.name || myCast.title || myCast.original_name || myCast.title}</span>
                  <span className='block ml-5'>{myCast.character && `Character Name: ${myCast.character}`}</span>
                </Link>
              </li>
            ))}



          </div>

        </div>

      </div>

      {/* Information */}


    </div>

  ) : <Loading />
}

export default Persondetails


