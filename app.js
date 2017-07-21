async function search (query) {
	const URI = encodeURIComponent(query);
	const url = `https://crossorigin.me/https://en.wikipedia.org/w/api.php?format=json&action=query&generator=search&gsrnamespace=0&gsrsearch=${URI}&gsrlimit=10&prop=extracts&exintro&explaintext&exsentences=1&exlimit=max`;
	let data = await fetch(url).then((data) => data.json());
	data = data.query.pages;
	parseData(data);
}

function parseData(data) {
	// console.log(data);
	// for (element in data) {
	// 	console.log(data[element]['title']);
	// 	console.log(data[element]['extract']);
	// 	console.log('---------');
	// }

	results.innerHTML = '';

	for (element in data) {
		
		const a = document.createElement('a');
		const div = document.createElement('div');
		const h4 = document.createElement('h4');
		const p = document.createElement('p');
		
		const name = data[element]['title'];
		const desc = data[element]['extract'];
		const pageid = data[element]['pageid'];
		const link = `https://en.wikipedia.org/?curid=${pageid}`;
		
		div.classList.add('result');
		results.appendChild(a);

		h4.innerText = name;
		p.innerText = desc;
		div.appendChild(h4);
		div.appendChild(p);

		a.setAttribute('href', link);
		a.setAttribute('target', '_blank');
		a.appendChild(div);
	}
}

const searchField = document.getElementById('search');
const results = document.getElementById('all-results');

searchField.addEventListener('keydown', function(e) {
	if (e.keyCode == 13 && searchField.value.length > 0) {
		search(searchField.value);
		this.blur();
	}
});
