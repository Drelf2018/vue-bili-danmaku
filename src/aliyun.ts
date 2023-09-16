import axios from 'axios'

const aliyun = axios.create({
  baseURL: 'https://aliyun.nana7mi.link/'
})

export default aliyun

export async function request(url: string, max_age: number = -1) {
  let res = await aliyun.get(url, { params: { max_age: max_age } })
  if(res.data.code != 0) throw res.data.data
  return res.data.data
}

export async function get_user_info(uid: string | number, max_age: number = -1) {
  return await request(`/user.User(${uid}).get_user_info()`, max_age)
}

export async function get_user_face(uid: string | number, max_age: number = -1) {
  return await request(`/user.User(${uid}).get_user_info().face`, max_age)
}

export async function get_room_info(roomid: string | number, max_age: number = -1) {
  return await request(`/live.LiveRoom(${roomid}).get_room_info()`, max_age)
}

export async function get_chat_conf(roomid: string | number, max_age: number = -1) {
  return await request(`/live.LiveRoom(${roomid}).get_chat_conf()`, max_age)
}

export async function get_chat_host(roomid: string | number, max_age: number = -1) {
  return await request(`/live.LiveRoom(${roomid}).get_chat_conf().host`, max_age)
}

export async function get_token(roomid: string | number) {
  return await request(`/laplace?roomid=${roomid}`)
}