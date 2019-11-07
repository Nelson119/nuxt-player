<template>
    <div :class="classnames">
        <div class="Title">{{this.title}}</div>
        <div class="Info">
            <span>{{info}}</span><br>
            <span class="FontXS">{{time}}</span><br>
            <span class="FontXS">{{filename}}</span>
            <!-- <span class="FontXS">{{source}}</span> -->
        </div>
        <div class="Slice">
            <div v-if="source.src">
                <video :id="'key'+index" crossOrigin='anonymous' muted :playbackRate="playbackrate" >
                    <!-- <source :src="source.src"> -->
                </video>
            </div>
            <!-- <video-player 
                :options="{...playerOptions, sources: source}">
            </video-player> -->
            <!-- <video-player :source="source"></video-player> -->
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
        sourceCache: undefined,
      }
    },
    // components:{VideoPlayer},
    props:['index','classnames', 'source','playbackrate','poster','title','time','filename','info','sources'],
    methods: {
        setPlayBackRate: () =>{
            document.querySelector('video').playbackRate = playbackRate;
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
        init: function(){
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
                        src: $this.source.src
                    });
                    $this.player = this;
                    // console.log(this.play)
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
        this.sourceCache = this.source
        this.init();
        if(this.player.src){
            this.player.src({
                src: this.source.src
            });
        }
    } ,
    destroyed: function(){
        this.dispose();
    },
    updated: function(){
        console.log(this.player);
        this.init();
        if(this.player.src){
            this.player.src({
                src: this.source.src
            });
        }
    },
    beforeUpdate:function(){
        // this.sourceCache = this.source;
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