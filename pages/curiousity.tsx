import TestDB from "../components/testdb/testdb";

export default function Curiousity() {

    return (
        <div className='flex flex-col md:grid md:grid-cols-2 lg:grid-cols-3 gap-6 px-8'>
            <div className='bg-yellow-400 text-gray-700 text-xs font-bold m-auto p-4 rounded-tr-2xl rounded-bl-2xl'>My Curiousity</div>
            <div className='col-span-2'>
                <TestDB />
            </div>
        </div>
    );
}