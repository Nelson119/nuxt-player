<template>
<div :class="[{'capturing':isCapturing},'Container']" ref="fullScreenContainer">
  <div class="Player">
	  <!--上排按鈕-->
    <div class="Upper btn-group" role="group" aria-label="Button group with nested dropdown">
      <button @click="setPageSize(1)" type="button" :class="[{'pausing':pageSize == 1},'Flex1 btn btn-primary']"><img src="img/1-1.png"/><span style="vertical-align: text-bottom;"> 1</span></button>
      <button @click="setPageSize(4)" type="button" :class="[{'pausing':pageSize == 4},'Flex1 btn btn-primary']"><img src="img/1-4.png"/><span style="vertical-align: text-bottom;"> 4</span></button>
      <button @click="setPageSize(9)" type="button" :class="[{'pausing':pageSize == 9},'Flex1 btn btn-primary']"><img src="img/1-9.png"/><span style="vertical-align: text-bottom;"> 9</span></button>
      <button @click="setPageSize(16)" type="button" :class="[{'pausing':pageSize == 16},'Flex1 btn btn-primary']"><img src="img/1-16.png"/><span style="vertical-align: text-bottom;"> 16</span></button>
      <div class="Flex1 btn-group" role="group">
        <el-select v-model="currentPage" @change="pageIndexChange">
          <el-option v-for="index in totalPage" :label="'分頁'+index" :key="index" :value="index">分頁{{index}}</el-option>
        </el-select>
      </div>
      <div class="Flex2">
        <button type="button" @click="turn16x9" :class="[{'active':is16x9},'btn btn-toggle']" data-toggle="button" aria-pressed="false" autocomplete="off">
        <div class="handle"></div>
        </button>
      </div>
    </div>
	  <!--主影片區-->
	  <div :class="[{'ratio4x3':is16x9},'VDOGrid']" ref="capture">
      <div :data-serial="item.serial" :class="['VDO', pagedClassName]" @click="refTo(item.serial)"  v-for="(item, index) in pagedVideoList" :key="index">
        <VideoSet :ref="'videoplayer'" :source="item.source"  :title="item.title" :time="item.time" :info="item.info" :filename="item.filename"
          :poster="item.poster" :index="index">
        </VideoSet>
      </div>
    </div>
    <div class="clearfix"></div>
	  
	  <!--下排按鈕-->
    <div class="Lower btn-group" role="group" aria-label="Button group with nested dropdown">
      <div class="Flex1 NoBorder btn-group" role="group">
        <el-select :class="{'playing':playerState=='rewind'}" v-model="rewindRate" @focus="rewindRateChange" @change="rewindRateChange">
          <template slot="prefix"><img class="prefix" :src="'img/back.png'" /></template>
          <template slot="suffix">x</template>
          <el-option v-for="(item, index) in rewindOption" :label="item+'X'" :key="index" :value="item">{{item}}X</el-option>
        </el-select>
      </div>
      <button type="button" @click="play" :class="[{'playing':playerState=='play'},'Flex1 NoBorder btn btn-primary']"><img src="img/play.png"/></button>
      <button type="button" @click="pause" :class="[{'pausing':playerState=='pause'},'Flex1 NoBorder btn btn-primary']"><img src="img/pause.png"/></button>
      <button type="button" @click="stop" class="Flex1 NoBorder btn btn-primary"><img src="img/stop.png"/></button>
      <div class="Flex1 NoBorder btn-group" role="group">
        <el-select :class="{'playing':playerState=='play'}" v-model="currentPlaybackRate" @change="playbackRateChange">
          <template slot="prefix"><img class="prefix" :src="'img/forward.png'" /></template>
          <template slot="suffix">x</template>
          <el-option v-for="(item, index) in forwardOption" :label="item+'X'" :key="index" :value="item">{{item}}X</el-option>
        </el-select>
      </div>
      <button @click="capture" type="button" :class="[{'pausing':isCapturing},'Flex1 NoBorder btn btn-primary']"><img src="img/capture.png"/></button>
	    <button @click="requestFullScreen" type="button" :class="[{'pausing':isFullscreen},'Flex1 NoBorder btn btn-primary']"><img src="img/fullscreen.png"/></button>
    </div>
  </div>
  <canvas id="canvas"></canvas>
  <!-- {{JSON.stringify(this.videos)}} -->
  <!-- {{this.playerState}} -->
  <!-- {{new moment()}} -->
        <!-- <object name="Downloadocx" id="Downloadocx" codebase="http://vrs.hinet.net/Download/DL.CAB" classid="clsid:EF87C28D-24AA-4830-8442-1BBAD949B808"
        width="0" height="0" type="application/x-itst-activex"></object> -->
