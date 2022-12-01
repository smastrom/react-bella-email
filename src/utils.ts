export function cleanValue(value: string) {
	return value.replace(/\s+/g, '').toLowerCase();
}

export function isValidArr(maybeArr: unknown) {
	return Array.isArray(maybeArr) && maybeArr.length > 0;
}

export function isInvalid(value: unknown) {
	return typeof value !== 'string';
}

export function getUniqueId() {
	return (Math.random() + 1).toString(36).substring(7);
}

export function getHonestValue(value: unknown, maxValue: number, defaultValue: number) {
	if (typeof value === 'number' && Number.isInteger(value) && value <= maxValue) {
		return value;
	}
	return defaultValue;
}

export function isFn(fn: unknown) {
	return typeof fn === 'function';
}

export function setUserEvents<T>(target: Partial<T>, events: { [Key in keyof T]: T[Key] }) {
	for (const eventName in events) {
		if (isFn(events[eventName])) {
			target[eventName] = events[eventName];
		}
	}
}
