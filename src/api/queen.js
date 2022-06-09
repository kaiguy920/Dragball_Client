import apiUrl from '../apiConfig'
import axios from 'axios'
// index function
export const getAllQueens = () => {
    return axios(`${apiUrl}/dragball`)
}


// show function
export const getOneQueen = (queenId) => {
    return axios(`${apiUrl}/dragball/${queenId}`)
}


// POST -> create function to push into favorites list
export const createQueenFav = (user, newQueenFav, queenId) => {
    console.log('user', user)
    console.log('this is queen added to fave', newQueenFav)
    return axios({
        url: `${apiUrl}/dragball/addfave/${queenId}`,
        method: 'POST',
        headers: {
            Authorization: `Token token=${user.token}`
        },
        data: { queen: newQueenFav }
    })
}

