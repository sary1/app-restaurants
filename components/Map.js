import React, { useEffect, useState } from "react";
import ReactMapGL, { Marker, Popup } from "react-map-gl";
import { getCenter } from "geolib";
import { ColorSwatchIcon, LocationMarkerIcon } from "@heroicons/react/solid";

const Map = ({ searchResults, location, clicked, setClicked }) => {
  const [viewport, setViewport] = useState({});
  const [mode, setMode] = useState("light");

  useEffect(() => {
    setViewport({
      latitude: location.lat,
      longitude: location.lng,
      zoom: 16,
    });
  }, [location]);

  //   Calculating the centre coordinate of the results
  if (searchResults.length > 0) {
    let coordinates = searchResults.data.map((result) => ({
      latitude: result.latitude,
      longitude: result.longitude,
    }));

    coordinates = coordinates.filter((item) => item.latitude);

    let center = getCenter(coordinates);

    setViewport({
      latitude: center.latitude,
      longitude: center.longitude,
      zoom: 16,
    });
  }

  const modeHandler = (e) => {
    e.preventDefault();
    if (mode === "light") {
      setMode("dark");
    } else {
      setMode("light");
    }
  };

  console.log(process.env);

  return (
    <div className="w-full h-full">
      {mode === "light" ? (
        <div className="fixed top-20 left-2 z-50 h-11 rounded-full p-3 m-0 shadow-lg text-white bg-purple-600 cursor-pointer">
          <ColorSwatchIcon onClick={modeHandler} className="h-5" />
        </div>
      ) : (
        <div className="fixed top-20 left-2 z-50 h-11 rounded-full p-3 m-0 shadow-lg text-white bg-black cursor-pointer ">
          <ColorSwatchIcon onClick={modeHandler} className="h-5" />
        </div>
      )}

      <ReactMapGL
        mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_API_ACCESS_TOKEN}
        mapStyle={
          mode === "light"
            ? process.env.REACT_APP_MAPBOX_LIGHT
            : process.env.REACT_APP_MAPBOX_DARK
        }
        {...viewport}
        width="100%"
        height="100%"
        onViewportChange={(viewport) => setViewport(viewport)}
      >
        {Object.keys(searchResults).length !== 0
          ? searchResults.data.map((result) => (
              <div key={Math.random()} className="">
                {result.latitude && result.name !== "Seaside" ? (
                  <Marker
                    latitude={parseFloat(result.latitude)}
                    longitude={parseFloat(result.longitude)}
                  >
                    <a
                      // onClick={(e) => markerHandler(e, result.location_id)}
                      onClick={(e) => e.preventDefault()}
                      href=""
                      className="cursor-default text-2xl relative"
                    >
                      <LocationMarkerIcon
                        className={
                          "animate-bounce h-6 w-6 text-purple-400 active:text-pink-500 " +
                          (clicked === result.location_id ? "text-red-500" : "")
                        }
                      />
                    </a>
                  </Marker>
                ) : (
                  ""
                )}
              </div>
            ))
          : ""}
      </ReactMapGL>
    </div>
  );
};

export default Map;
