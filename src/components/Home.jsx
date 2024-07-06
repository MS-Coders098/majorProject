import React, { useEffect, useState } from 'react'
import Sidenav from './templetes/Sidenav'
import Topnav from './templetes/Topnav'
import axios from '../utils/axios'
import Header from './templetes/Header'
import HorizontalCards from './templetes/HorizontalCards'
import Dropdown from './templetes/Dropdown'
import Loading from './Loading'


const Home = () => {
    document.title = "HomePage"
    const [wallpaper, setwallpaper] = useState(null)
    const [trending, settrending] = useState([])
    const [category, setcategory] = useState("all")

    const GetHeaderWallpaper = async () => {
        try {
            const { data } = await axios.get(`/trending/all/day`)
            let randomData = data.results[(Math.random() * data.results.length).toFixed()]
            setwallpaper(randomData);
        } catch (error) {
            console.log(error)
        }
    }

    const GetTrending = async () => {
        try {
            const { data } = await axios.get(`/trending/${category}/day`)
            settrending(data.results)
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        GetTrending()
        !wallpaper && GetHeaderWallpaper();
    }, [category])


    return wallpaper && trending ? (
        <>
            <Sidenav />
            <div className='w-[80%] h-full overflow-hidden overflow-y-auto'>
                <Topnav />
                <Header data={wallpaper} />
                <div className='p-6 flex justify-between'>
                    <h1 className='text-3xl font-semibold text-zinc-400'>Trending</h1>

                    <Dropdown title="Filter" options={["tv", "movies", "all"]} func={(e) => setcategory(e.target.value)} />

                </div>

                <HorizontalCards data={trending} />
                
            </div>
        </>
    ) : <Loading />
}

export default Home
