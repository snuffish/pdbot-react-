let obj = {
	x: 0,
	y: 0
}

let { x, y } = obj
x = 5

console.log(obj.this)