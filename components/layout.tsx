import Head from 'next/head';
import React, { useEffect, useLayoutEffect, useRef } from 'react';
import LeftBar from './leftbar';
import RightBar from './rightbar';
import Link from 'next/link';

const useIsomorphicLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect;

const LayoutContext = React.createContext<{ }>({ });

type LayoutProps = {
    children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
    const didRunRef = useRef(false);

    useIsomorphicLayoutEffect(() => {
        if (didRunRef.current === false) {
            didRunRef.current = true;

            // const auth = getAuth();
            // let unsub = onAuthStateChanged(auth, (user) => {
            //     if (user) {
            //         // console.log('Layout/useEffect/onAuthStateChanged/logged-in', user);
            //     } else {
            //         // console.log('Layout/useEffect/onAuthStateChanged/logged-out');
            //         if (!auth.currentUser) {
            //             signInAnonymously(auth)
            //                 .then(() => {
            //                     // console.log('Layout/useEffect/onAuthStateChanged/signInAnonymously', auth.currentUser);
            //                 })
            //                 .catch((error) => {
            //                     const errorCode = error.code;
            //                     const errorMessage = error.message;
            //                     console.log(errorCode, errorMessage);
            //                 });
            //         }
            //     }
            // });
            // return unsub();
        }
    }, []);

    const didRunLERef = useRef(false);
    useIsomorphicLayoutEffect(() => {
        if (didRunLERef.current === false) {
            didRunLERef.current = true;
            if (typeof window !== 'undefined' && typeof window.navigator !== 'undefined') {
                if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                    document.documentElement.classList.add('dark');
                } else {
                    document.documentElement.classList.remove('dark');
                }
            }
        }
    }, []);

    return (
        <>
            <Head>
                <title>Liz Xuen</title>
                <meta name="description" content="My landing page" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <LayoutContext.Provider value={{ }}>
                <LeftBar />
                <RightBar />
                <div>
                    <div className='h-screen overflow-y-scroll scrollbar-hide'>

                        <div className='flex items-center pl-[64px]'>
                            <Link href='/'>
                                <a>
                                    <div className='text-[72px] text-black-liz hover:text-yellow-liz dark:text-white-liz dark:hover:text-yellow-liz font-moo-lah-lah  cursor-pointer'>liz</div>
                                </a>
                            </Link>
                        </div>
                        <div className='sm:px-[120px]'>
                            {children}
                        </div>
                    </div>
                </div>
            </LayoutContext.Provider>
        </>
    );
}

export { LayoutContext }