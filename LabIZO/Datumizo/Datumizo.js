import React, { Component } from "react";

import PropsType from "prop-types";
import _ from "lodash";
import axios from "axios";
import fileDownload from "js-file-download";
import { Add, CloudDownload, CloudUpload, Delete, DeleteForever, Edit, GetApp, InfoOutlined, Publish, Assessment} from "@material-ui/icons";
import { ContentCopy } from '@mui/icons-material';
import { Box, Slide, Typography } from "@material-ui/core";

import { IZOTheme, DOMAIN } from "__Base/config";
import Inner from "./_gears/Inner";

import Formizo from "IZOArc/LabIZO/Formizo";
import Tablizo from "IZOArc/LabIZO/Tablizo";
import { HStack, Spacer, VStack } from "IZOArc/LabIZO/Stackizo";
import { Accessor, Authority, ColorX, ErrorX, store } from "IZOArc/STATIC";
import { StyledButton } from "IZOArc/LabIZO/Stylizo";

/**
 * Datumizo - display documents with tables and controls
 * @augments {Component<Props, State>}
 */
class Datumizo extends Component {
  /**
   * base: {
   *  exportDoc?: String,
   *  rowIdAccessor?: String,
   *  reqAuth?: String,
   *  showSelector?: Boolean,
   * 
   *  noDefaultButtons?: false,
   *  noDefaultTable?: false,
   * 
   *  tablizo: {
   *    columnsToolbar?: Boolean,
   *    filterToolbar?: Boolean,
   *    densityToolbar?: Boolean,
   *    exportToolbar?: Boolean,
   *    density?: "standard" | "compact" | "comfortable",
   *    defaultPageSize?: Number,
   *  },
   * 
   *  formizo: {
   * 
   *  },
   *
   *  Connect: {
   *    DBInfo: String,
   *    List: String,
   *    schema: [schema]
   *  },
   *
   *  operations: {
   *    [Row]: {
   *      title: String | (id, row) => String,
   *      content?: String | (id, row) => String,
   *      url?: String,
   *      success?: String,
   *      fail?: String,
   *      schema?: [schema],
   *      buttons?: [String],
   *      readOnly?: Boolean,
   *      onSubmit?: String | (formProps) => Void,
   *      Custom?: function (_, _, onQuit, onQuitRefresh, renderFormizo, addOns) => JSX,
   *      QuitReload?: Boolean | false,
   *      onSuccess?: (payload) => {},
   *      onFail?: (payload) => {},
   *      withFile?: Boolean
   *    },
   *    [Bulk]: {
   *      title: String | (n) => String,
   *      content?: String | (n) => String,
   *      url?: String,
   *      success?: String,
   *      fail?: String,
   *      schema?: [schema],
   *      buttons?: [String],
   *      readOnly?: Boolean,
   *      onSubmit?: String | (formProps) => Void,
   *      Custom?: function (_, _, onQuit, onQuitRefresh, renderFormizo, addOns) => JSX,
   *      QuitReload?: Boolean | false,
   *      onSuccess?: (payload) => {},
   *      onFail?: (payload) => {}
   *    }
   *  },
   *
   *  buttons: {
   *    inline: [
   *      {
   *        caption: String,
   *        icon: String | JSX,
   *        func: String | Function | Object, //(id, row) => {}
   *        reqLevel: Number,
   *        reqFunc: String,
   *        theme: Object,
   *        disableFunc: (id, row) => Boolean
   *      }
   *    ],
   *    inlineOpposite: [
   *      {
   *        caption: String,
   *        icon: String | JSX,
   *        func: String | Function | Object, //(id, row) => {}
   *        reqLevel: Number,
   *        reqFunc: String
   *      }
   *    ],
   *    left: [],
   *    right: []
   *  },
   *
   * }
   *
   * // Button Object
   * {
   *    onClick: (id?, row?) => {},
   *    onSubmit: async (formProps) => {},
   *    onSuccess: (res) => {},
   *    onFail: (res) => {}
   * }
   */

  static operationsPropsType = {
    title: PropsType.oneOfType([PropsType.string, PropsType.object, PropsType.func]),
    content: PropsType.oneOfType([PropsType.string, PropsType.object, PropsType.func]),
    url: PropsType.oneOfType([PropsType.string, PropsType.object, PropsType.func]),
    success: PropsType.oneOfType([PropsType.string, PropsType.object, PropsType.func]),
    fail: PropsType.oneOfType([PropsType.string, PropsType.object, PropsType.func]),
    schema: PropsType.arrayOf(PropsType.oneOfType([PropsType.string, PropsType.object, PropsType.func, PropsType.array])),
    buttons: PropsType.arrayOf(PropsType.string),
    readOnly: PropsType.bool,
    onSubmit: PropsType.oneOfType([PropsType.string, PropsType.func, PropsType.object]),
    Custom: PropsType.func,
    QuitReload: PropsType.bool, 
    onSuccess: PropsType.func,
    onFail: PropsType.func,
    withFile: PropsType.bool,
    defaultDoc: PropsType.oneOfType([PropsType.string, PropsType.func, PropsType.object]),
  };

  static buttonPropsType = {
    caption: PropsType.oneOfType([PropsType.string, PropsType.object, PropsType.func]),
    icon: PropsType.oneOfType([PropsType.string, PropsType.object]),
    func: PropsType.oneOfType([PropsType.string, PropsType.object, PropsType.func]),
    reqLevel: PropsType.string,
    reqFunc: PropsType.string,
    theme: PropsType.oneOfType([PropsType.string, PropsType.object, PropsType.func]),
    disableFunc: PropsType.func // (id, row) => Boolean
  }

