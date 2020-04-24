import React from 'react'

const FormatDate = (date) => {
  let diff = new Date() - date; // разница в миллисекундах
  if (diff < 1000) { // менее 1 секунды
    return 'right now';
  }

  let sec = Math.floor(diff / 1000); // преобразовать разницу в секунды
  if (sec < 60) {
    return `${sec} sec. ago`;
  }

  let min = Math.floor(diff / 60000); // преобразовать разницу в минуты
  if (min < 60) {
    return `${min} sec. ago`;
  }

  let dd = date.getDate();
  if (dd < 10) dd = `0${dd}`;

  let mm = date.getMonth() + 1;
  if (mm < 10) mm = `0${mm}`;

  let yy = date.getFullYear() % 100;
  if (yy < 10) yy = `0${yy}`;

  let hours = date.getHours();
  if (hours < 10) hours = `0${hours}`;

  let minutes = date.getMinutes();
  if (minutes < 10) minutes = `0${minutes}`;

  let seconds = date.getSeconds();
  if (seconds < 10) seconds = `0${seconds}`;

  return `${dd}.${mm}.${yy} ${hours}:${minutes}:${seconds}`;
}



const ShowTask = ({taskName, timeCreateTask, timeChangeTask, description}) => {
  const timeCreate = timeCreateTask && FormatDate(new Date(timeCreateTask));
  const timeChange = timeChangeTask && FormatDate(new Date(timeChangeTask));
  return (
    <ul className="list">
      <li className="item">
        {taskName ? taskName : 'no'}
      </li>
      {timeCreateTask ? <li className="item">{timeCreate ? `Registration task: ${timeCreate}` : timeCreate}</li> : null}
      {timeChangeTask ? <li className="item">{timeChange ? `Change task: ${timeChange}` : timeChange}</li> : null}
      {description ? <li className="item">{description ? `Description task: ${description}` : description}</li> : null}
    </ul>
    )
}

export default ShowTask