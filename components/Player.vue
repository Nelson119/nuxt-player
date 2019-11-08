<template>
    <div :class="classnames">
        <div class="Title">{{this.title}}</div>
        <div class="Info">
            <span>{{info}}</span><br>
            <span class="FontXS">{{time}}</span><br>
            <span class="FontXS">{{filename}}</span>
        </div>
        <div class="Slice">
            <div v-if="source">
                <video :id="'key'+index" crossOrigin='anonymous' muted>
                    <source :src="source"></source>
                </video>
            </div>
        </div>
    </div>
</template>

<script>
import Vue from 'vue'
import 'video.js/dist/video-js.css';
// import 'vue-video-player/src/custom-theme.css';
import videojs from 'video.js'
import 'videojs-contrib-hls'
window.videojs = videojs;

// Vue.use(VideoPlayer);

export default {
    name: 'video-set',
    data() {
      return {
        // playerOptions: {
        //   // videojs and plugin options
        //     muted: true,
        //     crossOrigin: 'anonymous',
        //     controlBar: {
        //         timeDivider: false,
        //         durationDisplay: false,
        //         playButton: false
        //     },
        //     flash: { hls: { withCredentials: false }},
        //     html5: { hls: { withCredentials: false }},
        // //   poster: "path-to/static/images/surmon-5.jpg"
        // }
        player: {},
        initialed: false,
        // sourceCache: undefined,
      }
    },
    // components:{VideoPlayer},
    props:['index','classnames', 'source','playbackrate','poster','title','time','filename','info','sources'],
    methods: {
        setPlayBackRate: (playbackRate) =>{
            document.document.queryselectorall('video').playbackRate = playbackRate;
        },

        // playerReadied(player) {
        //     var hls = player.tech({ IWillNotUseThisInPlugins: true }).hls
        //     player.tech_.hls.xhr.beforeRequest = function(options) {
        //     // console.log(options)
        //     return options
        //     }
        // },
        play: function(){
            if(this.player.play){
                this.player.play();
            }
        },
        pause: function(){
            if(this.player.pause){
                this.player.pause();
            }
        },
        stop: function(){
            if(this.player.pause){
                this.player.pause();
            }
            if(this.player.currentTime){
                this.player.currentTime(0);
            }
            // this.init();
        },
        playbackRate: function(rate){
            if(this.player.playbackRate){
                this.player.playbackRate(rate);
            }
            
        },
        init: function(callback){
            var $this = this;
            var key = 'key'+$this.index;
            if(document.getElementById(key)){
            // console.log(this.index);
                videojs('key'+$this.index, {
                    bigPlayButton: false,
                    textTrackDisplay: false,
                    posterImage: true,
                    errorDisplay: false,
                    controlBar: true
                }, function () {
                    this.src({
                        src: $this.source
                    });
                    $this.player = this;
                    (callback||function(){})();
                    console.log('this.player ready')
                });
            }
        },
        dispose: function(){
            try{
                if(this.player.dispose){
                    this.player.dispose();
                }
            }catch(e){}
        }

    },
    mounted: function () {
        var $this = this;
            this.init(() => {
                console.log($this.player);
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
            console.log('init value')
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
            console.log('value',value)
            var $this = this;
            if(!this.player || !this.player.src){
                console.log('init value')
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
</style>