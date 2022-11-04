import React, { Fragment } from 'react'
import lottie from 'lottie-web';
import { defineElement } from 'lord-icon-element';
import { TvIcon, ArrowLeftOnRectangleIcon } from '@heroicons/react/24/solid'
import { useSelector } from 'react-redux';
import { Menu, Transition } from '@headlessui/react';
import { auth } from '../firebase';
import { signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';


const Header = () => {
    const classNames = (...classes) => classes.filter(Boolean).join(' ')
    defineElement(lottie.loadAnimation);
    const user = useSelector(state => state.Auth.User)
    const navigate = useNavigate()









    return (
        <div className=' sm:w-[90px]  mx-auto sm:mx-5 h-[60px]  sm:h-[97vh] w-full mobile:w-[90%] rounded-none mobile:rounded-2xl dark:bg-slate-800 bg-white flex my-0 mobile:my-3  items-center px-5 sm:px-0  justify-between flex-row sm:flex-col  sm:pt-5 '>

            <div className=' flex flex-row sm:flex-col items-center w-[90%]'>
                <lord-icon
                    src="https://cdn.lordicon.com/ytdpzbrl.json"
                    trigger="loop"
                    style={{ width: 70, height: 70, }}
                    colors="primary:#3a3347,secondary:#08a88a,tertiary:#ebe6ef"
                    delay="6000"
                    id='bi'
                    onClick={() => navigate('/')}
                >
                </lord-icon>

                <div className='  w-[90%] h-[150px]  flex flex-row sm:flex-col justify-around my-0 sm:my-5   items-center'>
                    <lord-icon
                        src="https://cdn.lordicon.com/zvllgyec.json"
                        trigger="hover"
                        id="mi"
                        colors="primary:#e4e4e4"
                        onClick={() => navigate('/')}
                    ></lord-icon>


                    <TvIcon id="mi" onClick={() => navigate('/discover_tv')} />

                    <lord-icon
                        src="https://cdn.lordicon.com/eanmttmw.json"
                        trigger="morph"
                        state="morph-2"
                        id="mi"
                        colors="primary:#e4e4e4"
                        onClick={() => navigate('/bookmarked')}
                    ></lord-icon>




                </div>
            </div>


            <Menu as="div" className="relative inline-block text-left w-fit h-fit">
                <div>
                    <Menu.Button className='flex items-center focus:outline-none'>
                        <div className=' flex items-center'>
                            {<img src={user.photoURL} className='mobile:w-10 mobile:h-10 h-9 w-9 rounded-full ring-2 my-0 sm:my-9' alt="userPhoto" />}
                        </div>


                    </Menu.Button>
                </div>

                <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95">
                    <Menu.Items className="absolute z-10 -ml-32 mobile:-ml-28 mt-6  sm:-mt-24  sm:ml-16 w-44 origin-top-right divide-y divide-gray-100 rounded-md dark:divide-black dark:bg-slate-800 bg-white shadow-lg ring-1 ring-black ring-opacity-5 border-[0.5px] dark:border-black focus:outline-none">

                        <div className="py-1">
                            <Menu.Item >
                                {({ active }) => (

                                    <p

                                        onClick={() => {
                                            signOut(auth).then(() => {
                                                localStorage.clear()
                                                window.location.reload()
                                            }).catch((error) => {
                                                console.log(error)
                                            });
                                        }}
                                        className={classNames(
                                            active ? 'bg-gray-100 dark:bg-gray-900 dark:text-slate-100 text-gray-900  cursor-pointer flex justify-between' : 'text-gray-700 dark:text-slate-100 cursor-pointer flex justify-between', 'block px-4 py-2 text-sm  cursor-pointer'
                                        )}
                                    >
                                        <ArrowLeftOnRectangleIcon className=' w-5 inline' />        Logout
                                    </p>

                                )}
                            </Menu.Item>
                        </div>


                    </Menu.Items>
                </Transition>
            </Menu>
        </div>
    )
}

export default Header
