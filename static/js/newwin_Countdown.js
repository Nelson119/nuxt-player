// JScript 檔
// 新開啟的視窗要加入這一段JS來防止countdown timeout
document.onmousedown=resetTimer;
document.onkeypress=resetTimer;
window.onbeforeunload=resetTimer;
window.focus();
var main_page=window;

function getmainpage() //取得最上層父視窗
{
    if (main_page.opener != null)
    {
        main_page=main_page.opener;
        getmainpage();
    }
}
getmainpage();

function resetTimer()
{
   if(window.opener)
   {

          if (!!main_page.parent.main.t)
          {
             main_page.parent.main.resetTime();
          }

   }
}