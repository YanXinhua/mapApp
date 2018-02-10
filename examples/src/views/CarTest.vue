<template>
  <div class="map-container" style="position:relative;">
    <div id="tempDiv" style="position:absolute;z-index:-1;"></div>
    <div id="bitmap" style="z-index:99;"></div>
    <ul class="changemap">
      <li>
        <el-button type="primary" @click="changeMap(option1)">Map1</el-button>
      </li>
      <li>
        <el-button type="primary" @click="changeMap(option2)">Map2</el-button>
      </li>
      <li>
        <el-button type="primary" @click="remove()">Map3</el-button>
      </li>
      <li>
        <el-button type="primary" @click="changeMap(option)">Map4</el-button>
      </li>
      <li>
        <el-button type="primary" @click="changeMap(option)">Map5</el-button>
      </li>
    </ul>
    <div id="broadcast">
      <el-switch v-model="value3" active-text="按月付费" inactive-text="按年付费">
      </el-switch>
    </div>
    <div id="video" @click="changeMap(option2)">
      <el-alert title="成功提示的文案" type="success" center></el-alert>
      <div id="change">切换地图啦</div>
    </div>
    <div id="warning">
      <el-alert title="成功提示的文案" type="success" center></el-alert>
      <el-alert title="警告提示的文案" type="warning" center></el-alert>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import mapF from '@/assets/images/u768.jpg'
import mapS from '@/assets/images/u7602.png'
import test from '@/assets/images/hdmap.png'
import guarder from '@/assets/images/guard.png'
import broadcast from '@/assets/images/broadcast.png'
import baseDefault from '@/assets/images/u887.png'
import countBroadcast from '@/assets/images/u950.png'