  static propTypes = {
    //config
    base: PropsType.shape({
      exportDoc: PropsType.string,
      rowIdAccessor: PropsType.string,
      reqAuth: PropsType.string,
      showSelector: PropsType.bool,
      noDefaultButtons: PropsType.bool,
      noDefaultTable: PropsType.bool,

      tablizo: PropsType.shape({
        ...Tablizo.propTypes
      }),

      formizo: PropsType.shape({
        ...Formizo.propTypes
      }), 

      operations: PropsType.objectOf(PropsType.shape(this.operationsPropsType)),
      
      buttons: PropsType.shape({
        inline: PropsType.arrayOf(PropsType.shape(this.buttonPropsType)),
        inlineOpposite: PropsType.arrayOf(PropsType.shape(this.buttonPropsType)),
        left: PropsType.arrayOf(PropsType.shape(this.buttonPropsType)),
        right: PropsType.arrayOf(PropsType.shape(this.buttonPropsType)),
      })

    }),
    inject: PropsType.oneOfType([PropsType.func, PropsType.object]),
    addOns: PropsType.object,
    onMounted: PropsType.func,
    onQuitInner: PropsType.func,
    onLoad: PropsType.func,
    onDataChange: PropsType.func,

    //settings
    serverSidePagination: PropsType.bool,
    refreshOnPageChange: PropsType.bool,
  };

  static defaultProps = {
    base: {},
    inject: null,
    addOns: {},
    onMounted: undefined,
    onQuitInner: undefined,
    onLoad: undefined,
    onDataChange: undefined,

    serverSidePagination: false,
    refreshOnPageChange: false,
  };

  constructor() {
    super();
    this.state = {
      table: {
        data: [],
        loading: false,
      },
      nav: {
        pageSize: 50,
        curPage: 0,
        totalEntries: 0,
        inQuery: false,
        hasNextPage: false,
        selector: {},
      },
      inlineButtons: [],
      inlineButtonsOpposite: [],

      inEdit: false,
      mode: "",
      doc: {},
      docID: null,
      selectedrows: 0,
    };
  }

  componentDidMount() {
    this._setAllStates(() => {
      this._setInlineButtons();
      this._setInlineButtonsOpposite();
      this._fetchData();
      
      let {base} = this.props;
      if(base.tablizo && base.tablizo.defaultPageSize){
        this._onPageSizeChange(base.tablizo.defaultPageSize);
      }

    });
  }

  componentDidUpdate(prevProps, prevState) {
    if (!Accessor.IsIdentical(prevProps, this.props, Object.keys(Datumizo.defaultProps))) {
      this._setAllStates();
    }
  }

  componentWillUnmount() {
    this.setState = (state, callback) => {
      return;
    };
  }

  onMountTablizo = (callbacks) => {
    this.MountTablizo = callbacks;
  };

  _setAllStates = (callback) => {
    this.setState(
      (state, props) => ({
        ...props,
      }),
      () => {
        if (this.props.onMounted) {
          this.props.onMounted({
            Reload: this._fetchData,
            GetData: this._getData,
            GetDoc: this._getDoc,
            GetDocID: this._getDocID,
            CustomInner: this._CustomInner,
            QuitInner: this._QuitInner,
            SoftReload: this._SoftReload,
            GetSelectedRows: this._GetSelectedRows,
            Add: this.Add.onClick,
            Delete: this.Delete.onClick, //inline
            Edit: this.Edit.onClick, //inline
            Info: this.Info.onClick, //inline
            DeleteBulk: this.DeleteBulk.onClick,
            Import: this.Import.onClick,
            Export: this.Export.onClick,
          });
        }
        if (callback) callback();
      }
    );
  };

  _GetSelectedRows = () => {
    if (this.MountTablizo) {
      return this.MountTablizo.GetSelectedRows();
    }
    return [];
  };

  _CustomInner = (mode, docID = undefined, doc = undefined) => {
    this.setState((state, props) => ({
      inEdit: true,
      mode: mode,
      docID: docID || state.docID,
      doc: doc || state.doc,
    }));
  };

  _getDocID = () => {
    return this.state.docID;
  }

  _fetchData = () => {
    let { serverSidePagination, onLoad } = this.props;
    this.setState(
      {
        loading: true,
      },
      async () => {
        if (serverSidePagination) {
          await this.Connect.DBInfo();
        }
        await this.Connect.Data();
        if (onLoad) onLoad();
      }
    );
  };

  _SoftReload = (docID) => {
    this.Connect.Get(docID);
  };

  _getData = () => {
    return this.state.table.data;
  };

  _getDoc = (docID) => {
    let { base } = this.props;
    let data = this.state.table.data;
    let filtered = data.filter((o) => Accessor.Get(o, base.rowIdAccessor || "_id") === docID);
    if (filtered.length === 1) return filtered[0];
    return null;
  };

  _onRowSelected = (n) => {
    this.setState({
      selectedrows: n || 0,
    });
  };

  _onPageChange = (page) => {
    let { serverSidePagination, refreshOnPageChange } = this.props;
    this.setState(
      (state, props) => ({
        nav: {
          ...state.nav,
          curPage: page,
        },
      }),
      () => {
        if (serverSidePagination || refreshOnPageChange) {
          this._fetchData();
        }
      }
    );
  };

  _onPageSizeChange = (pageSize) => {
    let { serverSidePagination, refreshOnPageChange } = this.props;
    this.setState(
      (state, props) => ({
        nav: {
          ...state.nav,
          pageSize: pageSize,
        },
      }),
      () => {
        if (serverSidePagination || refreshOnPageChange) {
          this._fetchData();
        }
      }
    );
  };

