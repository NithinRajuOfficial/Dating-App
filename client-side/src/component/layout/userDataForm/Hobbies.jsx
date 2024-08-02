import {
  Button,
  Card,
  Checkbox,
  Dialog,
  List,
  ListItem,
  ListItemPrefix,
  Typography,
  Spinner,
} from "@material-tailwind/react";
import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Formik, Form, Field, ErrorMessage } from "formik";

import signupApi from "../../../services/signupApi";
import { colors, interestsList } from "./data";
import { userHobbiesDialogValidationSchema } from "../../../utils/validation";
import { toggleUserHobbiesDialog } from "../../../redux/slices/userHobbiesDialog";

export default function UserDataDialogForm() {
  const dispatch = useDispatch()
  const location = useLocation();
  const navigate = useNavigate()
  const { userData } = location.state || {};
  const { isUserHobbiesDialogOpen } = useSelector(
    (state) => state.userHobbiesDialog
  );

  const [isSubmitted, setIsSubmitted] = useState(false);
  const getRandomColor = () => {
    const randomIndex = Math.floor(Math.random() * colors.length);
    return colors[randomIndex];
  };

  const handleCheckboxChange = (value, field, form) => {
    const currentValues = field.value || [];
    if (currentValues.includes(value)) {
      const newValues = currentValues.filter((item) => item !== value);
      form.setFieldValue(field.name, newValues);
    } else {
      form.setFieldValue(field.name, [...currentValues, value]);
    }
  };
  return (
    <Dialog
      size="xl"
      open={isUserHobbiesDialogOpen}
      animate={{
        mount: { scale: 1, y: 0, transition: { duration: 0.3 } },
        unmount: { scale: 0.9, y: -100, transition: { duration: 0.3 } },
      }}
      className="flex justify-center items-center h-[90vh] p-5 bg-transparent shadow-none"
    >
      <Formik
        initialValues={userHobbiesDialogValidationSchema.initialValues}
        validationSchema={userHobbiesDialogValidationSchema.validateYupSchema}
        onSubmit={async ({ hobbies }) => {
          userData.hobbies = hobbies;
          setIsSubmitted(true);
          await signupApi(userData);
          dispatch(toggleUserHobbiesDialog())
          navigate('/')
        }}
      >
        <Form className="w-full h-full relative">
          {isSubmitted && (
            <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-75">
              <Spinner color="blue" className="h-16 w-16 z-10" />
            </div>
          )}
          <Card className="w-full h-full px-4 py-6">
            <h1 className="text-center text-3xl pb-2">Hobbies</h1>
            <List className="flex-row flex-wrap overflow-y-auto">
              {interestsList.map((item) => (
                <Field name="hobbies" key={item}>
                  {({ field, form }) => (
                    <ListItem key={item} className="p-0 max-w-40 ">
                      <label
                        htmlFor={`horizontal-list-react-${item}`}
                        className="flex cursor-pointer items-center px-3 py-2"
                      >
                        <ListItemPrefix>
                          <Checkbox
                            id={`horizontal-list-react-${item}`}
                            ripple={false}
                            color={getRandomColor()}
                            className="hover:before:opacity-0"
                            containerProps={{ className: "p-0" }}
                            checked={field.value.includes(item)}
                            disabled={isSubmitted}
                            onChange={() =>
                              handleCheckboxChange(item, field, form)
                            }
                          />
                        </ListItemPrefix>
                        <Typography color="blue-gray" className="font-medium">
                          {item}
                        </Typography>
                      </label>
                    </ListItem>
                  )}
                </Field>
              ))}
            </List>
            <ErrorMessage
              name="hobbies"
              component="div"
              className="text-red-500 text-sm"
            />
            <div className="flex justify-end gap-8 mr-10">
              <Button className="bg-red-900" disabled={isSubmitted}>Cancel</Button>
              <Button className="bg-blue-900" type="submit" disabled={isSubmitted}>
                Next
              </Button>
            </div>
          </Card>
        </Form>
      </Formik>
    </Dialog>
  );
}
