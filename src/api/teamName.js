import apiUrl from '../apiConfig'
import axios from 'axios'

// POST -> create function
export const createTeamName = (user, newTeamName) => {
    console.log('this is newTeamName', newTeamName)
    console.log('user', user);
    return axios({
        url: `${apiUrl}/dragball/teamname/${user._id}`,
        method: 'POST',
        headers: {
            Authorization: `Token token=${user.token}`
        },
        data: { teamName: newTeamName }
    })
}

// PATCH -> update function
export const updateteamName = (updatedTeamName) => {
    console.log('this is updatedteamName', updatedTeamName)
    return axios({
        url: `${apiUrl}/dragball/teamname/${updatedTeamName.id}`,
        method: 'PATCH',
        data: { teamName: updatedTeamName }
    })
}
