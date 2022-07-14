
export default function Security() {

    const handleTest1 = () => {
        console.log('test1');
        fetch('/api/test1')
        .then(res => {
            if (res.ok) {
                return res.json();
             } else {
                throw new Error(res.statusText);
             }
        })
        .then(data => console.log(data))
        // .catch(er => console.log(er));
        .catch(er => console.log('found error'));
    }

    return (
        <div className='flex flex-col md:grid md:grid-cols-2 lg:grid-cols-3 gap-6 px-8'>
            <div className='bg-yellow-liz text-black-liz p-4 rounded-xl flex flex-col justify-center'>
                <div className='font-bold'>Anonymous ID</div>
                <div className='text-xs'>{`getAuth().currentUser?.uid`}</div>
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
            <div>
                <button onClick={handleTest1} className='bg-red-400 p-4 rounded-md'>Test1</button>
            </div>

        </div>
    );
}