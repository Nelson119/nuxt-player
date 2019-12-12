/*
==========================
Name:CVPlayer V1.0.5.0 
UpDate:2011-01-26
Author:Mars
==========================
*/

var thisForm = window.document.forms.form1;
		function gotoPage(intPage)
		{
		    
		    thisForm.CVPlayer.SpecifyPageToPlay(intPage);
		}

		function GetMessage(files , data)
		{
		  
          switch(files)
          {
              case "ChangePage":
                  thisForm.CutPage.options[data - 1].selected = true;
                  GoPage(data);
                  showstyle(thisForm.CutPage);
                  setTimeout("clearstyle(thisForm.CutPage)", 1000);
                  break;
          	case "NotifyPlayerStop":
          	  if(typeof(showstreamstop)=="function")
          	  {
          	    showstreamstop(data);
          	  }          	
          	  break;
          	case "CamEvent":
          	  if(typeof(showEvent)=="function")
          	  {
          	    showEvent(data);
          	  }          	
          	  break;
          	case "Zoomin":
          	  if(typeof(SetZoom)=="function")
          	  {
          	    SetZoom();
          	  }
          	  break;
          	case "Zoomout":
          	  if(typeof(SetZoomOut)=="function")
          	  {
          	    SetZoomOut();
          	  }          	
          	  break;
          	case "AlarmServerError":
          	  break;
          	case "SendCoordinate":
          	  if(typeof(SetCoordinate)=="function")
          	  {
          	    SetCoordinate(data);
          	  }          	
          	  break;
          	case "OnFocus":
          	  if(typeof(GetOnFocus)=="function")
          	  {
          	    GetOnFocus(data);
          	  }
          	  break;  
          	case "OnFocusWithCamid":
          	  if(typeof(GetOnFocusWithCamid)=="function")
          	  {
          	    GetOnFocusWithCamid(data);
          	  }
          	  break;

         case "CallAction":

             //if(typeof(GetPW)=="function")
             //{
             //  GetPW(data);  
             //}

             break;

         case "zoominbtn":
             var tmpCVPlayerFrame = CVPlayerFrame;
             CVPlayerFrame = '1';
             SetSize();
             CVPlayerFrame = tmpCVPlayerFrame;
             /*
             else
             {
             LoadVideoFileForPlay();
             }
             */
             break;

        default:
          	  break;  
          }
          
          /*
          if(files == "ChangePage")
          {
            thisForm.CutPage.options[data-1].selected = true;
            showstyle(thisForm.CutPage);
            setTimeout("clearstyle(thisForm.CutPage)" ,2000);
          }
          */
          
        }
		 
		 /*   
        function GetPW(data)
		{
		      var aryUri = data.split("&");
          	  var params1 = aryUri[0].split("=");
          	  var cmd = params1[1] + "";
          	  var params2 = aryUri[1].split("=");
          	  var ncip = params2[1] + "";
          	  var params3 = aryUri[2].split("=");
          	  var camid = params3[1] + "";
              if(cmd == "move")
    		    PageMethods.RemovePassword(ncip,camid);
    		  if(cmd == "restore")
    		    PageMethods.RestorePassword(ncip,camid);

		}
		*/
		    function SetPlayerNumber(intSplit,intWidth,intHeight)
    		{
		        
		        thisForm.CVPlayer.SetPlayerNumber(intSplit, intWidth, intHeight);
		    }

             function StartToPlay() {
                 try {
                     

                     thisForm.CVPlayer.StartToPlay();
                 }
                 catch (e)
                 { }
                
             }
		    
		    
             function StartToPlayByIndex(intIndex,strVideo,strTitle)
             {
                
             	thisForm.CVPlayer.StartToPlayByIndex(intIndex,strVideo, strTitle);
             }		    
		    
		    
             function SetPlaylist(strVideo,strTitle)
             {
               //console.log(thisForm.CVPlayer);
              thisForm.CVPlayer.SetPlaylist(strVideo, strTitle);
             }
             
             function doStartPlay()
             {
                
                thisForm.CVPlayer.SingleStartToPlay();
             }
             
             function AllStartPlay()
             {
                
                thisForm.CVPlayer.AllStartToPlay();
             }             
             
             function StartToLoopPlay()
             {
                
                thisForm.CVPlayer.StartToLoopPlay();	
             }
             
             function SetLoopInterval(intSec)
             {
                
                thisForm.CVPlayer.SetLoopInterval(intSec);	
             }             
             
             function StopToLoopPlay()
             {
                
                thisForm.CVPlayer.StopToLoopPlay();
             }
             
            function SetFullScreen()
            {
                
                setTimeout("thisForm.CVPlayer.SetFullScreen();", 100);
            }
            
            function SetBacktoOriginalSize()
            {
                
                thisForm.CVPlayer.SetBacktoOriginalSize();
            }

            function maxWindow()
            {
                window.moveTo(0,0);
                window.open("","","fullscreen,scrollbars");

		            if (document.all)
		            {
		              top.window.resizeTo(screen.availWidth,screen.availHeight);
		              document.write(screen.availWidth + " " + screen.availHeight);
		            }
		            else if (document.layers||document.getElementById)
		            {
		              if (top.window.outerHeight<screen.availHeight||top.window.outerWidth<screen.availWidth)
		              {
		                top.window.outerHeight = screen.availHeight;
		                top.window.outerWidth = screen.availWidth;
		              }
		            }
            }

            function SetTogglePlayPause()
            {
               
               thisForm.CVPlayer.TogglePlayPause();
            }
            
            function PauseToPlay()
            {
               
               thisForm.CVPlayer.PauseToPlay();
            }
            
            function StopToPlay()
            {
               
               thisForm.CVPlayer.StopToPlay();
            }
            
            function AllPauseToPlay()
            {
               
               thisForm.CVPlayer.AllPauseToPlay();
            }
            
            function AllStopToPlay()
            {
               
               thisForm.CVPlayer.AllStopToPlay();
            }            
            
            
            function TakeSnapshot()
            {
                
                thisForm.CVPlayer.TakeSnapShot(0,0);
            }
            
            function BackToOriginalSize()
            {
                
                thisForm.CVPlayer.SetBacktoOriginalSize();
            }
            
           
            function SetPlayerRewind()
            {
                
                thisForm.CVPlayer.SetRewind();
            }
            
            function StartToRecord()
            {
                
                thisForm.CVPlayer.StartToRecord();
            }
            
            function StopToRecord()
            {
                
                thisForm.CVPlayer.StopToRecord();
            }
            
            function SetGeneralSetting()
            {
                
                thisForm.CVPlayer.SetGeneralSetting();
            }
            
            function GotoSnapshotFolder()
            {
                
                thisForm.CVPlayer.GotoSnapshotFolder();
            }

            function GotoRecordFolder()
            {
                
                thisForm.CVPlayer.GotoRecordFolder();
            }
            
            function SetRewind(rate)
            {
                
                thisForm.CVPlayer.SetRewind(rate);
            }
            
            function SetFFW(rate)
            {
                
                thisForm.CVPlayer.SetFFW(rate);
            }		       
            function ForwardFramebyFrame()
            {
                
                thisForm.CVPlayer.ForwardFramebyFrame();
            }

            function RewindFramebyFrame()
            {
                
                thisForm.CVPlayer.RewindFramebyFrame();
            }
            
            //set rstp buffer time millisecond.
            function SetRtspBufferTime(intms)
            {
                
                thisForm.CVPlayer.SetRtspBufferTime(intms);
            }    
            
            function SetPanelTime(index, inthour, intmin, intsec)
            {
                
                thisForm.CVPlayer.SetPanelTime(index, inthour, intmin, intsec);
            }
            
            function ShowIVS(isopen)
            {
                
                thisForm.CVPlayer.ShowIVS(isopen);
            }


            function SetIVSLogo(coordinate)
            {
                
                thisForm.CVPlayer.SetIVSLogo(coordinate);
            }


        function GetPanelIndex()
        {
            
        	var PIndex = "";
        	if(thisForm.CVPlayer)
        	PIndex = thisForm.CVPlayer.GetPanelIndex();
        	return PIndex;
        }
        
        function GetPanelCamid()
        {
            
        	var camid = "";
        	if(thisForm.CVPlayer)
        	camid = thisForm.CVPlayer.GetPanelCamid();
        	return camid;
        }        
        
        function GetPanelStatus()
        {
            
        	var PStatus = "";
        	if(thisForm.CVPlayer)
        	PStatus = thisForm.CVPlayer.GetPanelStatus();
        	return PStatus;
        }        
 
        function GetVersion()
        {
            
        	var sreVersion = "";
        	if(thisForm.CVPlayer)
        	sreVersion = thisForm.CVPlayer.ReportCurrentVersion();
        	return sreVersion;
        }

		   function IsCVPlayer( )
		   {
		    try{
		       var objDownload = new ActiveXObject("Butterfly.UserControl1");
		       //alert(objDownload.ReportCurrentVersion());
		       return objDownload.ReportCurrentVersion();
		    }
		    catch(exception) {
		    	 //alert("物件不存在");
		    	 return "";
		    }
		   }
		   
		   function SetWarning(intIndex,intSec)
		   {
		      
		   	  thisForm.CVPlayer.SetWarning(intIndex,intSec);
		   }
		   
		   function EnableMenu(isshow)
		   {
		      
		   	  thisForm.CVPlayer.ShowContextMenu(isshow);
		   }		

		   function SetEventServer(strUri)
		   {
		       
		       thisForm.CVPlayer.SetEventServer(strUri);
		   }	
		   
		   function CloseEventServer()
		   {
		       
		   	   thisForm.CVPlayer.CloseEventServer();
		   }			   
 
 		   function ShowTitle(isshow)
		   {
 		       
		   	   thisForm.CVPlayer.ShowTitle(isshow);
		   }	
		   
		   //設定事件外框閃爍
 		   function SetWarning(Index,sec)
 		   {
 		       
		   	   thisForm.CVPlayer.SetWarning(Index,sec);
		   }				   	
		   
           function CheckBrowser()
           {
                if (navigator.userAgent.indexOf('Firefox') >= 0)
                {
                  document.write('<object id="CVPlayer" name="CVPlayer" TYPE="application/x-itst-activex" ALIGN="baseline" BORDER="0" WIDTH="640" HEIGHT="480" clsid="{1D815D08-F659-4c89-B054-9CAE14928340}"></object>\n');                       
                }
                else
                {
                  document.write('<object TYPE="application/x-itst-activex" id="CVPlayer" name="CVPlayer" align="middle" height="480" width="640" classid="clsid:1D815D08-F659-4c89-B054-9CAE14928340"></object>\n');
                }
           }
           
           
		   //重置CVPlayer
 		   function Reset() {
 		       try {
 		           
		   	       thisForm.CVPlayer.Reset();
              }
              catch(e)
              {
              }
		   }	           
		   
		   //設定語系
 		   function SetCulture(language)
		   {
 		       try {
 		           
		   	       thisForm.CVPlayer.SetCulture(language);
  			  }
			  catch (e)
			  {}		   	  
		   }

		   function setPlayerPositionByPercent(value) {
		       try {
		           
		           thisForm.CVPlayer.setPlayerPositionByPercent(value);
               }
               catch(e){
               }
		   }

		   function setPlayerPositionByTime(hr, min, sec) {
		       try {
		            
		            thisForm.CVPlayer.setPlayerPositionByTime(hr, min, sec);
               }
               catch(e) {
               }
		   }

		   function getVideoLength() {
		       var vl = "";
		       
		       if (thisForm.CVPlayer) {
                   try{
		               vl = thisForm.CVPlayer.getVideoLength();
                   }
                   catch(e)
                   {
                   }
		       }
		       return vl;
		   }
		   function IVSControlFromWeb() {
		       
		       thisForm.CVPlayer.IVSControlFromWeb();
		   }


 //ShowFile/Live/Live_SelCam.aspx
 function detectcvplayer(anAlt, link)
 {
    try
    {
        var objDownload = new ActiveXObject("Butterfly.UserControl1");
        var newVersion = link.substring(link.indexOf("cvplayer-v"), link.indexOf(".exe")).replace("cvplayer-v", "");
        var updateMsg = "目前CVPlayer已有更新版本至v" + newVersion + "，建請下載使用。";

        var currentVersion = objDownload.ReportCurrentVersion() || "";
        currentVersion = currentVersion.split(".").join("");

        if (currentVersion != newVersion) {
            if (confirm(updateMsg)) {
                window.location.href = link;
            }
        }
    }
    catch(exception) {
        if(confirm(anAlt))
        {
            //window.location.href="http://vrs.hinet.net/download/CVPlayer/setup.exe";
            if (link == "")
                link = "http://vrs.hinet.net/download/CVPlayer/v163/cvplayer-v163j.exe";
            window.location.href = link;
        }
    }
}
function setPlayerSnapshotNum(number) 
 {
    
    thisForm.CVPlayer.setSnapshotNum(number);
 }

