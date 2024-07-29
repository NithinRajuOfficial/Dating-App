import { useState } from "react";
import { Button, Dialog } from "@material-tailwind/react";
import { Field, Form, Formik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { userDataDialogValidationSchema } from "../../../utils/validation";
import {
  userDataDialogInputSetOne,
  userDataDialogInputSetTwo,
} from "../../../constants";
import InputTag from "../../common/InputTag";
import { nanoid } from "nanoid";
import { userQualificationList } from "./data";
import Dropdown from "../../common/dropDown";
import { toggleUserDataDialog } from "../../../redux/slices/userDataDialog";
import { toggleUserHobbiesDialog } from "../../../redux/slices/userHobbiesDialog";
import { useLocation, useNavigate } from "react-router-dom";

export default function UserDataDialog() {
  const navigate = useNavigate()
  const location = useLocation();
  const { formData } = location?.state || {};
  const dispatch = useDispatch();
  const { isUserDataDialogOpen } = useSelector((state) => state.userDataDialog);

  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedVideo, setSelectedVideo] = useState(null);

  const handleFileChange = (event, setFile) => {
    const file = event.currentTarget.files[0];
    setFile(URL.createObjectURL(file));
  };

  return (
    <Dialog
      size="lg"
      open={isUserDataDialogOpen}
      animate={{
        mount: { scale: 1, y: 0, transition: { duration: 0.3 } },
        unmount: { scale: 0.9, y: -100, transition: { duration: 0.3 } },
      }}
      className="flex justify-center h-[60vh] p-5 sm:p-20 bg-gray-300 shadow-none border-4"
    >
      <Formik
        initialValues={userDataDialogValidationSchema.initialValues}
        validationSchema={userDataDialogValidationSchema.validationSchema}
        onSubmit={(values) => {
          const userData = {...formData, ...values}
          navigate("/hobbies",{state:{userData}})
          dispatch(toggleUserDataDialog())
          dispatch(toggleUserHobbiesDialog())
        }}
      >
        {({ setFieldValue }) => (
          <Form className="w-full">
            <h1 className="text-center text-2xl font-semibold mb-4">
              Enter the Details
            </h1>
            <div className="flex flex-col gap-10">
              <div className="flex gap-44 w-full">
                {userDataDialogInputSetOne.map((elm) => (
                  <InputTag key={nanoid()} data={elm} />
                ))}

                <Dropdown data={userQualificationList} />
              </div>
              <div className="flex gap-44 w-full">
                {userDataDialogInputSetTwo.map((elm) => (
                  <div key={nanoid()} className="w-full">
                    <Field name={elm.name}>
                      {() => (
                        <div>
                          {elm.name === "proImg" && selectedImage && (
                            <img
                              src={selectedImage}
                              alt="Selected"
                              className="mt-2 w-32"
                            />
                          )}
                          {elm.name === "shortReel" && selectedVideo && (
                            <video
                              controls
                              src={selectedVideo}
                              className="mt-2 w-60"
                            />
                          )}
                          <input
                            type="file"
                            name={elm.name}
                            accept={
                              elm.name === "proImg" ? "image/*" : "video/*"
                            }
                            onChange={(event) => {
                              handleFileChange(
                                event,
                                elm.name === "proImg"
                                  ? setSelectedImage
                                  : setSelectedVideo
                              );
                              setFieldValue(
                                elm.name,
                                event.currentTarget.files[0]
                              );
                            }}
                          />
                        </div>
                      )}
                    </Field>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <Field type="checkbox" name="smokingHabits" />
                Smoking Habits
                <Field
                  type="checkbox"
                  name="drinkingHabits"
                  className="ml-10"
                />
                Drinking Habits
              </div>
              <div>
                <Button
                  className="mt-4 mr-10 bg-red-900"
                  type="button"
                  onClick={() => dispatch(toggleUserDataDialog())}
                >
                  Cancel
                </Button>
                <Button className="mt-4 bg-blue-900" type="submit">
                  Next
                </Button>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </Dialog>
  );
}
