var map;
var drawLayer;
var drawControl;
var modifyControl;
var selectControl;
var controls;

function init() {
	map = new OpenLayers.Map("rcp1_map");
	//				var osm = new OpenLayers.Layer.OSM('osm', 'maptile/googlemaps/roadmap/${z}/${x}/${y}.png');
	//				map.addLayer(osm);
	var ol_wms = new OpenLayers.Layer.WMS("OpenLayers WMS",
		"http://vmap0.tiles.osgeo.org/wms/vmap0?", {
			layers: 'basic'
		});
	map.addLayer(ol_wms);
	map.zoomTo(3);
	drawLayer = new OpenLayers.Layer.Vector("drawLayer");
	map.addLayer(drawLayer);
	//新增加一个绘画的控件
	drawControl = new OpenLayers.Control.DrawFeature(drawLayer, OpenLayers.Handler.Point, {
		handlerOptions: {
			holeModifier: "altKey"
		}
	});
	var panel = new OpenLayers.Control.Panel({
		allowDepress: true,
		defaultControl: drawControl
	});
	panel.addControls([drawControl]);
	//这种写法相当于把hander类型作为元素放入集合中，以便下面根据类型调用
	$("selHandler").onchange = function() {
		changeHander(this.value);
	}

	map.addControl(new OpenLayers.Control.LayerSwitcher());
	//%%%
	//定义选中后的图元样式
	selectControl = new OpenLayers.Control.SelectFeature(drawLayer, {
		selectStyle: OpenLayers.Util.extend({
				fill: true,
				stroke: true
			},
			OpenLayers.Feature.Vector.style["select"]),
		//					onSelect: onFeatureSelect,
		//					onUnselect: onFeatureUnselect,
		active: false
	});

	controls = {
		draw: panel,
		modify: new OpenLayers.Control.ModifyFeature(drawLayer),
		select: selectControl
	}
	for(var key in controls) {
		map.addControl(controls[key]);
	}

	function toggleControl(element) {
		for(key in controls) {
			var control = controls[key];
			if(element.value == key && element.checked) {
				control.activate();
			} else {
				control.deactivate();
			}
		}
	}

}

function changeHander(name) {
	if(drawControl.active) {
		drawControl.deactivate();
	}
	var handler = ({
		point: OpenLayers.Handler.Point,
		line: OpenLayers.Handler.Path,
		poly: OpenLayers.Handler.Polygon
	})[name];
	if(name == 'camera') {
		drawControl.handler = new handler(drawControl, drawControl.callbacks, drawControl.handlerOptions);
	} else {
		drawControl.handler = new handler(drawControl, drawControl.callbacks, drawControl.handlerOptions);
	}
	drawControl.activate();
}

function toggleControl(element) {
	for(key in controls) {
		var control = controls[key];
		console.log(element + "========" + key);
		if(element.value == key && element.checked) {
			control.activate();
		} else {
			control.deactivate();
		}
	}
}