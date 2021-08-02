import React from 'react';

const PersonInfo = (props) => {
    let exclude = [
        'name', 
        'homeworld', 
        'species',
        'films', 
        'vehicles', 
        'starships',
        'created', 
        'edited',
        'url'
    ];

    const renderedItems = () => {
        let rendered = Object.entries(props.info).map((element, i) => {

            if(exclude.indexOf(element[0]) < 0)
                return (
                    <tr key={i} className="hover:bg-gray-200">
                        <td width="100"><span className="capitalize">{element[0].replace('_', ' ')}</span></td>
                        <td><span className="capitalize">: {element[1]}</span></td>
                    </tr>
                )

            return null;
        })
        
        return rendered;
    }

    return(
        <div className="bg-gray-100 p-5 my-5">
            <table className="table-auto w-full">
                <tbody>
                    {renderedItems()}
                </tbody>
            </table>
        </div>
    )
}

export default PersonInfo;