import { useEffect } from "react";
import { useState } from "react";

const CountDown = (props) => {
  const [count, setCount] = useState(300);

  function toHHMMSS(seconds) {
    var h,
      m,
      s,
      result = "";
    // HOURs
    h = Math.floor(seconds / 3600);
    seconds -= h * 3600;
    if (h) {
      result = h < 10 ? "0" + h + ":" : h + ":";
    }
    // MINUTEs
    m = Math.floor(seconds / 60);
    seconds -= m * 60;
    result += m < 10 ? "0" + m + ":" : m + ":";
    // SECONDs
    s = seconds % 60;
    result += s < 10 ? "0" + s : s;
    return result;
  }

  useEffect(() => {
    if (count === 0) {
      props.onTimeUp();
      return;
    }

    const timer = setInterval(() => {
      setCount(count - 1);
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, [count]);

  return (
    <>
      <div className="countdown-container">{toHHMMSS(count)}</div>
    </>
  );
};

export default CountDown;
