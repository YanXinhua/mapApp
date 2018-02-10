import '../src/hdmap/mapManager.js'
import { wzk1 } from './wzktest'
import { mymap } from './mymap'
import { ssz } from './ssz/sszTest'
import { sjw } from './sjwtest'
import { hfl } from './hfl'
import { lly } from './lly'
import { wzkcar } from './wzkcar'
window.onload = function() {
  window.mapObj = {}
  window.map1 = new hdmap.initMap({
    gisEngine: 'baidu',
    domId: 'map1',
    mapUrl:
      'http://online1.map.bdimg.com/onlinelabel/?qt=tile&x={x}&y={y}&z={z}&styles=pl&p=1&scaler=1&udt=20171115',
    sat: 0,
    center: [113.619942, 23.304629],
    popupDom: {
      popup: 'popup',
      popupcloser: 'popup-closer',
      popupcontent: 'popup-content'
    }
  })
  window.map2 = new hdmap.initMap({
    gisEngine: "baidu",
    domId: "map2",
    mapUrl:
      "http://online1.map.bdimg.com/onlinelabel/?qt=tile&x={x}&y={y}&z={z}&styles=pl&p=1&scaler=1&udt=20171115",
    sat: 0,
    center: [110.619942, 25.304629],
    popupDom: {
      popup: "popup2",
      popupcloser: "popup-closer2",
      popupcontent: "popup-content2"
    }
  });
  map1.regEventListener('singleclick', function(e) {
    console.log('点击地图1111111')
    // console.log(e)
    //如果是新增的就会加入在textarea中加入坐标，上面的参数根据需要自己修改
    // if(type == 'new') {
    var text = $('#markerPos').html()
    // console.log(e);
    if (e.feature) {
      // text += "(" + e.feature.getId() + "：[" + e.coordinate + "])\n";
    } else {
      // text += "未取得值";
      if (map1.getMapEditState() === '') {
        // map1.addMarker({
        //   id: new Date().valueOf(),
        //   position: e.coordinate,
        //   markerType: "camera",
        //   name: "move marker" + Math.random() * 2,
        //   imgUrl: "./assets/images/icon.png",
        //   size: [32, 48]
        // });
        text = e.coordinate
      }
    }
    $('#markerPos').val(text)

    // }
  })

  map1._map.on('pointermove',function (e) {
    console.log('map1  鼠标移动')
  })

  map2.regEventListener('singleclick', function (e) {
    console.log('点击地图2222222')
    // console.log(e)
    
    // console.log(e);
    if (e.feature) {
      // text += "(" + e.feature.getId() + "：[" + e.coordinate + "])\n";
    } else {
      // text += "未取得值";
      
    }
    
  })

  map2._map.on('pointermove', function (e) {
    console.log('map2  鼠标移动')
  })




  // wzk
  wzk1()
  mymap()
  ssz()
  sjw()
  hfl()
  lly()
  wzkcar()
}
