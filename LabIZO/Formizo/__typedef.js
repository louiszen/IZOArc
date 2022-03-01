// eslint-disable-next-line no-unused-vars
import { CSSProperties } from "react";

/**
 * @typedef {"text" | "file" | "date" | "daterange" | "textarea" | "bool" | "number" | "silder" | "rate" | "password" | "select" | "hidden" | "display" | "custom" | "selectTable"} fformats
 * @typedef {"row" | "standard" | "filled" | "outlined"} fvariants
 * @typedef {"required" | "email" | "number" | "plain" | "plainSpace" | "plainAt" | "plainLower" | "boolTrue"} fvalidator
 * @typedef {"star" | "heart" | "emoji" | "number"} frateicons
 * @typedef {"time" | "date" | "datetime" | "week" | "month" | "quarter" | "month" | "year"} fdatetypes
 * @typedef {"compact" | "standard" | "comfortable"} tdensity
 * @typedef {"dropdown" | "checkbox" | "radio"} ffselectStyles
 * @typedef {"switch" | "heart" | "checkbox"} ffboolStyles
 * @typedef {{
 *  cap: String | () => String,
 *  val: String
 * }} ffoptions
 * 
 * @typedef {"table" | "card"} fgarrayStyles
 * @typedef {"header" | "outlined" | "noheader"} fgarrayHeaderStyles
 * @typedef {"header" | "placeholder"} fgarrayAddStyles
 * @typedef {"outlined" | "none"} fgfoldStyles
 * @typedef {"top" | "left" | "right" | "bottom"} fgTabsIconPos
 * @typedef {"center" | "left" | "right"} fgTabsAligns
 * 
 * @typedef {{
 *  label: String | (formValue, addOns) => String,
 *  name: String,
 *  format: fformats,
 *  defaultValue?: *,
 *  variant?: fvariants,
 *  validate?: [fvalidator],
 *  readOnly?: Boolean,
 *  inlineSubmit?: Boolean,
 *  placeholder?: String,
 *  helperText?: String,
 *  fullWidth?: Boolean,
 *  Custom?:  String | (data, field, addOns, _onValueChange: Function) => *,
 *  before?: String | Function,
 *  after?: String | Function,
 *  noLabelGrid?: Boolean,
 * }} ffcommon
 * 
 * @typedef {{
 *  colSpan?: Number
 * }} ffintable
 * 
 * @typedef {{
 *  mask?: String,
 *  alwaysShowMask?: Boolean,
 *  maskChar?: String,
 *  formatChars?: *
 * }} fftext
 * 
 * @typedef {{
 *  accept?: String,
 *  showFilename?: Boolean,
 *  middle?: "Boolean"
 * }} fffile
 * 
 * @typedef {{
 *  rows?: Number,
 *  resizable?: Boolean
 * }} fftextarea
 * 
 * @typedef {{
 *  boolStyle?: ffboolStyles,
 *  noLabel?: Boolean
 * }} ffbool
 * 
 * @typedef {{
 *  min?: Number,
 *  max?: Number,
 *  step?: Number
 * }} ffnumber
 * 
 * @typedef {{
 *  min?: Number,
 *  max?: Number,
 *  step?: Number,
 *  marks?: Boolean
 * }} ffslider
 * 
 * @typedef {{
 *  allowClear?: Boolean,
 *  rateType?: frateicons
 * }} ffrate
 * 
 * @typedef {{
 *  unmaskButton?: Boolean
 * }} ffpassword
 * 
 * @typedef {{
 *  dateFormat?: String,
 *  dateType?: fdatetypes
 *  disabledDate?: (current) => Boolean
 * }} ffdate
 * 
 * @typedef {{
 *  startReadOnly?: Boolean,
 *  endReadOnly?: Boolean,
 *  startEmpty?: Boolean,
 *  endEmpty?: Boolean
 * }} ffdaterange
 * 
 * @typedef {{
 *  multipleSelect?: Boolean,
 *  selectSchema?: [],
 *  selectRef?: String,
 *  selectIdAccessor?: String,
 *  density?: tdensity
 * }} fftableselect
 * 
 * @typedef {{
 *  selectStyle?: ffselectStyles,
 *  selectRef?: String | [ffoptions],
 *  selectCap?: String,
 *  selectCapMod?: (cap) => String,
 *  selectVal?: String,
 *  selectTip?: String,
 *  showTooltip?: Boolean,
 *  selectDisable?: String,
 *  selectDirection?: "column" | "row",
 *  selectAlignment?: "String",
 *  fieldFormat?: []
 * }} ffselect
 * 
 * @typedef {{
 *  accessizo: [ffield | fgroup],
 *  reqAuth?: String,
 *  reqLevel?: null | Number,
 *  reqFunc?: String,
 *  reqGroup?: String,
 *  reqRole?: String
 * }} fgaccess
 * 
 * @typedef {{
 *  label: String,
 *  name: String,
 *  canAdd?: Boolean,
 *  canDelete?: Boolean,
 *  width?: Number,
 *  maxHeight?: Number,
 *  arrayStyle?: fgarrayStyles,
 *  headerStyles?: fgarrayHeaderStyles,
 *  addStyle?: fgarrayAddStyles,
 *  showIndex?: Boolean,
 *  startDisplayIndex?: Number,
 *  reordering?: Boolean,
 *  array: [fitem]
 * }} fgarray
 * 
 * @typedef {{
 *  label?: String,
 *  control?: String,
 *  controlFunc?: (doc, field) => Boolean,
 *  inverse?: Boolean,
 *  foldStyle?: fgfoldStyles,
 *  fold: [fitem],
 *  ignoreValidate?: Boolean
 * }} fgfold
 * 
 * @typedef {{
 *  defaultShow: Boolean,
 *  foldStyle?: fgfoldStyles,
 *  collapse: [fitem]
 * }} fgcollapse
 * 
 * @typedef {{
 *  reqAuth?: String,
 *  reqLevel?: Number,
 *  reqFunc?: String,
 *  reqGroup?: String,
 *  reqRole?: String,
 *  label: String,
 *  icon: Function,
 *  iconPos?:  fgTabsIconPos,
 *  noTransform?: Boolean,
 *  spacing?: Number,
 *  alignment?: fgTabsAligns,
 *  page: [fitem]
 * }} fgtabsSchema
 * 
 * @typedef {{
 *  defaultPage?: String,
 *  disabled?: Boolean,
 *  height?: Number,
 *  width?: Number,
 *  tabs: [fgtabsSchema] | (formValue, addOns) => [fgtabsSchema]
 * }} fgtabs
 * 
 * @typedef {{
 *  width?: Number,
 *  page: [fitem]
 * }} fgcolumnsSchema
 * 
 * @typedef {{
 *  columns: [fgcolumnsSchema] | (formValue, addOns) => [fgcolumnsSchema]
 * }} fgcolumns
 * 
 * @typedef {{
 *  box: [fitem] | (formValue, addOns) => [fitem],
 *  style?: Object
 * }} fgbox
 * 
 * @typedef {{
 *  table: {
 *    header: [[fitem]] | (formValue, addOns) => [[fitem]],
 *    rows: [[fitem]] | (formValue, addOns) => [[fitem]],
 *    rowStyle: CSSProperties,
 *    cellStyle: CSSProperties
 *  }
 * }} fgtable
 * 
 * @typedef {{
 *  header?: String | Function
 * }} fgheader
 * 
 * @typedef {{
 *  inject?: String | Function
 * }} fginject
 * 
 * @typedef {(ffcommon | ffintable) & (fftext | fffile | fftextarea | ffbool | ffnumber | ffslider | ffrate | ffpassword | ffdate | ffdaterange | fftableselect | ffselect)} ffield
 * 
 * @typedef {fginject | fgheader | fgaccess | fgarray | fgfold | fgcollapse | fgtabs | fgcolumns | fgbox | fgtable} fgroup
 * 
 * @typedef {fgroup | ffield | () => fgroup | () => ffield } fitem
 * 
 * @typedef {[
 *  fitem
 * ]} formizoSchema
 */

/**
 * @type {import("IZOArc/LabIZO/Formizo/__typedef").formizoSchema}
 */

export default {};