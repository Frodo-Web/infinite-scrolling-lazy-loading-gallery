import React, { useState, useCallback, useRef, useEffect } from 'react';
import GIF from './GIF';
import useFetch from './hooks/useFetch';

const Gifs = () => {
	const [pageNum, setPageNum] = useState(0);
	const { isLoading, images, hasMore } = useFetch({pageNum, CONTENT: GIF});
	const [curImageCount, setCurImageCount] = useState(0);

	const observer = useRef();
	const lazyObserver = useRef();

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
					}
				});
				if (node) observer.current.observe(node);
			}
			if (pageNum === 0) {
				//			sleep(1000).then(() => {
				registerObserver();
				//			})
			} else {
				registerObserver();
			}
		},
		[isLoading, hasMore]
	);

	useEffect(() => {
		if (lazyObserver.current) lazyObserver.current.disconnect();
		lazyObserver.current = new IntersectionObserver((entries, lazyObserver) => {
			entries.forEach(entry => {
				if (entry.isIntersecting) {
					entry.target.src = entry.target.dataset.src;
					lazyObserver.unobserve(entry.target);
				}
			});
		}, { rootMargin: "0px 0px 0px 0px" });
	}, []);

	const lazyLoading = () => {
		document.querySelectorAll('img.latest').forEach(img => { lazyObserver.current.observe(img) });
	};

	const countImages = () => {
		const count = document.querySelectorAll('.content img').length;
		return count;
	};

	useEffect(() => {
		const count = countImages();
		if (count > curImageCount) {
			lazyLoading();
			setCurImageCount(count);
		}
	});

	return (
		<>
			<h2>Total GIFs: {GIF.length}</h2>
			<div className='content gifs'>
				{images.map((image, i) => {
					if (images.length - 11 < i) {
						if (images.length === i + 1) {
							return (
								<div className='container' key={i.toString()}>
									<a href={image} target="_blank">
										<img ref={lastImageElementRef} data-src={image} src='./lazyLoadingImages/loading.gif' className='latest last-image'></img>
									</a>
								</div>
							);
						}
						return <div className='container' key={i.toString()}>
							<a href={image} target="_blank">
								<img data-src={image} className='latest' src='./lazyLoadingImages/loading.gif'></img>
							</a>
						</div>
					} else {
						return <div className='container' key={i.toString()}>
							<a href={image} target="_blank">
								<img data-src={image} src='./lazyLoadingImages/loading.gif'></img>
							</a>
						</div>
					}
				}
				)}
			</div>
			<div>{isLoading && "Loading..."}</div>
		</>
	)
};

export default Gifs;
