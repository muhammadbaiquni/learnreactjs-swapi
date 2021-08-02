import React from 'react';

const LoadMoreBtn = ({onClick}) => {
    return (
        <p
            className="block px-4 py-2 mt-2 text-sm font-semibold text-gray-900 bg-gray-200 rounded-lg hover:text-gray-900 hover:bg-gray-300 text-center"
            onClick={() => onClick(true)}
        >
            Load More
        </p>
    )
}

export default LoadMoreBtn