import React, { use, useEffect, useRef } from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useQuery } from '@tanstack/react-query';
import {
  createTheme,
  ThemeProvider,
  useColorScheme,
} from '@mui/material/styles';

import './App.css';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

const App = () => {
  const text = useRef('85000');
  const { isPending, error, data, refetch, isFetching } = useQuery({
    queryKey: ['repoData'],
    queryFn: () =>
      fetch(`http://127.0.0.1:3030/flats?price=${text.current}`).then((res) =>
        res.json(),
      ),
  });

  const onNavigate = (href: string) => {
    // href
    const bebe = href;

    return () => {
      //
      window.open(bebe);
    };
  };

  const renderElement = (element: any) => {
    const funcClosure = onNavigate(element.href);
    //     return () => {
    //
    //   window.open(bebe);
    // };

    return (
      <Card
        classes={{ root: 'myRoot' }}
        sx={{ maxWidth: 345, width: 345, height: 600 }}
      >
        <CardMedia sx={{ height: 300 }} image={element.image} />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {element.title}
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            {element.price}
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            {element.locationDate}
          </Typography>
        </CardContent>
        <CardActions>
          <Button
            onClick={() => {
              window.open(element.href);
            }}
            size="small"
          >
            Learn More
          </Button>
        </CardActions>
      </Card>
    );
  };

  const handleChangeText = (value: any) => {
    text.current = value.nativeEvent.target.value;
  };
  const handleClick = (value: any) => {
    refetch();
  };

  if (!data) return null;

  return (
    <ThemeProvider theme={darkTheme}>
      <div>
        <Button onClick={handleClick} variant="contained">
          Refresh
        </Button>

        <input onChange={handleChangeText} />
        <div className="render_screen">{data.map(renderElement)}</div>
        {isFetching ? <span className="loader"></span> : null}
      </div>
    </ThemeProvider>
  );
};

export default App;
