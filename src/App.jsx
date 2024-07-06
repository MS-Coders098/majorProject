import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './components/Home'
import Trending from './components/Trending'
import Popular from './components/Popular'
import Movie from './components/Movie'
import Tvshows from './components/Tvshows'
import People from './components/People'
import Moviedetails from './components/Moviedetails'
import Tvdetails from './components/Tvdetails'
import Persondetails from './components/Persondetails'
import Trailer from './components/templetes/Trailer'
import Notfound from './components/Notfound'

const App = () => {
  return (
    <div className='w-screen h-screen bg-[#1F1E24] flex'>
      <Routes>
        <Route exact path='/' element={<Home />} />
        <Route exact path='/trending' element={<Trending />} />
        <Route exact path='/popular' element={<Popular />} />

        <Route exact path='/movie' element={<Movie />} />
        <Route path='/movie/details/:id' element={<Moviedetails />} >
          <Route path='/movie/details/:id/trailer' element={<Trailer />} />
        </Route>


        <Route exact path='/tvshows' element={<Tvshows />} />
        <Route path='/tv/details/:id' element={<Tvdetails />} >
          <Route path='/tv/details/:id/trailer' element={<Trailer />} />
        </Route>


        <Route exact path='/person' element={<People />} />
        <Route path='/person/details/:id' element={<Persondetails />} />

        <Route path='*' element={<Notfound />} />
      </Routes>
    </div>
  )
}

export default App
