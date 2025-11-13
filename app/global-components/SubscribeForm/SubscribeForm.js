"use client";

import ButtonPrimary from "../ButtonPrimary/ButtonPrimary";

export default function SubscribeForm() {
	const formHandler = async (event) => {
		event.preventDefault();
		const email = event.target.email.value;
		await fetch(action, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ email })
			});
		alert('Вы подписаны!');
		event.target.reset();
	};

	return (
		<form className="w-full max-w-140 lg:w-10/12" onSubmit={formHandler}>
			<div className="text-white">
				<label className="lock text-sm font-medium leading-6" htmlFor="email">
					Ваш адрес электронной почты
				</label>
				<input className="block w-full bg-gray-800 rounded-md border-0 p-2.5 text-white shadow-xs ring-1 placeholder:text-gray-400 focus:outline-hidden focus:ring-2 focus:border-black sm:leading-0 text-xs" type="email" name="email" id="email" />
			</div>
			<div className="flex mt-3 lg:justify-end">
				<ButtonPrimary>Подписаться</ButtonPrimary>
			</div>
		</form>
	);
}
