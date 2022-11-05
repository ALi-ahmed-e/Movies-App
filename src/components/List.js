import React, { Fragment, useEffect, useState } from 'react'

import useRefreshUser from './useRefreshUser';
import { BookmarkIcon, CalendarIcon, MagnifyingGlassIcon, XCircleIcon } from '@heroicons/react/24/outline'
import { ArrowRightIcon, BookmarkSlashIcon } from '@heroicons/react/24/solid';
import axios from 'axios';
import { arrayRemove, arrayUnion, doc, updateDoc } from 'firebase/firestore';
import { useDispatch, useSelector } from 'react-redux';
import { db } from '../firebase';
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode, Pagination, } from 'swiper';
import "swiper/css";
import { useNavigate } from 'react-router-dom';
import { MovieAction } from '../Store/slices/MovieIdSlice';
import { useLayoutEffect } from 'react';



const List = ({ mode }) => {
    const user = useSelector(state => state.Auth.User)
    const [movies, setmovies] = useState([]);
    const [refresh] = useRefreshUser()
    const [spinner, setspinner] = useState(false);
    const [clicks, setclicks] = useState(1);
    const [lmbtn, setlmbtn] = useState(<Fragment>load more <lord-icon src="https://cdn.lordicon.com/uvlzcswc.json" trigger="hover" colors="primary:#121331" style={{ width: 30, height: 30 }}></lord-icon></Fragment>);
    const navigate = useNavigate()
    const { setMovieId } = MovieAction
    const dispatch = useDispatch()
    const [Recommended, setRecommended] = useState();
    const [Trending, setTrending] = useState();
    const [hide, sethide] = useState();
    const [clr, setclr] = useState('hidden');
    let pagenum = 1



    const savebtn = async (movie) => {
        const userRef = doc(db, "users", user.uid);

        const remove = async () => {
            await updateDoc(userRef, {
                saves: arrayRemove(movie),
                savesId: arrayRemove(movie.id)
            });
            refresh()
        }
        const add = async () => {
            await updateDoc(userRef, {
                saves: arrayUnion(movie),
                savesId: arrayUnion(movie.id)
            });
            refresh()
        }

        user.saves != '' ? user.savesId.includes(movie.id) ? remove() : add() : add()







    }



    const getListData = async (dm, mood) => {

        const api = mood == 'search' ? `https://api.themoviedb.org/3/search/movie?api_key=3996369053a0763c7bd59cf6908675f6&page=${pagenum}&query=${dm}` : `https://api.themoviedb.org/3/discover/${dm}?api_key=3996369053a0763c7bd59cf6908675f6&sort_by=popularity.desc&page=${pagenum}`
        setspinner(true)
        axios.get(api).then(res => {
            const list = movies.concat(res.data.results)
            setspinner(false)

            if (pagenum == 1) {
                setmovies(res.data.results)
            } else {
                setmovies(list)
            }
        })
            .catch(err => {
                setspinner(false)
                console.log(err)
            })

    }





    useLayoutEffect(() => {
        setspinner(<div role="status">
            <svg
                className="inline my-14 w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-gray-600 dark:fill-gray-300"
                viewBox="0 0 100 101"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                    fill="currentColor"
                />
                <path
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                    fill="currentFill"
                />
            </svg>
            <span className="sr-only">Loading...</span>
        </div>)
        detectmode()
    }, []);


    const detectmode = () => {
        if (mode == 'Bookmarked') {
            setspinner(false)
            setmovies(user.saves)
            setRecommended()
            setTrending()
        } else if (mode == 'home') {
            getListData('movie', 'home')
            setRecommended('Recommended for you')
            setTrending('Trending')
            sethide('')
        } else if (mode == 'tv') {
            getListData('tv', 'tv')
            setRecommended('Recommended for you')
            setTrending('Trending')
            sethide('')
        }
    }

    const gotoMovie = (movie) => {
        dispatch(setMovieId(movie))
        navigate('/selected_movie')
    }

    const searchmovies = (e) => {
        e.preventDefault()
        setmovies([])
        sethide('hidden')
        setRecommended()
        setTrending()
        getListData(e.target.searchRef.value, 'search')
    }

    const clrsrch = () => {
        detectmode()
    }

    // const not = (e)=>{
        
    // }

    return (
        <div className='w-full overflow-x-hidden mc'>


            {mode !== 'Bookmarked' && <form onSubmit={e => searchmovies(e)} className='  flex sm:ml-0 ml-12  w-fit px-2 py-1 my-4 items-center '>

                <MagnifyingGlassIcon className='w-7 h-7 dark:text-white mx-1' />
                <input onChange={(e) => { e.target.value ? setclr('') : setclr('hidden') }} name={'searchRef'} type="text" className=' px-5 py-1 bg-transparent  outline-none dark:text-white ' placeholder='Search for shows' />
                <XCircleIcon className={`' w-6 h-6 text-white cursor-pointer' ${clr}`} onClick={clrsrch} />
            </form>}



            <h1 className='ml-5 dark:text-white text-2xl'>{Trending}</h1>



            {mode !== 'Bookmarked' && <Fragment><div className={`'w-full  overflow-x-hidden h-56 mb-5 ' ${hide}`}>
                <Swiper
                    freeMode={true}
                    grabCursor={true}
                    loop={true}
                    spaceBetween={30}
                    breakpoints={{

                        440: {
                            slidesPerView: 1,
                        },
                        520: {
                            slidesPerView: 2,
                        },
                        768: {
                            slidesPerView: 3,
                        },
                        1024: {
                            slidesPerView: 4,
                        },
                        1084: {
                            slidesPerView: 5,
                        },
                    }}

                    pagination={{ clickable: true, }}
                    modules={[FreeMode, Pagination]}
                    className="mySwiper"
                >
                    {movies.map(movie => <SwiperSlide onClick={(e) =>e.target.id != 'si'&&gotoMovie(movie)} key={Math.random()} ><div key={Math.random()} className='block  mx-auto my-10  w-56 h-[126.17px]'>
                        <div className='flex  h-full ' style={{ 'direction': 'rtl' }}>
                            <img src={`https://image.tmdb.org/t/p/w300` + movie.backdrop_path} className=' rounded-[10px] w-56 ' />
                            <div id="si"  onClick={() => savebtn(movie)} className=' bg-black/50 cursor-pointer hover:bg-black/70 z-30 transition-all rounded-full m-2 absolute px-[7px] py-[7px]  flex items-center justify-center'>
                            {user.savesId != '' ? user.savesId.includes(movie.id) ? <BookmarkSlashIcon id="si"  className='si'/> : <BookmarkIcon id="si"  className='si'/> : <BookmarkIcon id="si"  className='si'/>}

                            </div>

                            <div className='   transition-all rounded-[10px] -z-0  w-56 h-[126.17px] absolute'>
                                <p className='dark:text-white absolute text-xs z-30 flex bg-black/10  mr-[150px] mt-2 px-2 py-1 rounded-md'> <CalendarIcon className='w-4 mx-1' />{mode == 'home' ? movie.release_date.slice(0, 4) :mode == 'tv' && movie.first_air_date.slice(0, 4)}</p>

                            </div>
                        </div>
                        <div className='flex -mt-12 ml-4'>
                            <p className='dark:text-white strokee'>{mode == 'home' ? movie.title : movie.name}</p>
                        </div>

                    </div></SwiperSlide>)}
                </Swiper>
            </div>

            </Fragment>}






            <h1 className='ml-5 dark:text-white text-2xl'>{Recommended}</h1>

            <div className='w-full text-center'>
                {movies != '' ? movies.map(movie =>

                    <div key={Math.random()} className='  inline-block mx-4  my-10 w-56 h-[126.17px]'>
                        <div className='flex w-full h-full' style={{ 'direction': 'rtl' }}>
                            <img src={`https://image.tmdb.org/t/p/w300` + movie.backdrop_path} className=' rounded-[10px] w-56' />
                            <div onClick={() => savebtn(movie)} className=' bg-black/50 hover:bg-black/70 z-30 transition-all rounded-full m-2 absolute px-[7px] py-[7px] cursor-pointer flex items-center justify-center'>
                                
                            {user.savesId != '' ? user.savesId.includes(movie.id) ? <BookmarkSlashIcon id="si"  className='si'/> : <BookmarkIcon id="si"  className='si'/> : <BookmarkIcon id="si"  className='si'/>}



                            </div>

                            <div onClick={() => gotoMovie(movie)} className=' opacity-0 cursor-pointer hover:opacity-100   bg-black/70 transition-all rounded-[10px] -z-0  w-56 h-[126.17px] absolute'>
                                <p className='dark:text-white absolute text-xs z-30 flex bg-black/30 mt-[93px] mr-[100px] px-2 py-1 rounded-md w-28'> <CalendarIcon className='w-4 mx-1' />{mode !== 'tv' ? movie.release_date : movie.first_air_date}</p>

                                <ArrowRightIcon className=' w-7 mx-auto my-11 hover:w-8 transition-all dark:text-white' />
                            </div>
                        </div>
                        <div className='flex my-2'>
                            <p className='dark:text-white'>{mode == 'home' ? movie.title : movie.name}</p>
                        </div>

                    </div>

                ) : <h1 className='dark:text-white text-3xl'>No Saved Items</h1>}
            </div>




            {hide != 'hidden' && mode == 'home' ? <button onClick={() => {
                setclicks(clicks + 1)
                if (clicks < 2) {
                    pagenum++
                    detectmode()
                } else {
                    setlmbtn('Thats All')
                }
            }} className={lmbtn == 'Thats All' ? 'mx-auto my-20 py-1 px-4 dark:text-white flex items-center justify-center' : 'mx-auto my-20 py-1 px-4 dark:text-white rounded-md bg-indigo-500 hover:bg-indigo-600 flex items-center justify-center'}>{lmbtn}</button>
                : mode == 'tv' ? <button onClick={() => {
                    setclicks(clicks + 1)
                    if (clicks < 2) {
                        pagenum++
                        detectmode()
                    } else {
                        setlmbtn('Thats All')
                    }
                }} className={lmbtn == 'Thats All' ? 'mx-auto my-20 py-1 px-4 dark:text-white flex items-center justify-center' : 'mx-auto my-20 py-1 px-4 dark:text-white rounded-md bg-indigo-500 hover:bg-indigo-600 flex items-center justify-center'}>{lmbtn}</button> : ''}




            <div className='w-full text-center'>
                {spinner && <div role="status" >
                    <svg
                        className="inline my-14 w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-gray-600 dark:fill-gray-300"
                        viewBox="0 0 100 101"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                            fill="currentColor"
                        />
                        <path
                            d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                            fill="currentFill"
                        />
                    </svg>
                    <span className="sr-only">Loading...</span>
                </div>}
            </div>



        </div>
    )
}

export default List