import React from "react";

function error(err) {
    // eslint-disable-next-line no-console
    console.warn(`ERROR(${err.code}): ${err.message}`);
}

function useGeolocation() {
    const [coords, setCoords] = React.useState({ lat: null, lng: null });
    React.useEffect(() => {
        if ("geolocation" in window.navigator) {
            window.navigator.geolocation.getCurrentPosition((pos) => {
                setCoords({
                    lat: pos.coords.latitude,
                    lng: pos.coords.longitude,
                });
            }, error);
        } else {
            setCoords(null);
        }
    }, []);

    return [coords];
}

export default useGeolocation;
