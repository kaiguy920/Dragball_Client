import React, { useState, useEffect } from 'react'
import { createTeamName, updateteamName } from '../../api/teamName'
import { Card, Button } from 'react-bootstrap'
import { Link, useNavigate, useParams } from 'react-router-dom'
import TeamNameForm from './TeamNameForm'

const TeamName = () => {
    const [teamName, setTeamName] = useState({ name: '' })
    const handleChange = (e) => {
        e.persist()
        createTeamName((prevTeamName) => {
            const name = e.target.name
            const value = e.target.value
            const updatedValue = { [name]: value }


            console.log('prevTeamName', prevTeamName)
            console.log('updatedValue', updatedValue)

            const editedTeamName = Object.assign({}, prevTeamName, updatedValue)

            return editedTeamName
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        addTeamName(teamName)
            .then(() => setUpdated(true))
            .catch(() => {
            })

    }

    return (

        <TeamNameForm
            teamName={teamName}
            handleSubmit={handleSubmit}
            handleChange={handleChange}
            cancelPath={`/dragball/myteam/${userId}`}
        />

    )
}

export default TeamName