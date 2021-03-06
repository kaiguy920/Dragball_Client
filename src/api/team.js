import apiUrl from '../apiConfig'
import axios from 'axios'

// INDEX function
export const getAllTeamMembers = (userId) => {
    return axios(`${apiUrl}/dragball/myteam/${userId}`)
}

// DELETE -> remove function
export const removeTeamMember = (user, queenId) => {
    console.log('user', user)
    return axios({
        url: `${apiUrl}/dragball/myteam/${queenId}`,
        method: 'DELETE',
        headers: {
            Authorization: `Token token=${user.token}`
        }
    })
}