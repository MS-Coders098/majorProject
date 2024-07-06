import axios from '../utils/axios';
import React, { useEffect, useState } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component';
import { useNavigate } from 'react-router-dom';
import Loading from './Loading';
import Topnav from './templetes/Topnav';
import Dropdown from './templetes/Dropdown';
import Cards from './templetes/Cards';

const Pupalar = () => {
  const navigate = useNavigate()
  const [category, setcategory] = useState("movie");
  const [popular, setpopular] = useState([]);
  const [page, setpage] = useState(1);
  const [hasMore, sethasMore] = useState(true)
  
  document.title = `SCSDB | Popular ${category.charAt(0).toUpperCase() + category.slice(1).toLowerCase()} Shows`

  const GetPopular = async () => {
    try {
        const { data } = await axios.get(`/${category}/popular?page=${page}`);
        if (data.results.length > 0) {
            setpage(page + 1)
            setpopular(prevVal => [...prevVal, ...data.results]);
        } else{
            sethasMore(false)
        }
    } catch (error) {
        console.log(error)
    }
}

const refreshHandler = () => {
    if (popular.length === 0) {
        GetPopular()
    } else {
        setpage(1);
        setpopular([]);
        GetPopular()
    }
}

useEffect(() => {
    refreshHandler()
}, [category])

return popular.length > 0 ? (
  <div className='w-screen h-screen '>

      <div className='px-[5%] w-full flex items-center justify-between'>

          <h1 className='text-2xl font-semibold text-zinc-400'>
              <i onClick={() => navigate("/")} className="text-2xl font-semibold text-zinc-400 ri-arrow-left-line ml-2 cursor-pointer"></i>
              Popular {category.charAt(0).toUpperCase() + category.slice(1).toLowerCase()}
          </h1>

          <div className='flex items-center w-[81%]'>
              <Topnav />
              <Dropdown title="Category" options={['movie', 'tv']} func={(e) => setcategory(e.target.value)} />
          </div>

      </div>

      <InfiniteScroll
          dataLength={popular.length}
          hasMore={hasMore}
          next={GetPopular}
          loader={<h4>Loading...</h4>}
      >
          <Cards data={popular} title={category} />
      </InfiniteScroll>


  </div>
) : (
  <Loading />
);
}

export default Pupalar