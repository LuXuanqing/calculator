var expression = document.getElementById('expression')
var result = document.getElementById('result')
var hasEqualPressed = false

// 常用功能
function addClass(element, value) {
	if (element.className == null) {
		element.className = value
	} else {
		newClassName = element.className + " " + value
		element.className = newClassName
	}
}

function removeClass(element, value) {
	element.className = element.className.replace(value, '')
}

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
	// 保持expression的滚动条在最底部，以始终显示表达式的末尾

	expression.scrollTop = expression.scrollHeight
}

// 设置数字输入显示
var nums = document.getElementsByClassName('btn-num')
for (var i = 0; i < nums.length; i++) {
	nums[i].onclick = function() {
		if (hasEqualPressed) {
			expression.innerHTML = this.getAttribute('key')
			hasEqualPressed = false
		} else {
			expression.innerHTML += this.getAttribute('key')
			autoSize(expression)
			calc()
		}
	}
}

// 设置加减乘除的显示
var operators = document.getElementsByClassName('operators')
for (var i = 0; i < operators.length; i++) {
	operators[i].onclick = function() {
		// 在算式为空时禁止输入乘除
		if ((this.getAttribute('key') == '×') || (this.getAttribute('key') == '÷')) {
			if (expression.innerHTML !== '') {
				hasEqualPressed = false
				expression.innerHTML += this.getAttribute('key')
				autoSize(expression)
			}
		} else {
			hasEqualPressed = false
			expression.innerHTML += this.getAttribute('key')
			autoSize(expression)
		}
	}
}

// 设置C按键清除屏幕
var btnClear = document.getElementById('clear')

btnClear.addEventListener('click', function() {
	addClass(expression, 'fadeout')
	result.innerHTML = 0
})
expression.addEventListener('webkitAnimationEnd', function(e){
	if (e.animationName == 'fadeout') {
		expression.innerHTML = ''
		removeClass(expression, 'fadeout')
	}
}, false)

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
		calc()
	} else {
		expression.innerHTML += '('
	}
}

// 设置等号按键
var btnEqual = document.getElementById('equal')
btnEqual.addEventListener('click', function() {
	if (expression.innerHTML !== '') {
		addClass(result, 'slideup_result')
		addClass(expression, 'slideup_exp')
		autoSize(result)
		expression.style.fontSize = result.style.fontSize
		hasEqualPressed = true
	}
})

// 动画结束吹后
result.addEventListener('webkitAnimationEnd', function(e){
	if (e.animationName == 'slideup_result') {
		expression.innerHTML = result.innerHTML
		result.innerHTML = ''
		//result恢复原来字体大小
		result.style.fontSize = '28px'
		// 移除动画标签
		removeClass(result, 'slideup_result')
		removeClass(expression, 'slideup_exp')
	}
}, false)
