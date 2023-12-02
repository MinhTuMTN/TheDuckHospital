import React from "react";

function FormatDateTime(props) {
  const { dateTime } = props;
  const date = new Date(dateTime);
  const options = {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  };
  const transformedDate = date.toLocaleDateString('en-GB', options);
  return <>{transformedDate.replace(",", "")}</>;
}

export default FormatDateTime;
