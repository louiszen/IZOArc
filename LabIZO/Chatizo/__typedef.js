// eslint-disable-next-line no-unused-vars
import { CSSProperties } from "react";
// eslint-disable-next-line no-unused-vars
import moment from "moment";

/**
 * @typedef {Object.<string, CSSProperties>} style
 * @typedef {style | Object.<string, CSSProperties | style>} tstyle
 */

/**
 * @typedef {{
 *   cmd: String,
 *   desc: String | {
 *    EN: String,
 *    TC: String
 *   }
 * }} cmd
 */

/**
 * @typedef {{
 *  text?: String,
 *  imgSrc?: String,
 *  videoSrc?: String,
 *  fileSrc?: String,
 *  replyMsgID?: String
 * }} cinput
 */

/**
 * @typedef {"pending" | "sent" | "received" | "read" | "error"} msgstatus
 * @typedef {"web" | "phone" | "postback"} btntype
 * 
 * @typedef {{
 *  image: String | Function,
 *  title: String | Function,
 *  payload: String | Function,
 *  type?: btntype,
 *  showText?: Boolean
 * }} imgbutton
 * 
 * @typedef {{
 *  title: String | Function,
 *  payload: String | Function,
 *  type?: btntype,
 *  color?: String
 * }} button
 * 
 * @typedef {{
 *  title: String | Function,
 *  payload: String | Function,
 *  type?: btntype,
 *  color?: String
 * }} quickReply
 * 
 * @typedef {{
 *  src: String | Function,
 *  poster?: String | Function,
 *  style?: CSSProperties
 * }} video
 * 
 * @typedef {{
 *  src: String | Function,
 *  style?: CSSProperties
 * }} image
 * 
 * @typedef {{
 *  _id: String,
 *  title?: String | Function,
 *  subtitle?: String | Function,
 *  image?: image,
 *  video?: video,
 *  text?: String | Function,
 *  buttons?: [button]
 * }} template
 * 
 * @typedef {{
 *  system?: String | Function,
 *  text?: String | Function,
 *  image?: image | [image],
 *  audio?: audio,
 *  video?: video | [video],
 *  quickReplies?: [quickReply],
 *  buttons?: [button],
 *  imgButtons?: [imgbutton]
 *  templates?: [template]
 * }} msg
 * 
 * @typedef {{
 *  ID: String,
 *  name: String,
 *  avatar: String
 * }} msguser
 * 
 * @typedef {{
 *  cap: String | Function,
 *  val: String
 * }} aclib
 * 
 * @typedef {{
 *  autoComplete: String | [aclib]
 * }} msgnext
 * 
 * @typedef {{
 *  _id: String,
 *  createdAt: moment.Moment,
 *  lapseTime: Number,
 *  status: msgstatus,
 *  user: msguser,
 *  msg: msg,
 *  next?: msgnext
 * }} msgblock
 */

/**
 * @type {import("IZOArc/LabIZO/Chatizo/__typedef").msgblock}
 */

export default {};