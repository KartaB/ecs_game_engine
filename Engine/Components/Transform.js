import Component from "../System/Component.js";
import Vector2 from "../Structs/Vector2.js";

class Transform extends Component
{
	position = new Vector2()

	shouldTick() {
		return false
	}
}

export default Transform