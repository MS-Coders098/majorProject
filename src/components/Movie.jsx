import axios from '../utils/axios';
import React, { useEffect, useState } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component';
import { useNavigate } from 'react-router-dom';
import Loading from './Loading';
import Topnav from './templetes/Topnav';
import Dropdown from './templetes/Dropdown';
import Cards from './templetes/Cards';


const Movie = () => {
    const navigate = useNavigate()
    const [category, setcategory] = useState("now_playing");
    const [movie, setmovie] = useState([]);
    const [page, setpage] = useState(1);
    const [hasMore, sethasMore] = useState(true)

    document.title = `SCSDB | Movie`

    const GetMovie = async () => {
        try {
            const { data } = await axios.get(`/movie/${category}?page=${page}`);
            if (data.results.length > 0) {
                setpage(page + 1)
                setmovie(prevVal => [...prevVal, ...data.results]);
            } else {
                sethasMore(false)
            }
        } catch (error) {
            console.log(error)
        }
    }

    const refreshHandler = () => {
        if (movie.length === 0) {
            GetMovie()
        } else {
            setpage(1);
            setmovie([]);
            GetMovie()
        }
    }

    useEffect(() => {
        refreshHandler()
    }, [category])


    return movie.length > 0 ? (
        <div className='w-screen h-screen '>
      
            <div className='px-[5%] w-full flex items-center justify-between'>
      
                <h1 className='text-2xl font-semibold text-zinc-400'>
                    <i onClick={() => navigate("/")} className="text-2xl font-semibold text-zinc-400 ri-arrow-left-line ml-2 cursor-pointer"></i>
                    Movie <small className='text-sm text-zinc-600'>({category})</small>
                </h1>
      
                <div className='flex items-center w-[81%]'>
                    <Topnav />
                    <Dropdown title="Category" options={['popular', 'top_rated', 'upcoming', 'now_playing']} func={(e) => setcategory(e.target.value)} />
                </div>
      
            </div>
      
            <InfiniteScroll
                dataLength={movie.length}
                hasMore={hasMore}
                next={GetMovie}
                loader={<h4>Loading...</h4>}
            >
                <Cards data={movie} title="movie" />
            </InfiniteScroll>
      
      
        </div>
      ) : (
        <Loading />
      );
}

export default Movie