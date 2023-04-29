import { useSelector } from "react-redux";

import GridViewer from "../components/GridViewer";

function ViewsPage() {
  const peopleData = useSelector((state) => state.people.data);

  return <GridViewer data={peopleData} rows={4} />;
}

export default ViewsPage;
