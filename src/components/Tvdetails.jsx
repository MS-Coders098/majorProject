import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { asyncLoadtv, removetv } from '../store/actions/tvActions'
import { Link, Outlet, useLocation, useNavigate, useParams } from 'react-router-dom'
import HorizontalCards from './templetes/HorizontalCards'
import Loading from './Loading'
import noimage from '/noimage.jpeg'

const Tvdetails = () => {
  const { pathname } = useLocation()
  const Navigate = useNavigate()
  const info = useSelector(state => state.tv.info)
  const dispatch = useDispatch()
  const { id } = useParams()

  useEffect(() => {
    dispatch(asyncLoadtv(id));

    return () => {
      dispatch(removetv())
    }

  }, [id])
  console.log(info);

  return info ? (
    <div style={{
      background: `linear-gradient(rgba(0, 0, 0, .4), rgba(0, 0, 0, .7), rgba(0, 0, 0, .9)), url(https://image.tmdb.org/t/p/original/${info.details.backdrop_path
        })`,
      backgroundPosition: "center top",
      backgroundSize: "cover",
      backgroundRepeat: "no-repeat"
    }} className='relative w-screen h-[200vh] px-[4%]'>

      <nav className='w-full text-zinc-300 flex gap-10 text-2xl font-bold items-center h-[8vh]'>
        <i onClick={() => Navigate(-1)} className="text-2xl font-semibold text-zinc-400 ri-arrow-left-line ml-2 cursor-pointer"></i>

        <a target='_blank' href={info.details.homepage}>
          <i className="ri-external-link-fill"></i>
        </a>

        <a target='_blank' href={`https://www.wikidata.org/wiki/${info.externalId.wikidata_id}`}>
          <i className="ri-earth-line"></i>
        </a>

        <a target='_blank' href={`https://www.imdb.com/title/${info.externalId.imdb_id}`}>imdb</a>
      </nav>

      <div className="flex w-full">

        <img className='h-[30vh] w-[30vh] object-cover object-center shadow-[8px_17px_38px_2px_rgba(0,0,0,.5)]' src={`https://image.tmdb.org/t/p/original/${info.details.backdrop_path ||
          info.details.poster_path})`} alt="" />

        <div id="content" className='ml-[5%] text-white'>
          <h1 className='text-4xl  font-black'>
            {info.details.name || info.details.title || info.details.original_name || info.details.title}

            <small className='text-xl font-bold text-zinc-300'> ({info.details.first_air_date.split("-")[0]})</small>
          </h1>

          <div className='mt-3 mb-3 flex items-center gap-x-5'>
            {info.details.vote_average ? (<span className="text-white flex justify-center items-center bg-yellow-600 rounded-full w-[5vh] h-[5vh]">{(info.details.vote_average * 10).toFixed()}<sup>%</sup></span>) : ""}
            <h1 className='font-semibold text-2xl w-[60px] leading-6'>User Score</h1>
            <h1>{info.details.first_air_date}</h1>
            <h1>{info.details.genres.map(genra => genra.name).join(",")}</h1>
            <h1>{info.details.episode_run_time
            }min</h1>
          </div>

          <h1 className='text-xl font-semibold italic text-zinc-200'>{info.details.tagline}</h1>

          <h1 className='text-2xl mt-3 mb-3'>Overview</h1>
          <p>{info.details.overview}</p>

          <h1 className='text-2xl mt-5 mb-3'>tv Translated </h1>
          <p className='mb-6'>{info.translations.join(", ")}</p>

          <Link className='p-5 rounded-lg bg-[#6556CD]' to={`${pathname}/trailer`}>
            <i className="ri-play-large-fill mr-2"></i>
            Play Trailer</Link>

        </div>

      </div>

      <div className='w-[50%]  flex flex-col mt-10 gap-y-5  '>

        {info.watchProvider && info.watchProvider.flatrate && <div className='flex gap-x-10 items-center text-white'>
          <h1 className='w-1/4'>Available On Platform</h1>
          {info.watchProvider.flatrate.map((watch, index) => (<img title={watch.provider_name} key={index} className='w-[6vh]
            h-[6vh] object-cover flex 
            rounded-md ' src={`https://image.tmdb.org/t/p/original/${watch.logo_path})`} alt="" />))}
        </div>}

        {info.watchProvider && info.watchProvider.rent && <div className='flex gap-x-10 items-center text-white'>
          <h1 className='w-1/4'>Available On Rent</h1>
          {info.watchProvider.rent.map((watch, index) => (<img title={watch.provider_name} key={index} className='w-[6vh]
            h-[6vh] object-cover flex 
            rounded-md ' src={`https://image.tmdb.org/t/p/original/${watch.logo_path})`} alt="" />))}
        </div>}

        {info.watchProvider && info.watchProvider.buy && <div className='flex gap-x-10 items-center text-white'>
          <h1 className='w-1/4'>Available to Buy</h1>
          {info.watchProvider.buy.map((watch, index) => (<img title={watch.provider_name} key={index} className='w-[6vh]
            h-[6vh] object-cover flex 
            rounded-md ' src={`https://image.tmdb.org/t/p/original/${watch.logo_path})`} alt="" />))}
        </div>}

      </div>

      <hr className='mt-7 border-none bg-zinc-500 h-[1px]' />
      <h1 className='text-3xl mt-2 text-white font-semibold'>Season</h1>
      <div className='w-full flex mt-2 overflow-y-hidden gap-x-10 mb-3 p-4'>
        {info.details.seasons.map((season, index) => (
          <div key={index} >
            <img className=' h-[40vh] object-cover w-[15vw] shadow-[8px_17px_38px_2px_rgba(0,0,0,.5)]' src={`https://image.tmdb.org/t/p/original/${season.poster_path})`} alt="" />

            <h1 className='text-lg mt-3 font-semibold text-zinc-400'>
              {season.name}</h1>
          </div>
        ))}

      </div>

      <hr className='mt-7 border-none bg-zinc-500 h-[1px]' />
      <h1 className='text-3xl mt-2 text-white font-semibold'>Recommendations and Similar</h1>
      <HorizontalCards data={info.recommendation ? info.recommendation : info.similar} />

      <Outlet />
    </div>
  ) : <Loading />
}

export default Tvdetails