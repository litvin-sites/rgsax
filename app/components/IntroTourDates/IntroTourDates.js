"use client";

import { useRef } from "react";
import { useInView } from "framer-motion";
import ScrollTo from "@/app/global-components/ScrollTo/ScrollTo";
import ButtonPrimary from "@/app/global-components/ButtonPrimary/ButtonPrimary";
import { MapMapper, Github } from "@/app/svg-icons/svg-icons";

const observerOptions = {
	rootMargin: "0px",
	threshold: 0.3,
};

const tourDates = [
];

export default function IntroTourDates() {
	const sectionRef = useRef(null);
	const isInView = useInView(sectionRef, { once: true });
	return (
		<div
			className={`flex flex-col justify-center items-center lg:justify-end lg:items-end`}
			style={{
				transform: isInView ? "none" : "translateY(-100px)",
				opacity: isInView ? 1 : 0,
				transition: "all 0.9s cubic-bezier(0.17, 0.55, 0.55, 1) 0.5s",
			}}
			ref={sectionRef}>
			<h2 className="text-white font-permanent-marker text-2xl md:text-3xl lg:text-4xl">
				⚡ imagination  ⚡
			</h2>
			<ul className="list-none">
						<li
							className="flex items-center my-10 justify-between text-xl md:justify-end md:text-2xl lg:text-2xl xl:text-3xl">

							<div className="text-white text-right leading-none md:mr-12">
								<p className="font-bold text-xl q leading-none text-center lg:text-right uppercase lg:text-3xl mb-3">
								Вот что получилось</p>
								<p className="font-bold text-xl q leading-none text-center lg:text-right uppercase lg:text-3xl mb-3">

									Когда смешали красоту</p>
								<p className="font-bold text-xl q leading-none text-center lg:text-right uppercase lg:text-3xl mb-3">

									Любовь к музыке и непосредственность </p>
							</div>
						</li>
			</ul>
			<div className="gap-x-3 lg:flex">
				<a href="https://t.me/R_G_Sax" target="_blank" rel="noreferrer">
					<ButtonPrimary customClasses="flex items-center gap-x-1 text-sm my-3 lg:text-base lg:mb-0 border-4 border-solid border-red-50">
						Пригласить на выступление
					</ButtonPrimary>
				</a>
				<div className="hidden lg:block">
					<ScrollTo toId="about" duration={1500}>
						<ButtonPrimary customClasses="border-4 border-solid border-blue-50">
							Познакомиться ближе 
							</ButtonPrimary>
					</ScrollTo>
				</div>
			</div>
		</div>
	);
}
