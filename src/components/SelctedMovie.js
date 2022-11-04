import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const SelctedMovie = () => {
  const movie = useSelector(state => state.Movie.Movie)
  const navigate = useNavigate()
  useEffect(() => {movie == '' && navigate('/')}, [])


  return (
    <div className='dark:text-white w-full py-10'>
      <div className='flex flex-col md:flex-row items-center justify-around'>
        <img src={`https://image.tmdb.org/t/p/w300` + movie.poster_path} alt="" className=' rounded-xl my-10 mx-5' />


        <div className="overflow-x-auto relative shadow-md sm:rounded-lg my-10 mx-5 ring-2">
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 flex">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700  dark:text-gray-400">
              <tr className='flex-col flex'>
                <th scope="col" className="py-7 px-6">
                  name
                </th>
                <th scope="col" className="py-7 px-6">
                  Rate
                </th>
                <th scope="col" className="py-7 px-6">
                  release date
                </th>
                <th scope="col" className="py-7 px-6">
                  language
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="bg-white border-b dark:bg-gray-900 dark:border-gray-700 flex flex-col">
                <th scope="row" className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  {movie.title}
                </th>
                <td className="py-8 px-6">
                  {movie.vote_average + ' of 10'} ({movie.vote_count} votes)
                </td>
                <td className="py-8 px-6">
                  {movie.release_date}
                </td>
                <td className="py-8 px-6">
                  {movie.original_language}
                </td>

              </tr>

            </tbody>
          </table>
        </div>

      </div>
      <div className=' text-lg'>{movie.overview}</div>
    </div>
  )
}

export default SelctedMovie