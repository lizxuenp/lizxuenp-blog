import { useState } from "react";

export default function TestDB() {
    const [timeOC, setTimeOC] = useState(0);
    const [timeONC, setTimeONC] = useState(0);

    const handleOC = () => {
        console.log('handleOC');
        let startOC = performance.now();
        fetch('/api/testdb/testoc')
            .then(res => {
                setTimeOC(performance.now() - startOC);
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

    const handleONC = () => {
        console.log('handleONC');
        let startONC = performance.now();
        fetch('/api/testdb/testonc')
            .then(res => {
                setTimeONC(performance.now() - startONC);
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
        <div className='bg-green-500 p-6 rounded-xl flex flex-col gap-4'>
            <div className='font-bold text-lg'>Keep MongoDB connection open</div>
            <div>* MongoDB node.js driver has built-in connection pool</div>
            <div>api is in /api/testdb</div>
            <div className='bg-lime-700 p-2 rounded-sm space-y-4'>
                <div className='text-xs'>
                    <b>open</b> and <b>close</b> connection
                </div>
                <button className='bg-lime-300 py-2 px-4 rounded-md' onClick={handleOC}>TestOC</button>
                <div>Processing Time: {timeOC} ms</div>

            </div>
            <div className='bg-indigo-700 p-4 rounded-sm space-y-4'>
                <div className='text-xs'>
                    <b>open BUT NOT close</b> connection for each calls
                </div>
                <button className='bg-indigo-300 py-2 px-4 rounded-md' onClick={handleONC}>TestONC</button>
                <div>Processing Time: {timeONC} ms</div>
            </div>
        </div>
    );
}