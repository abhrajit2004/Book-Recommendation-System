"use client";
import React, { useEffect, useRef, useState } from 'react'

const Favorites = () => {

    const [favoritesArray, setFavoritesArray] = useState([]);


    useEffect(() => {
        const favorites = JSON.parse(localStorage.getItem('favorites'));
        setFavoritesArray(favorites);
    }, [])

    const deleteFromFavorites = (id) => {
        const favorites = JSON.parse(localStorage.getItem('favorites'));
        const newFavorites = favorites.filter(favorite => favorite.id !== id);
        localStorage.setItem('favorites', JSON.stringify(newFavorites));
        setFavoritesArray(newFavorites);
    }

    return (
        <div className='flex justify-center gap-4 flex-wrap my-10'>
            {favoritesArray && favoritesArray.map((book, index) => {
                return (
                    <div className="card bg-base-100 w-96 shadow-xl" key={index}>
                        <figure>
                            <img
                                src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
                                alt="Shoes" />
                        </figure>
                        <div className="card-body">
                            <h2 className="card-title">{book.title}</h2>
                            <p>{book.description}</p>
                            <div className="card-actions justify-end">
                                <button onClick={()=>deleteFromFavorites(book.id)} className="btn btn-primary">Delete From Favorites</button>
                            </div>
                        </div>
                    </div>
                )
            })
            }

        </div>
    )
}

export default Favorites