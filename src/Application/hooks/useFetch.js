import React, { useState, useEffect } from "react";

function useFetch({ pageNum, CONTENT }) {
    const [isLoading, setIsLoading] = useState(true);
    const [images, setImages] = useState([]);
    const [hasMore, setHasMore] = useState(false);

    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }
    
    const getImages = (CONTENT, from, to) => {
        let arr = [];
        for (let i = from; i < to; i++) {
            arr.push(CONTENT[i]);
        }
        return arr;
    }
    const ifHasMore = (CONTENT, from, to) => {
        if (CONTENT.length - 1 < from) return false;
        if (CONTENT.length + 1 <= to ) {
            to = CONTENT.length;
        }
        return { from, to };
    }

    useEffect(() => {
        shuffleArray(CONTENT);
    }, [])

    useEffect(() => {

        setIsLoading(true);

        const numberToGet = 10;

        if(ifHasMore(CONTENT, pageNum * numberToGet, (pageNum * numberToGet) + numberToGet)) {
            const { from, to } = ifHasMore(CONTENT, pageNum * numberToGet, (pageNum * numberToGet) + numberToGet);
            const imageList = getImages(CONTENT, from, to);
            setImages((prev) => {
                return [...prev, ...imageList];
            });
        }
        const forFuture = ifHasMore(CONTENT, (pageNum + 1) * numberToGet, ((pageNum + 1) * numberToGet) + numberToGet);
        setHasMore(typeof forFuture === 'object' && forFuture !== null);
        setIsLoading(false);

    }, [pageNum]);

    return { isLoading, images, hasMore };
}

export default useFetch;