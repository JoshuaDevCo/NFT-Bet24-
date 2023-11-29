import axios from "axios";

const token = sessionStorage.getItem("token");

export const API = axios.create({
  // baseURL:"https://battlemoney-match-api.nakshtech.info/", 
  baseURL:"https://nft-betting-api.nakshtech.info/",
  headers: { authorization: token }
  // Insert or 
})

export const API_Match = axios.create({
  //baseURL:"https://bet24-api-new.nakshtech.info/",
  baseURL:"https://bet24-api-new.nakshtech.info/",  
  headers: { authorization: token }
  //  Socket API
})