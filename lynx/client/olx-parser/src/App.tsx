import React, { use, useRef } from 'react';

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
  const text = useRef()
  if (isPending) return 'Loading...'

  if (error) return 'An error has occurred: ' + error.message

  console.log(data)

  const renderElement = (element: any) => {
    return (
      <div>
        <div>
        <a href={element.href}className="element_image"  target="_blank"><img src={element.image} className="element_image" /> </a>
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

const handleChangeText = (value: any) => {
  text.current = value.nativeEvent.target.value
}
const handleClick = (value: any) => { fetch(`http://127.0.0.1:3030/flats?price=${text.current}`).then((res) =>
        res.json(),
      )
}
  return (
    <div>
      <button onClick={handleClick}className="element_image"  />
      <input onChange={handleChangeText}/>
      {data.map(renderElement)}
    </div>
  )
};

export default App;
