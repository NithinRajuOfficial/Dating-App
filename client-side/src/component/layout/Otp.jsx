import { Button, Dialog } from "@material-tailwind/react";
import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import { IoCloseSharp } from "react-icons/io5";

import usePhoneNumber from "../../hooks/otp/usePhoneNumber";
import { otpSendApi, otpVerifyApi } from "../../services/otpLoginApi";
import { toggleOtpDialog } from "../../redux/slices/otpDialog";

export default function OtpLogin() {
  const [otp, setOtp] = useState(["", "", "", ""]);
  const inputRefs = useRef([]);
  const {
    value,
    country,
    phoneError,
    setPhoneError,
    handlePhoneChange,
    handleCountryChange,
  } = usePhoneNumber();
  const [status, setStatus] = useState(false);
  const navigate = useNavigate()
  const dispatch = useDispatch();
  const { isOtpDialogOpen } = useSelector((state) => state.otpDialog);


  const handlePhoneNumberSubmit = async () => {
    const response = await otpSendApi(value, setPhoneError);
    setStatus(response);
  };

  // function to handle the otp change in the input
  const handleOtpChange = (val, index) => {
    setOtp((prev) => {
      const currentOtp = [...prev];
      currentOtp[index] = val;
      return currentOtp;
    });
    if (val !== "" && index < otp.length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleOtpSubmit = async () => {
    const response = await otpVerifyApi(otp, value);
    if(response === true){
      dispatch(toggleOtpDialog())
      navigate('/')
    }

  };
  return (
    <Dialog
      size="md"
      open={isOtpDialogOpen}
      animate={{
        mount: { scale: 1, y: 0, transition: { duration: 0.3 } },
        unmount: { scale: 0.9, y: -100, transition: { duration: 0.3 } },
      }}
      className="flex justify-center items-center p-5 sm:p-20 bg-transparent shadow-none"
    >
      <div className="w-full border-4 flex flex-col  items-center rounded-3xl overflow-hidden relative bg-gray-700">
        <IoCloseSharp
          className="self-end text-black text-2xl right-2 top-2 absolute hover:cursor-pointer hover:text-red-600"
          onClick={() => dispatch(toggleOtpDialog())}
        />
        <img
          src={status ? "./phone-sms.jpg" : "./enter-otp.jpg"}
          className="w-full h-[45vh]"
          alt="otp background"
        />
        {!status ? (
          <div className="flex flex-col items-center gap-4 py-8 text-white">
            <div className="flex gap-4 text-xl self-start">
              <h1>{country.name}</h1>
              <h1>{country.callingCode}</h1>
            </div>
            <PhoneInput
              defaultCountry="IN"
              placeholder="Enter phone number"
              value={value}
              onChange={handlePhoneChange}
              onCountryChange={handleCountryChange}
              className="text-md md:text-xl text-black phone-input"
            />
            {phoneError && (
              <small className="text-red-500 text-sm -mt-1 -mb-2">
                {phoneError}
              </small>
            )}
            <p>We will send you an OTP via SMS</p>
            <Button className="mt-10" onClick={handlePhoneNumberSubmit}>
              Next
            </Button>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center gap-4 py-6 md:py-8 px-5 text-white">
            <small className="text-base md:text-xl text-center">
              Please enter the verification code that we have sent to the number{" "}
              {value}
            </small>
            <div className="flex gap-2">
              {otp.map((val, i) => (
                <input
                  key={i}
                  className="w-12 p-3 text-2xl md:text-3xl text-center rounded-lg focus:outline-none text-black"
                  value={val}
                  maxLength={"1"}
                  onChange={(e) => handleOtpChange(e.target.value, i)}
                  ref={(input) => (inputRefs.current[i] = input)}
                />
              ))}
            </div>
            <Button
              className="mt-4 md:mt-6 hover:scale-105"
              onClick={handleOtpSubmit}
            >
              Verify
            </Button>
          </div>
        )}
      </div>
    </Dialog>
  );
}
