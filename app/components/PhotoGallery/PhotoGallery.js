"use client";

import { useState, useRef } from "react";
import { useInView } from "framer-motion";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import Image from "next/image";
import Container from "@/app/global-components/Container/Container";
import { MapMapper, Calendar } from "@/app/svg-icons/svg-icons";

const galleryThumbnails = [
	{
		id: 1,
		cover: "/gallery/thumbnails/thumbnail-1.jpg",
		title: "The Golden Eagle.",
		photos: [
			{ src: "/gallery/slider-images/slider-1.jpg" },
			{ src: "/gallery/slider-images/slider-2.jpg" },
			{ src: "/gallery/slider-images/slider-3.jpg" },
		],
	},
	{
		id: 2,
		cover: "/gallery/thumbnails/thumbnail-2.jpg",
		title: "The Silver Elephant.",
		photos: [
			{ src: "/gallery/slider-images/slider-4.jpg" },
			{ src: "/gallery/slider-images/slider-5.jpg" },
			{ src: "/gallery/slider-images/slider-6.jpg" },
		],
	},
	{
		id: 3,
		cover: "/gallery/thumbnails/thumbnail-3.jpg",
		title: "The Electric Fox.",
		photos: [
			{ src: "/gallery/slider-images/slider-7.jpg" },
			{ src: "/gallery/slider-images/slider-8.jpg" },
			{ src: "/gallery/slider-images/slider-9.jpg" },
		],
	},
	{
		id: 4,
		cover: "/gallery/thumbnails/thumbnail-4.jpg",
		title: "The Cool Mouse.",
		photos: [
			{ src: "/gallery/slider-images/slider-10.jpg" },
			{ src: "/gallery/slider-images/slider-11.jpg" },
			{ src: "/gallery/slider-images/slider-12.jpg" },
		],
	},
	{
		id: 5,
		cover: "/gallery/thumbnails/thumbnail-5.jpg",
		title: "The Super Cat.",
		photos: [
			{ src: "/gallery/slider-images/slider-13.jpg" },
			{ src: "/gallery/slider-images/slider-14.jpg" },
			{ src: "/gallery/slider-images/slider-15.jpg" },
		],
	},
	{
		id: 6,
		cover: "/gallery/thumbnails/thumbnail-6.jpg",
		title: "The Brave Salmon.",
		photos: [
			{ src: "/gallery/slider-images/slider-16.jpg" },
			{ src: "/gallery/slider-images/slider-17.jpg" },
			{ src: "/gallery/slider-images/slider-18.jpg" },
		],
	},
];

export default function PhotoGallery() {
	const [openGallery, setOpenGallery] = useState(false);
	const [galleryIndex, setGalleryIndex] = useState(0);
	const sectionRef = useRef(null);
	const isInView = useInView(sectionRef, { once: true });

	const clickHandler = (index) => {
		setOpenGallery(true);
		setGalleryIndex(index);
	};

	return (
		<section
			id="photo-gallery"
			className={`w-full mt-16 pb-14 lg:mt-56 lg:pb-56 lg:mb-90`}
			style={{
				transform: isInView ? "none" : "translateY(100px)",
				opacity: isInView ? 1 : 0,
				transition: "all 0.9s cubic-bezier(0.17, 0.55, 0.55, 1) 0.5s",
			}}
			ref={sectionRef}>
			<Container>
				<div className="overflow-hidden">
					<h2 className={`font-bold text-6xl pb-6 opacity-0 ${isInView ? "animate-slide-up" : ""}`}>
						Фото
					</h2>
				</div>
				<p>Как это было</p>
				<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-5">
					{galleryThumbnails.map((item, index) => {
						return (
							<div className="flex flex-col mb-5 leading-none" key={item.id}>
								<div className="w-full h-full rounded-lg bg-fluo-red transition-all">
									<Image
										className="rounded-lg cursor-pointer hover:opacity-60 transition-all"
										src={item.cover}
										width={400}
										height={400}
										alt="Gallery gig thumbnail"
										onClick={() => clickHandler(index)}
									/>
								</div>
								<h5 className="text-sm md:text-lg xl:text-xl font-medium">{item.title}</h5>
							</div>
						);
					})}
					<Lightbox
						open={openGallery}
						close={() => setOpenGallery(false)}
						slides={galleryThumbnails[galleryIndex].photos}
					/>
				</div>
			</Container>
		</section>
	);
}
