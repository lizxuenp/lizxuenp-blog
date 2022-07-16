import { BuiltInProviderType } from 'next-auth/providers';
import { ClientSafeProvider, getProviders, LiteralUnion, signIn } from 'next-auth/react';
import Head from 'next/head';
import Image from 'next/image';
import { useRouter } from 'next/router';
import DarkModeButton from '../../components/darkmodebutton';
import HomeButton from '../../components/homebutton';

export default function SignIn({ providers }: { providers: Record<LiteralUnion<BuiltInProviderType, string>, ClientSafeProvider> | null } ) {
    const router = useRouter();
    return (
        <>
            <Head>
                <title>Liz Xuen / Sign In</title>
                <meta name="description" content="Sign In to My Page" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <div className='flex h-screen w-screen'>
                <div className='w-2/3 flex items-center justify-center'>
                    <div className='flex flex-col items-center gap-4 text-black-liz dark:text-white-liz w-full'>

                        <div className='font-bold text-3xl'>Sign In</div>

                        <div className='cursor-pointer' onClick={() => signIn('github')}>
                            <svg role="img" className='fill-black-liz dark:fill-white-liz h-10 w-10' viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <title>GitHub</title>
                                <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
                            </svg>
                        </div>

                        <div>or use your email to sign in</div>

                        <div className='flex flex-col items-center justify-center gap-4 text-black-liz w-full'>
                            <input type='text' placeholder='email'
                                className='py-2 px-4 outline-none rounded-lg bg-gray-300 w-96'
                            />
                            <input type='password' placeholder='password'
                                className='py-2 px-4 outline-none rounded-lg bg-gray-300 w-96'
                            />
                        </div>

                        <div className='flex justify-between w-96'>
                            <button className='py-2 px-8 bg-gray-700 dark:bg-gray-600 text-white-liz rounded-full'>Sign In</button>
                            <button className='py-2 px-8 bg-gray-400 dark:bg-gray-400 text-white-liz rounded-full' onClick={() => router.push('/')} >Cancel</button>
                        </div>
                    </div>
                </div>
                <div className='w-1/3 relative'>
                    <Image
                        src='https://res.cloudinary.com/lizxuen/image/upload/v1657974066/2593331_f4nl14.jpg'
                        alt='people'
                        layout='fill'
                        objectFit='cover'
                    />
                </div>
            </div>
            <div className='hidden sm:flex fixed z-50 top-[20px] left-[20px] '>
                <HomeButton />
            </div>
            <div className='hidden sm:flex fixed z-50 top-[80px] left-[20px] '>
                <DarkModeButton />
            </div>
        </>
    );
}

export async function getServerSideProps() {
    const providers = await getProviders()
    return {
        props: { providers },
    }
}