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
            <video :id="'key'+index" v-if="source" crossOrigin='anonymous' muted :playbackRate="playbackrate" >
                <source :src="source.src">
            </video>

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
      }
    },
    // components:{VideoPlayer},
    props:['index','classnames', 'source','playbackrate','poster','title','time','filename','info','sources'],
    methods: {
        setPlayBackRate: () =>{
            document.querySelector('video').playbackRate = playbackRate;
        },

        playerReadied(player) {
            var hls = player.tech({ IWillNotUseThisInPlugins: true }).hls
            player.tech_.hls.xhr.beforeRequest = function(options) {
            // console.log(options)
            return options
            }
        }
    },
    mounted: function () {
        console.log(this.index)
        videojs('key'+this.index, {
            bigPlayButton: false,
            textTrackDisplay: false,
            posterImage: true,
            errorDisplay: false,
            controlBar: true
        }, function () {
            // this.play()
        });
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