import React from "react";
import { Query, Mutation } from "react-apollo";
import gql from "graphql-tag";
import MyTable from "./styles/Table";
import Table from "rc-table";
import ErrorMessage from "./ErrorMessage";
import SickButton from "./styles/SickButton";

export const ALL_USER_QUERY = gql`
  query ALL_USER_QUERY {
    users {
      key: id
      name
      email
      permissions
    }
  }
`;

const UPDATE_PERMISSIONS_MUTATION = gql`
  mutation UPDATE_PERMISSIONS_MUTATION($permissions: [Permission]!, $id: ID!) {
    updatePermissions(permissions: $permissions, id: $id) {
      id,
      permissions
    }
  }
`

const initColumns = [
  {
    key: "name",
    title: "Name",
    dataIndex: "name"
  },
  {
    key: "email",
    title: "Email",
    dataIndex: "email"
  }
];

const permissionsDict = [
  "ADMIN",
  "USER",
  "ITEMCREATE",
  "ITEMUPDATE",
  "ITEMDELETE",
  "PERMISSIONUPDATE"
];

const Permissions = props => (
  <Query query={ALL_USER_QUERY}>
    {({ data, loading, error }) => {
      if (loading) return <p>Loading...</p>;
      return (
        <>
          <ErrorMessage error={error} />
          <PermissionsTable
            data={data.users}
          />
        </>
      );
    }}
  </Query>
);

class PermissionsTable extends React.Component {

  state = {
    data: this.props.data
  };

  handleCheck = e => {
    const newData = this.state.data;
    const target = newData
      .find(obj => obj.key === e.target.name);
    if (target) {
      if(e.target.checked) {
        target.permissions.push(e.target.value);
      }
      else {
        target.permissions = target.permissions
          .filter(p => p !== e.target.value);
      }
      this.setState({ data: newData });
    }
  }

  columns = [
    ...initColumns,
    ...permissionsDict.map(p => ({
      key: p,
      title: p,
      dataIndex: p,
      render: (val, rec) => {
        return <input type="checkbox" value={p} name={rec.key} onChange={this.handleCheck} checked={rec.permissions.includes(p)} />
      }
    }))
  ];

  render() {
    return (
      <Mutation mutation={UPDATE_PERMISSIONS_MUTATION} refetchQueries={[{ query: ALL_USER_QUERY }]}>
      {(updatePermissions, { data, loading, error }) => {
        if(loading) return <p>Loading...</p>
        if(error) return <ErrorMessage error={error} />
        return <Table
          components={{ table: MyTable }}
          columns={
            this.columns
              .concat({
                key: "action",
                title: "👇",
                dataIndex: "",
                render: (val, rec) => <SickButton onClick={
                  () => updatePermissions({variables: {permissions: rec.permissions, id: rec.key}})
                }>UPDATE</SickButton>
              })
          }
          data={this.state.data}
        /> 
      }}
      </Mutation>
    );
  }
}

export default Permissions;
