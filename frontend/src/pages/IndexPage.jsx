import React from 'react';
import { Link } from 'react-router-dom';
import { useGetPlacesQuery } from '../slices/placeApiSlice';

const IndexPage = () => {
  const { data: places } = useGetPlacesQuery();

  return (
    <div className="mt-8 grid gap-x-6 gap-y-8 grid-cols-2 md:grid-cols-3 lg:grid-cols-3">
      {places?.length > 0 ? (
        places?.map((place, index) => (
          <Link to={'/places/' + place._id} key={index}>
            <div className="bg-gray-500 mb-2 rounded-2xl flex">
              {place?.photos?.[0] && (
                <img
                  className="rounded-2xl object-cover aspect-square"
                  src={'http://localhost:5000' + place?.photos[0]}
                />
              )}
            </div>
            <h3 className="text-sm text-gray-500">{place.title}</h3>
            <h2 className="font-bold">{place.address}</h2>
            <div className="mt-1">
              <span className="font-bold">${place.price}</span> per night
            </div>
          </Link>
        ))
      ) : (
        <h2>No Places at the moment!!</h2>
      )}
    </div>
  );
};

export default IndexPage;
