import { SetStateAction, useState } from "react";
import { useUser } from "context/userContext";
import { useWindowSize } from "react-use";
import deleteUrl from "services/deleteUrl";
import LinkCard from "components/link-card";
import Main from "./Main";
import getNumOfLinks from "./getNumOfLinks";
import Info from "./Info";
import { Input, Loader, SelectItem } from "bookmarker-ui";
import StyledSelect from "./StyledSelect";
import Layout from "containers/Layout";
import Footer from "../Footer";
import UrlProps from "types/UrlProps";

export default function Home({ links }: { links: UrlProps[] }) {
  const { user } = useUser();
  const [search, setSearch] = useState("");

  const [ungrouped, _setUngrouped] = useState(String(Math.random()));
  const { width } = useWindowSize();
  const widthLimit = 600;
  const [currentCollection, setCurrentCollection] = useState("");

  const { collections = [] } = user;

  const filteredLinks = links
    .filter(({ title, url, tags = [] }) => {
      const searchField = (title + url + tags.join(" ")).toLowerCase();
      return searchField.includes(search.toLowerCase());
    })
    .filter(({ collection = "" }) => {
      if (currentCollection === ungrouped) return collection === "";
      return currentCollection ? collection === currentCollection : true;
    });

  let selectTitle = currentCollection;
  if (selectTitle === ungrouped) selectTitle = "Ungrouped";

  return (
    <Layout
      activePath="home"
      search={
        width > widthLimit && (
          <Input
            type="search"
            placeholder="filter"
            value={search}
            onChange={(e: { target: { value: SetStateAction<string> } }) =>
              setSearch(e.target.value)
            }
          />
        )
      }
    >
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
        <StyledSelect title={selectTitle || "All"}>
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
          <hr />
          <SelectItem onClick={() => setCurrentCollection(ungrouped)}>
            Ungrouped
          </SelectItem>
          <SelectItem onClick={() => setCurrentCollection("")}>
            Clear ❌
          </SelectItem>
        </StyledSelect>
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
      <Footer />
    </Layout>
  );
}
