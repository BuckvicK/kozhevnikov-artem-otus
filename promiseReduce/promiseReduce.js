var fn1 = () => {
	console.log("fn1");
	return Promise.resolve(1);
};

var fn2 = () =>
	new Promise((resolve) => {
		console.log("fn2");
		setTimeout(() => resolve(2), 1000);
	});

function promiseReduce(asyncFunctions, reduce, initialValue) {
	return new Promise(async function (resolve, reject) {
		try {
			for (let func of asyncFunctions) {
				initialValue = reduce(initialValue, await func());
			}
			resolve(initialValue);
		} catch (err) {
			reject(err);
		}
	});
}

function testReduce0(memo, value) {
	console.log("reduce");
	return memo * value;
}

function testReduce1(memo, value) {
	console.log("testReduce1", memo, value);
	return value;
}

promiseReduce(
	[fn1, fn2],
	function (memo, value) {
		console.log("reduce");
		return memo * value;
	},
	1
).then(console.log);