  _QuitInner = (id) => {
    let { onQuitInner } = this.props;
    this.setState(
      {
        inEdit: false,
        docID: null,
        doc: {},
      },
      () => {
        if (onQuitInner) onQuitInner(id);
      }
    );
  };

  _QuitAndFetch = (id) => {
    let { onQuitInner } = this.props;
    this.setState(
      {
        inEdit: false,
        docID: null,
        doc: {},
      },
      () => {
        if (onQuitInner) {
          onQuitInner(id, () => {
            this._fetchData();
          });
        } else {
          this._fetchData();
        }
      }
    );
  };

  _setInlineButtons = () => {
    let { base } = this.state;
    if (!base.buttons) return;
    
    let newInline = _.map(base.buttons.inline, (o, i) => {
      let xicon = null;
      if (_.isString(o.icon)) {
        xicon = this._getIcons(o.icon);
      } else {
        xicon = o.icon;
      }

      return {
        caption: o.caption,
        icon: xicon,
        func: this._Redirect(o.func, "onClick", true),
        reqAuth: base.reqAuth,
        reqLevel: o.reqLevel,
        reqFunc: o.reqFunc,
        theme: o.theme,
        disableFunc: o.disableFunc,
      };
    });

    this.setState({
      inlineButtons: newInline,
    });
  };

  _setInlineButtonsOpposite = () => {
    let { base } = this.state;
    if (!base.buttons) return;
    let newInline = _.map(base.buttons.inlineOpposite, (o, i) => {
      let xicon = null;
      if (_.isString(o.icon)) {
        xicon = this._getIcons(o.icon);
      } else {
        xicon = o.icon;
      }

      return {
        caption: o.caption,
        icon: xicon,
        func: this._Redirect(o.func, "onClick", true),
        reqAuth: base.reqAuth,
        reqLevel: o.reqLevel,
        reqFunc: o.reqFunc,
        theme: o.theme,
        disableFunc: o.disableFunc,
      };
    });

    this.setState({
      inlineButtonsOpposite: newInline,
    });
  };

  _getTheme = (name) => {
    let xname = name && name.toLowerCase();
    switch (xname) {
      case "caution":
        return {
          color: "white",
          hover: {
            background: ColorX.GetColorCSS("lightRed"),
          },
          background: ColorX.GetColorCSS("red"),
          boxShadow: "0px",
        };
      default:
        return {
          color: "white",
          hover: {
            background: ColorX.GetColorCSS(IZOTheme.btnHover),
          },
          background: ColorX.GetColorCSS(IZOTheme.menuFG),
          boxShadow: "0px",
        };
    }
  };

  _getIcons = (name, size = "medium") => {
    if(!_.isString(name)) { return name; }
    let xname = name.toLowerCase();
    switch (xname) {
      case "edit":
        return <Edit style={{ color: ColorX.GetColorCSS("blue") }} fontSize={size} />;
      case "delete":
        return <DeleteForever style={{ color: ColorX.GetColorCSS("red") }} fontSize={size} />;
      case "info":
        return <InfoOutlined style={{ color: ColorX.GetColorCSS("green") }} fontSize={size} />;
      case "add":
        return <Add fontSize={size} />;
      case "import":
        return <Publish fontSize={size} />;
      case "export":
        return <GetApp fontSize={size} />;
      case "syncto":
        return <CloudUpload fontSize={size} />;
      case "syncfrom":
        return <CloudDownload fontSize={size} />;
      case "deletebulk":
        return <Delete fontSize={size} />;
      case "analyse":
        return <Assessment fontSize={size} />;
      case "duplicate":
        return <ContentCopy fontSize={size} />;
      default:
        return null;
    }
  };

  _getUploadFormData = (payloadOut) => {
    let upload = new FormData();
    upload.append("data", JSON.stringify(payloadOut.data || {}));
    upload.append("schema", JSON.stringify(payloadOut.schema || {}));
    upload.append("addOns", JSON.stringify(payloadOut.addOns || {}));
    upload.append("replace", JSON.stringify(payloadOut.replace || {}));
    upload.append("JWT", store.user.JWT);
    if (payloadOut.data.upload) {
      upload.append("upload", payloadOut.data.upload, payloadOut.data.upload.name);
    }
    return upload;
  }

  _Redirect = (func, name, inline = false) => {
    if (_.isString(func) && this[func]) {
      return this[func][name];
    } else if (_.isFunction(func)) {
      if (inline) {
        return (id, row) => {
          func(id, row);
        };
      } else {
        return () => {
          let sRows = this._GetSelectedRows();
          func(sRows);
        };
      }
    } else if (_.isObject(func)) {
      if (inline) {
        return (id, row) => {
          func[name](id, row);
        };
      } else {
        return () => {
          let sRows = this._GetSelectedRows();
          func[name](sRows);
        };
      }
    } else {
      return () => {
        store.Alert("Preset function (" + func + ") Not Implemented", "warn");
      };
    }
  };

  _importForm = (readOnly) => {
    let { base } = this.state;
    return (
      <Formizo
        schema={[
          {
            name: "upload",
            label: "Upload file",
            format: "file",
            accept: base.operations?.Import?.accept || ".xlsx, xls",
            noLabelGrid: true,
            showFilename: false,
            middle: true,
          },
        ]}
        onCancel={() => store.clearAsk()}
        buttons={[]}
        fieldStyle='grid'
        onChange={(formValue, name, value) => this.Import.onSubmit(name, value)}
        readOnly={readOnly}
      />
    );
  };

