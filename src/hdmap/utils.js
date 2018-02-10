/**
 * filename: utils.js
 * author: sunshengzhen
 * introduction: 提供一些计算能力方法
 */

/**
 * 通过两点的GPS坐标获取两点间的距离
 * @param {HDMap} 地图对象
 * @param {Array} lonlatA
 * @param {Array} lonlatB
 * @return {Number} 距离 单位m
 */
function getDistanceByGPS (map, lonlatA, lonlatB) {
  if (
    lonlatA[0] > 180 ||
    lonlatA[0] < -180 ||
    (lonlatA[1] > 90 || lonlatA[1] < -90) ||
    (lonlatB[0] > 180 || lonlatB[0] < -180) ||
    (lonlatB[1] > 90 || lonlatB[1] < -90)
  ) {
    console.warn(
      'Error: Longitude range: -180 to 180, latitude range: -90 to 90'
    )
    return
  }
  // // 经纬度转换成三角函数中度分表形式
  // function rad(d) {
  //   return d * Math.PI / 180.0
  // }
  // let radLat1 = rad(lonlatA[1])
  // let radLat2 = rad(lonlatB[1])
  // let a = radLat1 - radLat2
  // let b = rad(lonlatA[0]) - rad(lonlatB[0])
  // let distance =
  //   2 *
  //   Math.asin(
  //     Math.sqrt(
  //       Math.pow(Math.sin(a / 2), 2) +
  //         Math.cos(radLat1) * Math.cos(radLat2) * Math.pow(Math.sin(b / 2), 2)
  //     )
  //   )
  // distance = Math.round(distance * 6378137)
  let distance = map.getDistance(lonlatA, lonlatB)
  return distance
}

/**
 * 根据两点的坐标计算两点距离
 * @param {HDMap} 地图对象
 * @param {JSON} lonlats { "lonlatA":[],"lonlatB":[],"lonlatC":[] }
 * @param {JSON} points  { "pointA":[], "pointB":[], "pointC":[] }
 * @return {Number} 距离 单位m
 */
function getDistanceByPoint (map, lonlats, points) {
  // 判断经纬度范围
  if (
    lonlats['lonlatA'][0] > 180 ||
    lonlats['lonlatA'][0] < -180 ||
    (lonlats['lonlatA'][1] > 90 || lonlats['lonlatA'][1] < -90) ||
    (lonlats['lonlatB'][0] > 180 || lonlats['lonlatB'][0] < -180) ||
    (lonlats['lonlatB'][1] > 90 || lonlats['lonlatB'][1] < -90) ||
    (lonlats['lonlatC'][0] > 180 || lonlats['lonlatC'][0] < -180) ||
    (lonlats['lonlatC'][1] > 90 || lonlats['lonlatC'][1] < -90)
  ) {
    console.warn(
      'Error: Longitude range: -180 to 180, latitude range: -90 to 90'
    )
    return
  }
  // 光栅图坐标换算经纬度
  let centerGPS = getCenterGPS(lonlats, points) // 中心点GPS坐标
  let mcenter = map.translate_4326_to_3857(centerGPS) // 中心点GPS坐标转光栅坐标
  let scale = getScaleByGPS(map, lonlats, points) // 获取偏移比例尺

  // 修正AB两点的坐标位置
  let pntAX = points['pointA'][0] * scale
  let pntAY = points['pointA'][1] * scale
  let pntBX = points['pointB'][0] * scale
  let pntBY = points['pointB'][1] * scale
  let mlonlatA = [mcenter[0] + pntAX, mcenter[1] + pntAY]
  let lonlatA = map.translate_3857_to_4326(mlonlatA) // 点位A的GPS坐标

  let mlonlatB = [mcenter[0] + pntBX, mcenter[1] + pntBY]
  let lonlatB = map.translate_3857_to_4326(mlonlatB) // 点位B的GPS坐标

  let distance = map.getDistance(lonlatA, lonlatB)
  return distance
}

/**
 * 根据三个GPS和对应的坐标信息计算修正地图的比例尺
 * @param {HDMap} 地图对象
 * @param {JSON} lonlats { "lonlatA":[],"lonlatB":[],"lonlatC":[] }
 * @param {JSON} points  { "pointA":[], "pointB":[], "pointC":[] }
 * @return {Number} scale分母
 */
