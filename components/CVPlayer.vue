<template>
    <div :data-initialed="initialed">
        <div class="Title">{{this.title}}</div>
        <div class="Info">
            <span>{{info}} - {{time}}</span><br>
            <span class="FontXS">{{filename}}</span>
        </div>
        <div class="Slice">
            <div v-if="source" ref="container">
                <object ref="cvp" @load="init" id="CVPlayer" name="CVPlayer" align="middle" BORDER="0" height="600" width="768" classid="clsid:1D815D08-F659-4c89-B054-9CAE14928340"></object>
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
            try{
                this.CVPlayer.SetPlayerNumber(intSplit, intWidth, intHeight);
            }catch(e){
                console.log('this.CVPlayer.SetPlayerNumber',e);
            }
        },
        IsCVPlayer: function ()
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
        },

        StopToPlay: function () {
        
        },
		SetPlaylist:function (strVideo,strTitle)
        {
            try{
                this.CVPlayer.SetPlaylist(strVideo, strTitle);
            }catch(e){
                console.log(e)
            }
        },
        SetSize: function ()
        {
        },
        play: function(){
            console.log('play')
            var $this = this;
                    try{
                        $this.CVPlayer = $this.$refs.cvp;
                        $this.container = $this.$refs.container;
                        window.CVPlayer = $this.CVPlayer;
                        // $this.CVPlayer.width = $this.container.offsetWidth;
                        // $this.CVPlayer.height = $this.container.offsetHeight;
                        console.log($this.source);
                        $this.SetPlaylist($this.source,$this.title);
                        $this.SetPlayerNumber(1,$this.CVPlayer.width,$this.CVPlayer.height);
                    }catch(e){
                        console.log(e);
                    }
            // try {
            //     this.CVPlayer.SingleStartToPlay();
            // }
            // catch (e)
            // { 
            //     console.log('this.CVPlayer.SingleStartToPlay',e)
            // }
        },
        init: function(){
            var $this = this;
            var wait = setInterval(function(){
               var ret = $this.IsCVPlayer();
               if(ret){
                    clearInterval(wait);
                }
            },1000);
        }
      
    },
    mounted: function () {
        console.log('mounted');
        this.init();
    } ,
    destroyed: function(){
        // this.dispose();
    },
    updated: function(){
        // if(!this.player || !this.player.src){
            // console.log('init value')
            // this.init();
        // }
    },
    beforeUpdate:function(){
        // if(this.player && this.player.src){
            // this.sourceCache = this.source.src;
        // }
    },
    watch: {
        source: function(value){
            // this.SetPlaylist(this.source,this.title);
        }
    }
}
</script>
<style lang="scss">
.VDOGrid{
    position: relative;
    .video-player,.video-js, video, object{
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