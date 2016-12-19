# 动画
点击等号按键后：将表达式变为计算结果，同时原计算结果清空。

此动画效果：
表达式向上滑动消失，同时计算结果上滑到表达式的位置。
## 重写CSS
- [x] 把#display区域写成固定的高度
 - [x] #expression写成固定高度，使用relative
 - [x] #result使用relative和固定高度


## animation
- [ ] @keyframe,改变#result的top
- [ ] @keyframe 改变#expression的opacity和top
- [ ] 监听animationend, expression = rsult, result = ''
