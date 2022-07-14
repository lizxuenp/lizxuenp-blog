import { DotsCircleHorizontalIcon } from "@heroicons/react/solid";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Like from "./like";
import { ObjectId } from "mongodb";

export default function Post({ user, imgurl, link, postId, likedBy }: { user: string, imgurl: string, link: string, postId: ObjectId, likedBy: string[] }) {
    const router = useRouter();
    const didRunRef = useRef(false);
    const [loadingComplete, setLoadingComplete] = useState(false);

    useEffect(() => {
        if (didRunRef.current === false) {
            didRunRef.current = true;



        }
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <div className='bg-white dark:bg-gray-700 shadow-md dark:shadow-xl rounded-3xl h-[200px]'>
            <div className='h-[160px] w-full relative'>
                <Image src={imgurl} alt={link} layout='fill' objectFit='cover' className='rounded-3xl' onLoadingComplete={() => setLoadingComplete(true)} />
                {
                    !loadingComplete &&
                    <div className='h-full w-full flex items-center justify-center absolute z-50 top-0'>
                        <svg className="animate-spin -ml-1 mr-3 h-16 w-16 text-white-liz" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                    </div>
                }
            </div>
            <div className='flex items-center justify-between h-[40px] px-4'>
                <Like postId={postId} likedBy={likedBy} user={user} />
                <DotsCircleHorizontalIcon className='h-6 cursor-pointer text-gray-300 hover:text-yellow-liz' onClick={() => router.push(link)} />
            </div>
        </div>
    );
}