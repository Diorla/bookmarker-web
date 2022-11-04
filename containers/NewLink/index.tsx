import { Button, Chip, Container, Input, Textarea } from "bookmarker-ui";
import { useUser } from "context/userContext";
import { SetStateAction, useEffect, useState } from "react";
import UrlProps from "types/UrlProps";
import { v4 } from "uuid";
import addUrl from "services/addUrl";
import truncateText from "./truncateText";
import SelectCollection from "./SelectCollection";
import SpaceEvenly from "./SpaceEvenly";
import SpaceBetween from "./SpaceBetween";
import deleteUrl from "services/deleteUrl";

export default function NewLink({
  onClear,
  links,
  ...props
}: {
  title: string;
  favicon: string;
  url: string;
  onClear: () => void;
  links: UrlProps[];
}) {
  const [urlInfo, setUrlInfo] = useState<UrlProps>({
    tags: [],
    description: "",
    pinned: false,
    id: "",
    collection: "",
    ...props,
  });

  const { user } = useUser();

  const [tag, setTag] = useState("");
  const [isNewUrl, setIsNewUrl] = useState(true);
  const [modified, setModified] = useState(true);
  const [addNewCollection, setAddNewCollection] = useState(false);
  const [newCollection, setNewCollection] = useState("");

  useEffect(() => {
    const data = links.filter((item) => item.url === urlInfo.url)[0];

    let currentInfo = { ...urlInfo };

    if (data) {
      setIsNewUrl(false);
      setModified(false);
      currentInfo = {
        ...currentInfo,
        ...data,
      };
    }
    setUrlInfo({ ...currentInfo, id: currentInfo.id || v4() });
  }, []);

  const save = () => {
    addUrl(user.uid, { ...urlInfo }, urlInfo.id)
      .then(() => {
        setIsNewUrl(false);
        setModified(false);
      })
      .catch((err) => console.log(err));
  };

  const remove = () => {
    deleteUrl(user.uid, urlInfo.id)
      .then(() => {
        setIsNewUrl(true);
        setModified(true);
      })
      .catch((err) => console.log(err));
  };

  const { title, url, description, tags, collection } = urlInfo;
  const { collections = [] } = user;

  return (
    <div style={{ margin: 8 }}>
      <div
        style={{ textAlign: "center", overflowWrap: "anywhere" }}
        title={url}
      >
        {truncateText(url)}
      </div>
      <Input
        label="Name"
        value={title}
        onChange={(e: { target: { value: string } }) => {
          setUrlInfo({ ...urlInfo, title: e.target.value });
          setModified(true);
        }}
      />
      <SelectCollection
        collection={collection}
        addNewCollection={addNewCollection}
        newCollection={newCollection}
        setNewCollection={setNewCollection}
        userId={user.uid}
        setAddNewCollection={setAddNewCollection}
        collections={collections}
        setTabInfo={setUrlInfo}
        tabInfo={urlInfo}
        setModified={setModified}
      />
      <Input
        label="Tags"
        value={tag}
        onChange={(e: { target: { value: SetStateAction<string> } }) =>
          setTag(e.target.value)
        }
        onKeyDown={(e: { key: string }) => {
          if (e.key === "Enter") {
            if (tag) {
              setUrlInfo({
                ...urlInfo,
                tags: [...urlInfo.tags, tag.trim()],
              });
              setTag("");
              setModified(true);
            }
          }
        }}
        placeholder="Press enter to add tag"
      />
      <SpaceEvenly
        style={{
          margin: 4,
          flexWrap: "wrap",
        }}
      >
        {tags.map((item, idx) => (
          <Chip
            title={item}
            style={{ margin: 2 }}
            onClick={() => {
              setUrlInfo({
                ...urlInfo,
                tags: [
                  ...urlInfo.tags.slice(0, idx),
                  ...urlInfo.tags.slice(idx + 1),
                ],
              });
              setModified(true);
            }}
            key={idx}
            disabled={false}
          />
        ))}
      </SpaceEvenly>
      <Textarea
        label="Description"
        cols={15}
        rows={3}
        value={description}
        onChange={(e: { target: { value: string } }) => {
          setUrlInfo({ ...urlInfo, description: e.target.value });
          setModified(true);
        }}
      />
      <SpaceBetween style={{ margin: 4 }}>
        <Button variant="primary" onClick={save} disabled={!modified}>
          Save
        </Button>
        <Button variant="secondary" disabled={isNewUrl} onClick={remove}>
          Remove
        </Button>
      </SpaceBetween>
      <Container alignCenter justifyCenter>
        <Button onClick={onClear}>Close</Button>
      </Container>
    </div>
  );
}
