'use client'

import { useState,useMemo,useRef,useCallback } from "react"
import { GoogleMap,Marker,Polyline } from "@react-google-maps/api"
import PlacesList from "@/components/places/placeList";

export default function Map({data,lat,lng}) {
    const [pos,setPos]=useState(null);
    const [colors,setColor]=useState(null);
    const mapRef = useRef();

    const getFinalPos=(mov)=>{
        const track=mov[mov.length-1].tracking;
        return {lat:track[track.length-1].lat, lng:track[track.length-1].lng};    
    }

    const center = useMemo(()=>({
        lat,
        lng
    }),[]);

    const options = useMemo(()=>({
        mapId:"c0f3571935569caf",
        disableDefaultUI:true,
        clickableIcons:false
    }),[])

    const onLoad = useCallback((map)=>(mapRef.current=map),[]);

    return (
        <div className="container">
            <div className="controls">
                <PlacesList 
                    routes={data?.movimientos} 
                    setPos={(position) => {
                        setPos(position);
                        mapRef.current?.panTo(position);
                      }}
                    setColor={setColor}               
                />
            </div>
            <div className="map">
                <GoogleMap 
                    zoom={10}
                    center={center}
                    mapContainerClassName="map-container"
                    options={options}
                    onLoad={onLoad}
                >
                    {
                        data?.movimientos.map(
                            (mov,index)=>{
                                return(
                                    <Polyline
                                        key={index}
                                        path={mov?.tracking}
                                        geodesic={true}
                                        options={{
                                            strokeColor: colors===index?"blue":"white",
                                            strokeOpacity: 0.75,
                                            strokeWeight: 2
                                        }}
                                    /> 
                                )
                            }
                        )
                    }
                    {
                        data?.movimientos.map(
                            (mov,index)=>{
                                return(
                                    <Marker
                                        key={index}
                                        position={mov?.tracking[0]}
                                    />
                                )
                            }
                        )
                    }
                    <Marker
                        position={getFinalPos(data?.movimientos)}
                    />
                </GoogleMap>
            </div>
        </div>
  )
}

  