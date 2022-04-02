class FrameScore {
	constructor(public value: number, public shortage: number) {}

	public valueOf() {
		return this.value;
	}
}

class Frame {
	protected readonly points: number[] = [];

	public push(pins: number): void {
		this.points.push(pins);
	}

	public isCompleted(): boolean {
		return this.isStrike() || this.points.length === 2;
	}

	public isStrike() {
		return this.calculate(1).value === 10;
	}

	public isSpare() {
		const { value, shortage } = this.calculate(2);

		return shortage >= 0 && value === 10;
	}

	public calculate(limit = this.points.length): FrameScore {
		const value = this.points.slice(0, limit).reduce((sum, pins) => {
			return sum += pins;
		}, 0);

		return new FrameScore(value, this.points.length - limit);
	}
}

class LastFrame extends Frame {
	public isCompleted(): boolean {
		if (this.isStrike() || this.isSpare()) {
			return this.points.length === 3;
		}

		return  this.points.length === 2;
	}
}

export class BowlingRumble {
	private static readonly FRAMES_TO_COMPLETE = 10;
	private readonly line: Frame[] = [];

	public throw(pins: number): void {
		this.takeCurrentFrame().push(pins);
	}

	private takeCurrentFrame(): Frame {
		let frame = this.rewind(1);

		if (!frame || frame.isCompleted()) {
			this.line.push(frame = this.length() === 9 ? new LastFrame() : new Frame());
		}

		return frame;
	}

	private rewind(amount: number): Frame | undefined {
		return this.line[this.length() - amount];
	}

	public showScore(): number {
		return this.line.reduce((total, frame, i, self) => {
			const prevFrame = self[i - 1];
			
			if (prevFrame?.isSpare()) {				
				total += Number(frame.calculate(1));
			};

			if (prevFrame?.isStrike()) {
				const { value, shortage } = frame.calculate(2);

				total += value;

				if (shortage < 0) {
					const nextFrame = self[i + 1];

					total += Number(nextFrame.calculate(1));
				}
			}

			return total += Number(frame.calculate());
		}, 0);
	}

	public showPosition(): number {
		return this.line.filter(frame => frame.isCompleted()).length;
	}

	private length(): number {
		return this.line.length;
	}

	public isCompleted(): boolean {
		return this.length() === BowlingRumble.FRAMES_TO_COMPLETE 
			&& this.line.every(frame => frame.isCompleted());
	}
}