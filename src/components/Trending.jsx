import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Topnav from './templetes/Topnav'
import Dropdown from './templetes/Dropdown'
import axios from '../utils/axios'
import Cards from './templetes/Cards'
import Loading from './Loading'
import InfiniteScroll from 'react-infinite-scroll-component';


const Trending = () => {
    const navigate = useNavigate()
    const [category, setcategory] = useState("all");
    const [duration, setduration] = useState("day");
    const [trending, settrending] = useState([]);
    const [page, setpage] = useState(1);
    const [hasMore, sethasMore] = useState(true)

    document.title = `SCSDB | Trending ${category.charAt(0).toUpperCase() + category.slice(1).toLowerCase()} Shows`

    const GetTrending = async () => {
        try {
            const { data } = await axios.get(`/trending/${category}/${duration}?page=${page}`);
            if (data.results.length > 0) {
                setpage(page + 1)
                settrending(prevVal => [...prevVal, ...data.results]);
            } else{
                sethasMore(false)
            }
        } catch (error) {
            console.log(error)
        }
    }

    const refreshHandler = () => {
        if (trending.length === 0) {
            GetTrending()
        } else {
            setpage(1);
            settrending([]);
            GetTrending()
        }
    }

    useEffect(() => {
        refreshHandler()
    }, [category, duration])

    return trending.length > 0 ? (
        <div className='w-screen h-screen '>

            <div className='px-[5%] w-full flex items-center justify-between'>

                <h1 className='text-2xl font-semibold text-zinc-400'>
                    <i onClick={() => navigate("/")} className="text-2xl font-semibold text-zinc-400 ri-arrow-left-line ml-2 cursor-pointer"></i>
                    Trending {category.charAt(0).toUpperCase() + category.slice(1).toLowerCase()} of {duration.charAt(0).toUpperCase() + duration.slice(1).toLowerCase()}
                </h1>

                <div className='flex items-center w-[81%]'>
                    <Topnav />
                    <Dropdown title="Category" options={['movie', 'all', 'tv']} func={(e) => setcategory(e.target.value)} />
                    <div className="w-[2%]"></div>
                    <Dropdown title="Duration" options={['week', 'day']} func={(e) => setduration(e.target.value)} />
                </div>

            </div>

            <InfiniteScroll
                dataLength={trending.length}
                hasMore={hasMore}
                next={GetTrending}
                loader={<h4>Loading...</h4>}
            >
                <Cards data={trending} title={category} />
            </InfiniteScroll>


        </div>
    ) : (
        <Loading />
    );
};

export default Trending;