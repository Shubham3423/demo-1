import React, { useEffect, useState } from "react";
import { userdata } from './userdata';

import {
  Card,
  Avatar,
  Modal,
  Button,
  Form,
  Input,
  Select,
  Tooltip,
  Space,
  Typography,
} from "antd";
import {
  HeartFilled,
  DeleteOutlined,
  EditOutlined,
  EllipsisOutlined,
  GlobalOutlined,
  HeartOutlined,
  MailOutlined,
  PhoneOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";

const { Meta } = Card;

function Tile({ id, avt, Sname, email, liked, mobilenumber, link }) {
  const userdata = useSelector(state => state);
  const dispatch = useDispatch();
  const currentUser = userdata.find((user) => user.id == id)
  let [state, setState] = useState({ loading: false, visible: false });
  let [uname, setuname] = useState(Sname);
  let [Email, setEmail] = useState(email);
  let [Phone, setPhone] = useState(mobilenumber);
  let [Website, setWebsite] = useState(link);
  let [ids, setIds] = useState(id);
  let [like, setLikes] = useState(liked);

  useEffect(() => {
    if (currentUser) {
      setIds(currentUser.id)
      setuname(currentUser.name);
      setEmail(currentUser.email);
      setPhone(currentUser.mobilenumber);
      setWebsite(currentUser.link);
    }
  }, [currentUser])


  let unameinput = (e) => { setuname(e.target.value); console.log(uname) }
  let Emailinput = (e) => setEmail(e.target.value);
  let Phoneinput = (e) => setPhone(e.target.value);
  let Websiteinput = (e) => setWebsite(e.target.value);

  let showModal = () => {

    setState({
      visible: true,

    });

  };
  const updateUser = (data) => {
    dispatch({ type: "UPDATE_USER", payload: data });
  }
  let handleOk = () => {
    const data = {
      id: currentUser.id,
      email: Email,
      name: uname,
      mobilenumber: Phone,
      link: Website,
      like: like
    };

    updateUser(data);
    setState({ loading: true });

    setTimeout(() => {
      setState({ loading: false, visible: false });
    }, 3000);
  };

  const delteUser = (id) => {
    dispatch({ type: "DELETE_USER", payload: id });
  }
  let del = (ids) => {
    delteUser(ids)
  };

  const Like = (data) => {
    dispatch({ type: "LIKE_USER", payload: data });
  }

  let onLike = () => {
    if (like === true) {
      setLikes(false);
    }
    else {
      setLikes(true);
    }
    const data = {
      id: currentUser.id,
      email: Email,
      name: uname,
      mobilenumber: Phone,
      link: Website,
      like: like
    };
    Like(data);
  };


  let handleCancel = () => {
    setState({ visible: false });
  };

  let onFinish = () => { }




  return (
    <div>

      <Card
        style={{ width: 250 }}
        cover={<img src={avt} />}
        actions={[
          like ? <HeartFilled key="like" onClick={onLike} style={{ color: "red" }} /> : <HeartOutlined key="like" onClick={onLike} style={{ color: "red" }} />,
          <EditOutlined key="edit" onClick={showModal} />,
          <DeleteOutlined key="delete" onClick={() => del(ids)} />,
        ]}
      >
        <Meta
          title={Sname}
          description={
            <p>
              <MailOutlined />
              {email}
              <br></br>
              <PhoneOutlined />
              {mobilenumber}
              <br></br>
              <GlobalOutlined />
              {link}
              <br></br>
            </p>
          }
        />

      </Card>

      <Modal
        visible={state.visible}
        title="Basic Modal"
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          <Button key="back" onClick={handleCancel}>
            Cancel
          </Button>,
          <Button
            key="submit"
            type="primary"
            loading={state.loading}
            onClick={handleOk}
          >
            Ok
          </Button>,
        ]}
      >
        <form className="editForm" onSubmit={onFinish}>
          <div>
            <label className="Shubham" htmlFor='Username'>Username</label>
            <input
              name='Username'
              placeholder='Username'
              value={uname}
              onChange={unameinput}
            />
          </div>
          <div>
            <label htmlFor='Email'>Email</label>
            <input
              name='Email'
              placeholder='Email'
              value={Email}
              onChange={Emailinput}
            />
          </div>
          <div>
            <label htmlFor='Phone'>Phone</label>
            <input
              name='Phone'
              placeholder='Phone'
              value={Phone}
              onChange={Phoneinput}
            />
          </div>
          <div>
            <label htmlFor='Website'>Website</label>
            <input
              name='Website'
              placeholder='Website'
              value={Website}
              onChange={Websiteinput}
            />
          </div>

        </form>


      </Modal>
    </div >
  );
}


const mapStateToProps = (state) => ({
  contacts: state,
});
const mapDispatchToProps = (dispatch) => ({
  updateContact: (data) => {
    dispatch({ type: "UPDATE_CONTACT", payload: data });
  },
});

export default Tile;
