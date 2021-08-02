import React from 'react';

const PersonVehicles = ({vehicles}) => {
    const renderedItems = () => {
        if (vehicles === null)
            return null;

        let rendered = vehicles.map((element, i) => {
            return (
                <tr key={i} className="hover:bg-gray-200">
                    <td>{element.name}</td>
                    <td>{element.model}</td>
                    <td>{element.manufacturer}</td>
                </tr>
            )
        })

        return rendered;
    }
    
    return(
        <div className="bg-gray-100 p-5 my-5">
            <h2 className="text-3xl pb-4">Vehicles</h2>
            <table className="table-auto w-full border border-collapse">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Model</th>
                        <th>Manufacture</th>
                    </tr>
                </thead>
                <tbody>
                    {renderedItems()}
                </tbody>
            </table>
        </div>
    )
}

export default PersonVehicles;