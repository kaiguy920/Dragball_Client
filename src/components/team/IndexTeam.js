import React, { useState, useEffect } from 'react'
import { getAllTeamMembers, removeTeamMember, addTeamName } from '../../api/team'
import { Card, Button } from 'react-bootstrap'
import { Link, useNavigate, useParams } from 'react-router-dom'
import TeamNameModal from './TeamNameModal'



const cardContainerLayout = {
    display: 'flex',
    justifyContent: 'center',
    flexFlow: 'row wrap'
}

const IndexTeam = (props) => {
    const [teamMembers, setTeamMembers] = useState(null)
    const [teamName, setTeamName] = useState({ teamName: '' })
    const [teamNameModalOpen, setTeamNameModalOpen] = useState(false)
    const { msgAlert, user } = props
    const [updated, setUpdated] = useState(false)
    const { id } = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        getAllTeamMembers(id)
            .then(res => {
                console.log("team index res.data", res.data.team);
                setTeamMembers(res?.data?.team)
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

    const removeTheTeamMember = (queen) => {
        // console.log("removeTheQueen id", queen._id)

        removeTeamMember(user, queen?._id)
            // .then(() => { navigate(`/dragball/myfaves/${user._id}`) })
            .then(() => setUpdated())
            .catch(() => {
            })
    }

    if (!teamMembers) {
        return <p>Loading ...</p>
    } else if (teamMembers.length === 0) {
        return <p>Where my girls at; where they at?</p>
    }

    // function ShowTeamName() {
    //     if (user && teamName) {
    //         return (<h2>{teamName?.name}</h2>)
    //     }
    //     else {
    //         return (<Button onClick={() => setTeamNameModalOpen(true)} className="m-2" variant="info">
    //             Set Team Name
    //         </Button>)

    //     }
    // }

    let queenCards
    const team = teamMembers[0].teamMembers
    // console.log("const team", team);

    if (teamMembers.length > 0) {
        queenCards = team.map(queen => (
            <Card key={queen._id} style={{ width: '30%' }} className="m-2">
                {console.log("queen team", queen)}

                <Card.Body className="card-body d-flex flex-column justify-content-end">

                    <p><img style={{ width: '80%', height: '100%' }} src={queen?.image}></img></p>

                    <Card.Text className="card-text">
                        <h5 className="header-name">{queen?.name}</h5>

                        <Button onClick={() => removeTheTeamMember(queen)} variant="outline-danger">Sashay Away</Button>
                    </Card.Text>
                </Card.Body>
            </Card>
        ))
    }


    return (
        <>
            <h2>My Team</h2>
            {console.log("Team Name", teamName)}
            {
                teamName.teamName ?
                    <h3>{teamName.teamName}</h3>
                    :

                    <Button onClick={() => setTeamNameModalOpen(true)} className="m-2" variant="info">
                        Set Team Name
                    </Button>
            }
            {/* <Button onClick={() => setTeamNameModalOpen(true)} className="m-2" variant="info">
                Set Team Name
            </Button>
            {/* <ShowTeamName /> */}
            <TeamNameModal
                teamName={teamName}
                show={teamNameModalOpen}
                user={user}
                msgAlert={msgAlert}
                triggerRefresh={() => setUpdated(prev => !prev)}
                handleClose={() => setTeamNameModalOpen(false)}
            />
            <div style={cardContainerLayout}>
                {queenCards}
                {/* <a href="#top"><Button variant='dark'>Back to Top of Page</Button></a> */}

            </div>
        </>
    )
}

export default IndexTeam