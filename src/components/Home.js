import React from 'react'
import List from './List';
const Home = () => {


  // https://image.tmdb.org/t/p/w500/ 
  // movies.results & include_adult=false & include_video=true & page=1 & with_watch_monetization_types=flatrate




  return (
    <div className='w-full'>
      <List mode={'home'} />
    </div>
  )
}

export default Home