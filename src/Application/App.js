import React, { useState, useCallback, useRef, useEffect, lazy } from 'react';
import Images from './Images';
import useFetch from './hooks/useFetch';
import './App.css';

const App = () => {
	const [pageNum, setPageNum] = useState(0);
	const { isLoading, images, hasMore } = useFetch(pageNum);

	const observer = useRef();
	const lastImageElementRef = useCallback(
		(node) => {
			function sleep(time) {
				return new Promise((resolve) => setTimeout(resolve, time));
			}
			function registerObserver() {
				if (isLoading) return;
				if (observer.current) observer.current.disconnect();
				observer.current = new IntersectionObserver((entries) => {
					if (entries[0].isIntersecting && hasMore) {
						setPageNum((prev) => prev + 1);
						console.log('Next');
					}
				});
				if (node) observer.current.observe(node);
			}
			if (pageNum === 0) {
				sleep(1000).then(() => {
					registerObserver();
				})
			} else {
				registerObserver();
			}
		},
		[isLoading, hasMore]
	);

	const lazyLoading = () => {
		let lazyObserver = new IntersectionObserver((entries, lazyObserver) => {
			entries.forEach(entry => {
				if (entry.isIntersecting) {
					console.log(entry);
					entry.target.src = entry.target.dataset.src;
					lazyObserver.unobserve(entry.target);
				}
			});
		}, { rootMargin: "0px 0px 0px 0px" });
		document.querySelectorAll('img.latest').forEach(img => { lazyObserver.observe(img) });
	}

	useEffect(() => {
		lazyLoading();
	})

	return (
		<>
			<h2>Total images: {Images.length}</h2>
			<div className='content'>
				{images.map((image, i) => {
					if (images.length - 11 < i) {
						if (images.length === i + 1) {
							return (
								<img key={i} ref={lastImageElementRef} data-src={image} src='./lazyLoadingImages/loading.gif' className='latest last-image'></img>
							);
						}
						return <img key={i} data-src={image} className='latest' src='./lazyLoadingImages/loading.gif'></img>
					} else {
						return <img key={i} data-src={image} src='./lazyLoadingImages/loading.gif'></img>
					}
				})}
			</div>
			<div>{isLoading && "Loading..."}</div>
		</>
	)
};

export default App;
