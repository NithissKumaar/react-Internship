import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { saveFormThunk } from "../../redux/thunks/formThunk";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { Type, Hash, ChevronDown, CheckSquare, CircleDot, AlignLeft, Calendar, Mail, Phone, Star, Trash2, Save, Copy, GripVertical, Plus, X, ArrowLeft } from "lucide-react";

const toolbox = [
  { id: "text", name: "Text Input", icon: Type },
  { id: "textarea", name: "Text Area", icon: AlignLeft },
  { id: "number", name: "Number", icon: Hash },
  { id: "email", name: "Email", icon: Mail },
  { id: "phone", name: "Phone", icon: Phone },
  { id: "dropdown", name: "Dropdown", icon: ChevronDown },
  { id: "radio", name: "Radio Group", icon: CircleDot },
  { id: "checkbox", name: "Checkbox", icon: CheckSquare },
  { id: "date", name: "Date", icon: Calendar },
  { id: "rating", name: "Rating", icon: Star },
];

const defaultField = (selected) => {
  const base = { id: Date.now().toString(), type: selected.id, label: selected.name, placeholder: "", required: false };
  if (selected.id === "dropdown" || selected.id === "radio") base.options = ["Option 1", "Option 2"];
  if (selected.id === "rating") base.maxStars = 5;
  return base;
};

