import {useEffect, useState} from "react";
import {getReservation} from "../../api/tennis/index.js";

export const Tennis = () => {
  const [tennis, setTennis] = useState({});

  useEffect( async () => {
    let reservation = await getReservation({min: 1, max: 10});
    setTennis(reservation);
  }, [])


  return(
    <div>
      <h1>Tennis</h1>
    </div>
  )
}