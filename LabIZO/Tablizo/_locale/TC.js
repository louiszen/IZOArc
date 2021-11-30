let localText = {
  // 根
  noRowsLabel: "無行",
  noResultsOverlayLabel: "沒有找到結果。",
  errorOverlayDefaultLabel: "發生錯誤。",

  // 密度選擇器工具欄按鈕文本
  toolbarDensity:"密度",
  toolbarDensityLabel:"密度",
  toolbarDensityCompact:"緊湊",
  toolbarDensityStandard:"標準",
  toolbarDensityComfortable: "舒適",

  // 列選擇器工具欄按鈕文本
  toolbarColumns:"列",
  toolbarColumnsLabel: "選擇列",

  // 過濾工具欄按鈕文本
  toolbarFilters:"篩選",
  toolbarFiltersLabel: "顯示篩選",
  toolbarFiltersTooltipHide: "隱藏篩選",
  toolbarFiltersTooltipShow: "顯示篩選",
  toolbarFiltersTooltipActive: (count) => 
    count !== 1 ? `${count} 個項目篩選`:`${count} 個項目篩選`,

  // 導出選擇器工具欄按鈕文本
  toolbarExport:"導出",
  toolbarExportLabel:"導出",
  toolbarExportCSV: "下載為 CSV",
  toolbarExportPrint: "打印",

  // 列面板文本
  columnsPanelTextFieldLabel: "查找列",
  columnsPanelTextFieldPlaceholder: "列標題",
  columnsPanelDragIconLabel: "重新排列列",
  columnsPanelShowAllButton: "顯示全部",
  columnsPanelHideAllButton: "隱藏全部",

  // 過濾面板文本
  filterPanelAddFilter: "添加篩選",
  filterPanelDeleteIconLabel: "刪除",
  filterPanelOperators: "運算符",
  filterPanelOperatorAnd: "And",
  filterPanelOperatorOr: "或",
  filterPanelColumns: "列",
  filterPanelInputLabel: "值",
  filterPanelInputPlaceholder: "篩選值",

  // 過濾操作符文本
  filterOperatorContains: "包含",
  filterOperatorEquals: "等於",
  filterOperatorStartsWith: "開始於",
  filterOperatorEndsWith: "結束於",
  filterOperatorIs: "是",
  filterOperatorNot: "不是",
  filterOperatorAfter: "在之後",
  filterOperatorOnOrAfter: "在或之後",
  filterOperatorBefore: "是之前",
  filterOperatorOnOrBefore: "在或之前",
  filterOperatorIsEmpty: "為空",
  filterOperatorIsNotEmpty: "不為空",

  // 過濾值文本
  filterValueAny: "任何",
  filterValueTrue: "真",
  filterValueFalse: "假",

  // 列菜單文本
  columnMenuLabel: "菜單",
  columnMenuShowColumns: "顯示列",
  columnMenuFilter: "篩選",
  columnMenuHideColumn: "隱藏",
  columnMenuUnsort: "取消排序",
  columnMenuSortAsc: "按 ASC 排序",
  columnMenuSortDesc: "按 DESC 排序",

  // 列標題文本
  columnHeaderFiltersTooltipActive: (count) =>
    count !== 1 ? `${count} 個項目篩選`:`${count} 個項目篩選`,
  columnHeaderFiltersLabel: "顯示過篩選",
  columnHeaderSortIconLabel: "排序",

  // 行選中的頁腳文本
  footerRowSelected: (count) =>
    count !== 1
      ? `${count.toLocaleString()} 行被選中`
      :`${count.toLocaleString()} 行被選中`,

  // 總行腳註文本
  footerTotalRows: "總行數:",

  // 總可見行頁腳文本
  footerTotalVisibleRows: (visibleCount, totalCount) =>
    `${visibleCount.toLocaleString()} 的 ${totalCount.toLocaleString()}`,

  // 複選框選擇文本
  checkboxSelectionHeaderName: "複選框選擇",

  // 布爾單元格文本
  booleanCellTrueLabel: "真",
  booleanCellFalseLabel: "假",

  // 操作單元格更多文本
  actionsCellMore: "更多",

  // 使用核心組件翻譯鍵
  MuiTablePagination: {},
};

export default localText;