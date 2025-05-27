import React from 'react';

import './App.css';
import {
  useQuery,
} from '@tanstack/react-query'



const App = () => {
  const { isPending, error, data } = useQuery({
    queryKey: ['repoData'],
    queryFn: () =>
      fetch('http://127.0.0.1:3030/flats?price=85000').then((res) =>
        res.json(),
      ),
  })
  
  if (isPending) return 'Loading...'

  if (error) return 'An error has occurred: ' + error.message

  console.log(data)

  const renderElement = (element: any) => {
    return (
      <div>
        <div>
        <img src={element.image} className="element_image" />
        </div>
        <div>
        <span>{element.title}</span>
        </div>
        <div>
        <span>{element.price}</span>
        </div>
        <div>
        <span>{element.locationDate}</span>
        </div>
      </div>
    )
  }

  return (
    <div>
      {data.map(renderElement)}
    </div>
  )
};

export default App;
