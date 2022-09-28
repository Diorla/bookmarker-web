import { useEffect, useState } from "react";
import { useUser } from "../../context/userContext";
import fetchUrls from "../../services/fetchUrls";
import { useWindowSize } from "react-use";
import deleteUrl from "../../services/deleteUrl";
import signOut from "../../services/signOut";
import Center from "../../components/Center";
import { Header, MenuItem } from "../../components/header";
import Card from "../../components/card";
import Input from "../../components/input";
import Container from "../../components/Container";
import Main from "./Main";
import UrlProps from "./UrlProps";
import getNumOfLinks from "./getNumOfLinks";
import styled from "styled-components";

const Info = styled.div`
  display: flex;
  justify-content: space-between;
  width: clamp(120px, 90%, 960px);
`;
export default function Home() {
  const { user } = useUser();
  const [search, setSearch] = useState("");
  const [links, setLinks] = useState<UrlProps[]>([]);
  const [loading, setLoading] = useState(true);
  const { width } = useWindowSize();
  const widthLimit = 600;
  useEffect(() => {
    const unsubscribe = fetchUrls(user.uid, (links) => {
      setLinks(links);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading)
    return (
      <Center>
        <img src="spinner.gif" />
      </Center>
    );
  const filteredLinks = links.filter(({ title, url, tags = [] }) => {
    const searchField = (title + url + tags.join(" ")).toLowerCase();
    return searchField.includes(search.toLowerCase());
  });
  return (
    <Container>
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
            onChange={(e) => setSearch(e.target.value)}
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
            onChange={(e) => setSearch(e.target.value)}
          />
        )}
      </div>
      <Info>
        <div>Welcome, {user.displayName}</div>
        <div>{getNumOfLinks(filteredLinks.length)}</div>
        <span></span>
      </Info>
      <Main>
        {filteredLinks
          .sort((prev, next) =>
            prev.title.toLowerCase() > next.title.toLowerCase() ? 1 : -1
          )
          .map((item) => {
            const { tags = [], favicon, title, description, url } = item;
            return (
              <Card
                url={url}
                favicon={favicon || "favicon.ico"}
                title={title}
                tags={tags}
                description={description}
                onDelete={() =>
                  deleteUrl(user.uid, item.id).catch((err) => console.log(err))
                }
              />
            );
          })}
      </Main>
    </Container>
  );
}
