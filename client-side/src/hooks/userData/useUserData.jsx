import { useEffect, useMemo, useState } from "react";
import { useLocation } from "react-router-dom";

export default function useUserData(dispatch,isUserDataDialogOpen) {
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [userGoogleData, setUserGoogleData] = useState(null);

  const handleFileChange = (event, setFile) => {
    const file = event.currentTarget.files[0];
    setFile(URL.createObjectURL(file));
  };

  function useQuery() {
    return new URLSearchParams(useLocation().search);
  }
  const query = useQuery();
  const user = useMemo(() => query.get("user"), [query]);

  useEffect(() => {
    if (user) {
      try {
        setUserGoogleData(JSON.parse(decodeURIComponent(user)));
      } catch (error) {
        console.error("Error parsing user data:", error);
      }
    }
  }, [user, isUserDataDialogOpen, dispatch]);

  return {
    selectedImage,
    setSelectedImage,
    selectedVideo,
    setSelectedVideo,
    userGoogleData,
    handleFileChange,
  };
}
