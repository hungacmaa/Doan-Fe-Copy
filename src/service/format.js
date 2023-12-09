import {format} from "date-fns";

const formatDate = (date) => {
  return format(new Date(date), "dd/MM/yyyy");
}

const formatDateTimeMessage = (dateString) => {
  let now = new Date();
  let date = new Date(dateString);
  let hours = date.getHours()
  let minutes = (date.getMinutes() < 10 ? '0' : '') + date.getMinutes();
  let dates = (date.getDate() < 10 ? '0' : '') + date.getDate();
  let months = (date.getMonth() + 1 < 10 ? '0' : '') + (date.getMonth() + 1);
  let years = date.getFullYear();
  if (years === now.getFullYear()){
    if (date.getMonth() === now.getMonth() && date.getDate() === now.getDate())
      return `${hours}:${minutes}`;
    else
      return `${hours}:${minutes}, ${dates}/${months}`;
  }
  return `${hours}:${minutes}, ${dates}/${months}/${years}`;
}

export {formatDate, formatDateTimeMessage};