import Vue from 'vue'
import Router from 'vue-router'
import index from '@/components/index'
import BaiduMap from '@/views/BaiduMap'
import TestMap from '@/views/TestMap'
import AreaCenter from '@/components/AreaCenter'
import AddArea from '@/components/AddArea'
import AddAreas from '@/components/AddAreas'
import WzkMapTest from '@/views/WzkMapTest'
import EditMap from '@/views/EditMap'
import SjwMap from '@/views/SjwMap'
import UpdateArea from '@/components/UpdateArea'
import AboutMarker from '@/views/AboutMarker'
import CarTest from '@/views/CarTest'
import PointOperation from '@/components/PointOperation'
import MapOperatingFunction from '@/components/MapOperatingFunction'
import PointAggregation from '@/components/PointAggregation'
import CarStyle from '@/views/CarStyle'
import RouteStyle from '@/components/RouteStyle'
import ParkingLot from '@/components/ParkingLot'
import GisChange from '@/views/GisChange'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: index
    },
    {
      path: '/baidumap',
      name: 'baiduMap',
      component: BaiduMap
    },
    {
      path: '/testmap',
      name: 'testMap',
      component: TestMap
    },
    {
      path: '/areacenter',
      name: 'areacenter',
      component: AreaCenter
    },
    {
      path: '/addarea',
      name: 'addarea',
      component: AddArea
    },
    {
      path: '/addareas',
      name: 'addareas',
      component: AddAreas
    },
    {
      path: '/wzkmaptest',
      name: 'wzkMapTest',
      component: WzkMapTest
    },
    {
      path: '/editmap',
      name: 'editmap',
      component: EditMap
    },
    {
      path: '/sjwmap',
      name: 'sjwMap',
      component: SjwMap
    },
    {
      path: '/updatearea',
      name: 'updatearea',
      component: UpdateArea
    },
    {
      path: '/aboutmarker',
      name: 'aboutmarker',
      component: AboutMarker
    },
    {
      path: '/cartest',
      name: 'CarTest',
      component: CarTest
    },
    {
      path: '/pointoperation',
      name: 'pointoperation',
      component: PointOperation
    },
    {
      path: '/mapoperatingfunction',
      name: 'mapoperatingfunction',
      component: MapOperatingFunction
    },
    {
      path: '/pointaggregation',
      name: 'pointaggregation',
      component: PointAggregation
    },
    {
      path: '/carstyle',
      name: 'CarStyle',
      component: CarStyle
    },
    {
      path: '/routestyle',
      name: 'routestyle',
      component: RouteStyle
    },
    {
      path: '/parkinglot',
      name: 'parkinglot',
      component: ParkingLot
    },
    {
      path: '/gischange',
      name: 'GisChange',
      component: GisChange
    }
  ]
})