function getScaleByGPS (map, lonlats, points) {
  // 判断经纬度范围
  if (
    lonlats['lonlatA'][0] > 180 ||
    lonlats['lonlatA'][0] < -180 ||
    (lonlats['lonlatA'][1] > 90 || lonlats['lonlatA'][1] < -90) ||
    (lonlats['lonlatB'][0] > 180 || lonlats['lonlatB'][0] < -180) ||
    (lonlats['lonlatB'][1] > 90 || lonlats['lonlatB'][1] < -90) ||
    (lonlats['lonlatC'][0] > 180 || lonlats['lonlatC'][0] < -180) ||
    (lonlats['lonlatC'][1] > 90 || lonlats['lonlatC'][1] < -90)
  ) {
    console.warn(
      'Error: Longitude range: -180 to 180, latitude range: -90 to 90'
    )
    return
  }
  // 经纬度换算光栅图坐标
  let centerGPS = getCenterGPS(lonlats, points) // 中心点GPS坐标
  let mcenter = map.translate_4326_to_3857(centerGPS) // 中心点GPS坐标转光栅坐标
  let mlonlatA = map.translate_4326_to_3857(lonlats['lonlatA'])
  let mlonlatB = map.translate_4326_to_3857(lonlats['lonlatB'])
  let mlonlatC = map.translate_4326_to_3857(lonlats['lonlatC'])

  let pntAX = mlonlatA[0] - mcenter[0]
  let pntAY = mlonlatA[1] - mcenter[1]
  let pntBX = mlonlatB[0] - mcenter[0]
  let pntBY = mlonlatB[1] - mcenter[1]
  let pntCX = mlonlatC[0] - mcenter[0]
  let pntCY = mlonlatC[1] - mcenter[1]

  let scaleAX = pntAX / points['pointA'][0]
  let scaleAY = pntAY / points['pointA'][1]
  let scaleBX = pntBX / points['pointB'][0]
  let scaleBY = pntBY / points['pointB'][1]
  let scaleCX = pntCX / points['pointC'][0]
  let scaleCY = pntCY / points['pointC'][1]
  let scaleA = (scaleAX + scaleAY) / 2
  let scaleB = (scaleBX + scaleBY) / 2
  let scaleC = (scaleCX + scaleCY) / 2
  var scale = (scaleA + scaleB + scaleC) / 3
  return scale
}

/**
 * 根据三个GPS点进行中心点计算
 * @param {JSON} lonlats { "lonlatA":[],"lonlatB":[],"lonlatC":[] }
 * @param {JSON} points  { "pointA":[], "pointB":[], "pointC":[] }
 * @return {Array}
 */
function getCenterGPS (lonlats, points) {
  // 判断GPS点的范围
  if (
    lonlats['lonlatA'][0] > 180 ||
    lonlats['lonlatA'][0] < -180 ||
    (lonlats['lonlatA'][1] > 90 || lonlats['lonlatA'][1] < -90) ||
    (lonlats['lonlatB'][0] > 180 || lonlats['lonlatB'][0] < -180) ||
    (lonlats['lonlatB'][1] > 90 || lonlats['lonlatB'][1] < -90) ||
    (lonlats['lonlatC'][0] > 180 || lonlats['lonlatC'][0] < -180) ||
    (lonlats['lonlatC'][1] > 90 || lonlats['lonlatC'][1] < -90)
  ) {
    console.warn(
      'Error: Longitude range: -180 to 180, latitude range: -90 to 90'
    )
    return
  }
  // 计算AB两个GPS的中心点
  let lon1 =
    lonlats['lonlatA'][0] -
    (lonlats['lonlatB'][0] - lonlats['lonlatA'][0]) *
      points['pointA'][0] /
      (points['pointB'][0] - points['pointA'][0])
  let lat1 =
    lonlats['lonlatB'][1] -
    (lonlats['lonlatB'][1] - lonlats['lonlatA'][1]) *
      points['pointB'][1] /
      (points['pointB'][1] - points['pointA'][1])

  // 计算AC两个GPS的中心点
  let lon2 =
    lonlats['lonlatA'][0] -
    (lonlats['lonlatC'][0] - lonlats['lonlatA'][0]) *
      points['pointA'][0] /
      (points['pointC'][0] - points['pointA'][0])
  let lat2 =
    lonlats['lonlatC'][1] -
    (lonlats['lonlatC'][1] - lonlats['lonlatA'][1]) *
      points['pointC'][1] /
      (points['pointC'][1] - points['pointA'][1])

  // 计算BC两个GPS的中心点
  let lon3 =
    lonlats['lonlatC'][0] -
    (lonlats['lonlatB'][0] - lonlats['lonlatC'][0]) *
      points['pointC'][0] /
      (points['pointB'][0] - points['pointC'][0])
  let lat3 =
    lonlats['lonlatB'][1] -
    (lonlats['lonlatB'][1] - lonlats['lonlatC'][1]) *
      points['pointB'][1] /
      (points['pointB'][1] - points['pointC'][1])

  // 根据三个中心点算出平均值
  let lon = (lon1 + lon2 + lon3) / 3
  let lat = (lat1 + lat2 + lat3) / 3
  let centerGPS = [lon, lat]
  if (lon > 180 || lon < -180 || (lat > 90 || lat < -90)) {
    console.warn(
      'Error: centerGPS: [' +
        centerGPS +
        '] The longitude must be between -180 and 180, latitude must be between -90 and 90'
    )
    return false
  } else {
    return centerGPS
  }
}

