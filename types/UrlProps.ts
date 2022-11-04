export default interface UrlProps {
  id: string;
  title: string;
  url: string;
  tags: string[];
  favicon: string;
  description: string;
  collection: string;
  pinned?: boolean;
}
