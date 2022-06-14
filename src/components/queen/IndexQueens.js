import React, { useState, useEffect } from 'react'
import { getAllQueens, createQueenFav } from '../../api/queen'
import { Card, Button } from 'react-bootstrap'
import { Link, useNavigate, useParams } from 'react-router-dom'


// I'm going to declare a style object
// this will be used to corral my cards
// we can use basic CSS, but we have to use JS syntax
const cardContainerLayout = {
    display: 'flex',
    justifyContent: 'center',
    flexFlow: 'row wrap'
}

const IndexQueens = (props) => {

    const [queens, setQueens] = useState(null)
    const [fave, setFave] = useState(null)
    const { msgAlert, user } = props
    const { id } = useParams()
    const navigate = useNavigate()

    console.log("USERRRRR HELLO", user)

    useEffect(() => {
        getAllQueens()
            .then(res => {
                setQueens(res.data)
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

    const handleFavSubmit = (queenId, newQueenFav) => {

        createQueenFav(user, queenId, { queen: newQueenFav })
            .then(res => {
                setFave(res.data)
                // console.log("res.data", res.data);
            })
            .then(() => { navigate(`/dragball/myfaves/${user._id}`) })
            .catch(() => {

            })
    }

    if (!queens) {
        return <p>Loading ...</p>
    } else if (queens.length === 0) {
        return <p>Where my girls at; where they at?</p>
    }

    let queenCards

    if (queens.length > 0) {
        queenCards = queens.map(queen => (
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

                        {
                            user
                                ?
                                <>
                                    <Button onClick={() => handleFavSubmit()} variant="outline-secondary">⭐️</Button>
                                </>

                                :

                                <>
                                    <Link to={`/sign-in`}>
                                        <Button variant="outline-secondary">⭐️</Button>
                                    </Link>
                                </>
                        }

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
            <h2>Not Your Father's Fantasy Dragball League</h2>
            <div style={cardContainerLayout}>
                {queenCards}
                <a href="#top"><Button variant='dark'>Back to Top of Page</Button></a>
            </div>
        </>
    )
}

export default IndexQueens