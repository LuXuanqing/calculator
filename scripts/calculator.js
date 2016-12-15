'use strict'
var expression = document.getElementById('expression')
var result = document.getElementById('result')

var calculator = {
	result: 0,
	exp_display: '',
	exp_true: '',
	operate: function () {
		var lastChar = this.exp_true.charAt(this.exp_true.length-1)
		// 最后一位是数字或者是后括号才运行
		if (Number(lastChar) || lastChar == ')') {
			if (this.exp_true == "") {
				this.result = 0// 如果表达式为空，则结果为0
			} else if (this.exp_true == "2+2") {
				this.result = 5//彩蛋
			} else {
				this.result = eval(this.exp_true)
			}
		}
		refresh()
	}
}
// 刷新显示的数据
function refresh() {
	expression.innerHTML = calculator.exp_display
	result.innerHTML = calculator.result
}
// 在表达式末尾插入字符
function insert(char) {
	console.log('pressed ' + char)
	var lastChar = calculator.exp_true
	function add2Exp_true(c) {
		calculator.exp_true += c
	}
	if (char == '(' || char == ')') {
		//括号
		if (lastChar == '.') {
			return false
		} else if (Number(lastChar) || lastChar == ')') {
			add2Exp_true(')')
		} else {
			add2Exp_true('(')
		}
	} else {
		//非括号
		if (char == '.') {
			// 小数点
			// 最后一位是数字
			if (Number(lastChar)) {
				add2Exp_true(char)
			}
		} else if (/[\+\-\*\/]/.test(char)) {
			console.log('输入了运算符')
			// 运算符号
			if (Number(lastChar) || lastChar == ')') {
				// 最后一位是数字或者后括号，插入
				add2Exp_true(char)
			} else if (/[\+\-\*\/]/.test(lastChar)) {
				// 最后一位是运算符，删除原来的最后一位运算符然后插入新的
				delLastInput()
				add2Exp_true(char)
			}
		}else if (Number(char)) {
			// 数字
			add2Exp_true(char)
		}
	}
	calculator.exp_display = calculator.exp_true.replace(/\*/g, '&times;')
	calculator.exp_display = calculator.exp_true.replace(/\//g, '&divide;')
	calculator.operate()
}
// 监听键盘输入
document.addEventListener('keypress', function(event) {
	console.log('keyCode: ' + event.keyCode)
	if ((event.keyCode >= 45 && event.keyCode <= 57) || (event.keyCode >= 40 && event.keyCode <= 43)) {
		insert(String.fromCharCode(event.keyCode))
	} else if (event.keyCode == 13) {
		//按下等于键
		console.log('yes!')
	}
})
// 鼠标点击输入数字
var keys = document.getElementsByClassName('btn-type')
for (var i = 0; i < keys.length; i++) {
	keys[i].addEventListener('click', function(){
		insert(this.getAttribute('key'))
	})
}


// 设置C按键清除屏幕
var btnClear = document.getElementById('clear')
btnClear.onclick = function() {
	calculator.exp_true = ''
	calculator.exp_display = ''
	calculator.result = 0
	refresh()
	console.log('cleared')
}


// 设置del键
var del = document.getElementById('del')
function delLastInput() {
	function deleteLastChar(str) {
		return str.substring(0, str.length-1)
	}
	calculator.exp_true = deleteLastChar(calculator.exp_true)
	calculator.exp_display = deleteLastChar(calculator.exp_display)
	calculator.operate()
}
del.addEventListener('click', function() {
	delLastInput()
})


// 设置括号建
var brackets = document.getElementById('brackets')
brackets.onclick = function() {
	var lastChar = expression.innerHTML.charAt(expression.innerHTML.length-1)
	console.log(lastChar)
	if (lastChar == '.' || lastChar == '') {
		return false
	} else if (/\d/.test(lastChar) || lastChar == ')') {
		expression.innerHTML += ')'
	} else {
		expression.innerHTML += '('
	}
	calc()
}

// 更具表达式的长度自动缩放字体大小
function changeFontSize() {
	var length = expression.innerHTML.length
	console.log(length)
	if (length < 11) {
		expression.className = 'display size1'
	} else if (length <16) {
		expression.className = 'display size2'
	} else {
		expression.className = 'display size3'
	}
}
