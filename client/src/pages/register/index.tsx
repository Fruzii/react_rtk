import React from "react";
import { Layout } from "../../components/layout";
import { Card, Form, Row, Space, Typography } from "antd";
import { CustomInput } from "../../components/custom_input";
import { PasswordInput } from "../../components/password_input";
import { CustomButton } from "../../components/custom_button";
import { Link } from "react-router-dom";
import { Paths } from "../../paths";
export const Register = () => {
  return (
    <Layout>
      <Row align="middle" justify="center">
        <Card title="Registration" style={{ width: "30rem" }}>
          <Form onFinish={() => {}}>
            <CustomInput name="name" placeholder="Name" />
            <CustomInput type="email" name="email" placeholder="Email" />

            <PasswordInput name="password" placeholder="Password" />
            <PasswordInput
              name="confirmPassword"
              placeholder="Confirm password"
            />
            <CustomButton type="primary" htmlType="submit">
              Sign up
            </CustomButton>
          </Form>
          <Space direction="vertical" size="large">
            <Typography.Text>
              Already have an account? <Link to={Paths.login}>Log in!</Link>
            </Typography.Text>
          </Space>
        </Card>
      </Row>
    </Layout>
  );
};
