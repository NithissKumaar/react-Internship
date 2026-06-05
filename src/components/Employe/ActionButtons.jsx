import { Plus, Trash } from "lucide-react";

function ActionButtons({
  editable,
  onAdd,
  onDelete,
}) {
  return (
    <div className="flex gap-4">

      <button
        type="button"
        disabled={!editable}
        onClick={onAdd}
        className="cursor-pointer"
      >
        <Plus className="text-purple-600" />
      </button>

      <button
        type="button"
        onClick={onDelete}
        className="cursor-pointer"
      >
        <Trash className="text-red-600" />
      </button>

    </div>
  );
}

export default ActionButtons;