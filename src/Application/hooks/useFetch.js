import React, { useState, useEffect } from "react";
import Images from '../Images';

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}
shuffleArray(Images);

const getImages = (Images, from, to) => {
    let arr = [];
    for (let i = from; i < to; i++) {
        arr.push(Images[i]);
    }
    return arr;
}
const ifHasMore = (Images, from, to) => {
    if (Images.length - 1 < from) return false;
    if (Images.length + 1 <= to ) {
        to = Images.length;
    }
    return { from, to };
}

function useFetch(pageNum) {
    const [isLoading, setIsLoading] = useState(true);
    const [images, setImages] = useState([]);
    const [hasMore, setHasMore] = useState(false);

    useEffect(() => {

        setIsLoading(true);

        const numberToGet = 10;

        if(ifHasMore(Images, pageNum * numberToGet, (pageNum * numberToGet) + numberToGet)) {
            const { from, to } = ifHasMore(Images, pageNum * numberToGet, (pageNum * numberToGet) + numberToGet);
            const imageList = getImages(Images, from, to);
            setImages((prev) => {
                console.log(imageList)
                return [...prev, ...imageList];
            });
        }
        const forFuture = ifHasMore(Images, (pageNum + 1) * numberToGet, ((pageNum + 1) * numberToGet) + numberToGet);
        setHasMore(typeof forFuture === 'object' && forFuture !== null);
        setIsLoading(false);

    }, [pageNum]);

    return { isLoading, images, hasMore };
}

export default useFetch;