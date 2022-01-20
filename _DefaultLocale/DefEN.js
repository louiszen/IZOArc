let DefEN = {
  Login: {
    HeaderMessage: "Log in with your User ID",
    Not: "Not",
    Next: "Next",
    Login: "Login",
    form: {
      username: "User ID",
      password: "Password",
      EnterOTP: "One-Time Password (OTP)"
    },
    Methods: {
      UsernamePassword: "Username-Password",
      UsernamePassword2FSMS: "Password + SMS OTP",
      UsernamePassword2FEmail: "Password + Email OTP",
      MSAL: "Window Authentication",
      GitHub: "GitHub",
      Facebook: "Facebook",
      Instagram: "Instagram",
      Twitter: "Twitter",
      Google: "Google",
      LinkedIn: "LinkedIn"

    },
    WhichMethod: "Choose the Authentication Method:",
    OtherMethod: "Try other authentication method.",
    EnterOTP: "6-digit OTP has been sent to your mobile:"
  },
  NavBar: {
    LoggedInAs: "Logged in as ",
    SwitchLang: "中文",
    Logout: "Logout",
    Reload: "Reload"
  },
  MenuBar: {
    System: "System",
    ShowLabels: "Show Labels",
    HideLabels: "Hide Labels",
    BugReport: "Bug Report"
  },
  Alert: {
    UserNotFound: "User not found.",
    CannotConnect: "Cannot connect to server.",
    IncorrectPassword: "Incorrect password.",
    SuccessLogin: "Login Successful",
    SuccessLogout: "Logout Successful",
    InteranlServerError: "Internal Server Error.",
    ServerReturnError: "Server Return Error",
    BackupSuccess: "Backup Successful.",
    RestoreSuccess: "Restore Successful to \n@str.",
    DeleteSuccess: "Delete Successful.",
    UpdateError: "Update Error.",
    AutoLogin: "Auto Login.",
    Unauthorized: "Unauthorized.",
    NoRowsSelect: "No rows are selected.",
    FuncNotImplement: "Preset function (@func) Not Implemented",
    ExportNotImplement: "Export Not Implemented.",
    ImportNotImplement: "Import Not Implemented.",
    InvalidOTP: "OTP is invalid or expired.",
    AskLogout: {
      title: "Logout",
      message: "Are you confirm to logout?"
    },
    SuccessRenew: "Login Restored Successfully.",
    FailRenew: "Login Restored Fails",
    NoAuthority: "You don't have authority.",
    Denied: "Your request is denied."
  },
  System: {
    BnR: "Backup & Restore",
    UAC: "User Access Control",
    Backup: "Backup",
    LastBackup: "Last Backup:",
    NoBackup: "No Backup Available.",
    Restore: "Restore",
    RestoreTo: "Restore System to @str?<br/>The current state of the system will be backup-ed automatically.",
    BackupSystem: "Backup System?",
    Delete: "Delete",
    DeleteBackup: "Delete Backup @str?",
    AccessDenied: "Access Denied",
    AuthLog: "Authority Change Log",
    Ticket: "Bug Report Ticket"
  },
  BnR: {
    Include: "Include",
    Exclude: "Exclude",
    Databases: "Databases",
    Included: "Included",
    Version: "Version"
  },
  Formizo: {
    OK: "OK",
    Confirm: "Confirm",
    Submit: "Submit",
    Cancel: "Cancel",
    Clear: "Clear",
    Revert: "Revert",
    Login: "Login",
    Logout: "Logout",
    Upload: "上傳"
  },
  Tablizo: {
    labelRowsPerPage: "Rows Per Page:",
    dataNotFound: "Data not found.",
  },
  Datumizo: {
    All: "All",
    UploadFile: "Upload file",
    FileSizeLimit: "(File size cannot exceed 10MB, only accept .xlsx and .xls)",
    ReplaceAllCaution: "CAUTION!! It will DELETE and REPLACE all the content in database. <br/>"
  },
  UAC: {
    PageTitle: "User Access Control",
    Title: "User",
    Add: {
      title: "Add User",
      success: "User Added Successfully",
      fail: "User Add Failed: "
    },
    Delete: {
      title: "Delete this User?",
      content: "Caution: This is irrevertable.",
      success: "User Deleted Successfully.",
      fail: "User Delete Failed: "
    },
    Edit: {
      title: "Edit User",
      success: "User Edited Successfully",
      fail: "User Edit Failed: ",     
    },
    Info: {
      title: "User Access Control",
      success: "User Access Control Load Successfully",
      fail: "User Access Control Load Failed: ",
    },
    Import: {
      title: "Import Users",
      success: "Users Imported Successfully.",
      fail: "Users Import Failed: ",
    },
    Export: {
      title: "Export Users",
      success: "Users exported Successfully.",
      fail: "Users Export Failed: ",
    },
    DeleteBulk: {
      title: "Delete these @n User?",
      content: "Caution: This is irrevertable.",
      success: "User Deleted Successfully.",
      fail: "User Delete Failed: ",
    },
    ButtonCaption: {
      Add: "Add User",
      Edit: "Edit",
      Info: "Details",
      Delete: "Delete",
      DeleteBulk: "Delete(@n)",
      Export: "Export(@n)",
      Import: "Import",
    }
  }
};

export default DefEN;