function AllStartToFFW() 
{
    
    thisForm.CVPlayer.AllStartToFFW();
}

function AllStartToRewind() 
{
    
    thisForm.CVPlayer.AllStartToRewind();
}

      var IsZoom = false;

      function SetSize()
      {
        //  var ht = window.screen.availHeight;
        //  var wh = window.screen.availWidth;
        //  var cvwh = 660;
        //  var cvht = 600;
        //  if(ht < 768 ) 
        //  {
        //    cvwh = 660;
        //    cvht = 600;
        //  }else{
        //    cvwh = 1024;
        //    cvht = 860;
        //  } 
         //thisForm.CVPlayer.width = cvwh;
         //thisForm.CVPlayer.height = cvht;        

           ReSetSize();
           SetPlayerNumber(thisForm.panelnum.value,thisForm.CVPlayer.width,thisForm.CVPlayer.height);
          //  CreatePage();
      }
      
      function ReSetSize()
      {
                switch(thisForm.panelnum.value*1)
                {
                  case 1:
                    thisForm.CVPlayer.width = 640;
                    thisForm.CVPlayer.height = 480;
                    break;
                  case 4:
                    thisForm.CVPlayer.width = 320;
                    thisForm.CVPlayer.height = 240;
                    break;
                  case 9:
                    thisForm.CVPlayer.width = 240;
                    thisForm.CVPlayer.height = 180;
                    break;
                  case 16:
                    thisForm.CVPlayer.width = 180;
                    thisForm.CVPlayer.height = 120;
                    break;
                }     
      }
      
      
      //設定自動播放
      function SetAutoPlay()
      {
                if(thisForm.IsAuto.value==0)
                {
                  thisForm.btnStartLoopPlay.value="停止";
                  thisForm.IsAuto.value=1;
                  SetLoopInterval(thisForm.intsec.value);
                  StartToLoopPlay();  
                }else{
                  thisForm.btnStartLoopPlay.value="輪播";
                  thisForm.IsAuto.value=0;
                  StopToLoopPlay(); 
                }       
      }
      
        //產生分頁
        function CreatePage()
        {
            var objListPage = thisForm.CutPage;
            objListPage.options.length=0;
            var intTot = thisForm.CVPlayer.TotalPageNumber;
            if(intTot > 0)
            {
              for(i=1;i<=intTot;i++)
              {
                var newitem = document.createElement("OPTION");
                newitem.text = i;
                newitem.value = i;      
                objListPage.options.add(newitem);
              }
            }
        }     
      
      function SetZoom_old()
      {
         var objTbar = document.getElementById("tbar");
         if(objTbar != null){
            objTbar.style.display="none";
         }
         SetFullScreen();
         var WshShell = new ActiveXObject('WScript.Shell')
         WshShell.SendKeys('{F11}');        
      }  
      
      
      function SetZoom()
      {
            if(IsZoom==false)
            {
              IsZoom = true;
              barenable(false);
              SetFullScreen();      
            }
      }  

      function SetZoomOut()
      {
            IsZoom = false;
            barenable(true);
            ReSetSize()
            SetBacktoOriginalSize();
      }       
      
      function barenable(IsEnable)
      {
        var objTbar = document.getElementById("tbar");
        if(objTbar != null)
        {
          if(IsEnable)
          {
            objTbar.style.display="block";
          }else
          {
            objTbar.style.display="none";
          }
        }
      }           


        function initKey()
        {
                if (document.addEventListener)
                {
                   document.addEventListener("keyup",keyup,false);
                }
                else if (document.attachEvent)
                {
                   document.attachEvent("onkeyup", keyup);
                }
                else
                {
                   document.onkeyup= keyup;
                }
                
                document.body.onunload = function(){ thisForm.CVPlayer.CloseAll(); }
        }
        
        function keyPressHandler(e) 
        {
           if(e.keyCode==27){
                  //window.alert("Escape key pressed!");
              document.getElementById("tbar").style.display="block";
           }
        }
        
        function keyup(e)
        {
          if (!e) e= event;
          if(e.keyCode == 27)//ESC
          {
           if(IsZoom==true)
           {

              SetZoomOut();
                         
           }
           /*           
            var objTbar = document.getElementById("tbar");
            if(objTbar != null){
               objTbar.style.display="block";
            }
            SetBacktoOriginalSize();
            var WshShell = new ActiveXObject('WScript.Shell')
            WshShell.SendKeys('{F11}');            
            */
          }
            //return suppressdefault(e,document.thisForm.keyup.checked);
        }


  function showstyle(cvobj)
　{
   cvobj.style.backgroundColor="#FF00FF";
   /*
   cvobj.style.border="3px";
 　cvobj.style.borderStyle="solid";
　 cvobj.style.color="#ff0000";
   */
　}

  function clearstyle(cvobj)
　{
   cvobj.style.backgroundColor="#ffffff";
   /*
   cvobj.style.border="";
 　cvobj.style.borderStyle="";
　 cvobj.style.color="";
   */
　}

  //攝影機斷線回傳訊息
  function showstreamstop(msg)
  {
    alert("斷線攝影機編號"+msg);
  }

       function showEvent(strEvent)
       {
         alert(strEvent);
       }

  