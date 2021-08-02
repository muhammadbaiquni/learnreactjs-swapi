import React from 'react';

const PersonHeader = ({ name, planets, species }) => {
    return (
        <>
            <h1 className="font-mono text-6xl pt-4">{name}</h1>
            <h2 className="font-mono text-xl">
                {(species.name !== undefined) ? `Species ${species.name} ` : null}
                from planet {planets.name}
            </h2>
        </>
    )
}

export default PersonHeader;