export default {
  name: 'CarTest',
  data() {
    return {
      /* eslint-disable */
      overlay: new ol.Overlay({}),
      mapObj: null,
      value3: true,
      cacheMapList: {},
      option0: {
        id: '000',
        gisEngine: 'bitmap',
        domId: 'bitmap',
        mapUrl: test,
        sizeW: 1920,
        sizeH: 1080,
        maxZoom: 10,
        minZoom: 1,
        center: [112.334403, 39.8],
        // popupDom: {
        //   popup: 'popup',
        //   popupcloser: 'popup-closer',
        //   popupcontent: 'popup-content'
        // }
      },
      option1: {
        id: '001',
        gisEngine: 'bitmap',
        domId: 'bitmap',
        mapUrl: mapF,
        sizeW: 1920,
        sizeH: 1080,
        maxZoom: 10,
        minZoom: 1,
        center: [112.334403, 39.8],
        // attribution: true,
        // controlZoom: false,
        // dragPan: false
      },
      option2: {
        id: '002',
        gisEngine: 'bitmap',
        domId: 'bitmap',
        mapUrl: mapS,
        sizeW: 1920,
        sizeH: 1080,
        maxZoom: 10,
        minZoom: 1,
        center: [112.334403, 39.8],
        // popupDom: {
        //   popup: 'popup',
        //   popupcloser: 'popup-closer',
        //   popupcontent: 'popup-content'
        // }
      },
      flag: true,
      areaflag: true,
      polyCoords1: [
        [
          [-42.5, 94.9375],
          [-41.5, 33.9375],
          [-151, 39.4375],
          [-151.5, 99.4375],
          [-68.5, 112.9375],
          [-42.5, 93.9375]
        ]
      ],
      polyCoords2: [
        [
          [42.5, 94.9375],
          [41.5, 33.9375],
          [151, 39.4375],
          [151.5, 99.4375],
          [68.5, 112.9375],
          [42.5, 93.9375]
        ]
      ],
      style: '',
      areaid: ''
    }
  },
  mounted() {
    console.log('mounted')
    console.log('hdmap create')
    this.changeMap(this.option1)
  },
  methods: {
    changeMap(option) {
      let _this = this
      // 判断地图是否存在
      if (this.mapObj) {
        // 存储弹窗
        this.mapObj.saveOutterPopup(['broadcast', 'video', 'warning'])
        // 关闭弹窗
        this.mapObj.closePopup()
        // 清空地图容器
        this.mapObj.removeLayers()
        this.mapObj.getMap().setTarget(null)
      }
      for(var o in this.cacheMapList){
        console.log(this.cacheMapList[o].getMap().ol_uid)
      }
      // 已经初始化的地图可以直接获取地图对象，进行地图的替换即可
      if (this.cacheMapList[option.id]) {
        this.mapObj = this.cacheMapList[option.id]
        this.mapObj.getMap().setTarget('bitmap')
        this.mapObj.addPopup('broadcast')
        this.mapObj.addPopup('video')
        this.mapObj.addPopup('warning')
        this.addMarker(option)
        this.addArea(option)
        this.singerevent(option)
        // console.log(this.mapObj.getMap().getLayers().array_)
        return
      }
      // 如果没有初始化过，才需要进行地图的初始化
      this.cacheMapList[option.id] = new hdmap.initMap(option)
      this.mapObj = this.cacheMapList[option.id]
      this.mapObj.getMap().setTarget('bitmap')
      // this.mapObj.clearMap()
      this.mapObj.addPopup('broadcast')
      this.mapObj.addPopup('video')
      this.mapObj.addPopup('warning')
      this.addMarker(option)
      this.addArea(option)
      this.singerevent(option)
    },
    addMarker(option) {
      if (option.id === '001') {
        this.mapObj.addMarkers([
          {
            id: 333,
            position: [200, -100],
            markerType: 'broadcast',
            name: '6666',
            imgUrl: broadcast
          },
          {
            id: 555,
            position: [-200, 100],
            markerType: 'video',
            name: '7777',
            imgUrl: guarder
          },
          {
            id: 7777,
            position: [150, -100],
            markerType: 'broadcast',
            name: '111111',
            imgUrl: broadcast
          }
        ])
        this.mapObj.addCountMarker({
          id: 22,
          name: 22,
          markerType: 'countBroadcast',
          position: [-120, 10],
          url: countBroadcast,
          baseUrl: baseDefault,
          broadcastNum: '8'
        })
      } else {
        this.mapObj.addMarkers([
          {
            id: 444,
            position: [-100, -100],
            markerType: 'broadcast',
            name: '6666',
            imgUrl: broadcast
          },
          {
            id: 666,
            position: [150, 100],
            markerType: 'video',
            name: '8888',
            imgUrl: guarder
          }
        ])
      }
    },
    singerevent(option) {
      let that = this
      this.mapObj.regEventListener('singleclick', function(e) {
        if (e.feature) {
          if (e.feature.markerType === 'broadcast') {
            that.mapObj.showPopup('broadcast', e.coordinate)
          } else if (e.feature.markerType === 'video') {
            that.mapObj.showPopup('video', e.coordinate)
          }
        } else {
          that.mapObj.closePopup()
        }
      })
      if (option.id === '001') {
        this.mapObj.regEventListener('pointermove', function(e) {
          if (e.feature) {
            if (e.feature.extProperties) {
              if (e.feature.extProperties.id === '2525') {
                that.mapObj.showPopup('warning', e.coordinate)
              }
            }
          } else {
            // that.mapObj.closePopup()
          }
        })
      }
    },
    addArea(option) {
      if (option.id === '001') {
        this.mapObj.addArea({
          id: '2525',
          name: '22222',
          areaType: 'areatest',
          borderPoints: this.polyCoords1
        })
        this.mapObj.warnAnimation({
          id: '2525',
          name: '22222',
          areaType: 'areatest',
          borderPoints: this.polyCoords1
        })
      } else {
        // this.mapObj.addArea(
        //   {
        //     id: '5252',
        //     name: '22222',
        //     deviceId: '2222222',
        //     areaType: 'areatest',
        //     borderPoints: this.polyCoords2
        //   },
        //   {
        //     fillColor: 'rgba(139,35,35,0.5)',
        //     strokeColor: 'orange'
        //   }
        // )
      }
    },
    removearea() {
      this.mapObj.removeArea({
        id: '2525',
        name: '22222',
        areaType: 'areatest',
        borderPoints: this.polyCoords1
      })
      this.mapObj.addArea({
        id: '5252',
        name: '22222',
        areaType: 'areatest',
        borderPoints: this.polyCoords2
      })
    },
    remove() {
      this.mapObj.clearMap({
        areaList: [
          {
            id: '2525',
            name: '22222',
            areaType: 'areatest',
            borderPoints: this.polyCoords1
          }
        ],
        markerList: [
          {
            id: 444,
            position: [-100, -100],
            markerType: 'broadcast',
            name: '6666',
            imgUrl: broadcast
          },
          {
            id: 666,
            position: [150, 100],
            markerType: 'video',
            name: '8888',
            imgUrl: guarder
          }
        ]
      })
    }
  }
}
</script>
<style scoped>
.map-container {
  width: 80%;
  height: 500px;
  position: relative;
}
#bitmap {
  position: absolute;
  left: 100px;
  height: 500px;
  width: 800px;
}
.changemap {
  position: absolute;
  left: 0px;
  width: 100px;
  height: 300px;
}
.changemap li {
  width: 100px;
  height: 60px;
}
</style>
