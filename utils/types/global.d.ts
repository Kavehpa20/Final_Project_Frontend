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

// interface categories {
//   id: number;
//   title: string;
//   name: string;
//   path: string;
//   products: products[];
// }

// interface products {
//   id: number;
//   name: string;
//   link: string;
//   type: string;
// }

// interface IProductsProps {
//   data: categories[];
// }

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

type Users = {
  firstname: string;
  lastname: string;
};

interface ISubcategory {
  data: {
    subcategories: ISubcat[];
  };
}

interface ISubcat {
  _id: string;
  name: string;
  category: {
    _id: string;
    name: string;
  };
}

interface ICreateContext {
  openModal: boolean;
  setOpenModal: Dispatch<SetStateAction<boolean>>;
  currentPage: number;
  setCurrentPage: Dispatch<SetStateAction<number>>;
  onPageChange: Function;
  selectedValue: string;
  setSelectedValue: Dispatch<SetStateAction<string>>;
  handleRadioChange: Function;
  OrdersTableData: UseQueryResult<Group[], Error>;
  OrdersDeliveryData: UseQueryResult<Group[], Error>;
  NoOrdersDeliveryData: UseQueryResult<Group[], Error>;
  CategoryAndSubcategory: UseQueryResult<Group[], Error>;
  showAddingModal: boolean;
  setShowAddingModal: Dispatch<SetStateAction<boolean>>;
  onCloseAddingModal: ModalProps;
  CategoriesNameData: UseQueryResult<Group[], Error>;
  openDeleteModal: boolean;
  setOpenDeleteModal: Dispatch<SetStateAction<boolean>>;
  productId: null | string;
  setProductId: Dispatch<SetStateAction<string>>;
  showEditingModal: boolean;
  setShowEditingModal: Dispatch<SetStateAction<boolean>>;
  onCloseEditingModal: ModalProps;
  openOrdersModal: boolean;
  setOpenOrdersModal: Dispatch<SetStateAction<boolean>>;
  currentPageOrders: number;
  setCurrentPageOrders: Dispatch<SetStateAction<number>>;
  onPageChangeOrders: Function;
  orderId: null | string;
  setOrderId: Dispatch<SetStateAction<boolean>>;
  // categoryAndSubcategoryList: string;
  // setCategoryAndSubcategoryList: Dispatch<SetStateAction<boolean>>;
  productDetail: IProduct;
  setProductDetail: Dispatch<SetStateAction<object>>;
  isLoading: boolean;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
}

interface IUserPanelContext {
  hello: string;
  setHello: Dispatch<SetStateAction<string>>;
}

interface IOrders {
  createdAt: string;
  deliveryDate: string;
  deliveryStatus: boolean;
  products: Array;
  totalPrice: number;
  updatedAt: string;
  user: string;
  _id: string;
}

interface IProduct {
  brand: string;
  description: string;
  quantity: number;
  thumbnail?: File[] | Array;
  images?: File[] | Array;
  name: string;
  subcategory: ISubcategories;
  category: ICategory;
  _id?: string;
  price: number;
  slugname?: string;
}

interface IProducts {
  product: IProduct;
  count: number;
  _id: string;
}

interface IAddingProduct {
  category: string;
  subcategory: string;
  name: string;
  price: string;
  quantity: string;
  brand: string;
  description: string;
  thumbnail: object;
  images: object;
}

interface IUser {
  address: string;
  createdAt: string;
  firstname: string;
  lastname: string;
  phoneNumber: string;
  role: string;
  updatedAt: string;
  username: string;
  _id: string;
}
