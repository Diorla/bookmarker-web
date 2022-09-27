export default interface CardProps {
  favicon: string;
  title: string;
  tags: string[];
  description: string;
  onDelete: () => void;
  url: string;
}
