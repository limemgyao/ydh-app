// 2017-6-28 zzy解决页面滚动时溢出
var myScroll;
document.addEventListener('touchmove', function (e) { e.preventDefault(); }, false);
function InitBodyScroll() {
  try {
    myScroll = new IScroll('#wrapper', {
        preventDefault: false,//（把这句加上去哦）
        preventDefaultException: { tagName: /^(INPUT|TEXTAREA|BUTTON|SELECT|A|LI|DIV)$/ },
        mouseWheel: true,
        onScrollEnd: function () {
            return false;
        }
    });
  } catch (e) {} finally {}

}
function scroll() {
    if (myScroll == undefined) {
        //init scroll
        InitBodyScroll();
    } else {
        myScroll.refresh();
    }
};
 $(document).ready(function () {
  scroll();
 });
