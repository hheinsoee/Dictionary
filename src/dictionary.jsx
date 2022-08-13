import { Box } from '@mui/material';

import * as React from 'react';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import { useState } from 'react';
import axios from 'axios';
import Result from './components/blocks';
import Loading from './components/loading';
import InfoIcon from '@mui/icons-material/Info';

function Dictionary(props) {
    const [word, setWord] = React.useState(null);
    const [selectedWord, setselectedWord] = React.useState(null);

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [data, setData] = useState(null);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setWord(event.target.value);
    };
    function handleSubmit(event) {
        event.preventDefault();
        //sent server word 
        setselectedWord(word);
        setLoading(true);
        axios.get(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`, {
            params: ''
        })
            .then(function (response) {
                setData(response.data);
                setLoading(false);
                setError(false);
            })
            .catch(function (error) {
                console.log(error);
                setLoading(false);
                setError(error)
            })

    }
    return (
        <div>
            <Paper square
                component="form"
                sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', position: 'sticky', top: 0, zIndex: 1 }}
                onSubmit={handleSubmit}
            >
                <InputBase
                    sx={{ ml: 1, flex: 1 }}
                    placeholder="Search Words"
                    inputProps={{ 'aria-label': 'search Words' }}
                    value={word}
                    onChange={handleChange}
                />
                <IconButton type="submit" sx={{ p: '10px' }} aria-label="search">
                    <SearchIcon />
                </IconButton>
                {/* <IconButton sx={{ p: '10px' }} aria-label="menu">
                    <InfoIcon />
                </IconButton> */}
            </Paper>
            <Box>
                {
                    loading ? <Loading />
                        : error ? <ErrorBox data={error} word={selectedWord} />
                            : data ? <Result data={data} />
                                : ""
                }

            </Box>
        </div>
    );
}

export default Dictionary;



const ErrorBox = (prop) => {
    const data = prop.data.response.data;
    const word = prop.word;
    return (
        <Box sx={{ p: 2 }}>
            <h1>{data.title}</h1>
            <s>{word}</s>
            <p>{data.message}</p>
            <i>{data.resolution}</i>
        </Box>
    )
}
// const Info = () => {
//     return (
        
//     )
// }