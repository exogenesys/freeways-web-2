import React from 'react'
import {
	Header,
	Segment,
	Checkbox,
	Accordion,
	Icon,
	Label,
	Image,
	Popup
} from 'semantic-ui-react'

const MustCarry = (props) => {

	return(

		<Segment basic>
		<Header size='huge'>Things You Gotto Carry</Header>
		<br/>

		<Popup trigger={< Label circular size = 'large' color = 'grey' > <Image avatar src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAD6UlEQVRoQ92ai7EMQRSGz40AEXAjQASIgBsBIkAEiAARcCNABIgAESACREB9W+efOjvbPdM90z1btVO1ddU8us/X593tzE7kOjsRDjsmyFUzu2Nmt3wx+fvN//3ZzL7ULPIxQO6a2RMzezAj6B8z+2BmL83s5xzUliBo4L2ZAfLXhURQfvHiPSB576E/eO1AwCWvrUAwm09mO1NGKH4IdcPNi79c3MO8ZFbcf+FA3L/n7xzAbAHyyMzeuhZYZfkBcF8zCyyzeuaCMwbw/8zsPAXTG0QQ391UomlgQk/NDMcGjmfAoQW+u29mt0fgvPsjpZmeIFMQc74bnzPOTTNDOxrzjS/C8F4vkFYQCIqPPHcQzOud+wwmNkSzHiAtIbTiRDaExhQxPczr0jW0e6c1SA+IlBkCRjK9poctQbaCQHbNRTgmADTTiAZmzGHwGo+ufJeI99uTJD7UBCRqAvsl1gOjfFEpY/HrzEP50gREEOQAogggqHoLGOb4qJptjY9Ec/rlECwnSW0LmCYaiWUH2qDIi6a0BcxqkKno9MprKuy2JwwLRyV9oeq51rSiOaGJ6NRkXfqMwQE7wii7k0d29VsNSNQEGZakFJ0aLagQjKGntWaYg8xOqT80Z6UgKXOaElD9B9pBUy1hVHvt5asSkCmfyAlIsmLscf+xNpqph0EbjF1c/ZaUHSmY2GcwGXURk6/RjEyKBSJf7bW9UxopgdCKTAlId8hYMoUlMEDQKvNtbLZmNSIVpjq7XA2REhD1I8BeyV2pmQjx2PuRop59UoUzlVAOZlehOgBmRodXopkiiFz4ZQVRX3TU4kpuQsC4k4KAc+VMMUQKRKYQk1oNxJTPEAAIneMFSmmmCiIFQpJjooOosIAmCpjawsmVM5QdPOP7rE+M5YlRS83K2DEXMAyfIAxaIGrFcKmkFndDBH7Fvy6GGGvkoBBbQ5D4lp0Q+geq5FQ5U21OuYSoVSrJ9ksY0Uiq4VIQYExgqjQhQaLQvUFy4ZYCUHu/iyDGpkWsJ8b30kgMt5ThRDHlrMWaOIZGNCdCY2arfGIqasm0hmZliSMUftMUYmxaSoaL7fRYEKmEqHMJ4n6Pq7kmUj7CveROdyOibhApjSR3uhuAdIVIgXBPuyGtfKU7RA6Eickp1xvs4W4CkQNRqcDBCiUFR174Tu2l0mN1siuZeCqLSzOc3wFSdHDviY6NOvIS5+lLG7QS+Yd35soRYBAIwbh0wE8VOz685xSWCpof32kDLXvIXyXpzMtzIPpcB/cIqX4hNzSQBAz16S3lzY5VChIHwFS0ORb/Iwx9BsJvooEx0RKQTVa4dpKTAfkPPXRSQl775uEAAAAASUVORK5CYII="/> < /Label>} hideOnScroll inverted wide position='bottom center'>
			<Popup.Header>
				Clothing
			</Popup.Header>
			<Popup.Content>
				Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
			</Popup.Content>
		</Popup>

		<Popup trigger={< Label circular size = 'large' color = 'grey' > <Image avatar src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAD6UlEQVRoQ92ai7EMQRSGz40AEXAjQASIgBsBIkAEiAARcCNABIgAESACREB9W+efOjvbPdM90z1btVO1ddU8us/X593tzE7kOjsRDjsmyFUzu2Nmt3wx+fvN//3ZzL7ULPIxQO6a2RMzezAj6B8z+2BmL83s5xzUliBo4L2ZAfLXhURQfvHiPSB576E/eO1AwCWvrUAwm09mO1NGKH4IdcPNi79c3MO8ZFbcf+FA3L/n7xzAbAHyyMzeuhZYZfkBcF8zCyyzeuaCMwbw/8zsPAXTG0QQ391UomlgQk/NDMcGjmfAoQW+u29mt0fgvPsjpZmeIFMQc74bnzPOTTNDOxrzjS/C8F4vkFYQCIqPPHcQzOud+wwmNkSzHiAtIbTiRDaExhQxPczr0jW0e6c1SA+IlBkCRjK9poctQbaCQHbNRTgmADTTiAZmzGHwGo+ufJeI99uTJD7UBCRqAvsl1gOjfFEpY/HrzEP50gREEOQAogggqHoLGOb4qJptjY9Ec/rlECwnSW0LmCYaiWUH2qDIi6a0BcxqkKno9MprKuy2JwwLRyV9oeq51rSiOaGJ6NRkXfqMwQE7wii7k0d29VsNSNQEGZakFJ0aLagQjKGntWaYg8xOqT80Z6UgKXOaElD9B9pBUy1hVHvt5asSkCmfyAlIsmLscf+xNpqph0EbjF1c/ZaUHSmY2GcwGXURk6/RjEyKBSJf7bW9UxopgdCKTAlId8hYMoUlMEDQKvNtbLZmNSIVpjq7XA2REhD1I8BeyV2pmQjx2PuRop59UoUzlVAOZlehOgBmRodXopkiiFz4ZQVRX3TU4kpuQsC4k4KAc+VMMUQKRKYQk1oNxJTPEAAIneMFSmmmCiIFQpJjooOosIAmCpjawsmVM5QdPOP7rE+M5YlRS83K2DEXMAyfIAxaIGrFcKmkFndDBH7Fvy6GGGvkoBBbQ5D4lp0Q+geq5FQ5U21OuYSoVSrJ9ksY0Uiq4VIQYExgqjQhQaLQvUFy4ZYCUHu/iyDGpkWsJ8b30kgMt5ThRDHlrMWaOIZGNCdCY2arfGIqasm0hmZliSMUftMUYmxaSoaL7fRYEKmEqHMJ4n6Pq7kmUj7CveROdyOibhApjSR3uhuAdIVIgXBPuyGtfKU7RA6Eickp1xvs4W4CkQNRqcDBCiUFR174Tu2l0mN1siuZeCqLSzOc3wFSdHDviY6NOvIS5+lLG7QS+Yd35soRYBAIwbh0wE8VOz685xSWCpof32kDLXvIXyXpzMtzIPpcB/cIqX4hNzSQBAz16S3lzY5VChIHwFS0ORb/Iwx9BsJvooEx0RKQTVa4dpKTAfkPPXRSQl775uEAAAAASUVORK5CYII="/> < /Label>} hideOnScroll inverted wide position='bottom center'>
			<Popup.Header>
				Clothing
			</Popup.Header>
			<Popup.Content>
				Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
			</Popup.Content>
		</Popup>

		<Popup trigger={< Label circular size = 'large' color = 'grey' > <Image avatar src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAD6UlEQVRoQ92ai7EMQRSGz40AEXAjQASIgBsBIkAEiAARcCNABIgAESACREB9W+efOjvbPdM90z1btVO1ddU8us/X593tzE7kOjsRDjsmyFUzu2Nmt3wx+fvN//3ZzL7ULPIxQO6a2RMzezAj6B8z+2BmL83s5xzUliBo4L2ZAfLXhURQfvHiPSB576E/eO1AwCWvrUAwm09mO1NGKH4IdcPNi79c3MO8ZFbcf+FA3L/n7xzAbAHyyMzeuhZYZfkBcF8zCyyzeuaCMwbw/8zsPAXTG0QQ391UomlgQk/NDMcGjmfAoQW+u29mt0fgvPsjpZmeIFMQc74bnzPOTTNDOxrzjS/C8F4vkFYQCIqPPHcQzOud+wwmNkSzHiAtIbTiRDaExhQxPczr0jW0e6c1SA+IlBkCRjK9poctQbaCQHbNRTgmADTTiAZmzGHwGo+ufJeI99uTJD7UBCRqAvsl1gOjfFEpY/HrzEP50gREEOQAogggqHoLGOb4qJptjY9Ec/rlECwnSW0LmCYaiWUH2qDIi6a0BcxqkKno9MprKuy2JwwLRyV9oeq51rSiOaGJ6NRkXfqMwQE7wii7k0d29VsNSNQEGZakFJ0aLagQjKGntWaYg8xOqT80Z6UgKXOaElD9B9pBUy1hVHvt5asSkCmfyAlIsmLscf+xNpqph0EbjF1c/ZaUHSmY2GcwGXURk6/RjEyKBSJf7bW9UxopgdCKTAlId8hYMoUlMEDQKvNtbLZmNSIVpjq7XA2REhD1I8BeyV2pmQjx2PuRop59UoUzlVAOZlehOgBmRodXopkiiFz4ZQVRX3TU4kpuQsC4k4KAc+VMMUQKRKYQk1oNxJTPEAAIneMFSmmmCiIFQpJjooOosIAmCpjawsmVM5QdPOP7rE+M5YlRS83K2DEXMAyfIAxaIGrFcKmkFndDBH7Fvy6GGGvkoBBbQ5D4lp0Q+geq5FQ5U21OuYSoVSrJ9ksY0Uiq4VIQYExgqjQhQaLQvUFy4ZYCUHu/iyDGpkWsJ8b30kgMt5ThRDHlrMWaOIZGNCdCY2arfGIqasm0hmZliSMUftMUYmxaSoaL7fRYEKmEqHMJ4n6Pq7kmUj7CveROdyOibhApjSR3uhuAdIVIgXBPuyGtfKU7RA6Eickp1xvs4W4CkQNRqcDBCiUFR174Tu2l0mN1siuZeCqLSzOc3wFSdHDviY6NOvIS5+lLG7QS+Yd35soRYBAIwbh0wE8VOz685xSWCpof32kDLXvIXyXpzMtzIPpcB/cIqX4hNzSQBAz16S3lzY5VChIHwFS0ORb/Iwx9BsJvooEx0RKQTVa4dpKTAfkPPXRSQl775uEAAAAASUVORK5CYII="/> < /Label>} hideOnScroll inverted wide position='bottom center'>
			<Popup.Header>
				Clothing
			</Popup.Header>
			<Popup.Content>
				Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
			</Popup.Content>
		</Popup>

		<Popup trigger={< Label circular size = 'large' color = 'grey' > <Image avatar src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAD6UlEQVRoQ92ai7EMQRSGz40AEXAjQASIgBsBIkAEiAARcCNABIgAESACREB9W+efOjvbPdM90z1btVO1ddU8us/X593tzE7kOjsRDjsmyFUzu2Nmt3wx+fvN//3ZzL7ULPIxQO6a2RMzezAj6B8z+2BmL83s5xzUliBo4L2ZAfLXhURQfvHiPSB576E/eO1AwCWvrUAwm09mO1NGKH4IdcPNi79c3MO8ZFbcf+FA3L/n7xzAbAHyyMzeuhZYZfkBcF8zCyyzeuaCMwbw/8zsPAXTG0QQ391UomlgQk/NDMcGjmfAoQW+u29mt0fgvPsjpZmeIFMQc74bnzPOTTNDOxrzjS/C8F4vkFYQCIqPPHcQzOud+wwmNkSzHiAtIbTiRDaExhQxPczr0jW0e6c1SA+IlBkCRjK9poctQbaCQHbNRTgmADTTiAZmzGHwGo+ufJeI99uTJD7UBCRqAvsl1gOjfFEpY/HrzEP50gREEOQAogggqHoLGOb4qJptjY9Ec/rlECwnSW0LmCYaiWUH2qDIi6a0BcxqkKno9MprKuy2JwwLRyV9oeq51rSiOaGJ6NRkXfqMwQE7wii7k0d29VsNSNQEGZakFJ0aLagQjKGntWaYg8xOqT80Z6UgKXOaElD9B9pBUy1hVHvt5asSkCmfyAlIsmLscf+xNpqph0EbjF1c/ZaUHSmY2GcwGXURk6/RjEyKBSJf7bW9UxopgdCKTAlId8hYMoUlMEDQKvNtbLZmNSIVpjq7XA2REhD1I8BeyV2pmQjx2PuRop59UoUzlVAOZlehOgBmRodXopkiiFz4ZQVRX3TU4kpuQsC4k4KAc+VMMUQKRKYQk1oNxJTPEAAIneMFSmmmCiIFQpJjooOosIAmCpjawsmVM5QdPOP7rE+M5YlRS83K2DEXMAyfIAxaIGrFcKmkFndDBH7Fvy6GGGvkoBBbQ5D4lp0Q+geq5FQ5U21OuYSoVSrJ9ksY0Uiq4VIQYExgqjQhQaLQvUFy4ZYCUHu/iyDGpkWsJ8b30kgMt5ThRDHlrMWaOIZGNCdCY2arfGIqasm0hmZliSMUftMUYmxaSoaL7fRYEKmEqHMJ4n6Pq7kmUj7CveROdyOibhApjSR3uhuAdIVIgXBPuyGtfKU7RA6Eickp1xvs4W4CkQNRqcDBCiUFR174Tu2l0mN1siuZeCqLSzOc3wFSdHDviY6NOvIS5+lLG7QS+Yd35soRYBAIwbh0wE8VOz685xSWCpof32kDLXvIXyXpzMtzIPpcB/cIqX4hNzSQBAz16S3lzY5VChIHwFS0ORb/Iwx9BsJvooEx0RKQTVa4dpKTAfkPPXRSQl775uEAAAAASUVORK5CYII="/> < /Label>} hideOnScroll inverted wide position='bottom center'>
			<Popup.Header>
				Clothing
			</Popup.Header>
			<Popup.Content>
				Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
			</Popup.Content>
		</Popup>

		<Popup trigger={< Label circular size = 'large' color = 'grey' > <Image avatar src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAD6UlEQVRoQ92ai7EMQRSGz40AEXAjQASIgBsBIkAEiAARcCNABIgAESACREB9W+efOjvbPdM90z1btVO1ddU8us/X593tzE7kOjsRDjsmyFUzu2Nmt3wx+fvN//3ZzL7ULPIxQO6a2RMzezAj6B8z+2BmL83s5xzUliBo4L2ZAfLXhURQfvHiPSB576E/eO1AwCWvrUAwm09mO1NGKH4IdcPNi79c3MO8ZFbcf+FA3L/n7xzAbAHyyMzeuhZYZfkBcF8zCyyzeuaCMwbw/8zsPAXTG0QQ391UomlgQk/NDMcGjmfAoQW+u29mt0fgvPsjpZmeIFMQc74bnzPOTTNDOxrzjS/C8F4vkFYQCIqPPHcQzOud+wwmNkSzHiAtIbTiRDaExhQxPczr0jW0e6c1SA+IlBkCRjK9poctQbaCQHbNRTgmADTTiAZmzGHwGo+ufJeI99uTJD7UBCRqAvsl1gOjfFEpY/HrzEP50gREEOQAogggqHoLGOb4qJptjY9Ec/rlECwnSW0LmCYaiWUH2qDIi6a0BcxqkKno9MprKuy2JwwLRyV9oeq51rSiOaGJ6NRkXfqMwQE7wii7k0d29VsNSNQEGZakFJ0aLagQjKGntWaYg8xOqT80Z6UgKXOaElD9B9pBUy1hVHvt5asSkCmfyAlIsmLscf+xNpqph0EbjF1c/ZaUHSmY2GcwGXURk6/RjEyKBSJf7bW9UxopgdCKTAlId8hYMoUlMEDQKvNtbLZmNSIVpjq7XA2REhD1I8BeyV2pmQjx2PuRop59UoUzlVAOZlehOgBmRodXopkiiFz4ZQVRX3TU4kpuQsC4k4KAc+VMMUQKRKYQk1oNxJTPEAAIneMFSmmmCiIFQpJjooOosIAmCpjawsmVM5QdPOP7rE+M5YlRS83K2DEXMAyfIAxaIGrFcKmkFndDBH7Fvy6GGGvkoBBbQ5D4lp0Q+geq5FQ5U21OuYSoVSrJ9ksY0Uiq4VIQYExgqjQhQaLQvUFy4ZYCUHu/iyDGpkWsJ8b30kgMt5ThRDHlrMWaOIZGNCdCY2arfGIqasm0hmZliSMUftMUYmxaSoaL7fRYEKmEqHMJ4n6Pq7kmUj7CveROdyOibhApjSR3uhuAdIVIgXBPuyGtfKU7RA6Eickp1xvs4W4CkQNRqcDBCiUFR174Tu2l0mN1siuZeCqLSzOc3wFSdHDviY6NOvIS5+lLG7QS+Yd35soRYBAIwbh0wE8VOz685xSWCpof32kDLXvIXyXpzMtzIPpcB/cIqX4hNzSQBAz16S3lzY5VChIHwFS0ORb/Iwx9BsJvooEx0RKQTVa4dpKTAfkPPXRSQl775uEAAAAASUVORK5CYII="/> < /Label>} hideOnScroll inverted wide position='bottom center'>
			<Popup.Header>
				Clothing
			</Popup.Header>
			<Popup.Content>
				Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
			</Popup.Content>
		</Popup>

		<br/>
		<br/>

	</ Segment>
)}

export default MustCarry
