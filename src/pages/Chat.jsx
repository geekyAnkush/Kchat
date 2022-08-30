import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Chat = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({});
  useEffect(() => {
    const check = async () => {
      let temp = await JSON.parse(localStorage.getItem("kchat-user"));
      setUser(temp);
      if (user?.isAvatarImageSet === false) {
        navigate("/setAvatar");
      }
    };
    check();
  }, [navigate, user.isAvatarImageSet]);
  return <div>Chat</div>;
};

export default Chat;
