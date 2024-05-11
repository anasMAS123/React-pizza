import { useLoaderData } from "react-router";
import { getMenu } from "../../services/apiRestaurant";
import MenuItem from "./MenuItem";

function Menu() {
  //step 3
  const menu = useLoaderData();

  return (
    <ul className=" divide-y divide-solid divide-stone-200 p-2">
      {menu.map((pizza) => (
        <MenuItem pizza={pizza} key={pizza.id} />
      ))}
    </ul>
  );
}
//step 1
export async function loader() {
  // named export
  const menu = await getMenu();
  return menu;
}

export default Menu; // default export
