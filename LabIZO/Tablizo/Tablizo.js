import React, { Component } from "react";

import PropsType from "prop-types";
import _ from "lodash";
import moment from "moment";
import { DataGrid, GridOverlay, GridToolbarContainer, GridToolbarColumnsButton, GridToolbarFilterButton, GridToolbarDensitySelector, GridToolbarExport } from "@mui/x-data-grid";
import { Box, Typography, Tooltip } from "@material-ui/core";

import CellExpand from "./_gears/CellExpand";

import { StyledLinearProgress, StyledIconButton } from "IZOArc/LabIZO/Stylizo";
import { HStack, Spacer, VStack } from "IZOArc/LabIZO/Stackizo";
import { Accessor, Authority, ColorX, store } from "IZOArc/STATIC";
import { IZOTheme } from "__Base/config";

/**
 * Tablizo - displaying rows of data
 * @augments {Component<Props, State>}
 */
class Tablizo extends Component {
  static propTypes = {
    //container
    height: PropsType.oneOfType([PropsType.number, PropsType.string]),
    width: PropsType.oneOfType([PropsType.number, PropsType.string]),

    //function
    onMounted: PropsType.func,

    //runtime data
    schema: PropsType.array,
    data: PropsType.array,
    loading: PropsType.bool,

    //inline operation
    inlineButtons: PropsType.array,
    inlineButtonsAlign: PropsType.string,
    inlineButtonsOpposite: PropsType.array,

    //listener
    onRowSelected: PropsType.func,
    onFilterChange: PropsType.func,
    onSortChange: PropsType.func,

    //selector
    showSelector: PropsType.bool,
    rowIdAccessor: PropsType.string,
    selectionOnClick: PropsType.bool,

    //pagination
    pagination: PropsType.bool,
    serverSidePagination: PropsType.bool,
    rowCount: PropsType.number,
    onPageChange: PropsType.func,
    onPageSizeChange: PropsType.func,

    //no data overlay
    noRowsOverlay: PropsType.element,

    //pagesize
    defaultPageSize: PropsType.number,
    pageSizeOption: PropsType.arrayOf(PropsType.number),

    //authority
    auth: PropsType.object,
    level: PropsType.number,

    //addOns
    addOns: PropsType.object,

    //preset toolbar
    columnsToolbar: PropsType.bool,
    filterToolbar: PropsType.bool,
    densityToolbar: PropsType.bool,
    exportToolbar: PropsType.bool,

    //preset
    density: PropsType.oneOf(["compact", "comfortable", "standard"]),

    datagridProps: PropsType.object,
  };

  static defaultProps = {
    height: "500px",
    width: "100%",

    onMounted: undefined,

    schema: [],
    data: [],
    loading: false,

    inlineButtons: [],
    inlineButtonsAlign: "left",
    inlineButtonsOpposite: [],

    showSelector: true,
    rowIdAccessor: "_id",
    selectionOnClick: false,

    pagination: true,
    serverSidePagination: false,
    rowCount: undefined,
    onPageChange: () => {},
    onPageSizeChange: () => {},

    noRowsOverlay: undefined,

    defaultPageSize: 50,
    pageSizeOption: [25, 50, 100, 200],

    auth: {},
    level: 999,

    addOns: {},

    columnsToolbar: false,
    filterToolbar: false,
    densityToolbar: false,
    exportToolbar: false,

    density: "standard",

    store: {},
    datagridProps: {},
  };

  constructor() {
    super();
    this.state = {
      selectedRows: [],
    };
  }

  componentDidMount() {
    this._setAllStates();
  }

  componentDidUpdate(prevProps, prevState) {
    if (!Accessor.IsIdentical(prevProps, this.props, Object.keys(Tablizo.defaultProps))) {
      this._setAllStates();
    }
  }

  componentWillUnmount() {
    this.setState = (state, callback) => {
      return;
    };
  }

  _setAllStates = (callback) => {
    this.setState(
      (state, props) => ({
        ...props,
      }),
      () => {
        if (this.props.onMounted) {
          this.props.onMounted({
            GetSelectedRows: this._GetSelectedRows,
            ClearSelected: this._ClearSelected,
            SetSelectedRows: this._SetSelectedRows,
          });
        }
        if (callback) callback();
      }
    );
  };

  _onRowSelected = (params) => {
    let { onRowSelected } = this.props;
    this.setState(
      {
        selectedRows: params,
      },
      () => {
        if (onRowSelected) {
          onRowSelected(params.length);
        }
      }
    );
  };

  _ClearSelected = () => {
    let { onRowSelected } = this.props;
    this.setState(
      {
        selectedRows: [],
      },
      () => {
        if (onRowSelected) {
          onRowSelected(0);
        }
      }
    );
  };

  _onFilterChange = (params) => {
    let { onFilterChange } = this.props;
    this.setState(
      {
        filterModel: params,
      },
      () => {
        if (onFilterChange) {
          onFilterChange();
        }
      }
    );
  };

