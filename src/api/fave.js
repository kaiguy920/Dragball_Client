// DELETE -> remove function
export const removeQueen = (user, queenId) => {
    console.log('user', user)
    return axios({
        url: `${apiUrl}/dragball/myfaves/${queenId}`,
        method: 'DELETE',
        headers: {
            Authorization: `Token token=${user.token}`
        }
    })
}