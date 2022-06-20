import apiUrl from '../apiConfig'
import axios from 'axios'

// index by season 
export const getQueensBySeason = (season) => {
    return axios(`${apiUrl}/dragball/season/${season}`)
}

// index by winners
export const getAllWinners = () => {
    return axios(`${apiUrl}/dragball/winners`)
}

// index by miss congeniality
export const getAllCongenialities = () => {
    return axios(`${apiUrl}/dragball/congeniality`)
}
