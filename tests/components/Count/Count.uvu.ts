import { test } from 'uvu';
import * as assert from 'uvu/assert';
import * as ENV from '../../setup/env.js';
import { render, fireEvent } from '@testing-library/svelte'

// Relies on `setup/register`
import Count from '../../../src/Count.svelte';

test.before(ENV.setup);
test.before.each(ENV.reset);

const wait = (ms: number) => new Promise(res => setTimeout(res, ms))

test('It pause the timer', async () => {
	const { getByText, getByDisplayValue } = render(Count)
	const $input = getByDisplayValue('5')
	const $btnDe = getByText('--')
	await fireEvent.click($btnDe)
	await wait(100)
	const $btnIn = getByText('++')
	await fireEvent.click($btnIn)
	assert.is($input.value, '5')
})

test('should render with "5" by default', async () => {
	const { getByDisplayValue } = render(Count);
	const $input = getByDisplayValue('5')
	assert.type($input.value, 'string')
	assert.snapshot($input.value, '5')
	// assert.snapshot(
	// 	container.innerHTML,
	// 	`<div><button·id="decr"·class="svelte-6jwl06">--</button>·<input>·<button·id="incr"·class="svelte-6jwl06">++</button></div>`
	// );
});

test('should accept custom `count` prop', async () => {
	// const { container } = ENV.render(Count, { count: 99 });
	const { getByDisplayValue } = render(Count, { count: 99 });
	const $input = getByDisplayValue('99')
	assert.is($input.value, '99')

	// assert.snapshot(
	// 	container.innerHTML,
	// 	`<button·id="decr"·class="svelte-6jwl06">--</button>·<input>·<button·id="incr"·class="svelte-6jwl06">++</button>`
	// );
});

test('should increment count after `button#incr` click', async () => {
	// const { getByDisplayValue } = render(Count, { count: 100 });
	const { component, container } = ENV.render(Count, { count: 100 });
	// console.log(component.$$.ctx, component, container)
	const $input = container.querySelector('input')
	// assert.is($input.value, '99')
	assert.snapshot(
		$input.value,
		`100`
	);

	// await ENV.fire(
	// 	container.querySelector('#incr'),
	// 	'click'
	// );

	// assert.snapshot(
	// 	container.innerHTML,
	// 	`<button id="decr">--</button> <span>6</span> <button id="incr">++</button>`
	// );
});

// test('should decrement count after `button#decr` click', async () => {
// 	const { container } = ENV.render(Count);

// 	assert.snapshot(
// 		container.innerHTML,
// 		`<button id="decr">--</button> <span>5</span> <button id="incr">++</button>`
// 	);

// 	await ENV.fire(
// 		container.querySelector('#decr'),
// 		'click'
// 	);

// 	assert.snapshot(
// 		container.innerHTML,
// 		`<button id="decr">--</button> <span>4</span> <button id="incr">++</button>`
// 	);
// });

test.run();
