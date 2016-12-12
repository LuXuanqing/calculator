function prepareInput() {
	var expression = document.getElementById('expression')
	// 设置数字按键
	var nums = document.getElementsByClassName('btn-num')
	for (var i = 0; i < nums.length; i++) {
		nums[i].onclick = function() {
			console.log(this.getAttribute('value'))
			expression.innerHTML += this.getAttribute('value')
		}
	}
}
window.onload = prepareInput


