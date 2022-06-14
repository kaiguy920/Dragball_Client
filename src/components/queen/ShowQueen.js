import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { createQueenFav, getOneQueen } from '../../api/queen'
import { useParams, useNavigate } from 'react-router-dom'
import { Spinner, Container, Card, Button, Form } from 'react-bootstrap'

const cardContainerLayout = {
    display: 'flex',
    justifyContent: 'center',
    flexFlow: 'row wrap'
}

const ShowQueen = (props) => {

    const [queen, setQueen] = useState(null)
    const { user, msgAlert } = props
    const { id } = useParams()
    const navigate = useNavigate()

    // console.log('id in showQueen', id)

    // empty dependency array in useEffect to act like component did mount
    useEffect(() => {
        getOneQueen(id)
            .then(res => setQueen(res.data))
            .then(() => {
                // msgAlert({
                //     heading: 'The spooky place has been retrieved!',
                //     message: showPlaceSuccess,
                //     variant: 'success',
                // })
            })
            .catch(() => {
                // msgAlert({
                //     heading: 'Failed to find the spooky place',
                //     message: showPlaceFailure,
                //     variant: 'danger',
                // })
            })
    })


    if (!queen) {
        return (
            <Container fluid className="justify-content-center">
                <Spinner animation="border" role="status" variant="warning" >
                    <span className="visually-hidden">Loading....</span>
                </Spinner>
            </Container>
        )
    }

    function Lipsync() {
        let lipsyncWin = 0
        queen?.lipsyncs?.map(lipsync => {
            // console.log("lipsync", lipsync);
            if (lipsync.won) {
                lipsyncWin += 1
            }
        })
        return <li>Wins: {lipsyncWin}</li>
    }

    function BattingAvg() {
        const howMany = queen?.lipsyncs?.length
        let lipsyncWin = 0
        queen?.lipsyncs?.map(lipsync => {
            // console.log("lipsync", lipsync);
            if (lipsync.won) {
                lipsyncWin += 1
            }
        })
        let ba = (howMany / lipsyncWin).toFixed(2)
        return <p><b>Batting Average: {ba}</b></p>
    }

    function MiniWin() {
        let miniWin = 0
        queen?.challenges?.map(challenge => {
            // console.log("challenge", challenge);
            if (challenge.type = "mini" && challenge.won) {
                miniWin += 1
            }
        })
        return <li>Mini's: {miniWin}</li>
    }

    function MaxiWin() {
        let maxiWin = 0
        queen?.challenges?.map(challenge => {
            if (challenge.type = "maxi" && challenge.won) {
                maxiWin += 1
            }
        })
        return <li>Maxi's: {maxiWin}</li>
    }

    let queenCard

    if (queen) {
        queenCard =
            <Container className="fluid mt-5">
                <Card>
                    <Card.Header className='card-title'><h2>{queen.name}</h2></Card.Header>
                    <Card.Body className="d-flex justify-content-start">
                        <img className="show-image" src={queen.image_url} style={{ width: '40%', height: '5%' }}></img>
                        <Card.Text className="show-description">
                            <h5>Season: {queen.episodes[0].seasonId}</h5>

                            <h6>Are they a winner, baby?</h6>
                            {
                                queen.winner ?
                                    <li>YASSSSS</li> :
                                    <li>Henny, no</li>
                            }


                            <h6>Miss Congeneality?</h6>
                            {
                                queen.missCongeneality ?
                                    <li>Mhm, she's a queen, for the queens</li> :
                                    <li>No, she's throws the shade</li>
                            }


                            <h4><b>Lip Sync Stats:</b></h4>
                            <li>How Many: {queen?.lipsyncs?.length}</li>
                            <Lipsync />
                            <BattingAvg />

                            <h4><b>Challenge Wins</b></h4>
                            <MiniWin />
                            <MaxiWin />


                        </Card.Text>
                    </Card.Body>
                    <Card.Footer className="show-footer">
                        <a href="javascript:history.back()"><Button className="show-buttons" variant='dark'>Back</Button></a>

                        {
                            user
                                ?
                                <>
                                    <Button onClick={() => createQueenFav()} className='btn btn-secondary'>⭐️</Button>
                                </>

                                :

                                <>
                                    <Link to={`/sign-in`}>
                                        <Button className='show-buttons btn btn-secondary'>⭐️</Button>
                                    </Link>
                                </>
                        }


                    </Card.Footer>
                </Card>
            </Container>

    }

    return (
        <>
            <h2>Not Your Father's Fantasy Dragball League</h2>
            <div style={cardContainerLayout}>
                {queenCard}
            </div>
        </>
    )
}

export default ShowQueen