  Connect = {
    DBInfo: async () => {
      let { base, addOns } = this.props;
      let url = DOMAIN + base.Connect.DBInfo;
      let payloadOut = {
        JWT: store.user.JWT,
        addOns: addOns,
      };
      try {
        let res = await axios.post(url, payloadOut);
        console.log(base.Connect.DBInfo, res.data);

        let { Success, payload } = res.data;

        if (Success === true) {
          this.setState((state, props) => ({
            nav: {
              ...state.nav,
              totalEntries: payload.doc_count,
            },
          }));
        } else {
          this.Connect.onError(payload);
        }
      } catch (e) {
        this.Connect.onError(e);
      }
    },

    Data: async () => {
      let { base, addOns, serverSidePagination } = this.props;
      let { nav } = this.state;
      let url = DOMAIN + base.Connect.List;
      let payloadOut = {};

      if (serverSidePagination) {
        payloadOut = {
          JWT: store.user.JWT,
          data: {
            skip: nav.curPage * nav.pageSize,
            limit: nav.pageSize,
            selector: nav.selector,
          },
          addOns: addOns,
        };
      } else {
        payloadOut = {
          JWT: store.user.JWT,
          data: {
            selector: nav.selector,
          },
          addOns: addOns,
        };
      }
      try {
        let res = await axios.post(url, payloadOut);
        console.log(base.Connect.List, res.data);

        let { Success, payload } = res.data;

        if (Success === true) {
          this.setState(
            (state, props) => ({
              table: {
                ...state.table,
                data: payload,
              },
            }),
            () => {
              let { table, nav } = this.state;
              let { onDataChange } = this.props;
              let hasNextPage = false;
              if (nav.inQuery) {
                hasNextPage = table.data.length > nav.limit;
              }

              if (onDataChange) {
                onDataChange(table.data);
              }
              this.setState((state, props) => ({
                nav: {
                  ...state.nav,
                  hasNextPage: hasNextPage,
                },
                loading: false,
              }));
            }
          );
        } else {
          this.Connect.onError(payload);
        }
      } catch (e) {
        this.Connect.onError(e);
      }
    },

    //light weight updator
    Get: async (docID) => {
      let { base, addOns } = this.props;
      let url = DOMAIN + base.Connect.Get;
      let payloadOut = {
        JWT: store.user.JWT,
        data: {
          docID: docID,
        },
        addOns: addOns,
      };
      try {
        let res = await axios.post(url, payloadOut);
        console.log(base.Connect.Get, res.data);
        let { Success, payload } = res.data;

        if (Success === true) {
          let newDoc = payload;
          let oldData = this.state.table.data;
          let docIdx = oldData.findIndex((o) => o._id === docID);
          oldData[docIdx] = newDoc;

          this.setState(
            (state, props) => ({
              table: {
                ...state.table,
                data: oldData,
              },
              loading: false,
            }),
            () => {
              let { table } = this.state;
              let { onDataChange } = this.props;
              if (onDataChange) {
                onDataChange(table.data);
              }
            }
          );
        } else {
          this.Connect.onError(res.data);
        }
      } catch (e) {
        this.Connect.onError(e);
      }
    },

    onError: (e) => {
      store.Alert(ErrorX.Handle(e), "error");
    },
  };

  Delete = {
    onClick: (id, row) => {
      let { base } = this.props;
      let title = base.operations?.Delete?.title;
      if (_.isFunction(title)) {
        title = title(id, row);
      }
      let content = base.operations?.Delete?.content;
      if (_.isFunction(content)) {
        content = content(id, row);
      }

      store.Ask(title, content, async () => {
        return await this.Delete.onSubmit(id, row);
      });
    },

    onSubmit: async (id, row) => {
      console.log("submit Delete");

      let { base, addOns } = this.props;
      let url = DOMAIN + base.operations?.Delete?.url;

      let payloadOut = {
        data: {
          ...row,
        },
        JWT: store.user.JWT,
        addOns: addOns,
      };

      try {
        console.log(base.operations?.Delete?.url, payloadOut);

        store.isLoading(true);
        let res = await axios.post(url, payloadOut);
        store.isLoading(false);

        console.log(base.operations?.Delete?.url, res.data);

        let { Success, payload } = res.data;

        if (Success === true) {
          if (base.operations?.Delete?.onSuccess) {
            base.operations?.Delete?.onSuccess(payload);
          } else {
            this.Delete.onSuccess(payload);
          }
          return { Success: true };
        } else {
          if (base.operations?.Delete?.onFail) {
            base.operations?.Delete?.onFail(payload);
          } else {
            this.Delete.onFail(payload);
          }
          return { Success: false };
        }
      } catch (e) {
        store.isLoading(false);
        if (base.operations?.Delete?.onFail) {
          base.operations?.Delete?.onFail(e);
        } else {
          this.Delete.onFail(e);
        }
        return { Success: false };
      }
    },

    onSuccess: (payload) => {
      let { base } = this.props;
      store.Alert(base.operations?.Delete?.success, "success");
      this._fetchData();
    },

    onFail: (payload) => {
      let { base } = this.props;
      let msg = base.operations?.Delete?.fail + (payload.message || "");
      store.Alert(msg, "error");
    },
  };

