<template>
<div class="Container">
  <div class="Player" ref="fullScreenContainer">
	  <!--上排按鈕-->
    <div class="Upper btn-group" role="group" aria-label="Button group with nested dropdown">
      <button @click="setPageSize(1)" type="button" class="Flex1 btn btn-primary"><img src="img/1-1.png"/><span style="vertical-align: text-bottom;"> 1</span></button>
      <button @click="setPageSize(4)" type="button" class="Flex1 btn btn-primary"><img src="img/1-4.png"/><span style="vertical-align: text-bottom;"> 4</span></button>
      <button @click="setPageSize(9)" type="button" class="Flex1 btn btn-primary"><img src="img/1-9.png"/><span style="vertical-align: text-bottom;"> 9</span></button>
      <button @click="setPageSize(16)" type="button" class="Flex1 btn btn-primary"><img src="img/1-16.png"/><span style="vertical-align: text-bottom;"> 16</span></button>
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
      <div v-for="(item, index) in pagedVideoList" :key="index">
        <VideoSet v-if="item.source" :source="{ withCredentials: false, src: item.source }"  :classnames="['VDO', pagedClassName]" :title="item.title" :time="item.time" :info="item.info" :filename="item.filename"
          :poster="item.poster" :index="index">
        </VideoSet>
      </div>
    </div>
    <div class="clearfix"></div>
	  
	  <!--下排按鈕-->
    <div class="Lower btn-group" role="group" aria-label="Button group with nested dropdown">
      <div class="Flex1 NoBorder btn-group" role="group">
        <button id="btnGroupDrop2" type="button" class="Dropdown NoBorder btn btn-primary dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><img src="img/back.png"/><span style="vertical-align: super;"> {{-currentPlaybackRate2}}X</span></button>
      </div>
      <button type="button" @click="play" class="Flex1 NoBorder btn btn-primary"><img src="img/play.png"/></button>
      <button type="button" @click="pause" class="Flex1 NoBorder btn btn-primary"><img src="img/pause.png"/></button>
      <button type="button" @click="stop" class="Flex1 NoBorder btn btn-primary"><img src="img/stop.png"/></button>
      <div class="Flex1 NoBorder btn-group" role="group">
        <!-- <button id="btnGroupDrop3" @click="playbackRateForward" type="button" class="Dropdown NoBorder btn btn-primary dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><img src="img/forward.png"/><span style="vertical-align: super;"> {{currentPlaybackRate}}X</span></button> -->
        <el-select v-model="currentPlaybackRate" @change="playbackRateChange">
          <template slot="prefix"><img class="prefix" :src="'img/forward.png'" /></template>
          <template slot="suffix">x</template>
          <el-option v-for="(item, index) in forwardOption" :label="item+'X'" :key="index" :value="item">{{item}}X</el-option>
        </el-select>
      </div>
      <button @click="capture" type="button" class="Flex1 NoBorder btn btn-primary"><img src="img/capture.png"/></button>
	    <button @click="requestFullScreen" type="button" class="Flex1 NoBorder btn btn-primary"><img src="img/fullscreen.png"/></button>
    </div>
  </div>
  <canvas style="position: absolute;z-index:-1" id="canvas"></canvas>
  <!-- {{JSON.stringify(this.videos)}} -->
</div>

</template>

