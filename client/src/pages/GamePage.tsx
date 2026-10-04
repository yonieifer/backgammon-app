import React from 'react'
import useProfile from '../hooks/useProfile'

function GamePage() {
    const {data, error, isLoading} = useProfile()
  return (
    <>
        {error && <h2>{error}</h2>}
        {isLoading && <h2>Loading...</h2>}
        {data && <article>
                <h1>{data.username}</h1>
                <h2>{data.email}</h2>
                <h3>wins: {data.wins}</h3>
                <h3>losses: {data.losses}</h3>
                <p>created at {data.createdAt}</p>
            </article>}
    </>
  )
}

export default GamePage

