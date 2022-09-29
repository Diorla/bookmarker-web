import Center from "./Center";

export default function ErrorDiv({ error }: { error: Error }) {
  return (
    <Center>
      <div>{error.name}</div>
      <div>{error.message}</div>
    </Center>
  );
}
