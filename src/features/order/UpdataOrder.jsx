import { useFetcher } from "react-router-dom";
import Button from "../../ui/Button";
import { updateOrder } from "../../services/apiRestaurant";

function UpdataOrder({ order }) {
  const fetcher = useFetcher();
  function handlePriority() {}
  return (
    <fetcher.Form method="PATCH" className="text-right">
      <Button type="primary" onClick={handlePriority}>
        set as Priority
      </Button>
    </fetcher.Form>
  );
}

export default UpdataOrder;

export async function action({ request, params }) {
  const data = { priority: true };
  // params contain the informations about current URL(orderID)
  await updateOrder(params.orderID, data);
  return null;
}
