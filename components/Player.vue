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
            <video muted :playbackRate="playbackrate"  :poster="poster">
                <source :src="source">
            </video>
        </div>
    </div>
</template>

<script>
export default {
    name: 'video-set',
    data() {
        return {
            // title: '123'
        };
    },
    props:['classnames', 'source','playbackrate','poster','title','time','filename','info'],
    methods: {
        setPlayBackRate: () =>{
            document.querySelector('video').playbackRate = playbackRate;
        }
    }
}
</script>
<style lang="scss" scoped>
.VDOGrid{
    position: relative;
    video{
        width: 100%;
        height: 100%;
        position: absolute;
    }
}
</style>