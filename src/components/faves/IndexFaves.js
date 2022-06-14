import React, { useState, useEffect } from 'react'
import { getAllFaves, removeQueen } from '../../api/fave'
import { Card, Button } from 'react-bootstrap'
import { Link, useNavigate, useParams } from 'react-router-dom'


const cardContainerLayout = {
    display: 'flex',
    justifyContent: 'center',
    flexFlow: 'row wrap'
}

const IndexFaves = (props) => {

    const [faves, setFaves] = useState(null)
    const { msgAlert, user } = props
    const [updated, setUpdated] = useState(false)
    const { id } = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        getAllFaves(id)
            .then(res => {
                setFaves(res.data.queens)
            })
            .then(() => {
                // msgAlert({
                //     heading: 'Spooky Places have been retrieved!',
                //     message: indexPlacesSuccess,
                //     variant: 'success',
                // })
            })
            .catch(() => {
                // msgAlert({
                //     heading: 'Failed to retrieve Spooky Places!',
                //     message: indexPlacesFailure,
                //     variant: 'danger',
                // })
            })
    }, [updated])

    const removeTheQueen = (queen) => {
        // console.log("removeTheQueen id", queen._id)

        removeQueen(user, queen._id)
            .then(() => setUpdated(true))
            .catch(() => {
            })
    }

    if (!faves) {
        return <p>Loading ...</p>
    } else if (faves.length === 0) {
        return <p>Where my girls at; where they at?</p>
    }

    let queenCards

    if (faves.length > 0) {
        queenCards = faves.map(queen => (
            <Card key={queen.id} style={{ width: '30%' }} className="m-2">
                {console.log("queen", queen)}

                <Card.Body className="card-body d-flex flex-column justify-content-end">

                    <p><img style={{ width: '80%', height: '100%' }} src={queen?.image}></img></p>

                    <Card.Text className="card-text">
                        <h5 className="header-name">{queen.name}</h5>

                        <Button variant="outline-secondary">She's Team Material</Button>
                        <Button onClick={() => removeTheQueen(queen)} variant="outline-danger">Sashay Away</Button>
                    </Card.Text>
                </Card.Body>
            </Card>
        ))
    }

    return (
        <>
            <h2>My Faves</h2>
            <div style={cardContainerLayout}>
                {queenCards}
                {/* <a href="#top"><Button variant='dark'>Back to Top of Page</Button></a> */}
            </div>
        </>
    )
}

export default IndexFaves