<template>
    <div :data-initialed="initialed">
        <div class="Title">{{this.title}}</div>
        <div class="Info">
            <span>{{info}} - {{time}}</span><br>
            <span class="FontXS">{{filename}}</span>
        </div>
        <div class="Slice">
            <div v-if="source">
                <object id="CVPlayer" name="CVPlayer" align="middle" BORDER="0" height="600" width="768" classid="clsid:1D815D08-F659-4c89-B054-9CAE14928340"></object>
            </div>
        </div>
    </div>
</template>

<script>

// Vue.use(VideoPlayer);

export default {
    name: 'video-set',
    data() {
      return {
        player: {},
        initialed: false,
        intervalRewind: 0,
        isRewind: false
      }
    },
    props:['index','classnames', 'source','playbackrate','poster','title','time','filename','info','sources'],
    methods: {
        SetPlayerNumber: function (intSplit,intWidth,intHeight)
        {
            this.CVPlayer.SetPlayerNumber(intSplit,intWidth,intHeight);
        },
        StartToPlay:function ()
        {
            this.CVPlayer.StartToPlay();
        },
        StartToPlayByIndex:function (intIndex,strVideo,strTitle)
        {
            this.CVPlayer.StartToPlayByIndex(intIndex,strVideo, strTitle);
        },
        SetPlaylist: function (strVideo,strTitle)
        {
            this.CVPlayer.SetPlaylist(strVideo, strTitle);
        },
        doStartPlay: function ()
        {
            this.CVPlayer.SingleStartToPlay();
        },   
        AllStartPlay: function ()
        {
            this.CVPlayer.AllStartToPlay();
        },
        StartToLoopPlay: function ()
        {
            this.CVPlayer.StartToLoopPlay();	
        },
        SetLoopInterval: function (intSec)
        {
            this.CVPlayer.SetLoopInterval(intSec);	
        },
        StopToLoopPlay: function ()
        {
            this.CVPlayer.StopToLoopPlay();
        },
        SetFullScreen:function ()
        {
            setTimeout("this.CVPlayer.SetFullScreen()" ,100);
        },
        SetBacktoOriginalSize: function ()
        {
            this.CVPlayer.SetBacktoOriginalSize();
        },
        SetTogglePlayPause: function ()
        {
            this.CVPlayer.TogglePlayPause();
        },
        PauseToPlay: function ()
        {
            this.CVPlayer.PauseToPlay();
        },
        StopToPlay: function ()
        {
            this.CVPlayer.StopToPlay();
        },
        AllPauseToPlay: function ()
        {
            this.CVPlayer.AllPauseToPlay();
        },
        AllStopToPlay: function ()
        {
            this.CVPlayer.AllStopToPlay();
        },
        TakeSnapshot: function ()
        {
            this.CVPlayer.TakeSnapShot(0,0);
        },
        BackToOriginalSize: function ()
        {
            this.CVPlayer.SetBacktoOriginalSize();
        },
        SetPlayerRewind: function ()
        {
            this.CVPlayer.SetRewind();
        },
        StartToRecord: function ()
        {
            this.CVPlayer.StartToRecord();
        },
        StopToRecord: function ()
        {
            this.CVPlayer.StopToRecord();
        },
        SetGeneralSetting: function ()
        {
            this.CVPlayer.SetGeneralSetting();
        },
        GotoSnapshotFolder: function ()
        {
            this.CVPlayer.GotoSnapshotFolder();
        },
        GotoRecordFolder: function ()
        {
            this.CVPlayer.GotoRecordFolder();
        },
        SetRewind: function (rate)
        {
            this.CVPlayer.SetRewind(rate);
        },
        SetFFW: function (rate)
        {
            this.CVPlayer.SetFFW(rate);
        },
        ForwardFramebyFrame: function ()
        {
            this.CVPlayer.ForwardFramebyFrame();
        },
        RewindFramebyFrame: function ()
        {
            this.CVPlayer.RewindFramebyFrame();
        },
        GetPanelIndex: function ()
        {
        	var PIndex = "";
        	if(this.CVPlayer)
        	PIndex = this.CVPlayer.GetPanelIndex();
        	return PIndex;
        },
        GetPanelStatus: function ()
        {
        	var PStatus = "";
        	if(this.CVPlayer)
        	PStatus = this.CVPlayer.GetPanelStatus();
        	return PStatus;
        },
        GetVersion: function ()
        {
        	var sreVersion = "";
        	if(this.CVPlayer)
        	sreVersion = this.CVPlayer.ReportCurrentVersion();
        	return sreVersion;
        },
        IsCVPlayer: function ( )
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
		   
           
    },
    mounted: function () {
        var $this = this;
            this.init(() => {
                // console.log($this.player);
                if($this.player && $this.player.src){
                    $this.stop();
                    $this.player.src({
                        src: $this.source
                    });
                }
            });
    } ,
    destroyed: function(){
        this.dispose();
    },
    updated: function(){
        if(!this.player || !this.player.src){
            // console.log('init value')
            this.init();
        }
    },
    beforeUpdate:function(){
        // if(this.player && this.player.src){
            // this.sourceCache = this.source.src;
        // }
    },
    watch: {
        source: function(value){
            if(!value){
                return;
            }
            // console.log('value',value)
            var $this = this;
            if(!this.player || !this.player.src){
                // console.log('init value')
                this.init();
            }else{
                $this.stop();
                $this.player.src({
                    src: $this.source
                });
            }
        }
    }
}
</script>
<style lang="scss">
.VDOGrid{
    position: relative;
    .video-player,.video-js, video{
        width: 100%;
        height: 100%;
        position: absolute;
        
    }
    .vjs-control-bar,.vjs-big-play-button{
        display: none;
    }
}
.VDO >div{
    opacity: 0.1;
    transition-duration: 0.2s;
    transition-property: opcity;
    &[data-initialed=true]{
        opacity: inherit;
    }
}
</style>