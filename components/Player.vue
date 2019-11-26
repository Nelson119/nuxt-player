<template>
    <div :data-initialed="initialed">
        <div class="Title">{{this.title}}</div>
        <div class="Info">
            <span>{{info}} - {{time}}</span><br>
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
import videojs from 'video.js'
import 'videojs-contrib-hls'
window.videojs = videojs;

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
        setPlayBackRate: (playbackRate) =>{
            document.document.queryselectorall('video').playbackRate = playbackRate;
        },
        setPlayTime: function(seconds){
            if(!this.initialed){
                return false;
            }
            if(this.source && this.player.currentTime){
                var current = this.player.currentTime();
                // console.log('from',current);
                this.player.currentTime( current + seconds );
                // console.log('to',this.player.currentTime());
            }
        },
        play: function(){
            if(!this.initialed){
                return false;
            }
            if(this.isRewind){
                clearInterval(this.intervalRewind);
            }
            if(this.source && this.player.play){
                this.player.play();
            }
        },
        pause: function(){
            if(!this.initialed){
                return false;
            }
            if(this.isRewind){
                clearInterval(this.intervalRewind);
            }
            clearInterval(this.intervalRewind);
            if(this.source && this.player.pause){
                this.player.pause();
            }
        },
        stop: function(){
            if(!this.initialed){
                return false;
            }
            if(this.source && this.player.pause){
                this.player.pause();
            }
            if(this.source && this.player.currentTime){
                this.player.currentTime(0);
            }
            // this.init();
        },
        playbackRate: function(rate){
            if(!this.initialed){
                return false;
            }
            if(this.source && this.player.playbackRate){
                this.player.playbackRate(rate);
            }
            
        },
        playBackwards: function(fps) {
            if(!this.initialed){
                return false;
            }
            this.isRewind = true;
            this.pause();

            var video = this.player;
            var interval = this.intervalRewind;

            this.intervalRewind = setInterval(function() {
                // console.log(video.currentTime())
                if(video && video.currentTime && video.currentTime() == 0){
                    clearInterval(interval);
                    video.pause();
                }
                else {
                    var goto = video.currentTime() - (1/fps);
                    video.currentTime(goto);
                }
            }, 1000 / 25);
        },
        init: function(callback){
            var $this = this;
            var key = 'key'+$this.index;
            var elem = document.getElementById(key);
            if(this.source && elem){
            // console.log(this.index);
                let _v = videojs('key'+$this.index, {
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
                    // console.log('this.player ready')
                });
                _v.on(elem, 'progress',function(){
                    // console.log('video ready')
                    $this.initialed = true;
                },false);
            }
        },
        dispose: function(){
            if(!this.initialed){
                return false;
            }
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