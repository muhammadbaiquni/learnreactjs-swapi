import React from 'react';
import { Link } from 'react-router-dom';

const NavItem = ({ peopleUrl, peopleName, clickable }) => {

    const getPeopleId = () => {
        const url = peopleUrl.split('/');

        return `/people/${url[url.length - 2]}`;
    }

    return (
        clickable ?
            <Link
                to={{ pathname: `${getPeopleId()}`,
                      peopleName: `${peopleName}`,
                      peopleUrl: `${peopleUrl}`
                    }}
                className="block px-4 py-2 mt-2 text-sm font-semibold text-gray-900 bg-transparent rounded-lg dark-mode:bg-transparent dark-mode:hover:bg-gray-600 dark-mode:focus:bg-gray-600 dark-mode:focus:text-white dark-mode:hover:text-white dark-mode:text-gray-200 hover:text-gray-900 focus:text-gray-900 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline"
            >
                {peopleName}
            </Link>
        : 
            <Link to="">
                {peopleName}
            </Link>
            
    )
}

export default NavItem;