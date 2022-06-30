import React, { useState, useEffect } from 'react'
import { createTeamName, updateteamName } from '../../api/teamName'
import { Modal, Button } from 'react-bootstrap'
import { Link, useNavigate, useParams } from 'react-router-dom'


const TeamName = () => {
    const [teamName, setTeamName] = useState({ name: '' })
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
        createTeamName(teamName)
            .then(() => setUpdated(true))
            .catch(() => {
            })

    }

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton></Modal.Header>
            <Modal.Body>
                <ToyForm
                    teamName={teamName}
                    handleChange={handleChange}
                    handleSubmit={handleSubmit}
                    heading="Add a team name"
                />
            </Modal.Body>
        </Modal>
    )
}

export default TeamName