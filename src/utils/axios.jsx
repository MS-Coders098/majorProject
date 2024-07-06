import axios from "axios";

const apiCall = axios.create({
    baseURL: "https://api.themoviedb.org/3/",
    headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiMTk2ZTJmYjdjMDE1NmRmYTk5YTgwNjkyYzFhZDgzYyIsInN1YiI6IjY1ZGQ2MTIyMmFjNDk5MDE3ZGNiMDZjMSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.PMSqxOmeI9v1Uz57ojQdETLgsDJUT23UUGHkgFB6KXA'
    }
})

export default apiCall