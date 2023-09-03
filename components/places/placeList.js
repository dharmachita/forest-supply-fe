import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Box from '@mui/material/Box';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import ListItemText from '@mui/material/ListItemText';
import AirplanemodeActiveIcon from '@mui/icons-material/AirplanemodeActive';
import AirportShuttleIcon from '@mui/icons-material/AirportShuttle';
import LocalTaxiIcon from '@mui/icons-material/LocalTaxi';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import { green, pink } from '@mui/material/colors';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';

const estado = (status)=>{
    if (status==='Cosecha') {
        return <Chip label={status} color="primary" variant="outlined" />
    }
    if (status==='En Tránsito') {
        return <Chip label={status} color="warning" variant="outlined" />
    }
    if (status==='Depósito') {
        return <Chip label={status} color="warning" variant="outlined" />
    }
    if (status==='Entregado') {
        return <Chip label={status} color="success" variant="outlined" />
    }
    return null;
}

const formatoFecha=(fecha)=>{
    return `${fecha.slice(8,10)}-${fecha.slice(5,7)}-${fecha.slice(0,4)} ${fecha.slice(11)}`
}

const setAvatar = (tipo)=>{
    if (tipo==='Auto') {
        return <LocalTaxiIcon />
    }
    if (tipo==='Colectivo') {
        return <AirportShuttleIcon />
    }
    if (tipo==='Camión') {
        return <LocalShippingIcon />
    }
    if (tipo==='Avión') {
        return <AirplanemodeActiveIcon />
    }
    return null;
}

const getInicioTiempo = (tracking)=>{
    return formatoFecha(tracking[0].timestamp);
}

const getFinTiempo = (tracking)=>{
    return formatoFecha(tracking[tracking.length - 1].timestamp);
}

export default function PlacesList({routes,setPos,setColor}) {
    
    const setFinalPos=(routes)=>{
        const track=routes[routes.length-1].tracking;
        setPos({lat:track[track.length-1].lat, lng:track[track.length-1].lng});    
    }


    return (
        <List sx={{ width: '100%', maxWidth: 360, color:'white' }}>
            {
                routes.map((route,index)=>{
                    return(
                        <div key={index}>
                            <Box sx={{color:'white', display:'flex',justifyContent:'space-evenly'}}>
                                <Tooltip title="">
                                    <IconButton onClick={()=>setPos({lat:route?.tracking[0].lat,lng:route?.tracking[0].lng})}>
                                        <LocationOnIcon sx={{ color: pink[500]}}/>
                                    </IconButton>
                                </Tooltip>
                            </Box>
                            <ListItem alignItems="flex-start">
                                <ListItemButton onClick={()=>setColor(index)}>
                                    <ListItemAvatar>
                                        <Avatar sx={{ bgcolor: green[500]}}>
                                            {setAvatar(route?.tipo)}
                                        </Avatar>   
                                    </ListItemAvatar>
                                    <ListItemText
                                        primary={
                                            <Typography
                                                sx={{ display: 'block'}}
                                                variant="h6"
                                                color="white"
                                            >
                                                {route?.responsable}    
                                            </Typography>
                                        }
                                        secondary={
                                            <React.Fragment>
                                                <Typography
                                                    sx={{ display: 'block' }}
                                                    component="span"
                                                    variant="body2"
                                                    color="white"
                                                >
                                                    {`Remito: ${route?.remito}`}    
                                                </Typography>
                                                <Typography
                                                    sx={{ display: 'block' }}
                                                    component="span"
                                                    variant="body2"
                                                    color="white"
                                                >
                                                    {`Inicio: ${getInicioTiempo(route.tracking)}`}    
                                                </Typography>
                                                <Typography
                                                    sx={{ display: 'block', paddingBottom:'5px' }}
                                                    component="span"
                                                    variant="body2"
                                                    color="white"
                                                >
                                                    {`Fin: ${getFinTiempo(route.tracking)}`}    
                                                </Typography>
                                            </React.Fragment>
                                        }
                                    />
                                </ListItemButton>
                            </ListItem>
                        </div>
                    )
                })
            }
            <Box sx={{color:'white', display:'flex',justifyContent:'space-evenly'}}>
                <Tooltip title="">
                    <IconButton onClick={()=>setFinalPos(routes)}>
                        <LocationOnIcon sx={{ color: pink[500]}}/>
                    </IconButton>
                </Tooltip>
            </Box>
        </List>
  );
}

