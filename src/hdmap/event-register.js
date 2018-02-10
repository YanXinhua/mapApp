/**
 * filename: event-register.js
 * author: sunshengzhen
 * introduction: 各种地图事件的事件的统一管理注册类
 * 这里会定义地图上事件的默认处理函数，并根据事件的属性等进行业务处理
 */

// TODO: 地图应当有自身默认的事件处理方法，当用户没有注册事件监听时，进行地图默认事件处理，具体函数待完善

function getDefaultCallback (map, eventType) {
  return map.eventCallback[eventType].default
}

function getTargetMap (e) {
  return hdmap.mapManager[e.map.ol_uid]
}

var eventRegister = {
  /**
   * eventType: singleclick
   * 单击事件注册的默认处理函数
   * @param {event} e 单击事件
   */
  singleclick: function (e) {
    var tarMap = getTargetMap(e)
    // 如果是正在进行划线或者区域选择点位状态，则此事件不处理
    if (!tarMap.getDrawLineState() && !tarMap.getDrawShapeState()) {
      // 获取click点的feature信息
      var feature = e.map.forEachFeatureAtPixel(e.pixel, function (
        feature,
        layer
      ) {
        return feature
      })
      var defaultCallback = getDefaultCallback(tarMap, 'singleclick')
      // 如果是单个的设备被点击,看是否有此类型的对应事件注册
      if (feature) {
        // TODO 如果有多个feature的聚合情况，需要先popup出默认的设备列表
        // TODO 需要做点位聚合计算，如果有点位聚合的情况，需要弹出所有聚合点的列表，供用户操作

        // 点位聚合情况
        // var features = /*聚合函数*/ a()
        // if (features.length > 1) {
        //   tarMap.popupMultipoint(e.coordinate, features)
        // }
        // 单点位
        if (
          feature instanceof ol.DevFeature ||
          feature instanceof ol.AreaFeature ||
          feature instanceof ol.LineFeature ||
          feature instanceof ol.CountFeature
        ) {
          var featureType = feature.extProperties.markerType
          if (feature.extProperties.markerType === '' || null || undefined) {
            featureType = 'common'
          }
          var callback = tarMap.eventCallback.singleclick[featureType]
          if (callback) {
            callback.call(this, {
              feature: feature.extProperties,
              eventType: 'singleclick',
              coordinate: e.coordinate
            })
          } else if (defaultCallback !== null) {
            defaultCallback.call(this, {
              feature: feature.extProperties,
              eventType: 'singleclick',
              coordinate: e.coordinate
            })
          }
        }
      } else {
        // 点击区域没有元素的情况下，如果有default的click监听，执行回调，返回点击位置的坐标信息
        if (defaultCallback !== null) {
          defaultCallback.call(this, {
            feature: null,
            eventType: 'singleclick',
            coordinate: e.coordinate
          })
        }
        // tarMap.closePopup();
      }
    }
  },
  /**
   * eventType: dragend
   * 拖动开始事件的默认处理函数
   * @param {event} e 事件
   */
  dragstart: function (e) {
    // TODO 默认事件处理，需要判断是否编辑状态，如果是编辑状态，需要记录拖动的点位，在结束时做对应的处理
    var tarMap = getTargetMap(e)
    // 如果没有处于编辑状态，退出事件处理
    if (!tarMap.getDragState()) {
      return
    }
    // 获取到事件点位的feature对象
    var feature = e.map.forEachFeatureAtPixel(e.pixel, function (
      feature,
      layer
    ) {
      return feature
    })
    if (tarMap.eventCallback.dragstart.default !== null) {
      tarMap.eventCallback.dragstart.default.call(this, {
        feature: feature,
        eventType: 'dragstart',
        coordinate: e.coordinate
      })
    }
  },
  /**
   * eventType: dragend
   * 拖动结束事件的默认处理函数
   * @param {event} e 事件
   */
  dragend: function (e) {
    // TODO 默认事件处理，需要判断是否编辑状态，如果是编辑状态，结束时需要变动对应点位
    var tarMap = getTargetMap(e)
    // 如果没有处于编辑状态，退出事件处理
    if (!tarMap.getDragState()) {
      return
    }
    // 获取到事件点位的feature对象
    var feature = e.map.forEachFeatureAtPixel(e.pixel, function (
      feature,
      layer
    ) {
      return feature
    })
    if (tarMap.eventCallback.dragend.default !== null) {
      tarMap.eventCallback.dragend.default.call(this, {
        feature: feature,
        eventType: 'dragend',
        coordinate: e.coordinate
      })
    }
  },
  /**
   * eventType: selected
   * 点位选中事件监听
   * @param {event} e 事件
   */

  selected: function (e) {
    // TODO 选择点位事件处理
    var tarMap = getTargetMap(e)
    // 如果没有处于编辑状态，退出事件处理
    if (!tarMap.getDragState()) {
      return
    }
    // 获取到事件点位的feature对象
    var feature = e.map.forEachFeatureAtPixel(e.pixel, function (
      feature,
      layer
    ) {
      return feature
    })
    if (tarMap.eventCallback.selected.default !== null) {
      tarMap.eventCallback.selected.default.call(this, {
        feature: feature,
        eventType: 'selected',
        coordinate: e.coordinate
      })
    }
  },
  /**
   * eventType: cancelSelected
   * 取消选中事件监听
   * @param {event} e 事件
   */
  cancelSelected: function (e) {
    // TODO 取消选择点位事件处理
    var tarMap = getTargetMap(e)
    // 如果没有处于编辑状态，退出事件处理
    if (!tarMap.getDragState()) {
      return
    }
    // 获取到事件点位的feature对象
    var feature = e.map.forEachFeatureAtPixel(e.pixel, function (
      feature,
      layer
    ) {
      return feature
    })
    if (tarMap.eventCallback.cancelSelected.default !== null) {
      tarMap.eventCallback.cancelSelected.default.call(this, {
        feature: feature,
        eventType: 'cancelSelected',
        coordinate: e.coordinate
      })
    }
  },
  /**
   * eventType: pointermove
   * 鼠标移动事件监听
   * @param {event} e 事件
   */
  pointermove: function (e) {
    // TODO 鼠标移动事件监听
    var tarMap = getTargetMap(e)
    var vector = tarMap.getLayerByKey('gisLayer')
    // var vector = tarMap.getLayerByKey('gisLayer')
    // 获取用户注册的pointermove默认处理回调
    var defaultCallback = getDefaultCallback(tarMap, 'pointermove')
    // 区域相关的处理逻辑
    if (vector) {
      // 获取鼠标所在位置的feature
      var selectFeature = vector
        .getSource()
        .getFeaturesAtCoordinate(e.coordinate)
      if (selectFeature.length > 0) {
        selectFeature[0].setStyle(hdmap.commonConfig.getMouseOverAreaStyle())
        if (defaultCallback) {
          defaultCallback.call(this, {
            feature: selectFeature[0],
            eventType: 'pointermove',
            coordinate: e.coordinate
          })
        }
      } else {
        // 获取鼠标所在位置的feature
        var features = vector.getSource().getFeatures()
        for (var i = 0; i < features.length; i++) {
          // if (features[i].extProperties.warningNum === 0) {
          //   features[i].setStyle(null)
          // }
          if (!features[i].extProperties.visible) {
            features[i].setStyle(null)
          }
        }
        if (defaultCallback) {
          defaultCallback.call(this, {
            feature: selectFeature[0],
            eventType: 'pointermove',
            coordinate: e.coordinate
          })
        }
      }
      return
    }
    if (defaultCallback) {
      defaultCallback.call(this, {
        feature: null,
        eventType: 'pointermove',
        coordinate: e.coordinate
      })
    }
  }
}

export default eventRegister
