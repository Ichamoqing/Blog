<template>
<div class="video-wrap">
  <div class="cover" @click="closeAction"></div>
  <van-icon name="cross" class="close" @click="closeAction"/>
  <div class="video">
    <video ref="video"></video>
  </div>
</div> 
</template>

<script>
import flvjs from 'flv.js'
export default {
  props: {
    data: {
      type: Object,
      default: ()=>({})
    }
  },
  methods: {
    closeAction(){
      this.$emit('close');
    }
  },
  mounted(){
    console.log(this.data.webmVideoUrl);
    if (flvjs.isSupported()) {
      
        var videoElement = this.$refs.video;
        var flvPlayer = flvjs.createPlayer({
            type: 'webm',
            url: this.data.webmVideoUrl
        });
        flvPlayer.attachMediaElement(videoElement);
        flvPlayer.load();
        flvPlayer.play();
    }
  }
}
</script>

<style scoped lang="scss">
.video-wrap{
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 200;
  .cover{
    width: 100%;
    height: 100%;
    background: #444;
  }
  .close{
    font-size: 20px;
    position: absolute;
    top: 10px;
    right: 10px;
    color: #fff;
  }
  .video{
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 100%;
    video{
      width: 100%;
    }
  }
}
</style>