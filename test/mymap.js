import "../src/hdmap/mapManager.js";
import { debug } from "util";
export const mymap = function(params) {
  let _hdmap = hdmap.mapManager["map1"];
  let _hdmap2 = hdmap.mapManager["map2"];
  let selFeatures = {};
  // let feat = _hdmap.addMarker({
  //   id: "12689",
  //   position: [12615709.175160598, 2656371.0517649446],
  //   markerType: "camera",
  //   name: "test marker",
  //   imgUrl: "./assets/images/icon.png",
  //   size: [32, 48]
  // });
// 切换地图测试
  $("#changeMap").on("click", function (e) {
    let flag = $(this).attr("data-flag");
    if (flag === "0"){
      flag = "1";
      $(this).text("切换地图：2-1");
      _hdmap._map.setTarget(null)
      _hdmap._map.setTarget('map2')
      _hdmap2._map.setTarget(null)      
      _hdmap2._map.setTarget('map1')
    }else{
      flag = "0";
      $(this).text("切换地图：1-2");
      _hdmap._map.setTarget(null)
      _hdmap._map.setTarget('map1')
      _hdmap2._map.setTarget(null)
      _hdmap2._map.setTarget('map2')
    }
    $(this).attr("data-flag", flag);
  });


  $("#modifyMap").on("click", function(e) {
    console.log("open drag tool");
    let flag = $(this).attr("data-flag");
    if (flag === "0") {
      _hdmap.openDragTool(
        //dragstart callback
        function(e) {
          console.log("dragstart callback");
          // console.log(e);
        },
        //dragend callback
        function(e) {
          console.log("dragend callback");
          // console.log(e);
        },
        //select callback
        function(e) {
          console.log("select callback " + e.selected.length);
          if (e.selected.length > 0) {
            selFeatures = {};
            let feat = e.selected[0]; //
            selFeatures[feat.id_] = feat.layerKey;
            feat.setStyle(
              new ol.style.Style({
                image: new ol.style.Icon(
                  /** @type {olx.style.IconOptions} */ ({
                    src: "./assets/images/u346.png"
                  })
                )
              })
            );
          }
        },
        false
      );
      flag = "1";
      $(this).text("关闭地图编辑");
    } else {
      selFeatures = {};
      _hdmap.closeDragTool();
      flag = "0";
      $(this).text("开启地图编辑");
    }
    $(this).attr("data-flag", flag);
  });

  $("#delFeature").on("click", function(e) {
    for (let id in selFeatures) {
      _hdmap.removeMarkerBylayerKey(id, selFeatures[id]);
    }
    selFeatures = {};
    _hdmap.closeDragTool(); //删除点位前，要释放对点位的select
    $("#modifyMap").attr("data-flag", "0");
    $("#modifyMap").text("开启地图编辑");
  });

  $("#drawLine").on("click", function(e) {
    var pointS = new ol.style.Icon(
      /** @type {olx.style.IconOptions} */ ({
        src: "./assets/images/icon.png",
        size: [32, 48],
        color: "#ff0000",
        opacity: 0.8,
        scale: 1
      })
    );
    var pointS1 = new ol.style.Circle({
      radius: 10,
      fill: new ol.style.Fill({
        color: "orange"
      })
    });
    var k = -1;
    _hdmap.openDrawLineTool({ color: "#ff0033", width: 10 }, pointS1, function(
      start,
      end
    ) {
      return [start,end];
    });
  });
  var optionLine = {
    id: "123bbb",
    name: "testareaf",
    lineType: "003",
    borderPoints: [
      [12544316.990742246, 2714004.57109197],
      [12791361.466159936, 2654077.9409163916],
      [12634206.936005615, 2548900.589995989]
    ]
  };
  $("#saveLine").on("click", function(e) {
    // _hdmap.closeDrawLineTool();
    var feat = _hdmap.showDrawLine(optionLine);
    optionLine.borderPoints = feat.getGeometry().getCoordinates();
  });
  $("#editLine").on("click", function(e) {
    _hdmap.editDrawLine();
  });

  var drawShapeE = null;
  $("#drawShape").on("click", function(e) {
    var _type = $("#chooseShapeType").val(); //"Polygon";
    _hdmap.openDrawShapeTool('Polygon',function(e){
      console.log(e.feature.getGeometry().getCoordinates())
    },function(e){
      console.log(e.features.array_[0].getGeometry().getCoordinates())
    });
  });
  $("#saveShape").on("click", function(e) {
    // _hdmap.closeDrawShapeTool();
    /** 在gisLayer上显示刚才画的图形 */
    var feat = _hdmap.showDrawShape({
      id: "123a01",
      name: "testareaf",
      areaType: "001"
    });
    option.borderPoints = feat.getGeometry().getCoordinates();
    // console.log("显示图形的参数：");
    // console.log(feat);
    // console.log(feat.getGeometry().getCoordinates());
  });
  var option = {
    id: "123a01",
    name: "testareaf",
    areaType: "001",
    borderPoints: [
      [
        [12569999.832246065, 2737852.923916945],
        [12824993.758605413, 2712781.578639407],
        [12676400.17561903, 2552569.5673536775],
        [12569999.832246065, 2737852.923916945]
      ]
    ]
  };

  $("#editShape").on("click", function(e) {
    // _hdmap.closeDrawShapeTool();
    _hdmap.editDrawShape(option);
  });
  $("#chooseShapeType").on("change", function(e) {
    var _type = $("#chooseShapeType").val();
    _hdmap.openDrawShapeTool(_type, function(e) {});
  });
  /** 生成点位 */
  $("#addmarker").on("click", function(e) {
    var _id = $("#markerId").val();
    var arr = $("#markerPos")
      .val()
      .split(",");
    var _markerPos = [parseFloat(arr[0]), parseFloat(arr[1])];
    var _markerType = $("#markerType").val();
    var _markerName = $("#markerName").val();
    var _imgUrl = $('.choosebox[name="imgurl"]:checked ')
      .siblings("img")
      .attr("src");
    var _num = parseInt($("#markerNum").val());

    if (_num > 1) {
      var m,
        s = 0;

      for (var i = 0; i < _num; i++) {
        s = Math.random() * 300000;
        m = Math.random() * 1000;
        _hdmap.addMarker({
          id: _id + s,
          position: [_markerPos[0] + s, _markerPos[1] + m],
          markerType: _markerType,
          name: _markerName + s,
          imgUrl: _imgUrl,
          size: [32, 48]
        });
      }
    }
  });
  /**显示或隐藏某类型的点位，实际是显示或隐藏该类型点位所在的层 */
  $("#controlMar").on("click", function(e) {
    var flag = $(this).attr("data-flag");
    var _markerType = $("#chooseMarkerType").val();
    if (flag === "0") {
      _hdmap.hideMarkers(_markerType);
      $(this).text("显示点位");
      $(this).attr("data-flag", "1");
    } else {
      _hdmap.showMarkers(_markerType);
      $(this).text("隐藏点位");
      $(this).attr("data-flag", "0");
    }
  });
};
