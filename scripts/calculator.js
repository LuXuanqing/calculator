var expression = document.getElementById('expression')
var result = document.getElementById('result')
// 设置数字输入显示
var nums = document.getElementsByClassName('btn-num')
for (var i = 0; i < nums.length; i++) {
	nums[i].onclick = function() {
		console.log('pressed ' + this.getAttribute('value'))
		expression.value += this.getAttribute('value')
		calc()
	}
}

// 设置加减乘除的显示
var operators = document.getElementsByClassName('operators')
for (var i = 0; i < operators.length; i++) {
	operators[i].onclick = function() {
		console.log('pressed ' + this.getAttribute('value'))
		expression.value += this.getAttribute('value')
	}
}

// 设置C按键清除屏幕
function clear() {
	expression.value = ''
	result.innerText = 0
	console.log('cleared!')
}
var btnClear = document.getElementById('clear')
btnClear.onclick = function() {
	clear()
}

// 替换表达式中的乘除号
function convert(str) {
	str = str.replace(/×/g, '*')
	str = str.replace(/÷/g, '/')
	return str
}

// 计算表达式
function calc() {
	var exp_pseudo = expression.value
	var exp_true = convert(exp_pseudo)
	// 如果表达式为空，则结果为0
	if (exp_true == "") {
		result.innerText = 0
	} else if (exp_true == "2+2") {
		result.innerText = 5
	} else {
		result.innerText = eval(exp_true)
	}
	changeFontSize()
}

// 设置del键
var del = document.getElementById('del')
del.onclick = function() {
	var exp = expression.value
	// 删除表达式字符串中的最后一个字符
	exp = exp.substring(0, exp.length-1)
	expression.value = exp
	calc()
}

// 设置括号建
var brackets = document.getElementById('brackets')
brackets.onclick = function() {
	var lastChar = expression.value.charAt(expression.value.length-1)
	console.log(lastChar)
	if (lastChar == '.' || lastChar == '') {
		return false
	} else if (/\d/.test(lastChar) || lastChar == ')') {
		expression.value += ')'
	} else {
		expression.value += '('
	}
	calc()
}

// 更具表达式的长度自动缩放字体大小
function changeFontSize() {
	var length = expression.value.length
	console.log(length)
	if (length < 11) {
		expression.className = 'display size1'
	} else if (length <16) {
		expression.className = 'display size2'
	} else {
		expression.className = 'display size3'
	}
}
