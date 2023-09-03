'use client'
import { useState,useEffect } from "react"
import { useLoadScript } from "@react-google-maps/api";
import Map from "@/components/map/maps";
import { trackingData } from '@/utils/data/trackingData';
import { CircularProgress,Box } from '@mui/material';

export default function DynamicPage({params}) {
    const [data,setData]=useState(null);
    const [lat,setLat]=useState(31.322640634887584);
    const [lng,setLng]=useState(64.22160729994113);
    const [loading,setLoading]=useState(true);
    const { isLoaded } = useLoadScript({
        googleMapsApiKey: process.env.NEXT_PUBLIC_MAPS_API_KEY,
        libraries: ["places"],
    });

    useEffect(() => {  
        const cargaDatos=async()=>{
          setTimeout(() => { 
            const filterData=trackingData.filter(item=>item.id===params.id)[0];
            const mov=filterData?.movimientos;
            const track=mov[mov.length-1].tracking;
            setData(filterData);
            setLat(track[track.length-1].lat);
            setLng(track[track.length-1].lng);
            setLoading(false);
          }, 2500);
        }
        setLoading(true);
        cargaDatos();
      }, [])

    if (!isLoaded||loading) {
        return (
            <Box className='container' sx={{ justifyContent:'center',alignItems:'center' }}>
                <CircularProgress color="success" />
            </Box>);
    }
    return <Map data={data} lat={lat} lng={lng}/>;
}