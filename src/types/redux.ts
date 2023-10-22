export type Item = {
  id: string;
  firstPreviewImage: {
    watermarked?: string;
  };
  description: string;
  title: string;
  price: string;
  author: {
    details: {
      publicName: string;
    };
  };
};
export type State = {
  list: {
    items: Item[];
    page: number;
    total: number | null;
  };
};
