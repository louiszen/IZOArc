import { LocaleX } from "IZOArc/STATIC";

const md = () => LocaleX.Parse({
  EN:`
## **Returns**

Success returns:
\`\`\`json
{
  Success: true
}
\`\`\`

Failure returns:
\`\`\`json
{
  Success: false,
  payload: {
    errorCode: <error_code>, //number
    message: "<error_message>", //string
    name: "<error_name>" //string
  }
}
\`\`\`
`, 
  TC:`
## **傳回JSON**

成功時:
\`\`\`json
{
  Success: true
}
\`\`\`

失敗時:
\`\`\`json
{
  Success: false,
  payload: {
    errorCode: <error_code>, //number
    message: "<error_message>", //string
    name: "<error_name>" //string
  }
}
\`\`\`
`,
});

export default md;