  Duplicate = {
    onClick: (id, row) => {
      let { base } = this.props;
      let title = base.operations?.Duplicate?.title;
      if (_.isFunction(title)) {
        title = title(id, row);
      }
      let content = base.operations?.Duplicate?.content;
      if (_.isFunction(content)) {
        content = content(id, row);
      }

      store.Ask(title, content, async () => {
        return await this.Duplicate.onSubmit(id, row);
      });
    },

    onSubmit: async (id, row) => {
      console.log("submit Duplicate");

      let { base, addOns } = this.props;
      let url = DOMAIN + base.operations?.Duplicate?.url;

      let payloadOut = {
        data: {
          ...row,
        },
        JWT: store.user.JWT,
        addOns: addOns,
      };

      try {
        console.log(base.operations?.Duplicate?.url, payloadOut);

        store.isLoading(true);
        let res = await axios.post(url, payloadOut);
        store.isLoading(false);

        console.log(base.operations?.Duplicate?.url, res.data);

        let { Success, payload } = res.data;

        if (Success === true) {
          if (base.operations?.Duplicate?.onSuccess) {
            base.operations?.Duplicate?.onSuccess(payload);
          } else {
            this.Duplicate.onSuccess(payload);
          }
          return { Success: true };
        } else {
          if (base.operations?.Duplicate?.onFail) {
            base.operations?.Duplicate?.onFail(payload);
          } else {
            this.Duplicate.onFail(payload);
          }
          return { Success: false };
        }
      } catch (e) {
        store.isLoading(false);
        if (base.operations?.Duplicate?.onFail) {
          base.operations?.Duplicate?.onFail(e);
        } else {
          this.Duplicate.onFail(e);
        }
        return { Success: false };
      }
    },

    onSuccess: (payload) => {
      let { base } = this.props;
      store.Alert(base.operations?.Duplicate?.success, "success");
      this._fetchData();
    },

    onFail: (payload) => {
      let { base } = this.props;
      let msg = base.operations?.Duplicate?.fail + (payload.message || "");
      store.Alert(msg, "error");
    },
  };

  Add = {
    onClick: () => {
      let {base} = this.props;
      let defDoc = {};
      if(_.isFunction(base.operations?.Add?.defaultDoc)){
        defDoc = base.operations?.Add?.defaultDoc()
      }else{
        defDoc = base.operations?.Add?.defaultDoc || {}
      }
      console.log(base)
      this.setState({
        inEdit: true,
        mode: "Add",
        doc: defDoc
      });
    },

    onSubmit: async (formProps) => {
      console.log("submit Add");
      console.log(formProps);

      let { base, addOns, docID } = this.props;
      let url = DOMAIN + base.operations?.Add?.url;

      let payloadOut = {
        data: {
          ...formProps,
        },
        JWT: store.user.JWT,
        addOns: addOns,
      };

      if(base.operations?.Add?.withFile){
        payloadOut = this._getUploadFormData(payloadOut);
      }


      try {
        console.log(base.operations?.Add?.url, payloadOut);

        store.isLoading(true);
        let res = await axios.post(url, payloadOut);
        store.isLoading(false);

        console.log(base.operations?.Add?.url, res.data);

        let { Success, payload } = res.data;

        if (Success === true) {
          if (base.operations?.Add?.onSuccess) {
            base.operations?.Add?.onSuccess(payload);
          } else {
            this.Add.onSuccess(payload);
          }
          this._QuitInner(docID);
        } else {
          if (base.operations?.Add?.onFail) {
            base.operations?.Add?.onFail(payload);
          } else {
            this.Add.onFail(payload);
          }
        }
      } catch (e) {
        store.isLoading(false);
        if (base.operations?.Add?.onFail) {
          base.operations?.Add?.onFail(e);
        } else {
          this.Add.onFail(e);
        }
      }
    },

    onSuccess: (payload) => {
      let { base } = this.props;
      store.Alert(base.operations?.Add?.success, "success");
      this._fetchData();
    },

    onFail: (payload) => {
      let { base } = this.props;
      let msg = base.operations?.Add?.fail + (payload.message || "");
      store.Alert(msg, "error");
    },
  };

  DuplicateAdd = {
    onClick: (id, row) => {
      let {base} = this.props;
      let doc = _.cloneDeep(row);
      if(Accessor.Get(doc, base.rowIdAccessor || "_id")){
        Accessor.Set(doc, base.rowIdAccessor || "_id", undefined);
      }
      this.setState({
        inEdit: true,
        mode: "Add",
        doc: doc || {}
      });
    },

    onSubmit: async (formProps) => {
      console.log("submit Add");
      console.log(formProps);

      let { base, addOns, docID } = this.props;
      let url = DOMAIN + base.operations?.Add?.url;

      let payloadOut = {
        data: {
          ...formProps,
        },
        JWT: store.user.JWT,
        addOns: addOns,
      };

      if(base.operations?.Add?.withFile){
        payloadOut = this._getUploadFormData(payloadOut);
      }


      try {
        console.log(base.operations?.Add?.url, payloadOut);

        store.isLoading(true);
        let res = await axios.post(url, payloadOut);
        store.isLoading(false);

        console.log(base.operations?.Add?.url, res.data);

        let { Success, payload } = res.data;

        if (Success === true) {
          if (base.operations?.Add?.onSuccess) {
            base.operations?.Add?.onSuccess(payload);
          } else {
            this.Add.onSuccess(payload);
          }
          this._QuitInner(docID);
        } else {
          if (base.operations?.Add?.onFail) {
            base.operations?.Add?.onFail(payload);
          } else {
            this.Add.onFail(payload);
          }
        }
      } catch (e) {
        store.isLoading(false);
        if (base.operations?.Add?.onFail) {
          base.operations?.Add?.onFail(e);
        } else {
          this.Add.onFail(e);
        }
      }
    },

    onSuccess: (payload) => {
      let { base } = this.props;
      store.Alert(base.operations?.Add?.success, "success");
      this._fetchData();
    },

    onFail: (payload) => {
      let { base } = this.props;
      let msg = base.operations?.Add?.fail + (payload.message || "");
      store.Alert(msg, "error");
    },
  };

