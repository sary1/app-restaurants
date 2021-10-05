import Head from "next/head";
import Navbar from "../components/Navbar";
import Map from "../components/Map";
import { useState, useEffect } from "react";
import { getRestaurantsData } from "./api/getRestaurantsData";
import MapSlider from "../components/MapSlider";

export default function Home() {
  const [location, setLocation] = useState({ lat: 52.52, lng: 13.405 });
  const [searchResults, setSearchResults] = useState([]);
  const [search, setSearch] = useState(false);
  const [city, setCity] = useState("Berlin");
  const [resultsNum, setResultsNum] = useState(10);
  const [clicked, setClicked] = useState("");

  useEffect(async () => {
    let results = await getRestaurantsData(
      location.lat,
      location.lng,
      resultsNum
    );
    await setSearchResults(results);
  }, [location, resultsNum]);

  return (
    <div className="overflow-x-hidden">
      <Head>
        <title>Sary - Restaurants App</title>
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@100;200;400;700&display=swap"
          rel="stylesheet"
        ></link>
      </Head>

      <main>
        {/* Start navbar */}
        <Navbar
          setCity={setCity}
          setLocation={setLocation}
          setSearch={setSearch}
          className="z-100"
        />

        <div className="bodyContainer flex relative">
          <div className="w-full relative">
            <Map
              clicked={clicked}
              setClicked={setClicked}
              searchResults={searchResults}
              location={location}
            />
            <MapSlider
              clicked={clicked}
              setClicked={setClicked}
              searchResults={searchResults}
            />
          </div>
        </div>
      </main>
    </div>
  );
}
