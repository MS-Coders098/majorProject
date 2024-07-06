import axios from '../utils/axios';
import React, { useEffect, useState } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component';
import { useNavigate } from 'react-router-dom';
import Loading from './Loading';
import Topnav from './templetes/Topnav';
import Dropdown from './templetes/Dropdown';
import Cards from './templetes/Cards';

const person = () => {
    const navigate = useNavigate()
    const [category, setcategory] = useState("popular");
    const [person, setperson] = useState([]);
    const [page, setpage] = useState(1);
    const [hasMore, sethasMore] = useState(true)

    document.title = `SCSDB | Tv shows`

    const GetPerson = async () => {
        try {
            const { data } = await axios.get(`/person/${category}?page=${page}`);
            if (data.results.length > 0) {
                setpage(page + 1)
                setperson(prevVal => [...prevVal, ...data.results]);
            } else {
                sethasMore(false)
            }
        } catch (error) {
            console.log(error)
        }
    }

    const refreshHandler = () => {
        if (person.length === 0) {
            GetPerson()
        } else {
            setpage(1);
            setperson([]);
            GetPerson()
        }
    }

    useEffect(() => {
        refreshHandler()
    }, [category])

    return person.length > 0 ? (
        <div className='w-screen h-screen '>
      
            <div className='px-[5%] w-full flex items-center justify-between'>
      
                <h1 className='text-2xl font-semibold text-zinc-400'>
                    <i onClick={() => navigate("/")} className="text-2xl font-semibold text-zinc-400 ri-arrow-left-line ml-2 cursor-pointer"></i>
                    People <small className='text-sm text-zinc-600'>({category})</small>
                </h1>
      
                <div className='flex items-center w-[81%]'>
                    <Topnav />
                </div>
      
            </div>
      
            <InfiniteScroll
                dataLength={person.length}
                hasMore={hasMore}
                next={GetPerson}
                loader={<h4>Loading...</h4>}
            >
                <Cards data={person} title="person" />
            </InfiniteScroll>
      
      
        </div>
      ) : (
        <Loading />
      );
}

export default person