  Edit = {
    onClick: (id, row) => {
      this.setState({
        inEdit: true,
        mode: "Edit",
        doc: row,
        docID: id,
      });
    },
    onSubmit: async (formProps) => {
      console.log("submit Edit");
      console.log(formProps);

      let { base, addOns } = this.props;
      let { doc } = this.state;

      let url = DOMAIN + base.operations?.Edit?.url;

      let payloadOut = {
        data: {
          ...doc,
          ...formProps,
        },
        JWT: store.user.JWT,
        addOns: addOns,
      };

      if(base.operations?.Edit?.withFile){
        payloadOut = this._getUploadFormData(payloadOut);
      }

      try {
        console.log(base.operations?.Edit?.url, payloadOut);

        store.isLoading(true);
        let res = await axios.post(url, payloadOut);
        store.isLoading(false);

        console.log(base.operations?.Edit?.url, res.data);

        let { Success, payload } = res.data;

        if (Success === true) {
          if (base.operations?.Edit?.onSuccess) {
            base.operations?.Edit?.onSuccess(payload);
          } else {
            this.Edit.onSuccess(payload);
          }
          this._QuitInner();
        } else {
          if (base.operations?.Edit?.onSuccess) {
            base.operations?.Edit?.onFail(payload);
          } else {
            this.Edit.onFail(payload);
          }
        }
      } catch (e) {
        store.isLoading(false);
        if (base.operations?.Edit?.onFail) {
          base.operations?.Edit?.onFail(e);
        } else {
          this.Edit.onFail(e);
        }
      }
    },

    onSuccess: (payload) => {
      let { base } = this.props;
      store.Alert(base.operations?.Edit?.success, "success");
      this._fetchData();
    },

    onFail: (payload) => {
      let { base } = this.props;
      let msg = base.operations?.Edit?.fail + (payload.message || "");
      store.Alert(msg, "error");
    },
  };

  Info = {
    onClick: (id, row) => {
      this.setState({
        inEdit: true,
        mode: "Info",
        doc: row,
        docID: id,
      });
    },
  };

  flatExcelSchema = (arr, d = 1) => {
    return d > 0 ? 
      arr.reduce((o, i) => o.concat(Array.isArray(i) ? 
      this.flatExcelSchema(i, d - 1) : i), [])
      : arr.slice();
  };

  Export = {
    onClick: async () => {
      let { base, addOns } = this.state;
      if (!base.operations?.Export || !base.operations?.Export?.url) {
        store.Alert("Export Not Implemented.", "warn");
        return;
      }
      let url = DOMAIN + base.operations?.Export?.url;
      let selected = this.MountTablizo? this.MountTablizo.GetSelectedRows() : [];

      let schema = this.flatExcelSchema(base.operations?.Export?.schema, Infinity);

      let payloadOut = {
        JWT: store.user.JWT,
        data: {
          selected: selected,
          format: null,
          schema: schema,
          skip: 0,
          limit: 9999,
        },
        addOns: addOns,
      };

      let options = {
        responseType: "blob", //!important
      };
      store.isLoading(true);
      try {
        let res = await axios.post(url, payloadOut, options);
        store.isLoading(false);
        const blob = new Blob([res.data], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });
        fileDownload(blob, base.exportDoc + ".xlsx");
      } catch (e) {
        store.isLoading(false);
        if (base.operations?.Export?.onFail) {
          base.operations?.Export?.onFail(e);
        } else {
          this.Export.onFail(e);
        }
      }
    },

