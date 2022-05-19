import { timeStamp } from "./timestamp";

describe("Timestamp Util", () => {
  it.each([
    {
      date: new Date(),
      formattedString: "19/05/2022",
    },
    {
      date: new Date(new Date().setDate(9)),
      formattedString: "09/05/2022",
    },
    {
      date: new Date(new Date().setMonth(9)),
      formattedString: "19/10/2022",
    },
  ])(`should get date and return $formattedString`, ({ date, formattedString }) => {
    expect(timeStamp(date)).toBe(formattedString);
  });
});