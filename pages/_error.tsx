import { Container } from "bookmarker-ui";

export default function Error({ statusCode }: { statusCode: any }) {
  return (
    <Container alignCenter justifyCenter fullHeight>
      {statusCode
        ? `An error ${statusCode} occurred on server`
        : "An error occurred on client"}
    </Container>
  );
}

Error.getInitialProps = ({ res, err }: { res: any; err: any }) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  return { statusCode };
};
