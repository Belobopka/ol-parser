import { useQuery } from "@tanstack/react-query";
import React from "react";


type TFlatProps = {
    id: string; 
}

const Flat = ({id}: TFlatProps) => {
    const { isPending, error, data } = useQuery({
        queryKey: [`flat_${id}`],
        queryFn: () =>
          fetch('http://127.0.0.1:3030/flats?price=85000').then((res) =>
            res.json(),
          ),
      })
      
      if (isPending) return 'Loading...'
    
      if (error) return 'An error has occurred: ' + error.message
    return (
        <div>
            <h1>Flat</h1>
        </div>
    );
}

export default Flat;