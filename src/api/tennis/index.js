import {Get, Post} from "../../utils/axios.js";
import {GET_RESERVATION} from "./url.js";

// 예약현황 조회
export const getReservation = async (data) => {
  return await Get(GET_RESERVATION);
}