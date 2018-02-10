/**
 * filename: commonConfig.js
 * author: sunshengzhen
 * introduction: 这里保存一些地图的常用配置信息，一些默认的样式等
 */
// import cameraImg from '@/assets/images/u349'

export default function commonConfig () {
  // gis地图情况下的一些通用配置
  var gisConfig = {
    mapType: 'baidu',
    mapUrl:
      'http://online1.map.bdimg.com/onlinelabel/?qt=tile&x={x}&y={y}&z={z}&styles=pl&p=1&scaler=1&udt=20171115',
    mapSatUrl:
    'http://shangetu1.map.bdimg.com/it/u=x={x};y={y};z={z};v=009;type=sate&fm=46&app=webearth2&v=009&udt=20171115',
    SatUrl:
      'http://online1.map.bdimg.com/onlinelabel/?qt=tile&x={x}&y={y}&z={z}&styles=sl&p=1&scaler=1&udt=20171115',
    center: [116.40348, 39.923758]
  }

  /**
   * 鼠标移动到区域时显示的样式
   * styleObj
   * @param {Object} styleObj 自定义样式对象
   * styleObj: {
   *    fillColor: red,   填充颜色
   *    strokeColor: black, 边框颜色
   *    strokeWidth: 5 边框宽度
   * }
   */
  var getMouseOverAreaStyle = function (styleObj) {
    let fillColor =
      styleObj && styleObj.fillColor
        ? styleObj.fillColor
        : 'rgba(100,149,237,0.2)'
    let strokeColor =
      styleObj && styleObj.strokeColor ? styleObj.strokeColor : '#1E90FF'
    let strokeWidth =
      styleObj && styleObj.strokeWidth ? styleObj.strokeWidth : 2
    return new ol.style.Style({
      fill: new ol.style.Fill({
        color: fillColor
      }),
      stroke: new ol.style.Stroke({
        color: strokeColor,
        width: strokeWidth,
        lineDash: [5, 10]
        // lineDash: ol.style.Stroke.getLineDash()
      })
    })
  }

  var setAreaStyle = function (styleObj) {
    let fillColor = styleObj && styleObj.fillColor ? styleObj.fillColor : ''
    let strokeColor =
      styleObj && styleObj.strokeColor ? styleObj.strokeColor : ''
    let strokeWidth =
      styleObj && styleObj.strokeWidth ? styleObj.strokeWidth : '2'
    let lineDash = styleObj && styleObj.lineDash ? styleObj.lineDash : [5, 10]
    let rotation = styleObj && styleObj.rotation ? styleObj.rotation : 0
    return new ol.style.Style({
      fill: new ol.style.Fill({
        color: fillColor
      }),
      stroke: new ol.style.Stroke({
        color: strokeColor,
        width: strokeWidth,
        lineDash: lineDash,
        rotation: rotation
      })
    })
  }

  /**
   * 点位默认样式
   * @param {Object} markerInfo 点位信息
   * 参数示例：
   * {
   *  id: 333,
      position: [-50, 0],非空
      markerType: "guarder",
      name: 'marker name',
      imgUrl: "./assets/images/u4828.png",必传，否则看不到点位
      size: [32, 48] 必传，否则看不到点位
   * }
   * @param {Object} styleObj 自定义需传
   */
  var getFeatureStyle = function (markerInfo, styleObj) {
    let color = styleObj && styleObj.color ? styleObj.color : 'white'
    let scale = styleObj && styleObj.scale ? styleObj.scale : 1
    let opacity = styleObj && styleObj.opacity ? styleObj.opacity : 1
    let rotation = styleObj && styleObj.rotation ? styleObj.rotation : 0
    let rotateWithView =
      styleObj && styleObj.rotateWithView ? styleObj.rotateWithView : false
    let snapToPixel =
      styleObj && styleObj.snapToPixel ? styleObj.snapToPixel : true
    return new ol.style.Style({
      image: new ol.style.Icon(
        /** @type {olx.style.IconOptions} */ ({
          src: markerInfo.imgUrl,
          size: markerInfo.size,
          color: color,
          opacity: opacity,
          scale: scale,
          snapToPixel: snapToPixel,
          rotation: rotation,
          rotateWithView: rotateWithView
        })
      )
    })
  }

  /**
   * 区域报警样式
   * @param {Number} opacity 透明度
   */
  var getWarningAreaStyle = function (opacity) {
    return new ol.style.Style({
      fill: new ol.style.Fill({
        color: 'rgba(255,0,0,' + opacity + ')'
      }),
      stroke: new ol.style.Stroke({
        color: 'red',
        width: 2,
        lineDash: [5, 10]
        // lineDash: ol.style.Stroke.getLineDash()
      })
    })
  }

  /**
   * 统计摄像头个数样式
   * @param {Object} markerInfo 点位信息
   */
  var getCountCameraFeatureStyle = function getCountCameraFeatureStyle (
    markerInfo
  ) {
    var offsetX, offsetY, anchor, fontsize
    switch (markerInfo.cameraNum.length) {
    case 1:
      offsetX = 14
      offsetY = -2
      anchor = [0.6, 0.7]
      fontsize = '15px bold Calibri,sans-serif'
      break
    case 2:
      offsetX = 14
      offsetY = -2
      anchor = [0.7, 0.7]
      fontsize = '13px bold Calibri,sans-serif'
      break
    case 3:
      offsetX = 12
      offsetY = -2.8
      anchor = [1, 0.6]
      fontsize = '12px bold Calibri,sans-serif'
      break
    }
    return new ol.style.Style({
      image: new ol.style.Icon(
        /** @type {olx.style.IconOptions} */ {
          // img: cameraImg,
          // imgSize: [24, 24],
          // src: '../assets/images/u349.png',
          src: markerInfo.url,
          size: [20, 20],
          color: 'white',
          scale: 0.8,
          anchor: anchor
        }
      ),
      text: new ol.style.Text({
        text: markerInfo.cameraNum,
        font: fontsize,
        fill: new ol.style.Fill({
          color: 'white'
        }),
        offsetX: offsetX,
        offsetY: offsetY
      })
    })
  }

  /**
   * 统计报警个数样式
   * @param {Object} markerInfo 点位信息
   */
  var getCountWarningFeatureStyle = function getCountWarningFeatureStyle (
    markerInfo
  ) {
    var offsetX, offsetY, anchor, fontsize
    switch (markerInfo.warnNum.length) {
    case 1:
      offsetX = 14
      offsetY = -2.7
      anchor = [0.7, 0.65]
      fontsize = '15px bold Calibri,sans-serif'
      break
    case 2:
      offsetX = 14
      offsetY = -2.6
      anchor = [0.8, 0.7]
      fontsize = '13px bold Calibri,sans-serif'
      break
    case 3:
      offsetX = 13
      offsetY = -3
      anchor = [1, 0.7]
      fontsize = '12px bold Calibri,sans-serif'
      break
    }
    return new ol.style.Style({
      image: new ol.style.Icon(
        /** @type {olx.style.IconOptions} */ {
          src: markerInfo.url,
          size: [20, 20],
          color: 'white',
          scale: 0.7,
          anchor: anchor
        }
      ),
      text: new ol.style.Text({
        text: markerInfo.warnNum,
        font: fontsize,
        fill: new ol.style.Fill({
          color: 'white'
        }),
        offsetX: offsetX,
        offsetY: offsetY
      })
    })
  }

  /**
   * 统计广播个数样式
   * @param {Object} markerInfo 点位信息
   */
  var getCountBroadcastFeatureStyle = function getCountBroadcastFeatureStyle (
    markerInfo
  ) {
    var offsetX, offsetY, anchor, fontsize
    switch (markerInfo.broadcastNum.length) {
    case 1:
      offsetX = 14
      offsetY = -3
      anchor = [0.6, 0.6]
      fontsize = '15px bold Calibri,sans-serif'
      break
    case 2:
      offsetX = 14
      offsetY = -2
      anchor = [0.7, 0.6]
      fontsize = '13px bold Calibri,sans-serif'
      break
    case 3:
      offsetX = 12
      offsetY = -2.8
      anchor = [1, 0.6]
      fontsize = '12px bold Calibri,sans-serif'
      break
    }
    return new ol.style.Style({
      image: new ol.style.Icon(
        /** @type {olx.style.IconOptions} */ {
          // src: '../assets/images/u950.png',
          src: markerInfo.url,
          size: [20, 20],
          color: 'white',
          scale: 0.8,
          anchor: anchor
        }
      ),
      text: new ol.style.Text({
        text: markerInfo.broadcastNum,
        font: fontsize,
        fill: new ol.style.Fill({
          color: 'white'
        }),
        offsetX: offsetX,
        offsetY: offsetY
      })
    })
  }

  /**
   * 统计图标图层默认样式
   * @param {Object} markerInfo 点位信息
   */
  var getCountDefaultStyle = function getCountDefaultStyle (markerInfo) {
    var scale
    if (markerInfo.cameraNum) {
      scale = markerInfo.cameraNum.length < 3 ? 1 : 1.1
    }
    if (markerInfo.broadcastNum) {
      scale = markerInfo.broadcastNum.length < 3 ? 1 : 1.1
    }
    return new ol.style.Style({
      image: new ol.style.Icon({
        // src: '../assets/images/u887.png',
        src: markerInfo.baseUrl,
        size: [45, 42],
        scale: scale,
        offset: [0, 0]
      })
    })
  }

  /**
   * 统计图标图层报警样式
   * @param {Object} markerInfo 点位信息
   */
  var getCountWarningStyle = function getCountWarningStyle (markerInfo) {
    var scale = markerInfo.warnNum.length < 3 ? 1 : 1.1
    return new ol.style.Style({
      image: new ol.style.Icon({
        src: markerInfo.baseUrl,
        size: [45, 42],
        scale: scale,
        offset: [0, 0]
      })
    })
  }

  /**
   * 获取巡更路线正常样式
   * @return {Object} 巡更路线正常样式对象
   */
  var getNormalRouteStyle = function getNormalRouteStyle () {
    return new ol.style.Style({
      stroke: new ol.style.Stroke({
        color: '#7740dc',
        width: 8
      })
    })
  }

  /**
   * 获取巡更路线离线样式
   * @return {Object} 巡更路线离线样式对象
   */
  var getOfflineRouteStyle = function getOfflineRouteStyle () {
    return new ol.style.Style({
      stroke: new ol.style.Stroke({
        color: '#f39826',
        width: 8
      })
    })
  }

  /**
   * 获取巡更路线报警样式
   * @return {Object} 巡更路线报警样式对象
   */
  var getWarningRouteStyle = function getWarningRouteStyle () {
    return new ol.style.Style({
      stroke: new ol.style.Stroke({
        color: '#ff0000',
        width: 8
      })
    })
  }
  return {
    gisConfig: gisConfig,
    getMouseOverAreaStyle: getMouseOverAreaStyle,
    getFeatureStyle: getFeatureStyle,
    getWarningAreaStyle: getWarningAreaStyle,
    getCountCameraFeatureStyle: getCountCameraFeatureStyle,
    getCountWarningFeatureStyle: getCountWarningFeatureStyle,
    getCountBroadcastFeatureStyle: getCountBroadcastFeatureStyle,
    getCountDefaultStyle: getCountDefaultStyle,
    getCountWarningStyle: getCountWarningStyle,
    setAreaStyle: setAreaStyle,
    getNormalRouteStyle: getNormalRouteStyle,
    getOfflineRouteStyle: getOfflineRouteStyle,
    getWarningRouteStyle: getWarningRouteStyle
  }
}
