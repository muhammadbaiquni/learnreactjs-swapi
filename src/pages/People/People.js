import React, { useEffect, useState} from 'react';
import { PEOPLE_URL } from '../../config';
import PersonHeader from '../../components/Person/PersonHeader';
import PersonInfo from '../../components/Person/PersonInfo';
import PersonFilm from '../../components/Person/PersonFilm';
import PersonVehicles from '../../components/Person/PersonVehicles';
import PersonStarships from '../../components/Person/PersonStarships';

const People = (props) => {

    const { peopleId } = props.match.params;

    const [person, setPerson] = useState(null);
    const [personName, setPersonName] = useState(null);
    const [planets, setPlanets] = useState(null);
    const [species, setSpecies] = useState(null);
    const [films, setFilms] = useState(null);
    const [vehicles, setVehicles] = useState(null);
    const [starships, setStarships] = useState(null);

    const fetchSpecific = async (type, endpoint) => {
        const result = (endpoint === null || endpoint.length > 0)
            ? await (await fetch(endpoint)).json() 
            : null;

        switch(type) {
            case 'planets':
                setPlanets(result);
                break;
            case 'species':
                setSpecies(result);
                break;
            default:
                break;
        }
    }

    const fetchMultiple = async (type, endpoint) => {
        const result = endpoint.length > 0
            ? await Promise.all(endpoint.map(async url => {
                return await (await fetch(url)).json();
            }))
            : null;

        switch(type) {
            case 'films':
                setFilms(result);
                break;
            case 'vehicles':
                setVehicles(result);
                break;
            case 'starships':
                setStarships(result);
                break;
            default:
                break;
        }
    }

    useEffect(() => {
        const fetchItems = async () => {
            const result = await (await fetch(`${PEOPLE_URL}${peopleId}`)).json();

            // get planet
            fetchSpecific('planets', result.homeworld);

            // get species
            fetchSpecific('species', result.species)

            // get films
            fetchMultiple('films', result.films);

            // get vehicles
            fetchMultiple('vehicles', result.vehicles);

            // get startships
            fetchMultiple('starships', result.starships);
            
            setPerson(result);
            setPersonName(result.name);
        }

        fetchItems();
    }, [peopleId])

    return(
        <div className="p-4">
            <PersonHeader name={personName} planets={planets} species={species} />
            <PersonInfo info={person} />
            <PersonFilm films={films} />
            <PersonVehicles vehicles={vehicles} />
            <PersonStarships starships={starships} />
        </div>
    )

}

export default People;