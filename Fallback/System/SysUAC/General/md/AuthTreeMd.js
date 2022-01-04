import { LocaleX } from "IZOArc/STATIC";
import { DOMAIN } from "__SYSDefault/Domain";

const md = () => LocaleX.Parse({
  EN: `### **Update Complete Authority Tree**
Endpoint:

\`${DOMAIN}/Config/Project/UpdateAuthTree\`

IZO Project CLI

\`npm run gauthz update\`

Example input JSON:
\`\`\`json
{
  projectCode: "<your_projectCode>",
  APIKEY: "<your_APIKEY>",
  newAuthTree: {
    Dashboard: ["Submit", "Approve"],
    System: {
      BnR: ["Add", "Edit", "Delete"],
      User: ["Add", "Edit", "Delete"]
    }
  }
}
\`\`\`
`,
  TC: `### **更新權限樹**
接口端:

\`${DOMAIN}/Config/Project/UpdateAuthTree\`

IZO 專案可使用GAuthz內置控制指令

\`npm run gauthz update\`

輸入 JSON 格式:
\`\`\`json
{
  projectCode: "<your_projectCode>",
  APIKEY: "<your_APIKEY>",
  newAuthTree: {
    Dashboard: ["Submit", "Approve"],
    System: {
      BnR: ["Add", "Edit", "Delete"],
      User: ["Add", "Edit", "Delete"]
    }
  }
}
\`\`\`
`,
});

export default md;