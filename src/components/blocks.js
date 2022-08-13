import React from 'react';
import { Paper, Typography, Chip, IconButton } from '@mui/material';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import { Stack } from '@mui/system';

export default function Result(props) {
    const result = props.data
    // const result = Eg;
    return (
        result.map((r, i) =>
            <Paper key={i} square elevation={3} sx={{ mb:4, p:2}}>
                    <Typography variant="h4" component="h2"> {r.word}</Typography>
                    <Stack direction="row" spacing={1} sx={{my:3}}>
                    {r.phonetics.map((p, i) =>
                        <PlaySound key={i} sign={p.text} audio={p.audio} />
                    )}
                    </Stack>
                    <Meaning meanings={r.meanings} />
            </Paper>
        )
    )
}
const PlaySound = (prop) => {
    let sound = prop.audio;
    let sign = prop.sign;
    let audio = new Audio(sound)

    const start = () => {
        audio.play()
    }
    return (
        audio ?
            <Chip aria-label="Play Sound" component={IconButton} onClick={start} icon={<VolumeUpIcon />} label={sign} size="small" />
            :
            "loading voice"

    )
}
const Meaning = (prop) => {
    return (
        prop.meanings.map((m, i) =>
            <div key={i}>
                <Typography variant="h5" component="h3">{m.partOfSpeech}</Typography>
                <Defination definitions={m.definitions} />
            </div>
        )
    )
}

const Defination = (prop) => {
    return (
        <ul>
            {
                prop.definitions.map((d, i) =>
                    <li key={i}>
                        {d.definition}
                        {d.example ? <Example example={d.example} /> : <></>}
                        {d.synonyms.length > 0 ? <Synonyms synonyms={d.synonyms} /> : <></>}
                    </li>
                )
            }
        </ul>
    )
}

const Example = (prop) => {
    return (
        <div><small><i>Eg: {prop.example}</i></small></div>
    )
}
const Synonyms = (prop) => {
    return (
        <div style={{marginTop:"10px"}}>
            <i>synonyms :</i><br />
            <b>{prop.synonyms.join(', ')}</b>
        </div>
    )
}
