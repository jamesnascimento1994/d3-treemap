let videoGameDataUrl =
	'https://cdn.freecodecamp.org/testable-projects-fcc/data/tree_map/video-game-sales-data.json';

let videoGameData;

let canvas = d3.select('#canvas');
let tooltip = d3.select('#tooltip');

let drawTreeMap = () => {
	let hierarchy = d3
		.hierarchy(videoGameData, (node) => {
			return node['children'];
		})
		.sum((node) => {
			return node['value'];
		})
		.sort((node1, node2) => {
			return node2['value'] - node1['value'];
		});

	let createTreeMap = d3.treemap().size([1000, 600]);

	createTreeMap(hierarchy);

	let videoGameTitles = hierarchy.leaves();
	console.log(videoGameTitles);

	let block = canvas
		.selectAll('g')
		.data(videoGameTitles)
		.enter()
		.append('g')
		.attr('transform', (videoGame) => {
			return 'translate(' + videoGame['x0'] + ', ' + videoGame['y0'] + ')';
		});

	block
		.append('rect')
		.attr('class', 'tile')
		.attr('fill', (videoGame) => {
			let category = videoGame['data']['category'];
			if (category === '2600') return 'sandybrown';
			else if (category === 'Wii') return 'whitesmoke';
			else if (category === 'NES') return 'indianred';
			else if (category === 'GB') return 'darkslateblue';
			else if (category === 'DS') return 'turquoise';
			else if (category === 'X360') return 'darkolivegreen';
			else if (category === 'PS3') return 'darkgray';
			else if (category === 'PS2') return 'dimgray';
			else if (category === 'SNES') return 'mediumpurple';
			else if (category === 'GBA') return 'lightslategray';
			else if (category === 'PS4') return 'royalblue';
			else if (category === '3DS') return 'firebrick';
			else if (category === 'N64') return 'orange';
			else if (category === 'PS') return 'darkkhaki';
			else if (category === 'XB') return 'yellowgreen';
			else if (category === 'PC') return 'gray';
			else if (category === 'PSP') return 'mediumturquoise';
			else if (category === 'XOne') return 'forestgreen';
		})
		.attr('data-name', (videoGame) => {
			return videoGame['data']['name'];
		})
		.attr('data-category', (videoGame) => {
			return videoGame['data']['category'];
		})
		.attr('data-value', (videoGame) => {
			return videoGame['data']['value'];
		})
		.attr('width', (videoGame) => {
			return videoGame['x1'] - videoGame['x0'];
		})
		.attr('height', (videoGame) => {
			return videoGame['y1'] - videoGame['y0'];
		})
		.on('mouseover', (videoGame) => {
			tooltip.transition().style('visibility', 'visible');

			let revenue = videoGame['data']['value']
				.toString()
				.replace(/\B(?=(\d{3})+(?!\d))/g, ',');

			tooltip.html('$ ' + revenue + '<hr />' + videoGame['data']['name']);
			tooltip.attr('data-value', videoGame['data']['value']);
		})
		.on('mouseout', (videoGame) => {
			tooltip.transition().style('visibility', 'hidden');
		});

	block
		.append('text')
		.text((videoGame) => {
			return videoGame['data']['name'];
		})
		.attr('x', 5)
		.attr('y', 20);
};

d3.json(videoGameDataUrl).then((data, error) => {
	if (error) {
		console.log(error);
	} else {
		videoGameData = data;
		console.log(videoGameData);
		drawTreeMap();
	}
});
