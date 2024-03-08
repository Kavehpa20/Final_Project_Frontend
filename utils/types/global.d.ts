interface Slide {
  id: number;
  title: string;
  tagline: string;
  image: string;
  buttons: ButtonProps[];
}

interface ButtonProps {
  id: number;
  text: string;
  link: string;
  type: string;
}

interface DemoSliderProps {
  data: Slide[];
}

interface ButtonProps {
  id: number;
  text: string;
  link: string;
  type: string;
}

interface categories {
  id: number;
  title: string;
  name: string;
  path: string;
  products: products[];
}

interface products {
  id: number;
  name: string;
  link: string;
  type: string;
}

interface ProductsProps {
  data: categories[];
}

interface ILoginAdmin {
  username: string;
  password: string;
}

interface ICategory {
  _id: string;
  name: string;
  icon: string;
  createdAt: string;
  updatedAt: string;
  slugname: string;
}

interface ISubcategories {
  _id: string;
  category: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  slugname: string;
}

type Props = {
  text: string;
};
