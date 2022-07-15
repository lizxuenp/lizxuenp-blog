import type { NextPage } from 'next';
import Image from 'next/image';
import sec from '../public/cyber-4511128_960_720.jpg';
import IMG4 from '../public/IMG4-removebg-preview.png';
import octocat from '../public/Octocat.png';

import { BeakerIcon, DotsCircleHorizontalIcon } from '@heroicons/react/solid';
import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';
import Post from '../components/post';
import { TPost } from '../db/mongo';

const Home: NextPage = () => {
  const router = useRouter();
  const [posts, setPosts] = useState<TPost[]>([]);

  const didRunRef = useRef(false);

  useEffect(() => {
    if (didRunRef.current === false) {
      didRunRef.current = true;

      const getPosts = async () => {
        fetch('/api/posts')
          .then(res => res.json())
          .then(data => {
            setPosts(data);
          })
          .catch(err => console.error(err));
      }
      getPosts();
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className='space-y-6 pb-8'>
      <div className='flex flex-col lg:grid lg:grid-cols-5 gap-6 px-8'>
        <div className='h-64 lg:col-span-3 rounded-3xl bg-cyan-400 flex items-center justify-center'>

        </div>
        <div className='h-64 lg:col-span-2 rounded-3xl bg-gradient-to-r from-rose-200 to-rose-300 relative'>
          <div className='relative w-[190px] h-full left-0'>
            <Image src={IMG4} alt='IMG4' layout='fill' objectFit='contain' className='rounded-bl-3xl' />
          </div>
          <div className='z-30 absolute top-8 right-8 sm:right-16 md:top-16 md:right-32 lg:right-4 xl:top-16 xl:right-16 rotate-12'>
            <a href='https://github.com/lizxuenp' target='_blank' rel='noreferrer'>
              <Image src={octocat} alt='Octocat' height='70px' width='82px' />
            </a>
          </div>


        </div>
      </div>
      <div className='flex items-center gap-2'>
        <BeakerIcon className='h-8 pl-10 text-fuchsia-400' /><div className='text-xl font-bold dark:text-white-liz'>Exp</div>
      </div>
      <div className='flex flex-col md:grid md:grid-cols-2 lg:grid-cols-3 gap-6 px-8'>

        {
          !posts.length ?
            <div className='h-full w-full flex items-center justify-center'>
              <svg className="animate-spin -ml-1 mr-3 h-8 w-8 text-white-liz" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            </div>
            :
            posts.map((item) => <Post key={`${item._id}`} user={''} imgurl={item.imgurl} link={item.link} postId={item._id} likedBy={item.likedBy} />)
        }

        <div className='dark:bg-white bg-gray-700 shadow-md dark:shadow-xl rounded-3xl h-[200px] cursor-pointer' onClick={() => router.push('/curiousity')}>
          <div className='h-full w-full relative group'>
            <Image src={'https://res.cloudinary.com/lizxuen/image/upload/v1657864872/cultivate-curiousity_hczngn.avif'} alt='Curiousity' layout='fill' objectFit='cover' className='rounded-3xl' />
            <div className='absolute z-50 bottom-2 left-2'>
              <div className='font-bold text-lg text-gray-300 hover:text-yellow-liz group-hover:text-yellow-liz pb-1'>My Curiousity</div>
            </div>
            <div className='absolute z-50 bottom-2 right-2'>
              <DotsCircleHorizontalIcon className='h-10 text-gray-300 hover:text-yellow-liz group-hover:text-yellow-liz' />
            </div>
          </div>
        </div>

        <div className='bg-white dark:bg-gray-700 shadow-md dark:shadow-xl rounded-3xl h-[200px]'>
          <div className='h-[160px] w-full relative'>
            <Image src={sec} alt='sec' layout='fill' objectFit='cover' className='rounded-3xl' />
          </div>
          <div className='flex items-center justify-between h-[40px] px-4 cursor-pointer group' onClick={() => router.push('/security')}>
            <div className='text-gray-300 group-hover:text-yellow-liz'>Security Stuffs</div>
            <DotsCircleHorizontalIcon className='h-6 text-gray-300 group-hover:text-yellow-liz' />
          </div>
        </div>

      </div>

    </div>
  );
}

export default Home;
