import React,{ useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const SelctedMovie = () => {
  const Movie = useSelector(state=>state.Movie.Movie) 
  const navigate = useNavigate()
  useEffect(() => {

    Movie == ''? navigate('/'):console.log(Movie)
      
    
    
  }, [])


  return (
    <div className='dark:text-white'>
      <div>
        
      </div>
    </div>
  )
}

export default SelctedMovie