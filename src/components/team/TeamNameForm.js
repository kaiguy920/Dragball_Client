import React, { useState } from 'react'
import { Form, Container, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const TeamNameForm = (props) => {

    const { teamName, handleChange, handleSubmit, heading } = props

    return (
        <Container className="justify-content-center">
            <h3>{heading}</h3>
            <Form onSubmit={handleSubmit}>
                <Form.Label>Get cute with it</Form.Label>
                <Form.Control
                    placeholder="ex: slaytina"
                    value={teamName.name}
                    name='name'
                    onChange={handleChange}
                />


                <Button type='submit'>Submit</Button>


            </Form>
        </Container >
    )
}

export default TeamNameForm 
