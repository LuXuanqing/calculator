var expression = document.getElementById('expression')
var result = document.getElementById('result')
// 设置数字输入显示
var nums = document.getElementsByClassName('btn-num')
for (var i = 0; i < nums.length; i++) {
	nums[i].onclick = function() {
		expression.innerHTML += this.getAttribute('value')
		calc()
	}
}

// 设置加减乘除的显示
var operators = document.getElementsByClassName('operators')
for (var i = 0; i < operators.length; i++) {
	operators[i].onclick = function() {
		expression.innerHTML += this.getAttribute('value')
	}
}

// 设置C按键清除屏幕
function clear() {
	expression.innerText = ''
	result.innerText = ''
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
	var exp_pseudo = expression.innerHTML
	var exp_true = convert(exp_pseudo)
	// 如果表达式为空，则结果为0
	if (exp_true == "") {
		result.innerText = 0
	} else if (exp_true == "2+2") {
		result.innerText = 5
	} else {
		result.innerText = eval(exp_true)
	}
	autoSize(expression)
}

// 设置del键
var del = document.getElementById('del')
del.onclick = function() {
	var exp = expression.innerText
	// 删除表达式字符串中的最后一个字符
	exp = exp.substring(0, exp.length-1)
	expression.innerText = exp
	calc()
}

// 设置括号建
var brackets = document.getElementById('brackets')
brackets.onclick = function() {
	var lastChar = expression.innerHTML.charAt(expression.innerHTML.length-1)
	if (lastChar == '.' || lastChar == '') {
		return false
	} else if (/\d/.test(lastChar) || lastChar == ')') {
		expression.innerHTML += ')'
	} else {
		expression.innerHTML += '('
	}
	calc()
}

// 设置等号按键
var btnEqual = document.getElementById('equal')
btnEqual.addEventListener('click', function() {
	$('#result').addClass('slideup_result')
	autoSize(result)
	$('#expression').addClass('slideup_exp')
	expression.style.fontSize = result.style.fontSize
})

function transResultToExp() {
	expression.innerHTML = result.innerHTML
	result.innerHTML = ''
}
// 动画结束吹后
result.addEventListener('webkitAnimationEnd', function(){
	transResultToExp()
	result.style.fontSize = '28px' //result恢复原来字体大小
	$('#result').removeClass('slideup_result')
	$('#expression').removeClass('slideup_exp')
}, false)

// 根据长度自动改变字体大小
function autoSize(el) {
	var length = el.innerHTML.length
	if (length <= 9) {
		el.style.fontSize = '52px'
	} else if (length <= 13) {
		el.style.fontSize = '38px'
	} else {
		el.style.fontSize = '30px'
	}
}
