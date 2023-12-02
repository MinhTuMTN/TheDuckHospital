import React from "react";

function FormatDate(props) {
  const { dateTime } = props;
  const date = new Date(dateTime);
  const options = {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  };
  const transformedDate = date.toLocaleDateString('en-GB', options);
  return <>{transformedDate.replace(",", "")}</>;
}

export default FormatDate;
