import React, { useState, useEffect } from 'react'
import { createTeamName, updateteamName } from '../../api/teamName'
import { Modal, Button } from 'react-bootstrap'
import { Link, useNavigate, useParams } from 'react-router-dom'


const TeamNameModal = (props) => {
    const [teamName, setTeamName] = useState({ name: '' })
    const { user, team, show, handleClose, msgAlert, triggerRefresh } = props
    const handleChange = (e) => {
        e.persist()
        setTeamName((prevTeamName) => {
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
        createTeamName(teamName, user)
            .then(() => handleClose())
            // then we send a success message
            .then(() =>
                msgAlert({
                    heading: 'Team Name',
                    message: 'You have the nerve',
                    variant: 'success',
                }))
            .then(() => triggerRefresh())
            // if there is an error, we'll send an error message
            .catch(() =>
                msgAlert({
                    heading: 'Oh No!',
                    message: 'that aint it',
                    variant: 'danger',
                }))

    }

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton></Modal.Header>
            <Modal.Body>
                <TeamNameForm
                    teamName={teamName}
                    handleChange={handleChange}
                    handleSubmit={handleSubmit}
                    heading="Add a team name"
                />
            </Modal.Body>
        </Modal>
    )
}

export default TeamNameModal