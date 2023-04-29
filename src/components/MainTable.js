import { useDispatch, useSelector } from "react-redux";
import { Table, Button } from "antd";
import { useTranslation } from "react-i18next";
import i18n from "../i18n";
import { useState } from "react";

import { peopleColumns } from "../store/rawData/peopleTableConfig";
import { removePerson, removeMultiple } from "../store";

function MainTable({ handleEditClick }) {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const peopleData = useSelector((state) => state.people.data);

  const [selectedRowKeys, setSelectedRowKeys] = useState([]);

  const handleDelete = (person) => {
    dispatch(removePerson(person.id));
    console.log(`Deleted person of ${person.name} (id: ${person.id})`);
  };

  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      setSelectedRowKeys(selectedRowKeys);
    },
    selectedRowKeys,
  };

  const handleMultiDelete = () => {
    dispatch(removeMultiple(selectedRowKeys));
    console.log("Deleted records of IDs: " + selectedRowKeys);
  };

  // Map over each column. For "birthDate", display localised date; for actions, display Buttons
  // Translate titles and Buttons
  const tColumns = peopleColumns.map((column) => ({
    ...column,
    title: t(`${column.title}`),
    render:
      column.key === "birthDate"
        ? (timestamp) => new Date(timestamp).toLocaleDateString(i18n.language)
        : column.key === "actions"
        ? (person) => {
            return (
              <div>
                <Button
                  onClick={() => handleEditClick(person)}
                  type="primary"
                  style={{ width: "80px", marginBottom: "5px" }}
                >
                  {t("edit")}
                </Button>
                <Button
                  onClick={() => handleDelete(person)}
                  type="primary"
                  danger
                  style={{ width: "80px" }}
                >
                  {t("delete")}
                </Button>
              </div>
            );
          }
        : column.render,
  }));

  return (
    <div>
      <div className="table">
        <Table
          dataSource={peopleData}
          columns={tColumns}
          pagination={{
            position: ["bottomRight"],
            pageSizeOptions: [10, 20, 50],
            locale: { items_per_page: `/ ${t("page")}` },
          }}
          rowKey={(peopleData) => peopleData.id}
          rowSelection={rowSelection}
        />
        <Button
          onClick={handleMultiDelete}
          type="primary"
          danger
          style={{ marginLeft: "10px" }}
        >
          {t("delete")}
        </Button>
      </div>
    </div>
  );
}

export default MainTable;
