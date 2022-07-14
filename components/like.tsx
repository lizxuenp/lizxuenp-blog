import { HeartIcon } from '@heroicons/react/solid';
import { ObjectId } from 'mongodb';
import { useContext, useEffect, useRef, useState } from 'react';
import { StringDecoder } from 'string_decoder';
import { LayoutContext } from './layout';
type LikeProps = {
    postId: ObjectId;
    likedBy: string[];
    user: string;
}

export default function Like({ postId, likedBy, user }: LikeProps) {
    const [liked, setLiked] = useState(false);
    const [likedCount, setLikedCount] = useState(likedBy.length);
    const [waitClick, setWaitClick] = useState(true);

    const didRunRef = useRef(false);
    useEffect(() => {
        if (didRunRef.current === false) {
            didRunRef.current = true;
            const found = likedBy.find(el => el === user);
            if (found) {
                setLiked(true);
            } else {
                setLiked(false);
            }
        }
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    const handleClick = () => {
        if (waitClick) {
            setWaitClick(false);
            // const postRef = doc(db, "posts", postId);
            // if (liked) {
            //     updateDoc(postRef, { likedBy: arrayRemove(user?.uid) })
            //     .then(() => {
            //         setLiked(false);
            //         setLikedCount(prev => --prev);
            //         setWaitClick(true);
            //     })
            //     .catch(e => console.log(e));
            // } else {
            //     updateDoc(postRef, { likedBy: arrayUnion(user?.uid) })
            //     .then(() => {
            //         setLiked(true);
            //         setLikedCount(prev => ++prev);
            //         setWaitClick(true);
            //     })
            //     .catch(e => console.log(e));
            // }
        }
    }
    return (
        <div className={`${waitClick && 'cursor-pointer'} flex items-center gap-1`} onClick={handleClick}>
            {
                liked ?
                    <HeartIcon className='h-6 text-rose-600' />
                    :
                    <HeartIcon className='h-6 text-gray-300' />
            }
            <div className='pt-1 text-rose-600 font-bold'>{likedCount}</div>
        </div>
    );
}