import React from 'react';

const PersonFilm = ({films}) => {
    const renderedItems = () => {
        if(films === null)
            return null;

        let rendered = films.map((element, i) => {
            return (
                <li key={i}>{element.title}</li>
            )
        })

        return rendered;
    }
    
    return(
        <div className="bg-gray-100 p-5 my-5">
            <h2 className="text-3xl pb-4">Films</h2>
            <ul>
                {renderedItems()}
            </ul>
        </div>
    )
}

export default PersonFilm;