/**
 * 根据地图的长宽和真实长宽进行比例尺计算
 * @param {*} sizeWidth
 * @param {*} sizeHeight
 * @param {*} realWidth
 * @param {*} realHeight
 * @return {Number} scale分母
 */
function getScaleBySize (sizeWidth, sizeHeight, realWidth, realHeight) {
  // 根据图片宽高和真实宽高获取比例尺
  let width = sizeWidth * 0.0254 / 72
  let height = sizeHeight * 0.0254 / 72
  let widthScale = realWidth / width
  let heightScale = realHeight / height

  // 根据两个比例尺求出平均比例尺
  let scale = (widthScale + heightScale) / 2
  console.log(scale)
  return scale
}
/**
 * 获取地图某个区域（多边形）重心
 * @param {Array} points 多边形各点的坐标数组
 * @return {Array} areaCenter  重心坐标
 */
function getAreaCenter (points) {
  // 初始化多边形面积
  var aolygonArea = 0
  var areaCenter = []
  // 初始化多边形重心的 Gx Gy
  var Gx = 0
  var Gy = 0
  for (var i = 1; i <= points.length; i++) {
    // 获取x 坐标
    var iLat = points[i % points.length][0]
    // 获取y 坐标
    var iLng = points[i % points.length][1]
    // console.log(iLat, iLng);
    var nextLat = points[i - 1][0]
    var nextLng = points[i - 1][1]
    // 一个三角形的面积
    var temp = (iLat * nextLng - iLng * nextLat) / 2
    aolygonArea += temp
    Gx += temp * (iLat + nextLat) / 3
    Gy += temp * (iLng + nextLng) / 3
  }
  Gx = Gx / aolygonArea
  Gy = Gy / aolygonArea
  areaCenter[0] = Gx
  areaCenter[1] = Gy
  return areaCenter
}

/**
 * 获取重心点到多边形最近某个点的最短x轴,y轴的距离
 * @param {Array} points 多边形各点的坐标数组
 * @return {Array} minDistance  重心点到多边形最近点的X，Y 轴绝对值距离
 */
function getMinDistance (points) {
  var minDistance = []
  var disistanceX = [] // 重心点到各个点的x轴距离集合
  var disistanceY = [] // 重心点到各个点的y轴距离集合
  for (var i = 0; i < points.length; i++) {
    var iLatx = Math.abs(points[i][0])
    var iLaty = Math.abs(points[i][1])
    disistanceX.push(iLatx)
    disistanceY.push(iLaty)
  }
  // 多边形最小点的x,y 轴绝对值
  var minPointX = Math.min.apply(null, disistanceX)
  var minPointY = Math.min.apply(null, disistanceY)
  // 重心坐标X ,y轴的绝对值
  var areaCenterX = Math.abs(getAreaCenter(points)[0])
  var areaCenterY = Math.abs(getAreaCenter(points)[1])
  minDistance[0] = Math.abs(minPointX - areaCenterX) / 2
  minDistance[1] = Math.abs(minPointY - areaCenterY) / 2
  return minDistance
}
/**
 * 获取摄像头坐标
 * @param {Array} points 多边形各点的坐标数组
 * @return {Array} cameraCountPoint  摄像头坐标
 */
function getCameraCountPoint (points) {
  var cameraCountPoint = []
  // 计算摄像头坐标
  var cameraCountPointX = getAreaCenter(points)[0] - getMinDistance(points)[0]
  var cameraCountPointY = getAreaCenter(points)[1]
  cameraCountPoint[0] = cameraCountPointX
  cameraCountPoint[1] = cameraCountPointY
  return cameraCountPoint
}
/**
 * 获取广播坐标
 * @param {Array} points 多边形各点的坐标数组
 * @return {Array} broadcastCountPoint  广播坐标
 */
function getBroadcastCountPoint (points) {
  var broadcastCountPoint = []
  // 计算广播坐标
  var broadcastCountPointX =
    getAreaCenter(points)[0] + getMinDistance(points)[0]
  var broadcastCountPointY = getAreaCenter(points)[1]
  broadcastCountPoint[0] = broadcastCountPointX
  broadcastCountPoint[1] = broadcastCountPointY
  return broadcastCountPoint
}
/**
 * 获取报警坐标
 * @param {Array} points 多边形各点的坐标数组
 * @return {Array} waringConutPoint  报警坐标
 */
