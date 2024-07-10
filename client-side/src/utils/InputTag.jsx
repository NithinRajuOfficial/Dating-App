/* eslint-disable react/prop-types */
import {
  Input,
  Popover,
  PopoverContent,
  PopoverHandler,
} from "@material-tailwind/react";
import { Field, ErrorMessage, useFormikContext } from "formik";
import { MdErrorOutline } from "react-icons/md";

export default function InputTag({ data }) {
  const { errors, touched } = useFormikContext();
  const hasError = errors[data.name] && touched[data.name];
  return (
    <div className="flex flex-col w-full relative">
      <Field
        as={Input}
        color="black"
        size="md"
        name={data.name}
        type={data.type}
        label={data.label}
        className="bg-white"
      />
      {hasError && (
        <Popover placement="right" offset={10}>
          <PopoverHandler>
            <div className="absolute inset-y-0 right-0 flex items-center pr-2">
              <MdErrorOutline className="text-xl text-red-500 hover:cursor-pointer hover:scale-105" />
            </div>
          </PopoverHandler>
          <PopoverContent className="bg-white p-2 rounded-lg shadow-lg border border-gray-200">
            <ErrorMessage
              name={data.name}
              component="div"
              className="text-red-500 text-sm"
            />
          </PopoverContent>
        </Popover>
      )}
    </div>
  );
}
