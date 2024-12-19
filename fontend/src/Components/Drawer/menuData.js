import {
  MdDashboard,
  MdSupervisedUserCircle,
  MdShoppingBag,
  MdAttachMoney,
  MdWork,
  MdAnalytics,
  MdPeople,
  MdOutlineSettings,
  MdHelpCenter,
  MdLogout,
  MdHome,
} from "react-icons/md";

export const menuItems = [
  {
    title: "Home",
    path: "/dashboard",
    icon: <MdHome />,
  },
  {
    title: "Me",
    path: "/dashboard/me",
    icon: <MdSupervisedUserCircle />,
  },
  {
    title: "Products",
    path: "/dashboard/products",
    icon: <MdShoppingBag />,
  },
  {
    title: "Transactions",
    path: "/dashboard/transactions",
    icon: <MdAttachMoney />,
  },
];
