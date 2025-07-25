import React from 'react'

const Paginations = ({page,setPage,hasNextPage}) => {
    return (
        <section>
            <div className='flex justify-between m-auto max-w-md'>
                <button disabled={page === 1} onClick={() => setPage(page - 1)} className={`px-8 py-2   rounded-md text-white bg-sky-500 ${page === 1 ? "cursor-not-allowed opacity-50" : ""} `}>Prev</button>
                <p>{page}</p>
                <button disabled={!hasNextPage} onClick={() => setPage(page + 1)} className={`px-8 py-2   rounded-md text-white bg-sky-500 ${!hasNextPage  ? "cursor-not-allowed opacity-50" : ""}`}>Next</button>
            </div>
        </section>
    )
}

export default Paginations