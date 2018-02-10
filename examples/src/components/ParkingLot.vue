<template>
  <div class="map-container">
    <!-- 装初始化地图的容器 必有-->
    <div id="bitmap" style="width: 100%">
    </div>
    <el-button type="success" @click="open">开启画图</el-button>
    <el-button type="success" @click="rotate">开启旋转</el-button>
    <el-button type="success" @click="scale">开启scale</el-button>
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
        geometry: {},
        borderPoint: []
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
      this.bitmap.getMap().on("dragging", e => {
        console.log(e);
      })
    },
    methods: {
      open() {
        this.bitmap.openDrawShapeTool("Box", e => {
          this.geometry = e.feature.getGeometry()
          console.log(this.geometry);
          var coordinates = e.feature.getGeometry().getCoordinates()[0];
          coordinates.pop()
          this.borderPoint = coordinates;
        })
      },
      // 图形旋转
      rotate() {
        this.bitmap.closeDrawShapeTool()
        var coordinates = hdmap.utils.getGeometryCenter(this.borderPoint)
        console.log(coordinates);
        this.bitmap.regEventListener('singleclick', e => {
          console.log(e);
          var coordinates = hdmap.utils.getGeometryCenter(this.borderPoint)
          var disX = e.coordinate[0] - coordinates[0]
          var disY = e.coordinate[1] - coordinates[1]
          var angle = Math.atan(disX / disY);
          console.log(angle);
          this.geometry.rotate(angle, coordinates)//逆时针旋转角度
        })
      },
      // 图形缩放
      scale() {
        var coordinates = hdmap.utils.getGeometryCenter(this.borderPoint)
        this.geometry.scale(0.5, 0.5, coordinates)
      }
    }
  }
</script>
<style>
</style>