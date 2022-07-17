import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";
import { ReactElement, useEffect, useState } from "react";
import Layout from "../components/layout";

export default function Security() {
    const { data: session, status } = useSession();

    useEffect(() => {
        console.log('status => ', status);
    }, [status]);

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
                            <div className='font-bold text-2xl'>Authentication</div>
                            <button
                                className='bg-black-liz text-white-liz py-2 px-4 m-auto rounded-xl'
                                onClick={() => signIn()}
                            >
                                Sign In
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

            <TestProtectedAPI />

        </div>
    );
}

Security.getLayout = function getLayout(page: ReactElement) {
    return (
        <Layout>
            {page}
        </Layout>
    )
}

function TestProtectedAPI() {
    const [result, setResult] = useState('');

    const handleTestProtectedAPI = () => {
        fetch('/api/protected/testprotected')
            .then(res => res.json())
            .then(data => {
                setResult(data);
            })
            .catch(err => console.error(err));
    }

    return (
        <div className='bg-black p-4 rounded-xl space-y-4'>
            <div className='text-gray-300 text-2xl'>Test Protected API</div>
            <div className='flex justify-between'>
            <button className='bg-gray-300 py-1 px-6 rounded-lg' onClick={handleTestProtectedAPI}>Test</button>
            <button className='text-gray-300 border-2 py-1 px-6 rounded-lg' onClick={()=>setResult('')}>Clear</button>
            </div>
            <div className='text-white-liz text-xs'>
                {result}
            </div>
        </div>
    );
}