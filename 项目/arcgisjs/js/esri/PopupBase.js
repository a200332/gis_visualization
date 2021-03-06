/*
 COPYRIGHT 2009 ESRI

 TRADE SECRETS: ESRI PROPRIETARY AND CONFIDENTIAL
 Unpublished material - all rights reserved under the
 Copyright Laws of the United States and applicable international
 laws, treaties, and conventions.

 For additional information, contact:
 Environmental Systems Research Institute, Inc.
 Attn: Contracts and Legal Services Department
 380 New York Street
 Redlands, California, 92373
 USA

 email: contracts@esri.com
 */
//>>built
define("esri/PopupBase","dojo/_base/declare dojo/_base/lang dojo/_base/array dojo/_base/Color dojo/_base/Deferred dojo/has esri/kernel esri/graphic esri/geometry/Point esri/geometry/jsonUtils esri/geometry/mathUtils esri/geometry/webMercatorUtils esri/symbols/SimpleMarkerSymbol esri/symbols/SimpleLineSymbol esri/symbols/CartographicLineSymbol esri/symbols/SimpleFillSymbol esri/Evented".split(" "),function(q,w,r,n,x,y,z,A,B,C,D,t,u,p,s,v,E){q=q(E,{declaredClass:"esri.PopupBase",_evtMap:{"set-features":!0,
"clear-features":!0,"selection-change":!0,"dfd-complete":!0},onSetFeatures:function(){},onClearFeatures:function(){},onSelectionChange:function(){},onDfdComplete:function(){},initialize:function(){this.count=0;this.selectedIndex=-1},cleanup:function(){this.features=this.deferreds=null},setFeatures:function(a){if(a&&a.length){this.clearFeatures();var b,c;a[0]instanceof x?c=a:b=a;b?this._updateFeatures(null,b):(this.deferreds=c,c=c.slice(0),r.forEach(c,function(a){a.addBoth(w.hitch(this,this._updateFeatures,
a))},this))}},clearFeatures:function(){this.features=this.deferreds=this._marked=null;this.count=0;var a=this.selectedIndex;this.selectedIndex=-1;if(-1<a)this.onSelectionChange();this.onClearFeatures()},getSelectedFeature:function(){var a=this.features;if(a)return a[this.selectedIndex]},select:function(a){0>a||a>=this.count||(this.selectedIndex=a,this.onSelectionChange())},enableHighlight:function(a){this._highlighted=a.graphics.add(new A(new B(0,0,a.spatialReference)));this._highlighted.hide();this.markerSymbol||
(a=this.markerSymbol=new u,a.setStyle(u.STYLE_TARGET),a._setDim(16,16,7),a.setOutline(new s(p.STYLE_SOLID,new n([0,255,255]),2,s.CAP_ROUND,s.JOIN_ROUND)),a.setColor(new n([0,0,0,0])));this.lineSymbol||(this.lineSymbol=new p(p.STYLE_SOLID,new n([0,255,255]),2));this.fillSymbol||(this.fillSymbol=new v(v.STYLE_NULL,new p(p.STYLE_SOLID,new n([0,255,255]),2),new n([0,0,0,0])))},disableHighlight:function(a){var b=this._highlighted;b&&(b.hide(),a.graphics.remove(b),delete this._highlighted);this.markerSymbol=
this.lineSymbol=this.fillSymbol=null},showHighlight:function(){var a=this.features&&this.features[this.selectedIndex];this._highlighted&&(a&&a.geometry)&&this._highlighted.show()},hideHighlight:function(){this._highlighted&&this._highlighted.hide()},updateHighlight:function(a,b){var c=b.geometry,d=this._highlighted;if(!c||!d)d&&d.hide();else{d.hide();!d.getLayer()&&a&&a.graphics.add(d);d.setGeometry(C.fromJson(c.toJson()));var e;switch(c.type){case "point":case "multipoint":e=this.markerSymbol;e.setOffset(0,
0);e.setAngle(0);var f=b.getLayer();if(f){var c=f._getSymbol(b),k,g,l=0,m=0,h=0;if(c){if((f=!b.symbol?f._getRenderer(b):null)&&f.proportionalSymbolInfo)k=g=f.getSize(b,{shape:c.style});else switch(c.type){case "simplemarkersymbol":k=g=c.size||0;break;case "picturemarkersymbol":k=c.width||0,g=c.height||0}l=c.xoffset||0;m=c.yoffset||0;h=c.angle||0}k&&g&&e._setDim(k+1,g+1,7);e.setOffset(l,m);e.setAngle(h)}break;case "polyline":e=this.lineSymbol;break;case "polygon":e=this.fillSymbol}d.setSymbol(e)}},
showClosestFirst:function(a){var b=this.features;if(b&&b.length){if(1<b.length){var c,d=Infinity,e=-1,f,k=D.getLength,g,l=a.spatialReference,m,h;a=a.normalize();for(c=b.length-1;0<=c;c--)if(f=b[c].geometry){m=f.spatialReference;g=0;try{h="point"===f.type?f:f.getExtent().getCenter(),h=h.normalize(),l&&(m&&!l.equals(m)&&l._canProject(m))&&(h=l.isWebMercator()?t.geographicToWebMercator(h):t.webMercatorToGeographic(h)),g=k(a,h)}catch(n){}0<g&&g<d&&(d=g,e=c)}0<e&&(b.splice(0,0,b.splice(e,1)[0]),this.select(0))}}else this.deferreds&&
(this._marked=a)},_unbind:function(a){a=r.indexOf(this.deferreds,a);if(-1!==a)return this.deferreds.splice(a,1),!this.deferreds.length?(this.deferreds=null,2):1},_fireComplete:function(a){var b=this._marked;b&&(this._marked=null,this.showClosestFirst(b));this.onDfdComplete(a)},_updateFeatures:function(a,b){if(a){if(this.deferreds){var c=this._unbind(a);if(c)if(b&&b instanceof Error){if(this._fireComplete(b),2===c)this.onSetFeatures()}else if(b&&b.length)if(this.features){var d=r.filter(b,function(a){return-1===
r.indexOf(this.features,a)},this);this.features=this.features.concat(d);this.count=this.features.length;this._fireComplete();if(2===c)this.onSetFeatures()}else{this.features=b;this.count=b.length;this.selectedIndex=0;this._fireComplete();if(2===c)this.onSetFeatures();this.select(0)}else if(this._fireComplete(),2===c)this.onSetFeatures()}}else this.features=b,this.count=b.length,this.selectedIndex=0,this.onSetFeatures(),this.select(0)}});y("extend-esri")&&(z.PopupBase=q);return q});