function getWarningConutPoint (points) {
  var waringConutPoint = []
  // 计算报警坐标 X Y轴坐标
  var waringConutPointX = getAreaCenter(points)[0]
  var waringConutPointY = getAreaCenter(points)[1] - getMinDistance(points)[1]
  waringConutPoint[0] = waringConutPointX
  waringConutPoint[1] = waringConutPointY
  return waringConutPoint
}
/**
 * 射线法判断点是否在多边形内部
 * @param {Array} point 待判断的点，格式：[X坐标, Y坐标]
 * @param {Array} poly 多边形顶点，数组成员的格式同 point
 * @return {String} 点 point 和多边形 poly 的几何关系
 */
function judgePointInsidePolygon (point, poly) {
  function rayMethod (point, poly) {
    for (var f = false, i = 0, l = poly.length, j = l - 1; i < l; j = i, i++) {
      // 点与多边形顶点重合
      if (
        (poly[i][0] === point[0] && poly[i][1] === point[1]) ||
        (poly[j][0] === point[0] && poly[j][1] === point[1])
      ) {
        return 'on'
      }
      // 判断线段两端点是否在射线两侧
      if (
        (poly[i][1] < point[1] && poly[j][1] >= point[1]) ||
        (poly[i][1] >= point[1] && poly[j][1] < point[1])
      ) {
        // 线段上与射线 Y 坐标相同的点的 X 坐标
        var x =
          poly[i][0] +
          (point[1] - poly[i][1]) *
            (poly[j][0] - poly[i][0]) /
            (poly[j][1] - poly[i][1])
        // 点在多边形的边上
        if (x === point[0]) {
          return 'on'
        }
        // 射线穿过多边形的边界
        if (x > point[0]) {
          f = !f
        }
      }
    }
    // 射线穿过多边形边界的次数为奇数时点在多边形内
    return f ? 'in' : 'out'
  }
  // console.log(poly);
  var result = rayMethod(point, poly)
  // console.log(result);
  return result
}
/**
 * 获取点位聚合信息
 * @param {Object} map 初始化地图对象
 * @param {Array} coordinate 鼠标点击点坐标，格式：[X坐标, Y坐标]
 * @return {Array} markersInfo 点位信息数组[{},{}]
 */
function getFeaturesInExtent (map, coordinate) {
  // 设置半径根据地图放大等级而相应的缩小
  var zoom = map.getZoom()
  var distance = 24 / Math.pow(2, zoom - 3)
  // 设置区域范围
  var extent = [
    coordinate[0] - distance,
    coordinate[1] - distance,
    coordinate[0] + distance,
    coordinate[1] + distance
  ]
  var layers = map.getOutterLayers()
  // 保存全部图层信息
  var layersInfo = []
  // 保存点位图层信息
  var markersInfo = []
  for (var key in layers) {
    // 选定区域
    var layer = layers[key].getSource().getFeaturesInExtent(extent)
    layersInfo.push(layer)
  }
  // 排空
  var resdata = layersInfo.filter(function (item) {
    return item.length !== 0
  })
  for (let i = 0; i < resdata.length; i++) {
    const element = resdata[i]
    for (let j = 0; j < element.length; j++) {
      const ele = element[j]
      // 判断是否有点位信息
      if (ele.extProperties.markerType) {
        markersInfo.push(ele.extProperties)
      }
    }
  }
  return markersInfo
}
/**
 * 获取规则多边形的中心
 * @param {Array} points 多边形的顶点坐标：[[x1,y1],[x2,y2].....]
 * @return {Array} geometryCenter  多边形的中心(重心)：[x,y]
 */
function getGeometryCenter (points) {
  var geometryCenter = []
  var coordinateX = 0
  var coordinateY = 0
  for (let i = 0; i < points.length; i++) {
    coordinateX += points[i][0]
    coordinateY += points[i][1]
  }
  geometryCenter[0] = coordinateX / points.length
  geometryCenter[1] = coordinateY / points.length
  return geometryCenter
}
var utils = {
  getDistanceByGPS: getDistanceByGPS,
  getDistanceByPoint: getDistanceByPoint,
  getScaleByGPS: getScaleByGPS,
  getCenterGPS: getCenterGPS,
  getScaleBySize: getScaleBySize,
  getAreaCenter: getAreaCenter,
  getCameraCountPoint: getCameraCountPoint,
  getBroadcastCountPoint: getBroadcastCountPoint,
  getWarningConutPoint: getWarningConutPoint,
  judgePointInsidePolygon: judgePointInsidePolygon,
  getFeaturesInExtent: getFeaturesInExtent,
  getGeometryCenter: getGeometryCenter
}
export default utils
