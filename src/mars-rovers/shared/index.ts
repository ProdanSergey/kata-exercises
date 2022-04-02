/* istanbul ignore file */

export enum Direction {
	NORTH = 'N',
	WEST = 'W',
	SOUTH = 'S',
	EAST = 'E'
}

export const DirectionMap = {
	[Direction.NORTH]: {
		left: Direction.WEST,
		right: Direction.EAST,
		opposite: Direction.SOUTH
	},
	[Direction.SOUTH]: {
		left: Direction.EAST,
		right: Direction.WEST,
		opposite: Direction.NORTH
	},
	[Direction.WEST]: {
		left: Direction.SOUTH,
		right: Direction.NORTH,
		opposite: Direction.EAST
	},
	[Direction.EAST]: {
		left: Direction.NORTH,
		right: Direction.SOUTH,
		opposite: Direction.WEST
	}
}

export enum Command {
	LEFT = 'L',
	RIGHT = 'R',
	MOVE = 'M',
}