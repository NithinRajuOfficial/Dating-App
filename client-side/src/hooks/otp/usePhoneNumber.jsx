import { useState } from "react";
import countryData from "react-phone-number-input/locale/en.json";
import { parsePhoneNumberFromString } from "libphonenumber-js";
import {
  getCountryCallingCode,
  isValidPhoneNumber,
} from "react-phone-number-input";

export default function usePhoneNumber() {
  const [value, setValue] = useState();
  const [country, setCountry] = useState({ name: "India", callingCode: "+91" });
  const [phoneError, setPhoneError] = useState("");

  const handlePhoneChange = (phone) => {
    if (typeof phone === "string") {
      setValue(phone);
      const phoneNumber = parsePhoneNumberFromString(phone);
      if (phoneNumber) {
        setPhoneError("");
        const countryCode = phoneNumber.country;
        const countryName = countryData[countryCode];
        const countryCallingCode = `+${phoneNumber.countryCallingCode}`;
        setCountry({
          code: countryCode,
          name: countryName,
          callingCode: countryCallingCode,
        });
      }
      if (phone && !isValidPhoneNumber(phone)) {
        setPhoneError("Invalid phone number");
      }
    }
  };

  const handleCountryChange = (countryCode) => {
    const countryName = countryData[countryCode];
    const countryCallingCode = `+${getCountryCallingCode(countryCode)}`;
    setCountry({
      code: countryCode,
      name: countryName,
      callingCode: countryCallingCode,
    });
  };

  return {
    value,
    country,
    phoneError,
    setPhoneError,
    handlePhoneChange,
    handleCountryChange,
  };
}
