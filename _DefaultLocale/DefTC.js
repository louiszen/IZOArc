let DefTC = {
  Login: {
    HeaderMessage: "請使用你的User ID登入",
    Not: "不是",
    Next: "繼續",
    Login: "登入",
    form: {
      username: "User ID",
      password: "密碼"
    }
  },
  NavBar: {
    LoggedInAs: "登入帳號",
    SwitchLang: "English",
    Logout: "登出"
  },
  MenuBar: {
    System: "系統設定",
    ShowLabels: "顯示標籤",
    HideLabels: "隱藏標籤"
  },
  Alert: {
    UserNotFound: "User ID不存在",
    CannotConnect: "不能連接伺服器",
    IncorrectPassword: "密碼錯誤",
    SuccessLogin: "成功登入",
    SuccessLogout: "成功登出",
    InteranlServerError: "伺服器內部錯誤",
    ServerReturnError: "伺服器回傳錯誤",
    BackupSuccess: "備份成功",
    RestoreSuccess: "恢復成功到 <br/>@str",
    DeleteSuccess: "刪除成功",
    UpdateError: "更新錯誤",
    AutoLogin: "自動登入",
    Unauthorized: "沒有權限",
    NoRowsSelect: "沒有選取項目",
    FuncNotImplement: "預設功能(@func)暫未開放",
    ExportNotImplement: "暫未開放導出功能",
    ImportNotImplement: "暫未開放導入功能"
  },
  System: {
    BnR: "備份和恢復",
    UAC: "用戶訪問控制",
    Backup: "備份",
    LastBackup: "最後備份:",
    NoBackup: "沒有可用的備份",
    Restore: "恢復",
    RestoreTo: "將系統還原到@str？<br/>系統將自動備份當前狀態",
    BackupSystem: "備份系統?",
    Delete: "刪除",
    DeleteBackup: "刪除備份@str?",
    AccessDenied: "訪問被拒"
  },
  BnR: {
    Include: "備份",
    Exclude: "不備份",
    Databases: "資料庫",
    Included: "備份",
    Version: "版本"
  },
  Formizo: {
    OK: "好的",
    Confirm: "確定",
    Submit: "提交",
    Cancel: "取消",
    Clear: "清除",
    Revert: "還原",
    Login: "登入",
    Logout: "登出"
  },
  Tablizo: {
    labelRowsPerPage: "每頁行數:"
  },
  Datumizo: {
    All: "全部",
    UploadFile: "上傳檔案",
    FileSizeLimit: "(檔案不可大於10MB, 只接受.xlsx或.xls類型)",
    ReplaceAllCaution: "注意!! 將會刪除及取代現有的所有資料<br/>"
  },
  UAC: {
    PageTitle: "用戶訪問控制",
    Title: "用戶",
    Add: {
      title: "新增用戶",
      success: "成功新增用戶",
      fail: "新增用戶失敗: "
    },
    Delete: {
      title: "刪除用戶?",
      content: "注意: 這操作不可逆轉",
      success: "成功刪除用戶",
      fail: "刪除用戶失敗: "
    },
    Edit: {
      title: "編輯用戶",
      success: "成功編輯用戶",
      fail: "編輯用戶失敗: ",     
    },
    Info: {
      title: "用戶訪問控制",
      success: "成功載入用戶訪問控制",
      fail: "載入用戶訪問控制失敗: ",
    },
    Import: {
      title: "導入用戶",
      success: "成功導入用戶",
      fail: "導入用戶失敗: ",
    },
    Export: {
      title: "導出用戶",
      success: "成功導出用戶",
      fail: "導出用戶失敗: ",
    },
    DeleteBulk: {
      title: "刪除這@n個用戶?",
      content: "注意: 這操作不可逆轉",
      success: "成功刪除用戶",
      fail: "刪除用戶失敗: "
    },
    ButtonCaption: {
      Add: "新增用戶",
      Edit: "編輯",
      Info: "詳細資料",
      Delete: "刪除",
      DeleteBulk: "刪除(@n)",
      Export: "導出(@n)",
      Import: "導入",
    }
  }
  
};

export default DefTC;