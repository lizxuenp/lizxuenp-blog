import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";

export default function Security() {
    const { data: session } = useSession();

    const handleSignInWithGithub = () => {
        if (!session) {
            signIn();
        } else {
            console.log(session);
        }
    }

    return (
        <div className='flex flex-col md:grid md:grid-cols-2 lg:grid-cols-3 gap-6 px-8'>
            <div className='col-span-2 bg-yellow-liz text-black-liz p-4 rounded-xl flex flex-col justify-center'>
                {
                    session ?
                        <div className='flex flex-col justify-center gap-4'>
                            <div className='flex items-center gap-2'>
                                <Image className='rounded-full' src={session.user?.image!} width={40} height={40} layout='fixed' alt='User' />
                                <div className='font-bold'>{session.user?.name}</div>
                            </div>
                            <code className='text-xs break-all'>
                                {`${JSON.stringify(session.user)}`}
                            </code>
                            <button
                                className='bg-black-liz text-white-liz py-2 px-4 m-auto rounded-xl'
                                onClick={() => signOut()}
                            >
                                Sign Out
                            </button>
                        </div>
                        :
                        <div className='col-span-2 bg-yellow-liz text-black-liz p-4 rounded-xl flex flex-col justify-center gap-2'>
                            <div className='font-bold text-2xl'>Sign In</div>
                            <button
                                className='bg-black-liz text-white-liz py-2 px-4 m-auto rounded-xl'
                                onClick={handleSignInWithGithub}
                            >
                                Sign In with Github
                            </button>
                        </div>
                }

            </div>
            <div className='bg-black p-4 rounded-xl'>
                <div className='text-gray-300 text-2xl'>npm supply chain attack</div>
                <a
                    className='text-gray-300 font-bold'
                    href='https://www.bleepingcomputer.com/news/security/npm-supply-chain-attack-impacts-hundreds-of-websites-and-apps/'
                    target='_blank' rel="noreferrer"
                >
                    read more...
                </a>
                <span className='text-gray-500'> and </span>
                <a
                    className='text-gray-300 font-bold'
                    href='https://blog.malwarebytes.com/malwarebytes-news/2022/07/iconburst-software-supply-chain-attack-offers-malicious-versions-of-npm-packages/'
                    target='_blank' rel="noreferrer"
                >
                    more...
                </a>
            </div>



        </div>
    );
}