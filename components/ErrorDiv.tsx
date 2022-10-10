import { Container } from "bookmarker-ui";

export default function ErrorDiv({ error }: { error: Error }) {
  return (
    <Container alignCenter justifyCenter>
      <div>{error.name}</div>
      <div>{error.message}</div>
    </Container>
  );
}