  _onSortChange = (params) => {
    //onHeaderClick

    let { onSortChange } = this.props;
    let { sortModel } = this.state;
    let field = params.field;

    sortModel = sortModel || [];
    let filtered = sortModel.filter((o) => o.field === field) || [];
    if (filtered.length > 0) {
      let thisSort = filtered[0];
      if (thisSort.sort === "asc") {
        this.setState(
          {
            sortModel: [
              {
                field: field,
                sort: "desc",
              },
            ],
          },
          () => {
            if (onSortChange) {
              onSortChange();
            }
          }
        );
      } else {
        this.setState(
          {
            sortModel: [],
          },
          () => {
            if (onSortChange) {
              onSortChange();
            }
          }
        );
      }
    } else {
      this.setState(
        {
          sortModel: [
            {
              field: field,
              sort: "asc",
            },
          ],
        },
        () => {
          if (onSortChange) {
            onSortChange();
          }
        }
      );
    }
  };

  _SetSelectedRows = (selectedRows) => {
    this.setState({
      selectedRows: selectedRows,
    });
  };

  _GetSelectedRows = (includeDocs = false) => {
    let { data, rowIdAccessor } = this.props;
    let { selectedRows } = this.state;
    if (includeDocs) {
      return _.filter(data, (o) => selectedRows.includes(Accessor.Get(o, rowIdAccessor)));
    }
    return selectedRows;
  };

  _onPageChange = (param) => {
    console.log(param);
    let { onPageChange } = this.props;
    if (onPageChange) {
      onPageChange(param.page);
    }
  };

  _onPageSizeChange = (param) => {
    let { onPageSizeChange } = this.props;
    if (onPageSizeChange) {
      onPageSizeChange(param);
    }
  };

  _defaultButtons = (buttons) => {
    let { auth, level, rowIdAccessor } = this.props;
    let btns = [];
    _.map(buttons, (o, i) => {
      if (Authority.IsAccessible(auth, level, o.reqAuth, o.reqLevel, o.reqFunc)) {
        btns.push({
          headerName: "",
          renderHeader: () => <div />,
          field: "<Button> " + o.caption,
          sortable: false,
          filterable: false,
          disableColumnMenu: true,
          disableClickEventBubbling: true,
          alignment: "center",
          width: 50,
          renderCell: (param) => {
            return (
              <HStack>
                <StyledIconButton
                  theme={o.theme || { label: ColorX.GetColorCSS("pureDark", 0.54) }}
                  disabled={o.disableFunc && o.disableFunc(Accessor.Get(param.row, rowIdAccessor), param.row)}
                  onClick={(e) => {
                    e.stopPropagation();
                    if (o.func) {
                      o.func(Accessor.Get(param.row, rowIdAccessor), param.row);
                    } else {
                      store && store.Alert("Function is not implemented.", "warn");
                    }
                  }}
                >
                  <Tooltip title={o.caption} arrow={true} placement='top'>
                    {o.icon}
                  </Tooltip>
                </StyledIconButton>
              </HStack>
            );
          },
        });
      }
    });

    return btns;
  };

  getSchema = () => {
    let { schema, data, addOns } = this.props;
    if (_.isFunction(schema)) {
      return schema(data, addOns);
    }
    return schema;
  };

