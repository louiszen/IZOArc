import { HStack, Spacer } from "IZOArc/LabIZO/Stackizo";
import { LocaleX } from "IZOArc/STATIC";

const schema = [
  {
    box: [
      {
        label: LocaleX.Parse({
          EN: "Password",
          TC: "密碼"
        }),
        name: "password",
        format: "password"
      },
      {
        label: LocaleX.Parse({
          EN: "One-Time-Password (OTP)",
          TC: "一次性密碼 (OTP"
        }),
        name: "otp",
        format: "password",
        width: "70%"
      },
      {
        inject: (formValue, addOns) => (
          <HStack>
            <Spacer/>
            {addOns.OTP(addOns)}
          </HStack>
        ) 
      }
    ]
  }
];

export default schema;