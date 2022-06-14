import React, { useState, useEffect } from 'react'
import { getAllFaves } from '../../api/fave'
import { Card, Button } from 'react-bootstrap'
import { Link, useNavigate, useParams } from 'react-router-dom'


const cardContainerLayout = {
    display: 'flex',
    justifyContent: 'center',
    flexFlow: 'row wrap'
}

const IndexFaves = (props) => {

    const [queens, setQueens] = useState(null)
    const [faves, setFave] = useState(null)
    const { msgAlert, user } = props
    const { id } = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        getAllFaves()
            .then(res => {
                setFave(res.data)
                // console.log("res.data", res.data);
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
    }, [])


    if (!faves) {
        return <p>Loading ...</p>
    } else if (faves.length === 0) {
        return <p>Where my girls at; where they at?</p>
    }

    let queenCards

    if (faves.length > 0) {
        queenCards = faves.map(queen => (
            <Card key={queen._id} style={{ width: '30%' }} className="m-2">

                <Card.Body className="card-body d-flex flex-column justify-content-end">
                    {
                        queen.winner ?

                            <>
                                <p><img style={{ width: '80%', height: '100%', border: '5px solid gold' }} src={queen?.image_url}></img></p>
                            </>

                            :

                            <p><img style={{ width: '80%', height: '100%' }} src={queen?.image_url}></img></p>
                    }

                    <Card.Text className="card-text">
                        <h5 className="header-name">{queen.name}</h5>
                        <p>{queen.quote}</p>
                        <Button variant="outline-secondary">She's Team Material</Button>
                        <Link to={`/dragball/${queen.id}`}>
                            <Button variant="secondary">View Stats</Button>
                        </Link>
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
                <a href="#top"><Button variant='dark'>Back to Top of Page</Button></a>
            </div>
        </>
    )
}

export default IndexFaves