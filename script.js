let videoGameDataUrl =
	'https://cdn.freecodecamp.org/testable-projects-fcc/data/tree_map/video-game-sales-data.json';

let videoGameData;

let canvas = d3.select('#canvas');

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
    console.log(videoGameTitles)

    let block = canvas.selectAll('g').data(videoGameTitles).enter().append('g')

    block.append('rect').attr('class', 'tile').attr('fill', (videoGame) => {
        let category = videoGame['data']['category']
        if (category === '2600') return 'orange';
        else if (category === 'Wii') return 'white';
        else if (category === 'NES') return 'coral';
        else if (category === 'GB') return 'lightblue';
        else if (category === 'DS') return 'blue';
        else if (category === 'X360') return 'lightgreen';
        else if (category === 'PS3') return 'darkgray';
        else if (category === 'PS2') return 'black';
        else if (category === 'SNES') return 'green';
        else if (category === 'GBA') return 'orange';
        else if (category === 'PS4') return 'gray';
        else if (category === '3DS') return 'lightgray';
        else if (category === 'N64') return 'darkblue';
        else if (category === 'PS') return 'darkgreen';
        else if (category === 'XB') return 'olivegreen';
        else if (category === 'PC') return 'indigo';
        else if (category === 'PSP') return 'purple';
        else if (category === 'XOne') return 'bluegreen';

    })
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
