package model;

import Type.ValueType;

@:expose
enum ModelValue {
	MNull;
	MString(v : String);
	MNumber(v : Int);
	MBoolean(v : Bool);
	MOBject(elems : Map<String, ModelValue>);
	MArray(v : Array<ModelValue>);
}

@:expose
class ModelElement {

	private var modelValue:ModelValue;
	private var onSet : Void->Void;

	public function new(?modelValue : ModelValue) {
		this.modelValue = modelValue;
	}

	public function child(key:String):ModelElement {
		return switch(modelValue) {
			case MOBject(elems):
				new ModelElement(elems.get(key));
			default:
		}
	}

	public function val():Dynamic {
		return switch(modelValue) {
			case MString(v):
				v;
			case MNumber(v):
				v;
			case MBoolean(v):
				v;
			default:
		}
	}

	public function get():ModelValue {
		return null;
	}

	public function find() {
		return null;
	}

	public function push() {
		return null;
	}

	public function set(key:String, val:Dynamic) {
		set_part(key, from_part(val));
	}

	public function remove() {
		return null;
	}

	public function on(event, onSet) {
		this.onSet = onSet;
		return null;
	}

	public function set_part(key:String, json:ModelValue) {
		switch(json) {
			case MOBject(elems):
				this.set_object(key);
				var c = this.child(key);
				for (n in elems.keys()) {
					var v = elems[n];
					c.set_part(n, v);
				}
			default:
				this.set_primitive(key, json);
		}
	}

	public function set_object(key:String) {
		return switch(modelValue) {
			case MOBject(elems):
				if(this.onSet != null) this.onSet();
				elems.set(key, ModelValue.MOBject( new Map<String, model.ModelValue>() ));
			default:
		}
	}

	public function set_primitive(key:String, val:ModelValue) {
		return switch(modelValue) {
			case MOBject(elems):
				if(this.onSet != null) this.onSet();
				elems.set(key, val);
			default:
		}
	}

	public static function from_part(json:Dynamic):ModelValue {
		switch(Type.typeof(json)) {
			case ValueType.TObject:
				var o = new Map<String, ModelValue>();
				for (n in Reflect.fields(json)) {
					var v = Reflect.field(json, n);
					o.set(n, from_part(v));
				}
				return ModelValue.MOBject(o);
			case ValueType.TInt:
				return ModelValue.MNumber(json);
			default:
				return ModelValue.MString(json);
		}
	}

	public static function from(json:Dynamic):ModelElement {
		return new ModelElement(from_part(json));
	}
}
