import React from 'react';
import { useState, useEffect } from 'react';
import HeaderContainer from './HeaderContainer.jsx';
import KnivesContainer from './KnivesContainer.jsx';
import cutting from '../assets/cutting.jpg';

function Main() {
	const [userID, setUserID] = useState(null);
	const [isLoggedIn, setLoggedIn] = useState(false);
	const [username, setUsername] = useState(null);
	const [isAdmin, setIsAdmin] = useState(false);
	// cartList State that stores the list of cart items
	const [cartList, setCartList] = useState([]);

	fetch(`/cookies`)
		.then((res) => res.json())
		.then((data) => {
			console.log(data.cookie);
			if (data.cookie.ssid) {
				setLoggedIn(true);
				for (const key in data.cookie) {
					setUsername(key);
					setUserID(data.cookie[key]);
				}
			}
		});

	const fetchCart = () => {
		fetch(`/cart/${userID}`)
			.then((res) => res.json())
			.then((data) => {
				setCartList(data);
			});
	};

	const deleteFromCart = (userID, knife_id) => {
		fetch(`/cart/deleteFromCart`, {
			method: 'POST',
			body: JSON.stringify({
				userID,
				knife_id,
			}),
			headers: { 'Content-Type': 'application/json' },
		})
			.then((res) => res.json())
			.then(() => fetchCart());
	};

	useEffect(() => {
		fetchCart();
	}, [isLoggedIn]);

	function handleClick(e) {
		//{ knife_id, customer_id, quantity} what I'm using for variable names
		if (e.target.className === 'addToCartButton') {
			//console.log(e.target.id) --> knife-12
			//knife-12 --> const knife_id = 12
			const knife_id = e.target.id.split('-')[1];
			console.log('userID: ', userID);
			if (!isLoggedIn) {
				alert('Please login before adding to cart.');
				return;
			}
			fetch('/cart/addToCart', {
				method: 'POST',
				body: JSON.stringify({
					knife_id,
					userID,
					quantity: 1,
				}),
				headers: { 'Content-Type': 'application/json' },
			})
				.then((res) => res.json())
				.then(() => fetchCart())
				// .then((data) => consol, e.log('add to cart: ', data))
				.catch((err) => console.log('error adding knife:', err));
		}
		//to delete: fetch(`/cart/${userID}/${knife_id}`, {

		if (e.target.id === 'loginButton') {
			console.log(document.querySelector('#usernameInput'));
			const user = document.querySelector('#usernameInput').value;
			const password = document.querySelector('#passwordInput').value;

			// fetch(`/cookies`)
			// 	.then((res) => res.json())
			// 	.then((data) => {
			// 		console.log(data);
			// 		if (data.status === true) {
			// 			setLoggedIn(true);
			// 			for (const key in data.cookie) {
			// 				setUsername(key);
			// 				setUserID(data.cookie[key]);
			// 			}
			// 		} else {
			fetch(`/customers/login`, {
				method: 'POST',
				body: JSON.stringify({ user, password }),
				headers: { 'Content-Type': 'application/json' },
			})
				.then((res) => res.json())
				.then((data) => {
					// console.log(typeof data.username);
					if (data.username) {
						setUserID(data.id);
						setLoggedIn(true);
						setUsername(data.username);
						setIsAdmin(data.isAdmin);
					} else {
						setUserID(null);
						setLoggedIn(false);
						setUsername(null);
						setIsAdmin(false);
					}
				})
				// .then(() => console.log('isloggedin: ', isLoggedIn, 'username:  ', username, 'isAdmin: ', isAdmin))
				.catch((err) => console.log('error in fetch request', err));
			// 	}
			// });
		}

		if (e.target.id === 'signUpButton') {
			const user = document.querySelector('#usernameInput').value;
			const password = document.querySelector('#passwordInput').value;
			fetch(`/customers/addCustomer`, {
				method: 'POST',
				body: JSON.stringify({ user, password }),
				headers: { 'Content-Type': 'application/json' },
			})
				.then((res) => res.json())
				.then((data) => {
					if (data.username) {
						setUserID(data.id);
						setLoggedIn(true);
						setUsername(data.username);
						setIsAdmin(data.isAdmin);
					} else {
						setUserID(null);
						setLoggedIn(false);
						setUsername(null);
						setIsAdmin(false);
					}
				})
				.catch((err) => console.log('error in fetch request', err));
		}
	}

	useEffect(() => {
		console.log(
			'userID: ',
			userID,
			'isloggedin: ',
			isLoggedIn,
			'username:  ',
			username,
			'isAdmin: ',
			isAdmin
		);
	});
	return (
		<>
			<div>
				<HeaderContainer
					handleClick={handleClick}
					isLoggedIn={isLoggedIn}
					isAdmin={isAdmin}
					username={username}
					userID={userID}
					cartList={cartList}
					deleteFromCart={deleteFromCart}
					setLoggedIn={setLoggedIn}
					// fetchCookie={fetchCookie}
				/>
			</div>
			<div>
				<img src={cutting} style={{ height: 'auto', width: '1200px' }} />
			</div>
			<div>
				<KnivesContainer
					username={username}
					isLoggedIn={isLoggedIn}
					isAdmin={isAdmin}
					handleClick={handleClick}
					fetchCart={fetchCart}
				/>
			</div>
		</>
	);
}

export default Main;
