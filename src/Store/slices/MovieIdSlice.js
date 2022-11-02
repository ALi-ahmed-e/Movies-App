import { createSlice } from '@reduxjs/toolkit'


const initstate = {Movie:''}

const MovieIdSlice = createSlice({
    name: "MovieId",
    initialState: initstate,
    reducers: {
        setMovieId: (state, action) => {


            state.Movie = action.payload


        },
    }
})


export default MovieIdSlice.reducer
export const MovieAction = MovieIdSlice.actions