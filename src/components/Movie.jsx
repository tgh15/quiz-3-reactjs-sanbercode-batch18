import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import axios from 'axios'

const Movie = () => {
    const [movies, setMovies] = useState([])
    const [input, setInput] = useState({
        search: '',
        title: '',
        description: '',
        year: 2020,
        duration: 120,
        genre: '',
        rating: 0,
        image_url: ''
    })
    useEffect(() => {
        axios.get('http://backendexample.sanbercloud.com/api/movies')
            .then(res => {
                console.log(res.data)
                setMovies(res.data)
            })
    }, [])

    const searchResult = movies.filter(movie => {
        return movie.title.toLowerCase().includes(input.search.toLowerCase())
    })

    const deleteMovie = (id) => {
        axios.delete(`http://backendexample.sanbercloud.com/api/movies/${id}`)
            .then(res => {
                setMovies(movies.filter(movie => movie.id !== id))
            })
    }

    const edit = (data) => {
        setInput({
            ...input,
            id: data.id,
            title: data.title,
            description: data.description,
            year: data.year,
            duration: data.duration,
            genre: data.genre,
            rating: data.rating,
            image_url: data.image_url
        })
    }
    const handleChange = (e) => {
        setInput({
            ...input,
            [e.target.name]: e.target.value
        })
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        if (movies.some(movie => movie.id === input.id)) {
            axios.put(`http://backendexample.sanbercloud.com/api/movies/${input.id}`, input)
                .then(res => {
                    let edited = movies.map(movie => {
                        if (movie.id === res.data.id) {
                            movie.title = res.data.title
                            movie.description = res.data.description
                            movie.year = res.data.year
                            movie.duration = res.data.duration
                            movie.genre = res.data.genre
                            movie.rating = res.data.rating
                            movie.image_url = res.data.image_url
                        }
                        return movie
                    })
                    setMovies(edited)
                    setInput({
                        ...input,
                        title: '',
                        description: '',
                        year: 2020,
                        duration: 120,
                        genre: '',
                        rating: 0,
                        image_url: ''
                    })
                })
                .catch(err => {
                    console.log(err)
                })
        } else {
            axios.post(`http://backendexample.sanbercloud.com/api/movies`, input)
                .then(res => {
                    setMovies([
                        ...movies,
                        res.data
                    ])
                    setInput({
                        ...input,
                        title: '',
                        description: '',
                        year: 2020,
                        duration: 120,
                        genre: '',
                        rating: 0,
                        image_url: ''
                    })
                })
                .catch(err => {
                    console.log(err)
                })
        }
    }
    return (
        <section className="movielist">
            <div className="search">
                <input type="text" placeholder="search by title" value={input.search} onChange={(e) => setInput({ ...input, search: e.target.value })} />
            </div>
            <div className="movietable">
                <h1>Daftar Movie</h1>
                <table>
                    <thead>
                        <tr>
                            <th>No.</th>
                            <th>Title</th>
                            <th>Description</th>
                            <th>Year</th>
                            <th>Duration</th>
                            <th>Genre</th>
                            <th>Rating</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {searchResult !== [] && searchResult.map((movie, index) => (
                            <tr key={movie.id}>
                                <td>{index + 1}</td>
                                <td>{movie.title}</td>
                                <td>{movie.description !== null && (movie.description.length > 50 ? `${movie.description.slice(0, 50)}...` : movie.description)}</td>
                                <td>{movie.year}</td>
                                <td>{movie.duration}</td>
                                <td>{movie.genre}</td>
                                <td>{movie.rating}</td>
                                <td>
                                    <button onClick={() => edit(movie)}>edit</button>
                                    <button onClick={() => deleteMovie(movie.id)}>delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <hr />
            <div className="movieform">
                <h1>Tambah Movie</h1>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="title">Title</label>
                        <input type="text" id="title" name="title" onChange={handleChange} value={input.title} required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="description">Description</label>
                        <textarea name="description" id="description" cols="30" rows="10" onChange={handleChange} required value={input.description}></textarea>
                    </div>
                    <div className="form-group">
                        <label htmlFor="year">Year</label>
                        <input type="number" min="1980" id="year" name="year" onChange={handleChange} value={input.year} required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="duration">Duration</label>
                        <input type="number" id="duration" name="duration" onChange={handleChange} value={input.duration} required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="genre">Genre</label>
                        <input type="text" id="genre" name="genre" onChange={handleChange} value={input.genre} required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="rating">Rating</label>
                        <input type="number" id="rating" nim="0" max="10" name="rating" onChange={handleChange} value={input.rating} required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="imageurl">Image URL</label>
                        <textarea name="image_url" id="imageurl" cols="30" rows="10" onChange={handleChange} required value={input.image_url}></textarea>
                    </div>
                    <button className="btn" type="submit">Simpan</button>
                </form>
            </div>
        </section>
    )
}

export default Movie
