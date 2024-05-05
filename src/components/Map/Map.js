//
// import React, {useEffect, useState} from "react";
// import GoogleMapReact from "google-map-react";
// import {IoLocationSharp} from "react-icons/io5";
// import { geocodeByAddress, getLatLng } from 'react-google-places-autocomplete';
//
// export const Map = () => {
//     const Icon = ({ text }) => <div>{text}</div>;
//     const [coords, setCoords] = useState({});
//     const [address, setAddress] = useState("")
//     const  find = async () => {
//         const result = await geocodeByAddress(address)
//         const latLng = await getLatLng(result[0])
//         setCoords(latLng)
//     }
//
//
//
//     useEffect(() => {
//         navigator.geolocation.getCurrentPosition(({coords: {latitude, longitude}}) => {
//             setCoords({lat: latitude , lng: longitude})
//         })
//     }, [])
//     return(
//         <>
//             <input type={"text"} value={address} onChange={(e) => {
//                 setAddress(e.target.value)
//             }}/>
//             <button onClick={find}>Search</button>
//
//             <div style={{width: "500px", height: "300px"}}>
//                 <GoogleMapReact
//                     bootstrapURLKeys={{key: "AIzaSyDMiGZOTOALGy9BSxtBskshowrlS-eyYFs"}}
//                     defaultCenter={coords}
//                     defaultZoom={15}
//                     center={coords}
//                 >
//                     <Icon
//                         lat={coords.lat}
//                         lng={coords.lng}
//                         text={<IoLocationSharp color={"red"} size={24}/>}
//                     />
//                 </GoogleMapReact>
//             </div>
//         </>
//     )
// }
