import React, { createContext, useEffect, useState } from 'react'
import axios from 'axios'

export const MovieContext = createContext()

export const MovieProvider = (props) => {
    const [movies, setMovies] = useState([])

    useEffect(() => {
        axios.get('http://backendexample.sanbercloud.com/api/movies')
            .then(res => {
                console.log(res.data)
                setMovies(res.data)
            })
    }, [])
    return (
        <MovieContext.Provider value={{ movies, setMovies }}>
            {props.children}
        </MovieContext.Provider>
    )
}

