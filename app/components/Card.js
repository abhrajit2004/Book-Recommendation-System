"use client";
import { fetchBooks } from '@/actions/useractions';
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation';
import Loader from './Loader';

const Card = () => {

    const router = useRouter();

    const [bookData, setBookData] = useState([]);


    useEffect(() => {

        const fetchBookData = async () => {
            const books = await fetchBooks();
            if(books){
                const booksArray = JSON.parse(books);
                setBookData(booksArray);
            }
        }

        fetchBookData();
    
    }, []);


    return (

        <>
        {bookData.length === 0 && <Loader /> }

        <marquee className="flex">
            <div className='my-4'>
                {bookData.map((book, index) => {
                    return (
                        <div onClick={()=>{
                            router.push(`/bookdetails/${decodeURIComponent(book.title).replaceAll(' ','-')}`);
                            localStorage.setItem('book', JSON.stringify(book));
                            }} className="card bg-base-100 w-96 shadow-xl transition cursor-pointer inline-block mx-2" key={index}>
                            <figure>
                                <img
                                    src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
                                    alt="Shoes" />
                            </figure>
                            <div className="card-body">

                                <h2 className="card-title">
                                    {book.title}
                                    {/* <div className="badge badge-secondary">NEW</div> */}
                                </h2>
                                <p>{book.author}</p>
                                <div className="card-actions justify-end">
                                    <div className="badge badge-outline">{book.genre}</div>
                                </div>
                            </div>

                        </div>
                    )

                })}

            </div>
        </marquee>

        </>
    )
}

export default Card
