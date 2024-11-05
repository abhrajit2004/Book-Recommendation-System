"use client";
import React, { useEffect, useState, useRef } from 'react'
import { getAllSearchedBooks } from '@/actions/useractions';
import { fetchBooks } from '@/actions/useractions';
import Loader from '../components/Loader';
import { getBookImages } from '@/actions/useractions';

const Dashboard = () => {

  const [selected, setSelected] = useState('Select Genre');

  const [bookname, setBookname] = useState('');

  const [searchedBooks, setSearchedBooks] = useState([]);

  const [defaultBooks, setDefaultBooks] = useState([]);

  const [language, setLanguage] = useState('Select Language');


  const searchBooks = async () => {

    const books = await getAllSearchedBooks(bookname, selected, language);

    if (books) {
      const booksArray = JSON.parse(books);
      setSearchedBooks(booksArray);
      console.log(booksArray);
    }
  }

  useEffect(() => {
    const fetchDefaultBooks = async () => {
      const books = await fetchBooks();
      if (books) {
        const booksArray = JSON.parse(books);
        setDefaultBooks(booksArray);
        console.log(booksArray);
      }
    }
    
    fetchDefaultBooks();

  }, [])

  return (
    <>
      <div className='flex justify-center items-center mt-10 gap-2'>
        <label className="input input-bordered flex items-center gap-2 w-[30%]">
          <input onChange={(e) => setBookname(e.target.value)} type="text" className="grow" placeholder="Search Books" name='bookname' id='bookname' value={bookname} />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="h-4 w-4 opacity-70">
            <path
              fillRule="evenodd"
              d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
              clipRule="evenodd" />
          </svg>
        </label>
        <select onChange={(e) => setSelected(e.target.value)} value={selected} name='selected' id='selected' className="select select-bordered w-full max-w-xs">
          <option disabled>Select Genre</option>
          <option>Comedy</option>
          <option>Romance</option>
          <option>Action</option>
          <option>Horror</option>
          <option>War</option>
          <option>Fantasy</option>
          <option>Tragedy</option>
          <option>Crime Thriller</option>
        </select>
        <select onChange={(e) => setLanguage(e.target.value)} value={language} name='language' id='language' className="select select-bordered w-full max-w-xs">
          <option disabled>Select Language</option>
          <option>English</option>
          <option>Hindi</option>
          <option>Bengali</option>
        </select>
        <button onClick={searchBooks} className="btn btn-ghost border border-white">Filter Search</button>

      </div>

      <div className="results my-8">
        <h1 className={`text-center text-3xl font-semibold ${searchedBooks.length === 0 && "hidden"}`}>Results Found: {searchedBooks.length} </h1>
      </div>

      <div className="cards flex justify-center flex-wrap gap-4 my-14">
        {defaultBooks.length === 0 && <Loader />}
        {searchedBooks.length === 0 && defaultBooks.map((book, index) => {
          return (
            <div className="card bg-base-100 w-96 shadow-xl" key={index}>
              <figure>
                <img
                  src={'https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp'} 
                  alt="Shoes" />
              </figure>
              <div className="card-body">
                <h1 className="text-gray-500 text-sm"> 
                  {book.author}
                </h1>
                <h2 className="card-title">
                  {book.title}
                  {/* <div className="badge badge-secondary">NEW</div> */}
                </h2>
                <p>{book.description}</p>
                <div className="card-actions justify-end">
                  <div className="badge badge-outline">{book.genre}</div>
                  {/* <div className="badge badge-outline">Products</div> */}
                </div>
              </div>
            </div>
          )
        })}
        {searchedBooks.map((book, index) => {
          return (
            <div className="card bg-base-100 w-96 shadow-xl" key={index}>
              <figure>
                <img
                  src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
                  alt="Shoes" />
              </figure>
              <div className="card-body">
                <h1 className="text-gray-500 text-sm">
                  {book.author}
                </h1>
                <h2 className="card-title">
                  {book.title}
                  {/* <div className="badge badge-secondary">NEW</div> */}
                </h2>
                <p>{book.description}</p>
                <div className="card-actions justify-end">
                  <div className="badge badge-outline">{book.genre}</div>
                  {/* <div className="badge badge-outline">Products</div> */}
                </div>
              </div>
            </div>
          )
        })}

      </div>

      {/* <div className="join flex justify-center items-center my-4">
        <button className="join-item btn btn-outline">Previous page</button>
        <button className="join-item btn btn-outline">Next</button>
      </div> */}
    </>
  )
}

export default Dashboard