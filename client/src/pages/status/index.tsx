import { Button, Result, Row } from "antd";
import React from "react";
import { Link, useParams } from "react-router-dom";

const Statuses: Record<string, string> = {
  created: "Employee successfully added!",
  updated: "Employee successfully updated!",
  deleted: "Employee successfully removed!",
};

export const Status = () => {
  const { status } = useParams();

  return (
    <Row align="middle" justify="center" style={{ width: "100%" }}>
      <Result
        status={status ? "success" : 404}
        title={status ? Statuses[status] : "Unknown"}
        extra={<Button key='dashboard' ><Link to='/'>Go home</Link></Button>}
      />
    </Row>
  );
};