export default function FormBuilder() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [title, setTitle] = useState("Untitled Form");
  const [fields, setFields] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [savedMessage, setSavedMessage] = useState("");
  const [previewValues, setPreviewValues] = useState({});

  const dragEnd = (result) => {
    if (!result.destination) return;
    if (result.source.droppableId === "toolbox") {
      const selected = toolbox[result.source.index];
      const newField = defaultField(selected);
      const insertAt = result.destination.index;
      const updated = [...fields];
      updated.splice(insertAt, 0, newField);
      setFields(updated);
      setSelectedId(newField.id);
      return;
    }
    if (result.source.droppableId === "canvas" && result.destination.droppableId === "canvas") {
      const updated = [...fields];
      const [moved] = updated.splice(result.source.index, 1);
      updated.splice(result.destination.index, 0, moved);
      setFields(updated);
    }
  };

  const update = (id, key, value) => { setFields(fields.map((f) => (f.id === id ? { ...f, [key]: value } : f))); };
  const updateOption = (id, index, value) => { setFields(fields.map((f) => { if (f.id !== id) return f; const options = [...f.options]; options[index] = value; return { ...f, options }; })); };
  const addOption = (id) => { setFields(fields.map((f) => f.id === id ? { ...f, options: [...f.options, `Option ${f.options.length + 1}`] } : f)); };
  const removeOption = (id, index) => { setFields(fields.map((f) => f.id !== id ? f : { ...f, options: f.options.filter((_, i) => i !== index) })); };
  const remove = (id) => { setFields(fields.filter((x) => x.id !== id)); if (selectedId === id) setSelectedId(null); };
  const duplicate = (id) => { const field = fields.find((f) => f.id === id); if (!field) return; const copy = { ...field, id: Date.now().toString(), label: field.label + " (copy)" }; const index = fields.findIndex((f) => f.id === id); const updated = [...fields]; updated.splice(index + 1, 0, copy); setFields(updated); };
  const setPreviewValue = (id, value) => { setPreviewValues((prev) => ({ ...prev, [id]: value })); };

  const handleSave = () => {
    if (fields.length === 0) { setSavedMessage("Add at least one field before saving"); setTimeout(() => setSavedMessage(""), 2000); return; }
    dispatch(saveFormThunk({ title, fields })).then(() => { setSavedMessage("Form saved!"); setTimeout(() => { setSavedMessage(""); navigate("/forms"); }, 800); });
  };

  const renderInput = (field, { interactive = false } = {}) => {
    const commonClasses = "w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition";
    const value = previewValues[field.id];
    switch (field.type) {
      case "text": return <input type="text" placeholder={field.placeholder || "Enter text"} className={commonClasses} value={interactive ? value || "" : ""} onChange={(e) => interactive && setPreviewValue(field.id, e.target.value)} readOnly={!interactive} />;
      case "textarea": return <textarea placeholder={field.placeholder || "Enter text"} rows={3} className={commonClasses + " resize-none"} value={interactive ? value || "" : ""} onChange={(e) => interactive && setPreviewValue(field.id, e.target.value)} readOnly={!interactive} />;
      case "number": return <input type="number" placeholder={field.placeholder || "0"} className={commonClasses} value={interactive ? value || "" : ""} onChange={(e) => interactive && setPreviewValue(field.id, e.target.value)} readOnly={!interactive} />;
      case "email": return <input type="email" placeholder={field.placeholder || "name@example.com"} className={commonClasses} value={interactive ? value || "" : ""} onChange={(e) => interactive && setPreviewValue(field.id, e.target.value)} readOnly={!interactive} />;
      case "phone": return <input type="tel" placeholder={field.placeholder || "+1 (555) 000-0000"} className={commonClasses} value={interactive ? value || "" : ""} onChange={(e) => interactive && setPreviewValue(field.id, e.target.value)} readOnly={!interactive} />;
      case "dropdown":
        return (
          <select className={commonClasses} value={interactive ? value || "" : ""} onChange={(e) => interactive && setPreviewValue(field.id, e.target.value)}>
            <option value="" disabled>Select an option</option>
            {field.options.map((o, i) => <option key={i} value={o}>{o}</option>)}
          </select>
        );
      case "radio":
        return (
          <div className="space-y-2">
            {field.options.map((o, i) => (
              <label key={i} className="flex items-center gap-2 text-sm text-gray-700">
                <input type="radio" name={field.id} value={o} checked={interactive ? value === o : false} onChange={() => interactive && setPreviewValue(field.id, o)} className="text-blue-600 focus:ring-blue-500" />{o}
              </label>
            ))}
          </div>
        );
      case "checkbox":
        return (
          <label className="flex items-center gap-2 text-sm text-gray-700">
            <input type="checkbox" checked={interactive ? !!value : false} onChange={(e) => interactive && setPreviewValue(field.id, e.target.checked)} className="rounded text-blue-600 focus:ring-blue-500 w-4 h-4" />{field.placeholder || "I agree"}
          </label>
        );
      case "date": return <input type="date" className={commonClasses} value={interactive ? value || "" : ""} onChange={(e) => interactive && setPreviewValue(field.id, e.target.value)} readOnly={!interactive} />;
      case "rating":
        return (
          <div className="flex gap-1">
            {Array.from({ length: field.maxStars || 5 }).map((_, i) => (
              <Star key={i} size={22} className={`cursor-pointer transition ${interactive && value && i < value ? "fill-blue-500 text-blue-500" : "text-gray-300 hover:text-blue-300"}`} onClick={() => interactive && setPreviewValue(field.id, i + 1)} />
            ))}
          </div>
        );
      default: return null;
    }
  };

  const selectedField = fields.find((f) => f.id === selectedId);

  return (
    <div className="h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-8 py-4 flex justify-between items-center shrink-0">
        <div>
          <input value={title} onChange={(e) => setTitle(e.target.value)} className="text-xl font-semibold text-gray-900 border-none focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-lg px-1 -mx-1" />
          <p className="text-sm text-gray-500">Drag elements to design your form</p>
        </div>
        <div className="flex items-center gap-3">
          <button onClick={() => navigate("/forms")} className="mt-2 inline-flex items-center gap-2 text-blue-600 font-medium text-sm cursor-pointer"><ArrowLeft size={16} />Back to Forms</button>
          {savedMessage && <span className="text-sm text-blue-600 font-medium">{savedMessage}</span>}
          <button onClick={handleSave} className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg flex items-center gap-2 text-sm font-medium transition cursor-pointer"><Save size={16} />Save Form</button>
        </div>
      </header>
      <DragDropContext onDragEnd={dragEnd}>
        <div className="grid grid-cols-12 flex-1 overflow-hidden">
          {/* LEFT — Toolbox */}
          <div className="col-span-2 bg-white border-r border-gray-200 p-4 overflow-y-auto">
            <h3 className="font-semibold text-gray-900 text-sm mb-4 uppercase tracking-wide">Elements</h3>
            <Droppable droppableId="toolbox" isDropDisabled={true}>
              {(provided) => (
                <div ref={provided.innerRef} {...provided.droppableProps}>
                  {toolbox.map((item, index) => {
                    const Icon = item.icon;
                    return (
                      <Draggable key={item.id} draggableId={item.id} index={index}>
                        {(provided, snapshot) => (
                          <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps} className={`bg-gray-50 hover:bg-blue-50 hover:border-blue-300 border border-gray-200 rounded-lg px-3 py-2.5 mb-2 flex items-center gap-3 cursor-grab text-sm text-gray-700 transition ${snapshot.isDragging ? "shadow-lg bg-blue-50 border-blue-300" : ""}`}>
                            <Icon size={16} className="text-blue-600" />{item.name}
                          </div>
                        )}
                      </Draggable>
                    );
                  })}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </div>
          {/* CENTER — Canvas */}
          <div className="col-span-7 p-6 overflow-y-auto">
            <div className="bg-white rounded-xl border border-gray-200 min-h-full p-6">
              <h2 className="text-base font-semibold text-gray-900 mb-1">Form Canvas</h2>
              <p className="text-sm text-gray-500 mb-5">Drop fields here, drag to reorder, click to edit</p>
              <Droppable droppableId="canvas">
                {(provided) => (
                  <div ref={provided.innerRef} {...provided.droppableProps} className="space-y-3 min-h-[200px]">
                    {fields.length === 0 && <div className="border-2 border-dashed border-gray-200 rounded-xl py-16 text-center text-gray-400 text-sm">Drag an element from the left to get started</div>}
                    {fields.map((field, index) => (
                      <Draggable key={field.id} draggableId={field.id} index={index}>
                        {(provided, snapshot) => (
                          <div ref={provided.innerRef} {...provided.draggableProps} onClick={() => setSelectedId(field.id)} className={`group border rounded-xl p-4 cursor-pointer transition ${selectedId === field.id ? "border-blue-500 ring-2 ring-blue-100" : "border-gray-200 hover:border-blue-200"} ${snapshot.isDragging ? "shadow-lg" : ""} bg-white`}>
                            <div className="flex items-center justify-between mb-3">
                              <div className="flex items-center gap-2">
                                <span {...provided.dragHandleProps} className="text-gray-400 hover:text-gray-600 cursor-grab"><GripVertical size={16} /></span>
                                <span className="text-sm font-medium text-gray-900">{field.label}{field.required && <span className="text-red-500 ml-1">*</span>}</span>
                                <span className="text-xs text-gray-400 bg-gray-100 px-2 py-0.5 rounded-md">{toolbox.find((t) => t.id === field.type)?.name}</span>
                              </div>
                              <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition">
                                <button onClick={(e) => { e.stopPropagation(); duplicate(field.id); }} className="text-gray-400 hover:text-blue-600 p-1 cursor-pointer" title="Duplicate"><Copy size={15} /></button>
                                <button onClick={(e) => { e.stopPropagation(); remove(field.id); }} className="text-gray-400 hover:text-red-500 p-1 cursor-pointer" title="Delete"><Trash2 size={15} /></button>
                              </div>
                            </div>
                            <div className="pointer-events-none opacity-90">{renderInput(field)}</div>
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </div>
          </div>
          {/* RIGHT — Properties / Preview */}
          <div className="col-span-3 bg-white border-l border-gray-200 p-5 overflow-y-auto">
            {selectedField ? (
              <>
                <div className="flex items-center justify-between mb-4">
                  <h2 className="font-semibold text-gray-900 text-sm uppercase tracking-wide">Field Settings</h2>
                  <button onClick={() => setSelectedId(null)} className="text-gray-400 hover:text-gray-600"><X size={16} /></button>
                </div>
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-medium text-gray-500 mb-1.5">Label</label>
                    <input value={selectedField.label} onChange={(e) => update(selectedField.id, "label", e.target.value)} className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
                  </div>
                  {["text", "textarea", "number", "email", "phone"].includes(selectedField.type) && (
                    <div>
                      <label className="block text-xs font-medium text-gray-500 mb-1.5">Placeholder</label>
                      <input value={selectedField.placeholder} onChange={(e) => update(selectedField.id, "placeholder", e.target.value)} className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
                    </div>
                  )}
                  {selectedField.type === "checkbox" && (
                    <div>
                      <label className="block text-xs font-medium text-gray-500 mb-1.5">Checkbox label</label>
                      <input value={selectedField.placeholder} onChange={(e) => update(selectedField.id, "placeholder", e.target.value)} className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
                    </div>
                  )}
                  {(selectedField.type === "dropdown" || selectedField.type === "radio") && (
                    <div>
                      <label className="block text-xs font-medium text-gray-500 mb-1.5">Options</label>
                      <div className="space-y-2">
                        {selectedField.options.map((o, i) => (
                          <div key={i} className="flex items-center gap-2">
                            <input value={o} onChange={(e) => updateOption(selectedField.id, i, e.target.value)} className="flex-1 rounded-lg border border-gray-200 px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
                            <button onClick={() => removeOption(selectedField.id, i)} className="text-gray-400 hover:text-red-500 cursor-pointer"><X size={14} /></button>
                          </div>
                        ))}
                      </div>
                      <button onClick={() => addOption(selectedField.id)} className="mt-2 text-blue-600 text-sm flex items-center gap-1 font-medium hover:text-blue-700"><Plus size={14} />Add option</button>
                    </div>
                  )}
                  {selectedField.type === "rating" && (
                    <div>
                      <label className="block text-xs font-medium text-gray-500 mb-1.5">Max stars</label>
                      <input type="number" min={1} max={10} value={selectedField.maxStars} onChange={(e) => update(selectedField.id, "maxStars", Number(e.target.value))} className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
                    </div>
                  )}
                  <label className="flex items-center gap-2 text-sm text-gray-700 pt-2">
                    <input type="checkbox" checked={selectedField.required} onChange={(e) => update(selectedField.id, "required", e.target.checked)} className="rounded text-blue-600 focus:ring-blue-500 w-4 h-4" />Required field
                  </label>
                </div>
                <hr className="my-5 border-gray-200" />
              </>
            ) : null}
            <h2 className="font-semibold text-gray-900 text-sm uppercase tracking-wide mb-4">Live Preview</h2>
            <div className="space-y-5">
              {fields.length === 0 && <p className="text-sm text-gray-400">Your form preview will appear here</p>}
              {fields.map((field) => (
                <div key={field.id}>
                  {field.type !== "checkbox" && <label className="block text-sm font-medium text-gray-700 mb-1.5">{field.label}{field.required && <span className="text-red-500 ml-1">*</span>}</label>}
                  {renderInput(field, { interactive: true })}
                </div>
              ))}
              {fields.length > 0 && <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg text-sm font-medium transition">Submit</button>}
            </div>
            {fields.length > 0 && (
              <div className="mt-8">
                <h4 className="font-semibold text-gray-900 text-sm uppercase tracking-wide mb-2">Schema (JSON)</h4>
                <pre className="bg-gray-900 text-blue-300 rounded-lg p-3 overflow-auto text-xs max-h-64">{JSON.stringify(fields, null, 2)}</pre>
              </div>
            )}
          </div>
        </div>
      </DragDropContext>
    </div>
  );
}