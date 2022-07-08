import apiUrl from '../apiConfig'
import axios from 'axios'

// POST -> create function
export const createTeamName = (user, teamId, newTeamName) => {
    console.log('this is newTeamName', newTeamName)
    return axios({
        url: `${apiUrl}/dragball/teamname/${teamId}`,
        method: 'POST',
        headers: {
            Authorization: `Token token=${user.token}`
        },
        data: { TeamName: newTeamName }
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
