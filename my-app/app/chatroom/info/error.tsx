import React from 'react'

export default function ErrorBoundary({error}: {error: Error}) {
    return (
        <div className='w-full h-screen'>
            <p>{error.message}</p>
        </div>
    )
}
