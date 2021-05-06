import Vector2 from "../Structs/Vector2.js"
import Canvas from "./Canvas.js"
import Images from "./Images.js"

class Animation
{
    #actionField

    constructor() {
        this.ActionsList = {}

        this.Frame = 0
        this.CurrentFrameCount = 0

        this.Position = new Vector2()
        this.Dimensions = new Vector2(150, 150)
        this.CanvasName = "debug"
        this.ImageName = ""

        this.Angle = 0
        this.Scale = 1
    }

    AddAction(_data = {}) {
        const { name, frames = 1, index = 0, frameCount = 1, repeat = true, jumpTo = null } = _data
        
        this.ActionsList = { ...this.ActionsList,
            [name]: {
                Frames: frames,
                Index: index,
                FrameCount: frameCount,
                Repeat: repeat,
                JumpTo: jumpTo
            }
        }
    }

    set Action(_action) {
        if (this.Action == _action) return

        this.RestartAction(_action)
    }

    get Action() {
        return this.#actionField
    }

    RestartAction(_action = this.Action) {
        this.#actionField = _action
        this.CurrentFrameCount = 0
        this.Frame = 0
    }

    GetActionData(_action) {
        return this.ActionsList[_action]
    }

    Draw() {
        if (this.Action == null || this.Action == "") return;

        const {Frames, Index, FrameCount, Repeat, JumpTo} = this.GetActionData(this.Action)

        if (this.CurrentFrameCount >= FrameCount) {
            this.CurrentFrameCount = 0
            this.Frame++
        }

        if (this.Frame >= Frames) {
            this.Frame = 0

            if (Repeat == false && JumpTo == null) {
                this.Action = ""
                return
            }

            if (Repeat == false && JumpTo != null) {
                this.Action = JumpTo
            }
        }

        const clipStartOffset = new Vector2(this.Dimensions.x * this.Frame, this.Dimensions.y * Index)
        const data = { scale: this.Scale, dimensions: this.Dimensions, clipStart: clipStartOffset, clipDimensions: this.Dimensions }

        Canvas.GetByName(this.CanvasName).DrawImage(Images.GetImage(this.ImageName), this.Position, data)

        this.CurrentFrameCount++;
    }
}

export default Animation