import { HomeIcon } from "@heroicons/react/solid";
import { useRouter } from "next/router";

const HomeButton = () => {
    const router = useRouter();

    return (
        <div
            className='bg-white text-gray-light-liz hover:text-blue-liz dark:bg-gray-dark-liz dark:text-white-liz dark:hover:text-yellow-liz w-16 h-12 shadow-md rounded-xl flex items-center justify-center cursor-pointer'
            onClick={() => router.push('/')}
        >
            <HomeIcon className='h-6' />
        </div>
    );
}

export default HomeButton;