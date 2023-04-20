export function unixTimestampToLocalTime12Hr(
  unixTimestamp,
  timezoneOffsetSeconds
) {
  const dateObj = new Date(unixTimestamp * 1000);
  return dateFormatter(dateObj, timezoneOffsetSeconds);
}

export function getCurrentLocalTime12Hr(timezoneOffsetSeconds) {
  const dateObj = new Date();
  return dateFormatter(dateObj, timezoneOffsetSeconds);
}

const dateFormatter = (dateObj, timezoneOffsetSeconds) => {
  const offsetMinutes = timezoneOffsetSeconds / 60;
  const localTime = new Date(dateObj.getTime() + offsetMinutes * 60000);

  const hours = localTime.getHours();
  const minutes = padZero(localTime.getMinutes());
  const amPm = hours >= 12 ? "PM" : "AM";

  const hours12 = hours % 12 || 12; // convert 0 to 12

  const timeString = `${padZero(hours12)}:${minutes} ${amPm}`;

  return timeString;
};

function padZero(num) {
  // Pad a single digit number with a leading zero
  return num < 10 ? `0${num}` : num;
}

export const dateRange = (datesArray) => {
  const now = new Date();
  const filteredDates = datesArray?.list?.filter((date) => {
    const dateObject = new Date(date?.dt_txt);
    const dateString = dateObject.toISOString().slice(0, 10);
    const dateString2 = now.toISOString().slice(0, 10);

    // console.log(dateString === dateString2);
    // Filter out dates that are before the current date
    return dateString === dateString2;
  });
  // console.log(filteredDates);
  return filteredDates;
};

export const get12hrTime = (time) => {
  const dateObject = new Date(time);
  let hours = dateObject.getHours();
  // const minutes = dateObject.getMinutes().toString().padStart(2, "0");
  let amOrPm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12 || 12;
  const timeString = `${hours}${amOrPm}`;
  return timeString;
};

export const getFirstItemsOfUniqueFieldValues = (arr, field) => {
  const uniqueValues = [];
  const existingValues = {};
  const firstItems = {};

  for (let i = 0; i < arr.length; i++) {
    const value = arr[i][field];
    const dateObject = new Date(value);
    const dateString = dateObject.toISOString().slice(0, 10);

    if (!existingValues[dateString]) {
      uniqueValues.push(dateString);
      existingValues[dateString] = true;
      firstItems[dateString] = arr[i];
    }
  }

  const result = [];

  for (let i = 0; i < uniqueValues.length; i++) {
    const value = uniqueValues[i];
    result.push(firstItems[value]);
  }

  return result;
};
