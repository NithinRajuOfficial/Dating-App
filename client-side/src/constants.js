import {
  UserCircleIcon,
  Cog6ToothIcon,
  InboxArrowDownIcon,
  LifebuoyIcon,
  PowerIcon,
  HeartIcon,
  InformationCircleIcon 
} from "@heroicons/react/24/solid";

const navbarData = {
  navListItems : [
    {
      label: "Home",
      link: "/",
      color:"blue-gray",
      icon: UserCircleIcon,
    },
    {
      label: "About",
      link: "/about",
      color:"blue-gray",
      icon: InformationCircleIcon ,
    },
    {
      label: "Matches",
      link: "/matches",
      color:"red",
      icon: HeartIcon,
    },
  ],

   profileMenuItems : [
    {
      label: "My Profile",
      icon: UserCircleIcon,
    },
    {
      label: "Inbox",
      icon: InboxArrowDownIcon,
    },
    {
      label: "Help",
      icon: LifebuoyIcon,
    },
    {
      label: "Settings",
      icon: Cog6ToothIcon,
    },
    {
      label: "Sign Out",
      icon: PowerIcon,
    },
  ]
}




const signupInputData = [
  { name: "userName", type: "text", label: "Username" },
  { name: "email", type: "email", label: "Email" },
  { name: "contactNumber", type: "text", label: "Contact Number" },
  { name: "password", type: "password", label: "Password" },
];

const loginInputData = [
  { name: "email", type: "email", label: "Email" },
  { name: "password", type: "password", label: "Password" },
];

const userDataDialogInputSetOne = [
  { name: "dateOfBirth", type: "date", label: "DOB" },
];


const userDataDialogInputSetTwo = [
  { name: "proImg", type: "file", label: "Profile Image" },
  { name: "shortReel", type: "file", label: "Short Reel" },
];

export {
  navbarData,
  signupInputData,
  loginInputData,
  userDataDialogInputSetOne,
  userDataDialogInputSetTwo,
};
