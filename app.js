const el = (el) => document.querySelector(el);
const all = (el) => Array.from(document.querySelectorAll(el));
const grid = el('.grid');

let drawing = 'rgb';

let size = 10;

const drawGrid = (e) => {
	if (e) {
		e.preventDefault();
		const { value } = e.target;
		size = value;
	}

	grid.innerHTML = '';

	const dimensions = 100 / size;
	const margin = dimensions * 0;

	for (i = 0; i < Math.pow(size, 2); i++) {
		const newCell = document.createElement('div');
		newCell.classList.add('cell');
		newCell.style.margin = `${margin}%`;
		newCell.style.width = `${dimensions - margin * 2}%`;
		newCell.style.height = `${dimensions - margin * 2}%`;
		grid.appendChild(newCell);
	}
	all('.cell').forEach((cell) =>
		cell.addEventListener('pointerenter', (e) => draw(e))
	);
};

drawGrid();

const randomNum = (n) => Math.random() * n;

const rgb = (e) => {
	e.target.style.backgroundColor = `rgb(${randomNum(255)}, ${randomNum(
		255
	)}, ${randomNum(255)})`;
};
const picker = (e) => {
	const element = el('#picker > input');

	e.target.style.backgroundColor = element.value;
};
const greyScale = (e) => {
	let check = e.target.style.backgroundColor
		.replace(/[a-z() ]/gi, '')
		.split(',')
		.map((n) => parseFloat(n));

	const rgba =
		check.slice(0, 3).filter((n) => n === 0).length && check.length === 4;

	if (check.slice(0, 3).filter((n) => n === 0).length && check.length === 3)
		return;
	if (rgba && check[3] === 0.9) {
		e.target.style.backgroundColor = 'rgb(0,0,0)';
	} else if (!rgba) {
		e.target.style.backgroundColor = 'rgba(0, 0, 0, 0.1)';
	} else if (rgba) {
		e.target.style.backgroundColor = `rgba(0, 0, 0, ${check[3] + 0.1})`;
	}
};

const unDraw = (e) => {
	e.target.style.backgroundColor = null;
};

const draw = (e) => {
	e.preventDefault();

	drawing === 'erase'
		? unDraw(e)
		: drawing === 'rgb'
		? rgb(e)
		: drawing === 'picker'
		? picker(e)
		: greyScale(e);
};

all('.controller > button').forEach((button) =>
	button.addEventListener('click', (e) => {
		const { id, classList } = e.currentTarget;
		all('.controller > button').forEach((button) =>
			button.classList.remove('active')
		);
		drawing = id;
		classList.add('active');
	})
);

el('#clear').addEventListener('click', (e) => {
	if (grid.innerHTML !== '')
		all('.cell').forEach((cell) => (cell.style.backgroundColor = null));
});
el('#range').addEventListener('change', (e) => drawGrid(e));
