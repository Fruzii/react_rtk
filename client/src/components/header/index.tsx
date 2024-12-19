import React from "react";
import styles from "./index.module.css";
import { Layout, Space, Typography } from "antd";
import {
  LoginOutlined,
  LogoutOutlined,
  TeamOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { CustomButton } from "../custom_button";
import { Link, useNavigate } from "react-router-dom";
import { Paths } from "../../paths";
import { useDispatch, useSelector } from "react-redux";
import { logout, selectUser } from "../../features/auth/authSlice";

export const Header = () => {
  const user = useSelector(selectUser);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onLogoutClick = () => {
    dispatch(logout());
    localStorage.removeItem('token')
    navigate('/login')
  };

  return (
    <Layout.Header className={styles.header}>
      <Space>
        <TeamOutlined className={styles.teamIcon} />
        <Link to={Paths.home}>
          <CustomButton type="link">
            <Typography.Title level={1}>Employees</Typography.Title>
          </CustomButton>
        </Link>
      </Space>
      {user ? (
        <CustomButton
          type="text"
          icon={<LogoutOutlined />}
          onClick={onLogoutClick}
        >
          Log out
        </CustomButton>
      ) : (
        <Space>
          <Link to={Paths.login}>
            <CustomButton type="text" icon={<LoginOutlined />}>
              Log in
            </CustomButton>
          </Link>
          <Link to={Paths.register}>
            <CustomButton type="text" icon={<UserOutlined />}>
              Sign up
            </CustomButton>
          </Link>
        </Space>
      )}
    </Layout.Header>
  );
};
