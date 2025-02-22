import React, { useState, useEffect, useRef } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import styles from '../styles/Home.module.css';
import SideMenu from '../components/SideMenu';
import Header from '../components/Header';
import Graph from '../components/Graph';
import RTGraph from '../components/RTGraph';
import { GiElectric } from 'react-icons/gi';

var mqtt = require('mqtt');
var options = {
	protocol: 'mqtts',

	clientId: 'User1',
	username: 'smart',
	password: 'FzSjl27L9Ac9VVlk',
};
var cont = 0;
export default function Dashboard({ data_send }) {
	const [current_val, setcurrent] = useState('');
	const [voltage_val, setvoltage_val] = useState('');

	// Real time graph
	const [current_graph, setcurrent_graph] = useState([{ id: 0, value: 0 }]);

	let currentref = useRef('');
	currentref.current = current_val;
	useEffect(() => {
		console.log('data', data_send);
		var client = mqtt.connect('mqtt://smart.cloud.shiftr.io', options);
		client.subscribe('Termofijadora01/fase3/#');
		var note;

		client.on('message', function (topic, message) {
			note = message.toString();

			if (topic === 'Termofijadora01/fase3/corriente') {
				console.log('corriente', note);
				cont = cont + 1;
				setcurrent_graph((current_graph) => [
					...current_graph,
					{ id: cont, value: note },
				]);

				setcurrent(note);
			} else if (topic === 'Termofijadora01/fase3/voltaje') {
				setvoltage_val(note);
				console.log('voltaje', note);
			}
			if (currentref.current === '') {
				client.end();
			}
		});
	}, []);
	useEffect(() => {
		console.log('arra');
	}, []);
	return (
		<div className={styles.container}>
			<Head>
				<title>IOT EIA</title>
				<meta name='description' content='Generated by create next app' />
				<link rel='icon' href='/favicon.ico' />
			</Head>

			<main className={styles.main}>
				<Header></Header>
				<SideMenu></SideMenu>

				<Graph data={data_send?.list_1} data_1={data_send?.list_2}></Graph>

				<RTGraph data={current_graph}></RTGraph>

				<div className={styles.container_widgets}>
					<div className={styles.widget}>
						<div className={styles.title_widget}>Corriente</div>
						<div className={styles.row_widget}>
							<GiElectric
								className='icon_bar'
								style={{ fontSize: '100px' }}
							></GiElectric>
							<div className={styles.title_widget}>{current_val}</div>
						</div>
					</div>
					<div className={styles.widget}>
						<div className={styles.title_widget}>Voltaje</div>
						<div className={styles.row_widget}>
							<GiElectric
								className='icon_bar'
								style={{ fontSize: '100px' }}
							></GiElectric>
							<div className={styles.title_widget}>{voltage_val}</div>
						</div>
					</div>
				</div>
			</main>
		</div>
	);
}

export const getServerSideProps = async () => {
	const apiResponse = await fetch('https://smn7ok.deta.dev/get_dots/1/');

	const data = await apiResponse.json();

	const data_send = data.data;
	console.log(data_send);

	return { props: { data_send } };
};
