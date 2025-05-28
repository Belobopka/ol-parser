import React, { use, useRef } from 'react';

import './App.css';
import { useQuery } from '@tanstack/react-query';

const App = () => {
  const text = useRef('85000');
  const { isPending, error, data, refetch } = useQuery({
    queryKey: ['repoData'],
    queryFn: () =>
      fetch(`http://127.0.0.1:3030/flats?price=${text.current}`).then((res) =>
        res.json(),
      ),
  });

  if (isPending) return 'Loading...';

  if (error) return 'An error has occurred: ' + error.message;

  const renderElement = (element: any) => {
    return (
      <div>
        <div>
          <a href={element.href} className="element_image" target="_blank">
            <img src={element.image} className="element_image" />
          </a>
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
    );
  };

  const handleChangeText = (value: any) => {
    text.current = value.nativeEvent.target.value;
  };
  const handleClick = (value: any) => {
    refetch();
  };

  return (
    <div>
      <button onClick={handleClick} className="element_image" />
      <input onChange={handleChangeText} />
      {data.map(renderElement)}
    </div>
  );
};

export default App;
