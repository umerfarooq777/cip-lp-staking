import React from 'react'

const TxLoader = ({ msg }) => {
    return (
        <div className="loader-container" >
            <p>{msg}</p>
            <div className="loader"></div>
        </div>
    )
}

export default TxLoader