type Warehouse = {
  id: string;
  name: string;
  type: string;
  location: {
    latitute: number;
    longitute: number;
  };
};

export { type Warehouse };
