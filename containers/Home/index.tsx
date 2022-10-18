import { SetStateAction, useEffect, useState } from "react";
import { useUser } from "../../context/userContext";
import fetchUrls from "../../services/fetchUrls";
import { useWindowSize } from "react-use";
import deleteUrl from "../../services/deleteUrl";
import signOut from "../../services/signOut";
import LinkCard from "../../components/link-card";
import Main from "./Main";
import UrlProps from "./UrlProps";
import getNumOfLinks from "./getNumOfLinks";
import Info from "./Info";
import {
  Container,
  Header,
  Input,
  Loader,
  MenuItem,
  Select,
  SelectItem,
} from "bookmarker-ui";

export default function Home() {
  const { user } = useUser();
  const [search, setSearch] = useState("");
  const [links, setLinks] = useState<UrlProps[]>([]);
  const [loading, setLoading] = useState(true);
  const { width } = useWindowSize();
  const widthLimit = 600;
  const [currentCollection, setCurrentCollection] = useState("");

  const { collections = [] } = user;
  useEffect(() => {
    const unsubscribe = fetchUrls(user.uid, (links) => {
      setLinks(links);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const filteredLinks = links
    .filter(({ title, url, tags = [] }) => {
      const searchField = (title + url + tags.join(" ")).toLowerCase();
      return searchField.includes(search.toLowerCase());
    })
    .filter(({ collection = "" }) => {
      return currentCollection ? collection === currentCollection : true;
    });

  if (loading) return <Loader fullHeight />;

  return (
    <Container alignCenter>
      <Header style={{ justifyContent: "space-between" }}>
        <MenuItem active href="/">
          <img
            src="https://bookmarker-one.vercel.app/favicon.ico"
            style={{ height: 24, width: 24 }}
          />
        </MenuItem>
        {width > widthLimit && (
          <Input
            type="search"
            placeholder="filter"
            value={search}
            onChange={(e: { target: { value: SetStateAction<string> } }) =>
              setSearch(e.target.value)
            }
          />
        )}
        <div style={{ display: "flex", flexDirection: "row" }}>
          <MenuItem href="/profile">Profile</MenuItem>
          <MenuItem onClick={() => signOut()}>Sign out</MenuItem>
        </div>
      </Header>
      <div style={{ margin: 8 }}>
        {width <= widthLimit && (
          <Input
            type="search"
            placeholder="filter"
            value={search}
            onChange={(e: { target: { value: SetStateAction<string> } }) =>
              setSearch(e.target.value)
            }
          />
        )}
      </div>
      <Info>
        <div>Welcome, {user.displayName}</div>
        <div>{getNumOfLinks(filteredLinks.length)}</div>
        <Select title={currentCollection || "All"}>
          {collections
            .sort((a, b) => (a > b ? 1 : -1))
            .map((item) => (
              <SelectItem
                onClick={() => {
                  setCurrentCollection(item);
                }}
                active={currentCollection === item}
                key={item}
              >
                {item}
              </SelectItem>
            ))}
          <SelectItem onClick={() => setCurrentCollection("")}>
            Clear ❌
          </SelectItem>
        </Select>
      </Info>
      <Main>
        {filteredLinks
          .sort((prev, next) =>
            prev.title.toLowerCase() > next.title.toLowerCase() ? 1 : -1
          )
          .map((item) => {
            const { tags = [], favicon, title, description, url } = item;
            return (
              <LinkCard
                url={url}
                favicon={favicon || "favicon.ico"}
                title={title}
                tags={tags}
                description={description}
                onDelete={() =>
                  deleteUrl(user.uid, item.id).catch((err) => console.log(err))
                }
                key={item.id}
              />
            );
          })}
      </Main>
    </Container>
  );
}
