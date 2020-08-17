import React from "react";
import { graphql, QueryRenderer } from "react-relay";
import { environment } from "./relay";
import { AppQueryResponse } from "./__generated__/AppQuery.graphql";

const query = graphql`
  query AppQuery {
    users {
      edges {
        node {
          id
        }
      }
    }
  }
`;

function App_(props: AppQueryResponse): React.ReactElement {
  return (
    <div>
      {props.users.edges?.map((edge, i) => {
        return <div key={i}>{edge?.node?.id}</div>;
      })}
    </div>
  );
}

export default function App(): React.ReactElement {
  return (
    <QueryRenderer
      environment={environment}
      query={query}
      variables={{}}
      render={({ error, props }) => {
        if (error) {
          return <div>Error</div>;
        }
        if (!props) {
          return <div>Loading...</div>;
        }
        // @ts-expect-error
        return <App_ {...props} />;
      }}
    />
  );
}
