const prependALeadingZero = (digit: number): string => {
  return String(digit).padStart(2, "0");
}

export const timeStamp = (date: Date): string => {
  return [prependALeadingZero(date.getDate()), prependALeadingZero(date.getMonth() + 1), date.getFullYear()].join("/")
};