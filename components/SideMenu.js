import Head from 'next/head';
import Image from 'next/image';
import styles from '../styles/SideMenu.module.css';

import { BsPlusCircleFill, BsGraphUp } from 'react-icons/bs';
import { FaIndustry, FaHome, FaServer } from 'react-icons/fa';
import { useRouter } from 'next/router';

export default function SideMenu() {
	const router = useRouter();
	return (
		<div className={styles.container_sidemu}>
			<FaHome
				className='icon_bar'
				onClick={() => router.push({ pathname: '/' })}
			></FaHome>
			<BsPlusCircleFill
				className='icon_bar'
				onClick={() => router.push({ pathname: '/createmachine' })}
			></BsPlusCircleFill>
			<FaIndustry
				className='icon_bar'
				onClick={() => router.push({ pathname: '/createdevice' })}
			></FaIndustry>
			<BsGraphUp
				className='icon_bar'
				onClick={() => router.push({ pathname: '/dashboard' })}
			></BsGraphUp>
			<FaServer
				className='icon_bar'
				onClick={() => router.push({ pathname: '/server' })}
			></FaServer>
		</div>
	);
}
