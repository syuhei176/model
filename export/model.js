(function ($hx_exports) { "use strict";
$hx_exports.model = $hx_exports.model || {};
var HxOverrides = function() { };
HxOverrides.__name__ = true;
HxOverrides.iter = function(a) {
	return { cur : 0, arr : a, hasNext : function() {
		return this.cur < this.arr.length;
	}, next : function() {
		return this.arr[this.cur++];
	}};
};
var Main = $hx_exports.Main = function() {
};
Main.__name__ = true;
Main.prototype = {
	__class__: Main
};
var IMap = function() { };
IMap.__name__ = true;
Math.__name__ = true;
var Reflect = function() { };
Reflect.__name__ = true;
Reflect.field = function(o,field) {
	try {
		return o[field];
	} catch( e ) {
		return null;
	}
};
Reflect.fields = function(o) {
	var a = [];
	if(o != null) {
		var hasOwnProperty = Object.prototype.hasOwnProperty;
		for( var f in o ) {
		if(f != "__id__" && f != "hx__closures__" && hasOwnProperty.call(o,f)) a.push(f);
		}
	}
	return a;
};
var ValueType = { __ename__ : true, __constructs__ : ["TNull","TInt","TFloat","TBool","TObject","TFunction","TClass","TEnum","TUnknown"] };
ValueType.TNull = ["TNull",0];
ValueType.TNull.__enum__ = ValueType;
ValueType.TInt = ["TInt",1];
ValueType.TInt.__enum__ = ValueType;
ValueType.TFloat = ["TFloat",2];
ValueType.TFloat.__enum__ = ValueType;
ValueType.TBool = ["TBool",3];
ValueType.TBool.__enum__ = ValueType;
ValueType.TObject = ["TObject",4];
ValueType.TObject.__enum__ = ValueType;
ValueType.TFunction = ["TFunction",5];
ValueType.TFunction.__enum__ = ValueType;
ValueType.TClass = function(c) { var $x = ["TClass",6,c]; $x.__enum__ = ValueType; return $x; };
ValueType.TEnum = function(e) { var $x = ["TEnum",7,e]; $x.__enum__ = ValueType; return $x; };
ValueType.TUnknown = ["TUnknown",8];
ValueType.TUnknown.__enum__ = ValueType;
var Type = function() { };
Type.__name__ = true;
Type["typeof"] = function(v) {
	var _g = typeof(v);
	switch(_g) {
	case "boolean":
		return ValueType.TBool;
	case "string":
		return ValueType.TClass(String);
	case "number":
		if(Math.ceil(v) == v % 2147483648.0) return ValueType.TInt;
		return ValueType.TFloat;
	case "object":
		if(v == null) return ValueType.TNull;
		var e = v.__enum__;
		if(e != null) return ValueType.TEnum(e);
		var c;
		if((v instanceof Array) && v.__enum__ == null) c = Array; else c = v.__class__;
		if(c != null) return ValueType.TClass(c);
		return ValueType.TObject;
	case "function":
		if(v.__name__ || v.__ename__) return ValueType.TObject;
		return ValueType.TFunction;
	case "undefined":
		return ValueType.TNull;
	default:
		return ValueType.TUnknown;
	}
};
var haxe = {};
haxe.ds = {};
haxe.ds.StringMap = function() {
	this.h = { };
};
haxe.ds.StringMap.__name__ = true;
haxe.ds.StringMap.__interfaces__ = [IMap];
haxe.ds.StringMap.prototype = {
	set: function(key,value) {
		this.h["$" + key] = value;
	}
	,get: function(key) {
		return this.h["$" + key];
	}
	,keys: function() {
		var a = [];
		for( var key in this.h ) {
		if(this.h.hasOwnProperty(key)) a.push(key.substr(1));
		}
		return HxOverrides.iter(a);
	}
	,__class__: haxe.ds.StringMap
};
var model = {};
model.ModelValue = { __ename__ : true, __constructs__ : ["MNull","MString","MNumber","MBoolean","MOBject","MArray"] };
model.ModelValue.MNull = ["MNull",0];
model.ModelValue.MNull.__enum__ = model.ModelValue;
model.ModelValue.MString = function(v) { var $x = ["MString",1,v]; $x.__enum__ = model.ModelValue; return $x; };
model.ModelValue.MNumber = function(v) { var $x = ["MNumber",2,v]; $x.__enum__ = model.ModelValue; return $x; };
model.ModelValue.MBoolean = function(v) { var $x = ["MBoolean",3,v]; $x.__enum__ = model.ModelValue; return $x; };
model.ModelValue.MOBject = function(elems) { var $x = ["MOBject",4,elems]; $x.__enum__ = model.ModelValue; return $x; };
model.ModelValue.MArray = function(v) { var $x = ["MArray",5,v]; $x.__enum__ = model.ModelValue; return $x; };
model.ModelElement = $hx_exports.model.ModelElement = function(modelValue) {
	this.modelValue = modelValue;
};
model.ModelElement.__name__ = true;
model.ModelElement.from_part = function(json) {
	var _g = Type["typeof"](json);
	switch(_g[1]) {
	case 4:
		var o = new haxe.ds.StringMap();
		var _g1 = 0;
		var _g2 = Reflect.fields(json);
		while(_g1 < _g2.length) {
			var n = _g2[_g1];
			++_g1;
			var v = Reflect.field(json,n);
			var value = model.ModelElement.from_part(v);
			o.set(n,value);
		}
		return model.ModelValue.MOBject(o);
	case 1:
		return model.ModelValue.MNumber(json);
	default:
		return model.ModelValue.MString(json);
	}
};
model.ModelElement.from = function(json) {
	return new model.ModelElement(model.ModelElement.from_part(json));
};
model.ModelElement.prototype = {
	child: function(key) {
		{
			var _g = this.modelValue;
			switch(_g[1]) {
			case 4:
				var elems = _g[2];
				return new model.ModelElement(elems.get(key));
			default:
			}
		}
	}
	,val: function() {
		{
			var _g = this.modelValue;
			switch(_g[1]) {
			case 1:
				var v = _g[2];
				return v;
			case 2:
				var v1 = _g[2];
				return v1;
			case 3:
				var v2 = _g[2];
				return v2;
			default:
			}
		}
	}
	,get: function() {
		return null;
	}
	,find: function() {
		return null;
	}
	,push: function() {
		return null;
	}
	,set: function(key,val) {
		this.set_part(key,model.ModelElement.from_part(val));
	}
	,remove: function() {
		return null;
	}
	,on: function(event,onSet) {
		this.onSet = onSet;
		return null;
	}
	,set_part: function(key,json) {
		switch(json[1]) {
		case 4:
			var elems = json[2];
			this.set_object(key);
			var c = this.child(key);
			var $it0 = elems.keys();
			while( $it0.hasNext() ) {
				var n = $it0.next();
				var v = elems.get(n);
				c.set_part(n,v);
			}
			break;
		default:
			this.set_primitive(key,json);
		}
	}
	,set_object: function(key) {
		{
			var _g = this.modelValue;
			switch(_g[1]) {
			case 4:
				var elems = _g[2];
				if(this.onSet != null) this.onSet();
				var value = model.ModelValue.MOBject(new haxe.ds.StringMap());
				return elems.set(key,value);
			default:
			}
		}
	}
	,set_primitive: function(key,val) {
		{
			var _g = this.modelValue;
			switch(_g[1]) {
			case 4:
				var elems = _g[2];
				if(this.onSet != null) this.onSet();
				return elems.set(key,val);
			default:
			}
		}
	}
	,__class__: model.ModelElement
};
Math.NaN = Number.NaN;
Math.NEGATIVE_INFINITY = Number.NEGATIVE_INFINITY;
Math.POSITIVE_INFINITY = Number.POSITIVE_INFINITY;
Math.isFinite = function(i) {
	return isFinite(i);
};
Math.isNaN = function(i1) {
	return isNaN(i1);
};
String.prototype.__class__ = String;
String.__name__ = true;
Array.__name__ = true;
})(typeof window != "undefined" ? window : exports);
