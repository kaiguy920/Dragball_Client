import apiUrl from '../apiConfig'
import axios from 'axios'

// POST -> create function
export const createTeamName = (newTeamName) => {
    console.log('this is newTeamName', newTeamName)
    return axios({
        url: `${apiUrl}/TeamName`,
        method: 'POST',
        data: { TeamName: newTeamName }
    })
}

// PATCH -> update function
export const updateteamName = (updatedTeamName) => {
    console.log('this is updatedteamName', updatedTeamName)
    return axios({
        url: `${apiUrl}/teamName/${updatedTeamName.id}`,
        method: 'PATCH',
        data: { teamName: updatedTeamName }
    })
}
