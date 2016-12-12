	var expression = document.getElementById('expression')
	var result = document.getElementById('result')
	// 设置数字输入显示
	var nums = document.getElementsByClassName('btn-num')
	for (var i = 0; i < nums.length; i++) {
		nums[i].onclick = function() {
			console.log('pressed ' + this.getAttribute('value'))
			expression.innerHTML += this.getAttribute('value')
			calc()
		}
	}
	// 设置加减乘除的显示
	var operators = document.getElementsByClassName('operators')
	for (var i = 0; i < operators.length; i++) {
		operators[i].onclick = function() {
			console.log('pressed ' + this.getAttribute('value'))
			expression.innerHTML += this.getAttribute('value')
			calc()
		}
	}

	// 结果实时显示
	function calc() {		
		var exp_pseudo = expression.innerText
		console.log(exp_pseudo + '=')
		result.innerText = eval(expression.innerText)
	}

	// 设置C按键清除屏幕
	function clear() {
		expression.innerText = ''
		result.innerText = 0
		console.log('cleared!')
	}
	var btnClear = document.getElementById('clear')
	btnClear.onclick = function() {
		clear()
	}
	
