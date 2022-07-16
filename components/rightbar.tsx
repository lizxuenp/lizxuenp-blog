import { ArrowCircleLeftIcon } from '@heroicons/react/solid';
import { useRouter } from 'next/router';
import DarkModeButton from './darkmodebutton';

export default function RightBar() {
    const router = useRouter();
    return (

        <div className='hidden sm:flex fixed z-50 top-[108px] right-[64px] '>
            <div className='flex flex-col gap-4'>
                {
                    router.asPath !== '/' &&
                    <div
                        className='bg-white text-gray-light-liz hover:text-blue-liz dark:bg-gray-dark-liz dark:text-white-liz dark:hover:text-yellow-liz w-16 h-12 shadow-md rounded-xl flex items-center justify-center cursor-pointer text-gray-light-liz hover:text-blue-liz'
                        onClick={() => { window.history.go(-1); return false; }}
                    >
                        <ArrowCircleLeftIcon className='h-6' />
                    </div>
                }
                <DarkModeButton />
            </div>

        </div>
    );
}
