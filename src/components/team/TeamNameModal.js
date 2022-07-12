import React, { useState, useEffect } from 'react'
import { createTeamName } from '../../api/teamName'
import { Modal } from 'react-bootstrap'

import TeamNameForm from './TeamNameForm'


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
        createTeamName(user, teamName)
            .then(() => handleClose())

            .then(() => triggerRefresh())
            .catch(() => {
            })

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