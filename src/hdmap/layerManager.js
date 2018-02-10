/**
 * filename: layerManager.js
 * author: sunshengzhen
 * introduction: 进行图层管理的方法类在这里实现
 */

// feature类型和图层对照
const layerMap = {
  // 摄像头图层
  camera: 'cameraLayer',
  // 广播设备图层
  video: 'videoLayer',
  // 保安图层
  guarder: 'guarderLayer',
  // 保洁图层
  cleaner: 'cleanerLayer',
  // 车辆设备图层
  car: 'carLayer',
  // 报警图层
  warning: 'warningLayer',
  // 默认显示图层
  common: 'commonLayer',
  // 区域显示图层
  gis: 'gisLayer',
  // 路线现实图层
  line: 'lineLayer',
  // 摄像头统计图层
  countCamera: 'countCameraLayer',
  // 报警统计图层
  countWarning: 'countWarningLayer',
  // 广播统计图层
  countBroadcast: 'countBroadcastLayer',
  // 摄像头统计底图图层
  countCameraBase: 'cameraBase',
  // 报警统计底图图层
  countWarningBase: 'warningBase',
  // 广播统计底图图层
  countBroadcastBase: 'broadcastBase'
}

/**
 * getLayerKeyByType
 * 根据feature的type获取对应所在图层的名称
 * @param {String} type
 */
function getLayerKeyByType (type) {
  // TODO 这里可能需要根据类型的数据进行判断获取，暂时用map方式存取
  if (layerMap[type]) {
    return layerMap[type]
  } else {
    return layerMap.common
  }
}
function layerMapO () {
  return layerMap
}

const layerManager = {
  getLayerKeyByType: getLayerKeyByType,
  layerMapO: layerMapO
}
export default layerManager
