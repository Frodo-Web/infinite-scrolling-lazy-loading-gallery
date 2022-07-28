import React, { useState, useCallback, useRef } from 'react';
import Images from './Images';
import useFetch from './hooks/useFetch';
import './App.css';

const App = () => {
	const [pageNum, setPageNum] = useState(0);
	const { isLoading, images, hasMore } = useFetch(pageNum);

	const observer = useRef();
	const lastImageElementRef = useCallback(
		(node) => {
			if (isLoading) return;
			if (observer.current) observer.current.disconnect();
			observer.current = new IntersectionObserver((entries) => {
				if (entries[0].isIntersecting && hasMore) {
					setPageNum((prev) => prev + 1);
				}
			});
			if (node) observer.current.observe(node);
		},
		[isLoading, hasMore]
	);

	return (
		<>
			<h2>Total images: {Images.length}</h2>
			<div className='content'>
				{images.map((image, i) => {
					if (images.length === i + 1) {
						return (
							<img key={i} ref={lastImageElementRef} src={image} className='last-image'></img>
						);
					} else {
						return <img key={i} src={image}></img>
					}
				})}
			</div>
			<div>{isLoading && "Loading..."}</div>
		</>
	)
};

export default App;
