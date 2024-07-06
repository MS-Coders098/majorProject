import axios from '../utils/axios';
import React, { useEffect, useState } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component';
import { useNavigate } from 'react-router-dom';
import Loading from './Loading';
import Topnav from './templetes/Topnav';
import Dropdown from './templetes/Dropdown';
import Cards from './templetes/Cards';

const Tvshows = () => {
    const navigate = useNavigate()
    const [category, setcategory] = useState("airing_today");
    const [tvshows, settvshows] = useState([]);
    const [page, setpage] = useState(1);
    const [hasMore, sethasMore] = useState(true)

    document.title = `SCSDB | Tv shows`

    const GetTvshows = async () => {
        try {
            const { data } = await axios.get(`/tv/${category}?page=${page}`);
            if (data.results.length > 0) {
                setpage(page + 1)
                settvshows(prevVal => [...prevVal, ...data.results]);
            } else {
                sethasMore(false)
            }
        } catch (error) {
            console.log(error)
        }
    }

    const refreshHandler = () => {
        if (tvshows.length === 0) {
            GetTvshows()
        } else {
            setpage(1);
            settvshows([]);
            GetTvshows()
        }
    }

    useEffect(() => {
        refreshHandler()
    }, [category])

    return tvshows.length > 0 ? (
        <div className='w-screen h-screen '>
      
            <div className='px-[5%] w-full flex items-center justify-between'>
      
                <h1 className='text-2xl font-semibold text-zinc-400'>
                    <i onClick={() => navigate("/")} className="text-2xl font-semibold text-zinc-400 ri-arrow-left-line ml-2 cursor-pointer"></i>
                    Tv Shows <small className='text-sm text-zinc-600'>({category})</small>
                </h1>
      
                <div className='flex items-center w-[81%]'>
                    <Topnav />
                    <Dropdown title="Category" options={['popular', 'top_rated', 'on_the_air', 'airing_today']} func={(e) => setcategory(e.target.value)} />
                </div>
      
            </div>
      
            <InfiniteScroll
                dataLength={tvshows.length}
                hasMore={hasMore}
                next={GetTvshows}
                loader={<h4>Loading...</h4>}
            >
                <Cards data={tvshows} title="tv" />
            </InfiniteScroll>
      
      
        </div>
      ) : (
        <Loading />
      );
}

export default Tvshows