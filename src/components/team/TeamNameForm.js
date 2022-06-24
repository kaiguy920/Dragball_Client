import React, { useState } from 'react'
import { Form, Container, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const TeamNameForm = (props) => {

    const { team, handleChange, handleSubmit, cancelPath } = props

    return (
        <Container className="justify-content-center">
            <h2>Team Name</h2>
            <Form onSubmit={handleSubmit}>
                <Form.Label>Get cute with it</Form.Label>
                <Form.Control
                    placeholder="ex: slaytina"
                    value={team.teamName}
                    name='type'
                    onChange={handleChange}
                />
                <div class='links'>

                    <Button type='submit'>Submit</Button>

                    <Link to={cancelPath}>
                        <Button variant="danger">Cancel</Button>
                    </Link>

                </div>

            </Form>
        </Container >
    )
}

export default TeamNameForm