    onFail: (payload) => {
      store.isLoading(false);
      store.Alert(ErrorX.Handle(payload), "error");
      store.clearAsk();
    },
  };

  DeleteBulk = {
    onClick: () => {
      let { base } = this.props;
      if(!this.MountTablizo){
        store.Alert("No rows are selected.", "warn");
        return;
      }
      let selected = this.MountTablizo.GetSelectedRows();
      if (selected.length <= 0) {
        store.Alert("No rows are selected.", "warn");
        return;
      }

      let title = base.operations?.DeleteBulk?.title;
      if (_.isFunction(base.operations?.DeleteBulk?.title)) {
        title = base.operations?.DeleteBulk?.title(selected.length);
      }

      let content = base.operations?.DeleteBulk?.content;
      if (_.isFunction(base.operations?.DeleteBulk?.content)) {
        content = base.operations?.DeleteBulk?.content(selected.length);
      }

      store.Ask(title, content, async () => {
        return await this.DeleteBulk.onSubmit();
      });
    },

    onSubmit: async () => {
      let { base, addOns } = this.state;
      if (!base.operations?.DeleteBulk || !base.operations?.DeleteBulk?.url) {
        store.Alert("DeleteBulk Not Implemented.", "warn");
        return;
      }
      let url = DOMAIN + base.operations?.DeleteBulk?.url;
      let selected = this.MountTablizo.GetSelectedRows();

      let payloadOut = {
        JWT: store.user.JWT,
        data: {
          selected: selected,
        },
        addOns: addOns,
      };

      try {
        console.log(base.operations?.DeleteBulk?.url, payloadOut);

        store.isLoading(true);
        let res = await axios.post(url, payloadOut);
        store.isLoading(false);

        console.log(base.operations?.DeleteBulk?.url, res.data);

        let { Success, payload } = res.data;
        if (Success === true) {
          if (base.operations?.DeleteBulk?.onSuccess) {
            base.operations?.DeleteBulk?.onSuccess(payload);
          } else {
            this.DeleteBulk.onSuccess(payload);
          }
          this.MountTablizo.ClearSelected();
          return { Success: true };
        } else {
          if (base.operations?.DeleteBulk?.onFail) {
            base.operations?.DeleteBulk?.onFail(payload);
          } else {
            this.DeleteBulk.onFail(payload);
          }
          return { Success: false };
        }
      } catch (e) {
        store.isLoading(false);
        if (base.operations?.DeleteBulk?.onFail) {
          base.operations?.DeleteBulk?.onFail(e);
        } else {
          this.DeleteBulk.onFail(e);
        }
        return { Success: false };
      }
    },

    onSuccess: (payload) => {
      let { base } = this.props;
      store.Alert(base.operations?.DeleteBulk?.success, "success");
      this._fetchData();
    },

    onFail: (payload) => {
      let { base } = this.props;
      let msg = base.operations?.DeleteBulk?.fail + (payload.message || "");
      store.Alert(msg, "error");
    },
  };

  Import = {
    onClick: () => {
      let { base } = this.state;
      if (!base.operations?.Import || !base.operations?.Import?.url) {
        store.Alert("Import Not Implemented.", "warn");
        return;
      }
      store.Form(base.operations?.Import?.title, base.operations?.Import?.content 
        || (base.operations?.Import?.replace? "CAUTION!! It will DELETE and REPLACE all the content in database. <br/>": "") + "(File size cannot exceed 10MB, only accept .xlsx and .xls)", 
        this._importForm, this.Import.onSubmit);
    },

    onSubmit: async (name, value, callback) => {
      store.SetAskLoading(true);
      console.log("submit Import");
      console.log(name, value);
      let { base, addOns } = this.state;

      let url = DOMAIN + base.operations?.Import?.url;
      let payloadOut = {
        data: {
          [name]: value,
        },
        schema: this.flatExcelSchema(base.operations?.Import?.schema, Infinity) || [],
        replace: base.operations?.Import?.replace || false,
        JWT: store.user.JWT,
        addOns: addOns,
      };

      let upload = this._getUploadFormData(payloadOut);

      try {
        let res = await axios.post(url, upload);

        console.log(base.operations?.Import?.url, res.data);

        store.SetAskLoading(false);
        let { Success, payload } = res.data;

        if (Success === true) {
          if (base.operations?.Import?.onSuccess) {
            base.operations?.Import?.onSuccess(payload);
          } else {
            this.Import.onSuccess(payload);
          }
        } else {
          if (base.operations?.Import?.onFail) {
            base.operations?.Import?.onFail(payload);
          } else {
            this.Import.onFail(payload);
          }
        }
      } catch (e) {
        if (base.operations?.Import?.onFail) {
          base.operations?.Import?.onFail(e);
        } else {
          this.Import.onFail(e);
        }
      }
    },

    onSuccess: (payload) => {
      if (!_.isEmpty(payload.error)) {
        let msg = _.map(payload.error, (o, i) => "ID (" + o.id + "): " + o.error);
        store.Alert("Import Successfully with warning: \n" + msg.join("\n"), "warn");
      } else {
        store.Alert("Import Successfully.", "success");
      }
      store.clearAsk();
      this._fetchData();
    },

    onFail: (payload) => {
      let { base } = this.props;
      let msg = base.operations?.Import?.fail + (payload.message || "");
      store.Alert(msg, "error");
      store.clearAsk();
    },
  };

  Sync = {
    onClick: () => {
      let { base } = this.state;
      store.Ask(base.operations?.Sync?.title, base.operations?.Sync?.content, async () => {
        return await this.Sync.onSubmit();
      });
    },

    onSubmit: async () => {
      console.log("Sync from Cloud");

      let { base, addOns } = this.state;

      let url = DOMAIN + base.operations?.Sync?.url;
      let payloadOut = {
        JWT: store.user.JWT,
        addOns: addOns,
      };

      try {
        console.log(base.operations?.Sync?.url, payloadOut);

        store.isLoading(true);
        let res = await axios.post(url, payloadOut);
        store.isLoading(false);

        console.log(base.operations?.Sync?.url, res.data);

        let { Success, payload } = res.data;

        if (Success === true) {
          if (base.operations?.Sync?.onSuccess) {
            base.operations?.Sync?.onSuccess(payload);
          } else {
            this.Sync.onSuccess(payload);
          }
          return { Success: true };
        } else {
          if (base.operations?.Sync?.onFail) {
            base.operations?.Sync?.onFail(payload);
          } else {
            this.Sync.onFail(payload);
          }
          return { Success: false };
        }
      } catch (e) {
        store.isLoading(false);
        if (base.operations?.Sync?.onFail) {
          base.operations?.Sync?.onFail(e);
        } else {
          this.Sync.onFail(e);
        }
        return { Success: true };
      }
    },

    onSuccess: (payload) => {
      let { base } = this.props;
      store.Alert(base.operations?.Sync?.success, "success");
      this._fetchData();
    },

    onFail: (payload) => {
      let { base } = this.props;
      let msg = base.operations?.Sync?.fail + (payload.message || "");
      store.Alert(msg, "error");
    },
  };

  /*
  Push = {
    onClick: () => {
      let { base } = this.state;
      this.MountPopup.Ask(base.title.Push, () => {
        this.Push.onSubmit();
      });
    },

    onSubmit: async () => {
      this.MountPopup.Loading();
      console.log("Push to Watson");

      let { user, base, addOns } = this.state;

      let url = DOMAIN + base.url.Push;
      let payload = {
        JWT: user.JWT,
        addOns: addOns,
      };

      console.log(payload);

      try {
        let res = await axios.post(url, payload);
        if (res.data.Success === true) {
          this.Push.onSuccess(res);
        } else {
          this.Push.onFail(res);
        }
      } catch (e) {
        this.Push.onFail(e);
      }
    },

    onSuccess: (res) => {
      console.log(res);
      this.MountPopup.Alert("Push Successfully.", () => {
        this.fetchData();
      });
    },

    onFail: (res) => {
      console.log(res);
      this.MountPopup.Alert("Push Failed.");
    },
  };
  
  */

  renderTableButtons(buttons, left = true) {
    let { table } = this.state;
    let { base, addOns } = this.props;
    return _.map(buttons, (o, i) => {
      if (Authority.IsAccessibleQ(base.reqAuth, o.reqLevel, o.reqFunc)) {
        //injection
        if (o.inject) {
          return o.inject(table.data, addOns);
        }

        let theme = o.theme;
        if (!theme || _.isString(theme)) {
          theme = this._getTheme(theme);
        }
        let caption = o.caption;
        if (_.isFunction(caption)) {
          let { selectedrows } = this.state;
          caption = o.caption(selectedrows);
        }

        return (
          <Box marginRight={left ? 1 : 0} marginLeft={left ? 0 : 1} key={i}>
            <StyledButton
              key={i}
              disabled={o.disableFunc && o.disableFunc()}
              onClick={(e) => {
                e.stopPropagation();
                if (this._Redirect(o.func, "onClick", false)) {
                  this._Redirect(o.func, "onClick", false)();
                } else {
                  store && store.Alert("Function is not implemented.", "warn");
                }
              }}
              theme={theme}
            >
              <HStack spacing={5}>
                {this._getIcons(o.icon, "small")}
                <Typography style={{ fontWeight: "bold", fontSize: 14 }}>{caption}</Typography>
              </HStack>
            </StyledButton>
          </Box>
        );
      }
    });
  }

  renderButtons() {
    let { base } = this.props;
    if(!base.noDefaultButtons){
      return (
        <HStack marginBottom={1}>
          {this.renderTableButtons(base.buttons.left, true)}
          <Spacer />
          {this.renderTableButtons(base.buttons.right, false)}
        </HStack>
      );
    }
  }

  renderInner() {
    let { base, addOns } = this.props;
    let { doc, mode, docID } = this.state;
    
    let ibase = base?.operations[mode];
    return (
      <Inner
        onQuit={this._QuitInner}
        onQuitRefresh={this._QuitAndFetch}
        doc={doc}
        docID={docID}
        ibase={ibase}
        onSubmit={this._Redirect(ibase?.onSubmit || mode, "onSubmit", true)}
        addOns={addOns}
        auth={store.user.authority}
        level={store.user.level}
        showIDOnTop={base.showIDOnTop || false}
        formizo={base.formizo || {}}
      />
    );
  }

  renderSlide(){
    let { inEdit } = this.state;
    return (
      <Slide direction='up' in={inEdit} mountOnEnter unmountOnExit>
        <VStack
          width='100%'
          paddingTop='30px'
          paddingLeft='40px'
          style={{
            background: "#f9ffff",
            zIndex: 1,
            top: 0,
            left: 0,
            position: "absolute",
          }}
        >
          {this.renderInner()}
        </VStack>
      </Slide>
    );
  }

  renderTable(){
    let { base, addOns, serverSidePagination } = this.props;
    let { table, loading, inlineButtons, inlineButtonsOpposite, nav } = this.state;
    let tablizo = {
      columnsToolbar: true,
      densityToolbar: true,
      ...base.tablizo
    };

    if(!base.noDefaultTable){
      return (
        <Tablizo
          width='100%'
          height='100%'
          onMounted={this.onMountTablizo}
          schema={base.Connect.schema}
          data={table.data}
          loading={loading}
          inlineButtons={inlineButtons}
          inlineButtonsAlign={"left"}
          inlineButtonsOpposite={inlineButtonsOpposite}
          onRowSelected={this._onRowSelected}
          rowIdAccessor={base.rowIdAccessor || "_id"}
          pagination={true}
          serverSidePagination={serverSidePagination}
          rowCount={serverSidePagination ? nav.totalEntries : undefined}
          onPageChange={this._onPageChange}
          onPageSizeChange={this._onPageSizeChange}
          defaultPageSize={nav.pageSize}
          auth={store.user.authority}
          level={store.user.level}
          addOns={addOns}
          {...tablizo}
        />
      );
    }
  }

  renderGridView(){
    return (
      <VStack width='100%'>
        {this.renderButtons()}
        {this.renderTable()}
      </VStack>
    );
  }

  renderInject(){
    let {inject} = this.props;
    let {table, loading} = this.state;
    if (inject){
      if(_.isFunction(inject)){
        return inject(table, loading);
      }
      return inject;
    }
  }

  render() {
    let { base } = this.props;
    if (!base) return <div />;
    return (
      <Box style={{ width: "100%"}} flexGrow={base.noDefaultTable? undefined: 1}>
        <VStack width='100%' padding={1} alignItems="flex-start"> 
          {this.renderInject()}
          {this.renderGridView()}
        </VStack>
        {this.renderSlide()}
      </Box>
    );
  }
}

export default Datumizo;
