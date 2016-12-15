# calculator
##An exercise of DOM programming and CSS
original design: [WORAWALUNS](https://dribbble.com/shots/2320805--Freebie-Calculator-UI-Sketch), and I added some my own idea on it.

To do list:
1. "=" button's function
2. keyboard input
3. try to use <input> to display the expression
4. fix the cursor on the btn's text

数字和加减乘除合并为.type
if（数字） 直接插入；
if（运算符号）{
  if（表达式最后一位是数字或者‘）’）{
    插入
  } else if（最后一位是运算符号）{
    删除原来最后一位运算符
    插入新的运算符
  }
}else if（小数点） {
  if（最后一位是数字）{
    插入
  }
}else if（括号）{

}
