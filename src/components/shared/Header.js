import React, { Fragment } from 'react'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import { Link } from 'react-router-dom'
const linkStyle = {
	color: 'white',
	textDecoration: 'none'
}
const authenticatedOptions = (user) => (
	<>
		<Nav.Item>
			<Link to={`/dragball/myfaves/${user._id}`} style={linkStyle}>
				My Faves 💄
			</Link>
		</Nav.Item>
		<Nav.Item>
			<Link to={`/dragball/myteam/${user._id}`} style={linkStyle}>
				My Team 🏈
			</Link>
		</Nav.Item>
		<Nav.Item>
			<Link to='change-password' style={linkStyle}>
				Change Password
			</Link>
		</Nav.Item>
		<Nav.Item>
			<Link to='sign-out' style={linkStyle}>
				Sign Out
			</Link>
		</Nav.Item>
	</>
)

const unauthenticatedOptions = (
	<>
		<Nav.Item>
			<Link to='sign-up' style={linkStyle}>Sign Up</Link>
		</Nav.Item>
		<Nav.Item>
			<Link to='sign-in' style={linkStyle}>Sign In</Link>
		</Nav.Item>
	</>
)

const alwaysOptions = (
	<>
		<Nav.Link>
			<Link to='/dragball' style={linkStyle}>
				Home
			</Link>
		</Nav.Link>
	</>
)

const Header = ({ user }) => (
	<Navbar bg='black' variant='dark' expand='md'>
		<Navbar.Brand>
			<Link to='/' style={linkStyle}>
				✨ Butch Queen Realness ✨
			</Link>
		</Navbar.Brand>
		<Navbar.Toggle aria-controls='basic-navbar-nav' />
		<Navbar.Collapse id='basic-navbar-nav'>
			<Nav className='ml-auto'>
				{user && (
					<span className='navbar-text mr-2'>Welcome, {user.email}</span>
				)}
				{alwaysOptions}
				{user ? authenticatedOptions(user) : unauthenticatedOptions}
			</Nav>
		</Navbar.Collapse>
	</Navbar>
)

export default Header
