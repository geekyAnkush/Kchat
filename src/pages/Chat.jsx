import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";
import { getAllUsersRoute } from "../utils/apiRoutes";
import Contacts from "../components/Contacts";

const Chat = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({});
  const [contacts, setContacts] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  useEffect(() => {
    const check = async () => {
      setUser(await JSON.parse(localStorage.getItem("kchat-user")));
      if (user?.isAvatarImageSet === false) {
        navigate("/setAvatar");
      }
    };
    check();
  }, [navigate, user.isAvatarImageSet]);
  useEffect(() => {
    const fetch = async () => {
      if (user) {
        const { data } = await axios.get(`${getAllUsersRoute}/${user._id}`);
        setContacts(data.data);
      }
    };
    fetch();
  }, [user]);
  const handleChatChange = (chat) => {
    setCurrentChat(chat);
  };
  return (
    <Container>
      <div className="container">
        <Contacts
          contacts={contacts}
          currentUser={user}
          changeChat={handleChatChange}
        />
      </div>
    </Container>
  );
};

const Container = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  background-color: #131324;
  .container {
    height: 85vh;
    width: 85vw;
    background-color: #00000076;
    display: grid;
    grid-template-columns: 25% 75%;
    @media screen and(min-width:750px) and(max-width:1000px) {
      grid-template-columns: 35% 65%;
    }
  }
`;

export default Chat;