  getColumns = () => {
    let { auth, level, addOns, inlineButtons, inlineButtonsOpposite, inlineButtonsAlign, selectionOnClick } = this.props;
    let schema = this.getSchema();
    let cols = _.map(schema, (o, i) => {
      if (Authority.IsAccessible(auth, level, o.reqAuth, o.reqLevel, o.reqFunc)) {
        let renderCell;

        if (!o.Cell && o.transform === "datetime") {
          o.transform = undefined;
          o.Cell = (row, field, addOns) => {
            if (field) {
              return moment(field).format(o.dateFormat || "DD MMM YYYY, HH:mm:ss");
            } else {
              return o.fallback || "N/A";
            }
          };
        }

        if (o.Cell) {
          renderCell = (param) => o.Cell(param.row, Accessor.Get(param.row, o.name), addOns);
        } else {
          renderCell = (param) => <CellExpand value={param.value} width={param.colDef.width} />;
        }

        let renderHeader = undefined;
        let headerName = undefined;
        if (_.isString(o.label)) {
          headerName = o.label;
        } else {
          renderHeader = () => o.label;
        }

        let cellClassName = undefined;
        if (_.isFunction(o.cellClass)) {
          cellClassName = (param) => o.cellClass(param.row, Accessor.Get(param.row, o.name), addOns);
        } else if (_.isString(o.cellClass)) {
          cellClassName = o.cellClass;
        }

        let sortComparator = undefined;
        if (_.isFunction(o.sortComparator)) {
          sortComparator = (v1, v2, param1, param2) => {
            return o.sortComparator(param1.row, param2.row, Accessor.Get(param1.row, o.name), Accessor.Get(param2.row, o.name));
          };
        }

        let valueGetter = (param) => {
          return Accessor.Get(param.row, o.name);
        };

        if (o.valueGetter) {
          valueGetter = (param) => {
            return o.valueGetter(param.row, Accessor.Get(param.row, o.name), addOns);
          };
        }

        let rtn = {
          headerName: headerName,
          renderHeader: renderHeader,
          headerAlign: o.headerAlign || "center",
          headerClassName: o.headerClass,
          field: o.name,
          width: o.width,
          flex: o.width ? undefined : o.flex || 1,
          valueGetter: valueGetter,
          sortable: o.sortable !== false,
          filterable: o.filterable !== false,
          disableColumnMenu: !(o.menu || false),
          type: o.type,
          renderCell: renderCell,
          cellClassName: cellClassName,
          description: o.description,
          autoHeight: o.autoHeight || false,
          disableClickEventBubbling: !selectionOnClick,
          hide: o.hide,
        };

        if (sortComparator) rtn.sortComparator = sortComparator;
        return rtn;
      }
    });
    cols = _.filter(cols, (o) => o);

    //Inline Buttons
    let btns = this._defaultButtons(inlineButtons);

    //Opposite Inline Buttons
    let oppositeBtns = this._defaultButtons(inlineButtonsOpposite);

    let rtn = [];

    if (inlineButtonsAlign === "left") {
      rtn = [...btns, ...cols, ...oppositeBtns];
    } else {
      rtn = [...oppositeBtns, ...cols, ...btns];
    }

    return rtn;
  };

  getSortModel = () => {
    let { auth, level } = this.props;
    let schema = this.getSchema();
    let sortModel = _.map(schema, (o, i) => {
      if (Authority.IsAccessible(auth, level, o.reqAuth, o.reqLevel, o.reqFunc)) {
        if (o.defaultSort) {
          return {
            field: o.name,
            sort: o.defaultSort,
          };
        }
      }
    });
    sortModel = _.filter(sortModel, (o) => o);
    return sortModel;
  };

  CustomToolbar = () => {
    let { columnsToolbar, filterToolbar, densityToolbar, exportToolbar } = this.props;
    return (
      <GridToolbarContainer>
        {columnsToolbar && <GridToolbarColumnsButton />}
        {filterToolbar && <GridToolbarFilterButton />}
        {densityToolbar && <GridToolbarDensitySelector />}
        {exportToolbar && <GridToolbarExport />}
      </GridToolbarContainer>
    );
  };

  GridLoadingOverlay = () => {
    return (
      <GridOverlay>
        <div style={{ position: "absolute", top: 0, width: "100%" }}>
          <StyledLinearProgress theme={{ bar: ColorX.GetColorCSS(IZOTheme.foreground), background: ColorX.GetColorCSS("elainOrangeDark") }} />
        </div>
      </GridOverlay>
    );
  };

  GridNoRowsOverlay = () => {
    return (
      <GridOverlay>
        <VStack>
          <Spacer />
          <Box width='250px'>
            <img src='/Images/data-not-found.svg' alt='nodata' />
          </Box>
          <Typography>Data not found</Typography>
          <Spacer />
        </VStack>
      </GridOverlay>
    );
  };

  render() {
    let { height, width, data, showSelector, rowIdAccessor, pagination, defaultPageSize, pageSizeOption, loading, rowCount, serverSidePagination, density, selectionOnClick, datagridProps } =
      this.props;
    let { sortModel, filterModel, selectedRows } = this.state;
    return (
      <Box height={height} width={width} overflow={"hidden"}>
        <DataGrid
          rows={data}
          disableSelectionOnClick={!selectionOnClick}
          columns={this.getColumns()}
          checkboxSelection={showSelector}
          onSelectionModelChange={this._onRowSelected}
          onFilterModelChange={this._onFilterChange}
          onColumnHeaderClick={this._onSortChange} // Their BUG
          getRowId={(o) => Accessor.Get(o, rowIdAccessor)}
          pageSize={defaultPageSize}
          rowsPerPageOptions={pageSizeOption}
          pagination={pagination}
          loading={loading}
          components={{
            Toolbar: this.CustomToolbar,
            LoadingOverlay: this.GridLoadingOverlay,
            NoRowsOverlay: this.GridNoRowsOverlay,
          }}
          paginationMode={serverSidePagination ? "server" : "client"}
          onPageChange={this._onPageChange}
          onPageSizeChange={this._onPageSizeChange}
          rowCount={rowCount}
          density={density}
          selectionModel={selectedRows || []}
          sortModel={sortModel || this.getSortModel()}
          filterModel={filterModel}
          disableColumnReorder={true}
          {...datagridProps}
        />
      </Box>
    );
  }
}

export default Tablizo;
