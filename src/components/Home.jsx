import React, { Component } from 'react'
import axios from 'axios'

class Home extends Component {
    constructor(props) {
        super(props)
        this.state = {
            movies: []
        }
    }
    componentDidMount() {
        axios.get('http://backendexample.sanbercloud.com/api/movies')
            .then(res => {
                console.log(res.data)
                this.setState({
                    movies: res.data
                })
            })
    }
    render() {
        return (
            <section>
                <h1>Daftar Film Terbaik</h1>
                <div id="article-list">
                    {this.state.movies !== [] && this.state.movies.map(movie => (
                        <div className="article" key={movie.id}>
                            <h3 className="title">{movie.title}</h3>
                            <div className="article_body">
                                <div className="poster">
                                    <img src={movie.image_url} alt="poster" />
                                </div>
                                <ul>
                                    <li>Rating : {movie.rating}</li>
                                    <li>Durasi : {movie.duration}</li>
                                    <li>Genre : {movie.genre}</li>
                                </ul>
                            </div>
                            <p><strong>Deskripsi : </strong> {movie.description}</p>
                            <hr />
                        </div>
                    ))}
                </div>
            </section>
        )
    }
}

export default Home
