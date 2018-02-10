<template>
  <div class="map-container">
    <!-- 装初始化地图的容器 必有-->
    <div id="bitmap" style="width: 100%"></div>
    <el-button type="primary" @click="addLine">添加巡更路线</el-button>
    <el-button type="success" @click="getNormalRouteStyle">正常巡更路线</el-button>
    <el-button type="warning" @click="getOfflineRouteStyle">离线巡更路线</el-button>
    <el-button type="danger" @click="getWarningRouteStyle">报警巡更路线</el-button>
  </div>
</template>
<script>
  /* eslint-disable */
  import mapImg from '@/assets/images/u768.jpg'
  import markerImg from '@/assets/images/icon.png'
  export default {
    name: 'TestMap',
    data() {
      return {
        optionLine: {
          id: "123bbb",
          name: "巡更路线1",
          lineType: "003",
          borderPoints: [
            [-150.192114608162, 256.796067390244],
            [285.807885391838, 269.796067390244],
            [287.807885391838, 144.796067390244],
            [-49.192114608162, 137.796067390244],
            [-185.192114608162, 219.796067390244],
            [-150.192114608162, 257.796067390244]
          ]
        },
        lineStyle: {
          color: "rgba(0,0,0,.4)",
          width: 7
        }
      }
    },
    mounted() {
      // eslint-disable-next-line
      // 初始化一个地图
      this.bitmap = new hdmap.initMap({
        gisEngine: 'bitmap',
        sizeW: 1920,
        sizeH: 1080,
        domId: 'bitmap',
        mapUrl: mapImg,
        maxZoom: 7,
        minZoom: 3,
        center: [112.334403, 39.8],
        popupDom: {
          popup: 'popup',
          popupcloser: 'popup-closer',
          popupcontent: 'popup-content'
        }
      })
      // 添加巡更路线

    },
    methods: {
      addLine() {
        this.bitmap.addLine(this.optionLine, this.lineStyle);
      },
      // 正常巡更路线
      getNormalRouteStyle() {
        var style = hdmap.commonConfig.getNormalRouteStyle();
        this.bitmap.updateLine(this.optionLine, style)
      },
      // 离线巡更路线
      getOfflineRouteStyle() {
        var style = hdmap.commonConfig.getOfflineRouteStyle();
        this.bitmap.updateLine(this.optionLine, style)
      },
      // 报警巡更路线
      getWarningRouteStyle() {
        var style = hdmap.commonConfig.getWarningRouteStyle();
        this.bitmap.updateLine(this.optionLine, style)
      }
    }
  }
</script>
<style>
</style>