</div>

</template>

<script>
import VideoSet from '~/components/CVPlayer.vue'
import html2canvas from 'html2canvas'
import moment from 'moment'
// import Vue from 'vue'
// Vue.use(moment);
const axios = require('axios');

export default {
  name: 'index',
  components: {
    // Logo,
    VideoSet
  },
  computed: {
    pagedVideoList : function(){
      var currentPage=this.currentPage,pageSize=this.pageSize;
      var ret = this.videos.slice((currentPage-1)*pageSize,currentPage*pageSize);
      if(ret.length < this.pageSize){
        for(var i = ret.length;i<pageSize;i++){
          ret.push({});
        }
      }
      return ret;
    },
    totalPage : function(){
      return Math.ceil(this.videos.length / this.pageSize);
    },
    pagedClassName: function(){
      var pagedClass = {
        p1: 'VDO',
        p4: 'VDO50',
        p9: 'VDO33',
        p16: 'VDO25'
      }
      var className = pagedClass['p'+this.pageSize];
      return className;
    }
  },
  data: () => {
    return {
      videos : [],
      forwardOption: [0.25,0.5,1,4,8,16],
      rewindOption: [0.25,0.5,1,4,8,16],
      is16x9 : false,
      currentPlaybackRate: 1,
      rewindRate: 1,
      currentPage: 1,
      pageSize: 1,
      playerState: 'stop',
      isCapturing: false,
      isFullscreen: false
    }
  },
  mounted: function(){
    // console.log(this.$route.query)
    // console.log()
    var _this = this;
    if(this.$route.query.json){
      axios.get(this.$route.query.json).then((res) =>{
        // console.log(res.data)
        _this.videos = res.data;
      }).catch(function (error) {
        // handle error
        console.log(error);
      })
      .finally(function () {
        for(var i in _this.videos){
          _this.videos[i].serial = i*1+1;
        }
      });
    }else{
      this.fakeVideoList();
      for(var i in _this.videos){
        _this.videos[i].serial = i*1+1;
      }
    }
    // console.log(JSON.stringify(this.videos));
  },
  methods: {
    turn16x9: function () {
      // console.log(this)
        this.is16x9 = !this.is16x9;
      // some code to filter users
    },
    play: function(){
      var players = this.$refs.videoplayer;
      // console.log(players);
      for(var index in players){
        var player = players[index];
        // console.log(player.play)
        if(player.play){
          player.play();
          if(player.playbackRate){
            player.playbackRate(this.currentPlaybackRate);
          }
          this.playerState = 'play';
        }
      }
    },
    pause: function(){
      var players = this.$refs.videoplayer;
      for(var index in players){
        var player = players[index];
        // console.log(player.pause)
        if(player.pause){
          player.pause();
          this.playerState = 'pause';
        }

      }
    },
    stop: function(){
      // console.log('stop');
      try{
        var players = this.$refs.videoplayer;
        for(var index in players){
          var player = players[index];
          player.stop();
        }
        
        this.playerState = 'stop';
      }catch(e){}
    },
    playbackRateChange: function(){
      var players = this.$refs.videoplayer;
      for(var index in players){
        var player = players[index];
        if(player.playbackRate){
          player.playbackRate(this.currentPlaybackRate);
        }
      }
    },
    rewindRateChange: function(){
      this.playerState= 'rewind';
      var players = this.$refs.videoplayer;
      for(var index in players){
        var player = players[index];
        if(player.playbackRate){
          player.playBackwards(25/this.rewindRate);
        }
      }
    },
    setPageSize: function(n){
      // this.pageIndexChange();
      this.stop();
      this.pageSize = n;
      this.currentPage = 1;
    },
    getVideoSource(i){
      return this.videoSource[i];
    },
    pageIndexChange: function(){
      this.stop();
    },
    capture: function(){
      // console.log('capture');
      let wasPlaying = this.playerState == 'play'
      this.isCapturing = true;
      this.pause();
      var c = document.getElementById('canvas')
      let ctx = c.getContext('2d');
      let videos = document.querySelectorAll('video')
      let w, h
      var captureNum = 0;
      for (let i = 0, len = videos.length; i < len; i++) {
          const v = videos[i];
          // if (!v.src) continue // no video here
          try {
              w = v.videoWidth
              h = v.videoHeight
              c.width = w
              c.height = h
              // ctx.fillRect(0, 0, w, h)
              ctx.drawImage(v, 0, 0, w, h)
              // console.log(`${canvas.toDataURL()}`);
              var back =  `url(${c.toDataURL()})`;
              v.parentNode.style.background = back+'center center/ contain no-repeat #000';
              // v.class="hide"; 
              ctx.clearRect(0, 0, w, h); // clean the canvas
              // break;
          } catch (e) {
              continue
          }
      }
      var tick = new moment().format('YYYYMMDDHHmmssSSS');
      var players = this.$refs.videoplayer;
      for(var idx in players){
        let plr = players[idx];
        // console.log(plr);
        html2canvas(plr.$el,{allowTaint:true}).then(canvas => { 
          var filename = plr.title + '-'+tick+'.png';

          if (canvas.msToBlob) { //for IE
            let elem = this.$refs.capture;
            canvas.id = 'capture';
            // elem.appendChild(canvas);
            var blob = canvas.msToBlob();
            window.navigator.msSaveBlob(blob, filename);
          }else{
            let link = document.createElement('a');
            // link.target = '_blank';
            link.href = canvas.toDataURL();
            // console.log(link);
            link.setAttribute('download', filename);
            link.style.display = 'none';
            document.body.appendChild(link);
            link.click();
          }
          try{
            v.parentNode.style = '';
          }catch(e){}
          captureNum++;
          if(captureNum === players.length){
            this.isCapturing = false;
            if(wasPlaying){
              this.play();
            }
          }
        });
      }

    },
    requestFullScreen: function(){
      if(this.isFullscreen){
        this.closeFullscreen();
        return;
      }
      let elem = document.body;
      if (elem.requestFullscreen) {
        elem.requestFullscreen();
      } else if (elem.mozRequestFullScreen) { /* Firefox */
        elem.mozRequestFullScreen();
      } else if (elem.webkitRequestFullscreen) { /* Chrome, Safari and Opera */
        elem.webkitRequestFullscreen();
      } else if (elem.msRequestFullscreen) { /* IE/Edge */
        elem.msRequestFullscreen();
      }
      this.isFullscreen = true;
    },
    closeFullscreen: function () {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.mozCancelFullScreen) { /* Firefox */
        document.mozCancelFullScreen();
      } else if (document.webkitExitFullscreen) { /* Chrome, Safari and Opera */
        document.webkitExitFullscreen();
      } else if (document.msExitFullscreen) { /* IE/Edge */
        document.msExitFullscreen();
      }
      this.isFullscreen = false;
    },
    fakeVideoList: function(){
        var itemlist =[];
        var samples = [
          'http://nelson119.github.io/nuxt-player/video/20191015-140000.mp4',
          // 'http://videodd.flyelephant.com.tw/video.mp4',
          // 'https://d2zihajmogu5jn.cloudfront.net/bipbop-advanced/bipbop_16x9_variant.m3u8',
          // 'https://cdn.theguardian.tv/webM/2015/07/20/150716YesMen_synd_768k_vp8.webm',
          // 'video/happyfit2.mp4'
        ];
        for(var i=0;i<16;i++){
          var rand = Math.floor(new Date * Math.random() * 1000 % samples.length);
          var item = {
            title: "(租10801)力行路與中正五街口-4.中正五街往永康街方向(車)",
            time: "20190917-090249",
            info: "tyu-ido1",
            filename: "LL40202702",
            // index: i,
            // poster: "img/16-9.jpg", 
            source: samples[rand]
          };
          item.title=item.title+(i+1);
          itemlist.push(item);
        }
        this.videos = itemlist;
    },
    setPlayTime: function(){
      var players = this.$refs.videoplayer;
      for(var index in players){
        var player = players[index];
        if(player.setPlayTime){
          player.setPlayTime(this.backSeconds);
        }
      }
    },
    refTo: function(to){
      // console.log('to', to)
      this.pageSize = 1;
      this.currentPage = to;
      this.pause();
    }
  }
}
</script>

<style lang="scss">
 @import '../assets/scss/bootstrap.scss';
 @import '../assets/scss/main.scss';
 #capture{
   z-index: 10;
   top: 0;
   left: 0;
   width: 100%;
   height: 100%;
   position: absolute;
   opacity: 0;
 }
 #canvas{
   z-index: -1;
   top: 0;
   left: 0;
   width: 100%;
   height: 100%;
   position: absolute;
 }
</style>
