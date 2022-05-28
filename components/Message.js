import Head from 'next/head';
import Image from 'next/image';
import styles from '../styles/Header.module.css';

import { BsCheck2All } from 'react-icons/bs';
import { FaUser } from 'react-icons/fa';

export default function Message(props) {
	return (
		<div className={styles.container_message}>
			<BsCheck2All
				className='icon_bar'
				style={{ color: 'lightblue', marginRight: '10px' }}
			></BsCheck2All>
			<div className={styles.client_text}>{props?.sender}:</div>
			<div className={styles.text_message}>{props?.message}</div>
		</div>
	);
}
