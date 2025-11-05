import React, { useEffect, useState } from 'react'

function Datafetching() {
    const [images, setImages] = useState([]);
    const [error, setError] = useState("");   // ✅ error state
    const [loading, setLoading] = useState(true); // ✅ loading state

    useEffect(() => {
        fetch("https://picsum.photos/v2/list?page=1&limit=1000")
            .then((res) => {
                if (!res.ok) {
                    throw new Error("Network issue");
                }
                return res.json();
            })
            .then((result) => {
                setImages(result);
                setError("");   // clear errors if success
            })
            .catch(() => {
                setError("Failed to fetch the data. Please check your internet connection.");
            })
            .finally(() => {
                setLoading(false);  // ✅ stop loading
            });
    }, []);

    // ✅ Show loading text
    if (loading) {
        return <h2>Loading...</h2>;
    }

    // ✅ Show error message
    if (error) {
        return <h2 style={{ color: "red" }}>{error}</h2>;
    }

    // ✅ Show images when fetch is successful
    return (
        <>
            {images.map((item) => (
                <img
                    key={item.id}
                    src={item.download_url}
                    alt="images"
                    style={{
                        width: "250px",
                        height: "250px",
                        margin: "10px",
                        backgroundColor: "white",
                        border: "3px solid gray"
                    }}
                />
            ))}
        </>
    );
}

export default Datafetching;
