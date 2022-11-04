import { SetStateAction } from "react";
import UrlProps from "types/UrlProps";

export default interface SelectCollectionProps {
  collection: string;
  addNewCollection: boolean;
  newCollection: string;
  setNewCollection: {
    (value: SetStateAction<string>): void;
    (arg0: SetStateAction<string>): void;
  };
  userId: string;
  setAddNewCollection: {
    (value: SetStateAction<boolean>): void;
    (arg0: boolean): void;
  };
  collections: string[];
  setTabInfo: {
    (value: SetStateAction<UrlProps>): void;
    (arg0: {
      collection: string;
      id: string;
      title: string;
      favicon: string;
      url: string;
      tags: string[];
      description: string;
      pinned: boolean;
    }): void;
  };
  tabInfo: UrlProps;
  setModified: {
    (value: SetStateAction<boolean>): void;
    (arg0: boolean): void;
  };
}
