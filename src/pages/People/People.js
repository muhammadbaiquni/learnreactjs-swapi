import React, { Component } from 'react';
import { PEOPLE_URL } from '../../config';
import PersonHeader from '../../components/Person/PersonHeader';
import PersonInfo from '../../components/Person/PersonInfo';
import PersonFilm from '../../components/Person/PersonFilm';
import PersonVehicles from '../../components/Person/PersonVehicles';
import PersonStarships from '../../components/Person/PersonStarships';

class People extends Component {
    state = {
        person: null,
        person_name: null,
        planets: null,
        species: [],
        films: [],
        vehicles: [],
        starships: []
    };

    componentDidMount() {
        const { peopleId } = this.props.match.params;

        const endpoint = `${PEOPLE_URL}${peopleId}`;
        this.fetchItem(endpoint);
    }

    componentDidUpdate(prevProps) {
        if (this.props.match.params !== prevProps.match.params) {
            const { peopleId } = this.props.match.params;

            const endpoint = `${PEOPLE_URL}${peopleId}`;
            this.fetchItem(endpoint);
        }
    }

    fetchItem = async (endpoint) => {
        const result = await (await fetch(endpoint)).json();
        
        this.setState({
            person: result,
            person_name: result.name,
            planets: result.homeworld,
            species: result.species,
            films: result.films,
            // vehicles: result.vehicles,
            // starships: result.starships
        });

        result.homeworld && this.fetchSpecific(result.homeworld, 'planets');

        if(result.species.length > 0) {
            this.fetchSpecific(result.species, 'species')
        }

        if(result.films.length > 0) {
            this.fetchMultiple('films', result.films);
        }

        if(result.vehicles.length > 0) {
            this.fetchMultiple('vehicles', result.vehicles);
        }

        if(result.vehicles.length > 0) {
            this.fetchMultiple('starships', result.starships);
        }
    }

    fetchSpecific = async (endpoint, type) => {
        const result = await (await fetch(endpoint)).json();
        
        this.setState({
            [type]: result
        });
    }

    fetchMultiple = async (type, endpoint) => {
        const result = await Promise.all(endpoint.map(async url => {
            return await (await fetch(url)).json();
        }));

        this.setState({
            [type]: result
        });

        console.log(this.state)
    }

    render() {
        const { person, person_name, species, planets, films, vehicles, starships } = this.state;

        return (
            <div className="p-4">
                {(planets) ?
                    <PersonHeader name={person_name} planets={planets} species={species} />
                : null }

                {person ?
                    <PersonInfo info={person} />
                : null }

                {films.length > 0 ?
                    <PersonFilm films={films} />
                : null }

                {vehicles.length > 0 ?
                    <PersonVehicles vehicles={vehicles} />
                : null }

                {starships.length > 0 ?
                    <PersonStarships starships={starships} />
                : null }
            </div>
        )
    }
}

export default People;