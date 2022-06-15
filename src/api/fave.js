import apiUrl from '../apiConfig'
import axios from 'axios'

// INDEX function
export const getAllFaves = (userId) => {
    return axios(`${apiUrl}/dragball/myfaves/${userId}`)
}

// ADD to team
// POST
export const createTeamMember = (user, queenId, newTeamMember) => {
    console.log('user', user)
    console.log('this is queen added to team', newTeamMember)
    return axios({
        url: `${apiUrl}/dragball/addteam/${queenId}`,
        method: 'POST',
        headers: {
            Authorization: `Token token=${user.token}`
        },
        data: { queen: newTeamMember }
    })
}

// DELETE -> remove function
export const removeQueen = (user, queenId) => {
    console.log('user', user)
    return axios({
        url: `${apiUrl}/dragball/myfaves/${queenId}`,
        method: 'DELETE',
        headers: {
            Authorization: `Token token=${user.token}`
        }
    })
}