import Image from "next/image";
import NoImage from "../images/no-image.jpg";

const MapSlider = ({ searchResults, clicked, setClicked }) => {
  const markerHandler = (e, location_id) => {
    e.preventDefault();
    setClicked(location_id);
  };

  return (
    <div className="w-full h-auto absolute bottom-10 flex space-x-4 overflow-x-scroll items-end pb-6 mx-8 pr-12">
      {Object.keys(searchResults).length !== 0
        ? searchResults.data.map((result) => (
            <div key={Math.random()} className="">
              {result.latitude && result.name !== "Seaside" ? (
                <div
                  className={
                    "bg-gray-50 h-60 w-60 rounded-xl shadow-md hover:shadow-xl p-2 hover:bg-gray-50 transition duration-200 flex flex-col " +
                    (clicked === result.location_id
                      ? "border-t-8 border-b-8 border-purple-400 shadow-xl"
                      : "")
                  }
                >
                  <div className="relative h-24 w-auto">
                    <Image
                      onClick={(e) => markerHandler(e, result.location_id)}
                      loader={() =>
                        result.photo ? result.photo.images.large.url : NoImage
                      }
                      unoptimized
                      src={
                        result.photo ? result.photo.images.large.url : NoImage
                      }
                      layout="fill"
                      objectFit="cover"
                      className="rounded-xl shadow-lg cursor-pointer"
                    />
                  </div>
                  {/* title */}
                  <div className="mt-1 text-sm text-gray-600 font-semibold">
                    {result.name}
                  </div>
                  {/* reviews */}
                  <div className="flex justify-between items-center">
                    <div className="rating">
                      <p className="text-xs text-gray-400 font-semibold">
                        {result.rating ? result.rating + "/5" : "No Ratings"}
                      </p>
                    </div>
                    <div className="">
                      <p className="text-xs text-gray-400 font-semibold">-</p>
                    </div>
                    {result.reviews && (
                      <div className="reviews">
                        <p className="text-xs text-gray-400 font-semibold">
                          {result.reviews.length} review(s)
                        </p>
                      </div>
                    )}
                  </div>
                  {/* price level */}
                  <div className="flex items-center justify-between">
                    <p className="text-xs text-gray-400 font-semibold">
                      Price level:
                    </p>
                    <p className="text-xs text-gray-400 font-semibold">
                      {result.price_level || "N/A"}
                    </p>
                  </div>
                  {/* ranking */}
                  <div className="flex items-start justify-between flex-1">
                    <p className="text-xs text-gray-400">{result.address}</p>
                  </div>
                  {/* URL */}
                  <div className="flex items-center justify-between m-0">
                    <a
                      href={result.web_url}
                      target="_blank"
                      className="text-xs text-purple-400 hover:text-purple-800 hover:font-semibold"
                    >
                      Trip Advisor page
                    </a>
                    <a
                      href={result.website}
                      target="_blank"
                      className="text-xs text-purple-400 hover:text-purple-800 hover:font-semibold"
                    >
                      FB page
                    </a>
                  </div>
                </div>
              ) : (
                ""
              )}
            </div>
          ))
        : ""}
    </div>
  );
};

export default MapSlider;
