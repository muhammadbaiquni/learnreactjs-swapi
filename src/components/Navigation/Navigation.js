import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { PEOPLE_URL } from '../../config';
import LoadMoreBtn from '../LoadMoreBtn/LoadMoreBtn';
import logo from '../../images/starwars_logo.svg';
import NavItem from './NavItems';

class Navigation extends Component {
    state = {
        people: [],
        peopleNext: null,
        peoplePrev: null,
        loading: true
    }

    componentDidMount() {
        this.fetchItems(this.createEndpoint(false));
    }

    createEndpoint = (loadMore) => {
        return loadMore ? this.state.peopleNext : `${PEOPLE_URL}`;
    }

    updateItems = (loadMore) => {
        this.setState({
            people: loadMore ? [...this.state.people] : [],
            loading: true,
        }, () => {
            this.fetchItems(this.createEndpoint(loadMore));
        })
    }

    fetchItems = async endpoint => {
        const { people } = this.state;

        const result = await (await fetch(endpoint)).json();
        this.setState({
            people: [...people, ...result.results],
            peopleNext: result.next,
            peoplePrev: result.prev,
            loading: false
        })
    }

    render() {
        const { people, peopleNext } = this.state;

        return (
            <div className="flex flex-col w-full md:w-64 text-gray-700 bg-white flex-shrink-0">
                <nav className="flex-grow md:block px-4 pb-4 md:pb-0 md:overflow-y-auto">
                    <Link to="/">
                        <img src={logo} alt="Starwars Logo" />
                    </Link>
                    
                    {people.map( (element, i) => {
                        return <NavItem
                                key={i}
                                clickable={true}
                                peopleUrl={element.url}
                                peopleName={element.name} />
                    })}

                    {(peopleNext !== null) && <LoadMoreBtn onClick={this.updateItems} />}
                    
                </nav>
            </div>
        )
    }
}

export default Navigation;