<script>
import VideoSet from '~/components/Player.vue'
import html2canvas from 'html2canvas'

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
  mounted() {
    console.log(this.$route.query);
  },
  data: () => {
    return {
      videos : [],
      forwardOption: [0.25,0.5,1,4,8,16],
      is16x9 : false,
      currentPlaybackRate: 1,
      currentPlaybackRate2: -1,
      currentPage: 1,
      pageSize: 9
    }
  },
  methods: {
    turn16x9: function () {
      // console.log(this)
        this.is16x9 = !this.is16x9;
      // some code to filter users
    },
    play: function(){
      var players = document.getElementsByTagName('video');
      for(var index in players){
        var player = players[index];
        // console.log(player.play)
        if(player.play)
          player.play();
      }
    },
    pause: function(){
      var players = document.getElementsByTagName('video');
      for(var index in players){
        var player = players[index];
        // console.log(player.pause)
        if(player.pause)
          player.pause();
      }
    },
    stop: function(){
      // console.log('stop');
      var players = document.getElementsByTagName('video');
      for(var index in players){
        var player = players[index];
        // console.log(player.stop)
          // console.log(player)
        if(player.currentTime){
          player.pause();
        }
        if(player.currentTime){
          player.currentTime = 0;
        }
        // if(player.load){
        //   console.log(player.src)
        //   player.src(''); // empty string
        // }
      }
    },
    playbackRateForward: function(){
      var players = document.getElementsByTagName('video');
      if(this.currentPlaybackRate < 4){
        this.currentPlaybackRate += 1;
        this.currentPlaybackRate2 = -1;
      }else{
        this.currentPlaybackRate = 1;
      }

      for(var index in players){
        var player = players[index];
        // console.log(this.currentPlaybackRate)
        // console.log('player.playbackRate', player.playbackRate)
        if(player.playbackRate){
          player.playbackRate = this.currentPlaybackRate;
        }
      }
    },
    playbackRateBackward: function(){
      var players = document.getElementsByTagName('video');
      if(this.currentPlaybackRate2 > -4){
        this.currentPlaybackRate2 -= 1;
        this.currentPlaybackRate = 1;
      }else{
        this.currentPlaybackRate2 = -1;
      }

      for(var index in players){
        var player = players[index];
        // console.log(this.currentPlaybackRate2)
        // console.log('player.playbackRate', player.playbackRate)
        if(player.playbackRate){
          player.playbackRate = this.currentPlaybackRate2;
        }
      }
    },
    playbackRateChange: function(){
      var players = document.getElementsByTagName('video');
      for(var index in players){
        var player = players[index];
        // console.log(this.currentPlaybackRate)
        // console.log('player.playbackRate', player.playbackRate)
        if(player.playbackRate){
          player.playbackRate = this.currentPlaybackRate;
        }
      }
    },
    setPageSize: function(n){
      this.pageSize = n;
      this.currentPage = 1;
    },
    getVideoSource(i){
      return this.videoSource[i];
    },
    pageIndexChange: function(){
      this.stop();
      this.$forceUpdate();
    },
    capture: function(){
      // console.log('capture');
      var c = document.getElementById('canvas')
      let ctx = c.getContext('2d');
      let videos = document.querySelectorAll('video')
      let w, h
      for (let i = 0, len = videos.length; i < len; i++) {
          const v = videos[i]
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
              v.parentNode.style.background = back+'center center/ 100% auto no-repeat';
              // v.class="hide"; 
              ctx.clearRect(0, 0, w, h); // clean the canvas
              // break;
          } catch (e) {
              continue
          }
      }

      html2canvas(this.$refs.capture,{allowTaint:true}).then(canvas => { 


        let link = document.createElement('a');
        // link.target = '_blank';
        link.href = canvas.toDataURL();
        // console.log(link);
        link.setAttribute('download', 'capture-'+new Date*1+'.png');
        link.style.display = 'none';
        document.body.appendChild(link);
        link.click();
        for (let i = 0, len = videos.length; i < len; i++) {
            const v = videos[i]
            v.parentNode.style = '';
        }
      });
    },
    requestFullScreen: function(){
      let elem = this.$refs.fullScreenContainer;
      if (elem.requestFullscreen) {
        elem.requestFullscreen();
      } else if (elem.mozRequestFullScreen) { /* Firefox */
        elem.mozRequestFullScreen();
      } else if (elem.webkitRequestFullscreen) { /* Chrome, Safari and Opera */
        elem.webkitRequestFullscreen();
      } else if (elem.msRequestFullscreen) { /* IE/Edge */
        elem.msRequestFullscreen();
      }
    },
    fakeVideoList: function(){
      var itemlist =[];
      var samples = [
        'https://d2zihajmogu5jn.cloudfront.net/bipbop-advanced/bipbop_16x9_variant.m3u8',
        'https://cdn.theguardian.tv/webM/2015/07/20/150716YesMen_synd_768k_vp8.webm',
        'video/happyfit2.mp4',
        'video/bipbop_16x9_variant.m3u8'];
      for(var i=0;i<=113;i++){
        var rand = Math.floor(new Date * Math.random() * 1000 % samples.length);
        var item = {
          title: "影像串流名稱影像串流名稱影像串流名稱影像串流名稱",
          time: "10/17/2019 07:00:56",
          info: "tyu-ido1-20190917-090249",
          filename: "LL40202702",
          index: i,
          poster: "img/16-9.jpg",
          source: samples[rand]
        };
        item.title=item.title+(i+1);
        itemlist.push(item);
      }
      this.videos = itemlist;
    }
  }
}
</script>

<style lang="scss">
 @import '../assets/scss/bootstrap.scss';
 @import '../assets/scss/main.scss';
</style>
