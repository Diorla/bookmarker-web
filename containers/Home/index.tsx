import { Key, useEffect, useState } from "react";
import { useUser } from "../../context/userContext";
import fetchUrls from "../../services/fetchUrls";
import styled from "styled-components";
import { useWindowScroll } from "react-use";
import deleteUrl from "../../services/deleteUrl";
import signOut from "../../services/signOut";

const Wrapper = styled.div`
  padding: 4px;
  width: clamp(240px, 100%, 960px);
  margin: auto;
`;

const Item = styled.div`
  box-shadow: 0 0 4px silver;
  display: flex;
  align-items: flex-start;
  flex-wrap: wrap;
  padding: 4px;
  flex-direction: column;
  margin-bottom: 8px;
  background-color: white;
`;

const Row = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
`;

const Image = styled.img`
  height: 24px;
  width: 24px;
  margin-right: 8px;
`;

const Link = styled.a`
  color: #5177bd;
  &:hover {
    color: cornflowerblue;
  }
`;

const Span = styled.div`
  border: 1px solid teal;
  margin: 4px;
  padding: 4px 8px;
  border-radius: 16px;
  transition: 0.3s;
  &:hover {
    background-color: #ade1e1;
  }
`;

const Delete = styled.button`
  cursor: pointer;
  border: none;
  padding: 4px 6px;
  font-size: 14px;
  border-radius: 4px;
  text-transform: uppercase;
  transition: 0.3s;
  &:hover {
    background-color: teal;
    color: white;
  }
`;

const InputWrapper = styled.div<{ elevated: boolean }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: sticky;
  top: 0;
  background: ${({ elevated }) => (elevated ? "white" : "transparent")};
  padding: 8px;
  transition: 0.3s;
  box-shadow: ${({ elevated }) => (elevated ? "0 4px 8px silver" : "none")};
  margin-bottom: 8px;
`;

const Input = styled.input`
  width: clamp(120px, 80%, 240px);
  padding: 4px;
  border: 1px solid silver;
  outline: none;
  &:focus {
    border: 1px solid gray;
  }
`;

export default function Home() {
  const { user } = useUser();
  const [search, setSearch] = useState("");
  const [links, setLinks] = useState([]);
  const [loading, setLoading] = useState(true);
  const { y } = useWindowScroll();
  useEffect(() => {
    const unsubscribe = fetchUrls(user.uid, (links) => {
      setLinks(links);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) return <img src="spinner.gif" />;
  return (
    <Wrapper>
      <InputWrapper elevated={y > 5}>
        <Input
          type="search"
          placeholder="filter"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button onClick={() => signOut()}>Sign out</button>
      </InputWrapper>
      <div>
        {links
          .filter((item) => {
            const searchField = (
              item.title + item.tags.join(" ")
            ).toLowerCase();
            return searchField.includes(search.toLowerCase());
          })
          .sort((prev, next) =>
            prev.title.toLowerCase() > next.title.toLowerCase() ? 1 : -1
          )
          .map((item) => {
            const { tags = [] } = item;
            return (
              <Item key={item.id} className="item">
                <Row
                  style={{
                    justifyContent: "space-between",
                    width: "100%",
                  }}
                >
                  <Row style={{ padding: 4 }}>
                    <Image src={item.favicon || "favicon.ico"} />
                    <Link
                      href={item.url}
                      target="_blank"
                      referrerPolicy="no-referrer"
                    >
                      {item.title}
                    </Link>
                  </Row>
                  <Delete
                    onClick={() =>
                      deleteUrl(user.uid, item.id).catch((err) =>
                        console.log(err.message)
                      )
                    }
                  >
                    Delete
                  </Delete>
                </Row>
                <Row>
                  {tags.map((item: string, idx: Key) => (
                    <Span key={idx}>{item}</Span>
                  ))}
                </Row>
              </Item>
            );
          })}
      </div>
    </Wrapper>
  );
}
