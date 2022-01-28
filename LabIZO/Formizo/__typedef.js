/**
 * @typedef {(
 *  "text" | "file" | "date" | "daterange" | "textarea"
 *  | "bool" | "number" | "slider" | "rate" | "password"
 *  | "select" | "hidden" | "display" | "custom" | "selectTable"
 * )} formizoFormatType
 * 
 * @typedef {{
 *  label: String | () => String,
 *  name: String,
 *  format: formizoFormatType
 * }} formizoField
 * 
 * @typedef {{
 *  
 * }} formizoBlock
 * 
 * @typedef {[formizoField]} formizoSchema
 */

export default {};