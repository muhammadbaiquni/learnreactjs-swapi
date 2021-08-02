import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { PEOPLE_URL } from '../../config';
import LoadMoreBtn from '../LoadMoreBtn/LoadMoreBtn';
import NavItem from './NavItems';
import logo from "../../images/starwars_logo.svg";

const Navigation = () => {

    const [people, setPeople] = useState([]);
    const [peopleNext, setPeopleNext] = useState(null);

    const updateItems = async () => {
        const result = await (await fetch(`${peopleNext}`)).json();

        setPeople([...people, ...result.results]);
        setPeopleNext(result.next);
    }

    useEffect(() => {
        const fetchItem = async () => {
            try {
                const result = await (await fetch(`${PEOPLE_URL}`)).json();

                setPeople(people => [...people, ...result.results]);
                setPeopleNext(result.next);
            } catch (err) {
                console.log(`Error: ${err}`);
            }            
        }

        fetchItem();
    }, []);

    return (
        <div className="flex flex-col w-full md:w-64 text-gray-700 bg-white flex-shrink-0">
            <nav className="flex-grow md:block px-4 pb-4 md:pb-0 md:overflow-y-auto">
                <Link to="/">
                    <img src={logo} alt="Star Wars Logo" />
                </Link>

                {people !== null 
                    ? people.map( (element, i) => {
                    return <NavItem
                            key={i}
                            clickable={true}
                            peopleUrl={element.url}
                            peopleName={element.name} />
                        })
                    : null}
            
                {(peopleNext !== null) && <LoadMoreBtn onClick={updateItems} />}
            </nav>
        </div>
    )
}

export default Navigation;