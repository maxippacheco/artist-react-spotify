import axios from 'axios';
import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import './App.css'

const App = () => {
	
	const [artist, setArtist] = useState([]);
	const [albums, setAlbums] = useState();
	const [isLoading, setIsLoading] = useState(true);

	
	const getArtists = async() => {
		
		const artistPromise = axios.get('https://api.spotify.com/v1/artists/1bAftSH8umNcGZ0uyV7LMg', {
			headers:{
				'Authorization': `Bearer BQADriwp9JkSrmEZehBGFJRxYZoCnWTbinezCycV6KBK0SqFbrI4O96kzB28gbeWXsHX2mTMgCQpzhZr7ZEQGP6DqbUamqqZ2oKEwyVYsNnbkYRCFNQLwTSZpDRS5Q5zC0rjeRDvr07NO42M4g56RQi-f1COCEQ`,
				"Accept": "application/json",
				"Content-Type": "application/json",
			},
	
		});

		const albumsPromise = axios.get('https://api.spotify.com/v1/artists/1bAftSH8umNcGZ0uyV7LMg/albums?market=ES', {
			headers:{
				'Authorization': `Bearer BQADriwp9JkSrmEZehBGFJRxYZoCnWTbinezCycV6KBK0SqFbrI4O96kzB28gbeWXsHX2mTMgCQpzhZr7ZEQGP6DqbUamqqZ2oKEwyVYsNnbkYRCFNQLwTSZpDRS5Q5zC0rjeRDvr07NO42M4g56RQi-f1COCEQ`,
				"Accept": "application/json",
				"Content-Type": "application/json",
			},
	
		});

		const [artistData, albumsData] = await Promise.all([
			artistPromise,
			albumsPromise						
		])



		

		await setArtist(artistData.data);
		await setAlbums(albumsData.data);
		setIsLoading(false);
	}
	useEffect(() => {
	


		getArtists();

		console.log(albums);
		// console.log(artist.images[0].url);
	
	}, [])

	const { total } = artist?.followers;
	
	const follower = total.toString().split('');
	const millons = follower[0];
	const k = follower[1];
	const totals = `${ millons },${k}M`;


	
	
	return (
		<div className='app__container'>
			<div className='app__artist_header'>
				
				<div className='app__header_artist_container'>
					<div style={{marginLeft: '20px'}}>
						<img src={artist.images[0].url} alt={artist.name} style={{height: 170, width: 170, borderRadius: 100}} />
					</div>

					<div className='app__header_artist_name'>
						<p style={{height: '50%', display:'flex', alignItems: 'flex-end'}}>
							{artist.name}
						</p>
						<p style={{height: '50%', fontSize: '18px', marginLeft: '2px'}}>							
							{totals}
						</p>

					</div>
					
				</div>
			</div>

			<div className='app__genres_container'>		
					{artist.genres.map( genre => {
							return(
								<div key={genre}>
									<p>{genre}</p>
								</div>
							)
					})}
 
				
				
			</div>
			
			<div className='app__albums_container' style={{display: 'flex', justifyContent: 'center', marginTop: '30px'}}>
				{
					(isLoading) ? <p>Loading</p> : 
						<div style={{display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)'}}>
						
						{
							albums.items.map(item => {
								return (
									<img 
										src={item.images[1].url}
										alt={item.name}
										style={{marginBottom: '30px', marginRight: '20px'}}
									/>
								)
							})
						}
						</div>

				}

			</div>
				
		</div>
	
	)
}
export default App;

