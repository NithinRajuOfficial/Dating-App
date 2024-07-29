/* eslint-disable react/prop-types */
import { Popover, PopoverContent, PopoverHandler } from "@material-tailwind/react";
import { ErrorMessage, Field, useFormikContext } from "formik";
import { nanoid } from "nanoid";
import { MdErrorOutline } from "react-icons/md";

export default function Dropdown({data}){
    const { errors, touched } = useFormikContext();
    const hasError = errors["qualification"] && touched["qualification"];
    return(
        <div className="w-full relative">
        <Field as="select" name="qualification" className="rounded-lg p-2">
          <option value="" label="Select Qualification" />
          {data.map((elm) => (
            <option key={nanoid()} value={elm} label={elm} />
          ))}
          
        </Field>
  {hasError && (
    <Popover placement="right" offset={10}>
      <PopoverHandler>
        <div className="absolute inset-y-0 right-0 flex items-center pr-2">
          <MdErrorOutline className="text-xl text-red-500 hover:cursor-pointer hover:scale-105" />
        </div>
      </PopoverHandler>
      <PopoverContent className="bg-white p-2 rounded-lg shadow-lg border border-gray-200 z-[9999]">
        <ErrorMessage
          name="qualification"
          component="div"
          className="text-red-500 text-sm"
        />
      </PopoverContent>
    </Popover>
  )}
</div>
    )
}