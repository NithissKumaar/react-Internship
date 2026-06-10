import { Plus, Trash } from "lucide-react";
import { showSuccess } from "../../../utils/toast";

function ActionButtons({ editable, onAdd, onDelete }) {
  return (
    <div className="flex justify-center min-w-[40px]">
      {editable ? (
        <button
          type="button"
          onClick={() => {
            onAdd();
            
          }}
          className="cursor-pointer"
        >
          <Plus className="text-purple-600" />
        </button>
      ) : (
        <button
          type="button"
          onClick={() => {
            onDelete();
            showSuccess("Contact Deleted");
          }}
          className="cursor-pointer"
        >
          <Trash className="text-red-600" />
        </button>
      )}
    </div>
  );
}

export default ActionButtons;