type ActivityRowProps = {
  name: string;
  points: number;
  checked: boolean;
  withCounter: boolean;
  count: number;
  onToggle: () => void;
  onIncrement: () => void;
  onDecrement: () => void;
};

function ActivityRow({
  name,
  points,
  checked,
  withCounter,
  count,
  onToggle,
  onIncrement,
  onDecrement,
}: ActivityRowProps) {
  return (
    <div className="flex items-center justify-between py-2 border-b border-gray-800">
      <div className="flex items-center gap-3">
        <input
          type="checkbox"
          checked={checked}
          onChange={onToggle}
          className="w-4 h-4 accent-amber-400"
        />
        <span className={checked ? "text-white" : "text-gray-400"}>{name}</span>
      </div>

      <div className="flex items-center gap-2">
        {withCounter && checked && (
          <div className="flex items-center gap-1">
            <button
              onClick={onDecrement}
              className="w-6 h-6 text-gray-400 hover:text-white"
            >
              −
            </button>
            <span className="text-white w-4 text-center">{count}</span>
            <button
              onClick={onIncrement}
              className="w-6 h-6 text-gray-400 hover:text-white"
            >
              +
            </button>
          </div>
        )}
        <span
          className={`text-sm ${points > 0 ? "text-amber-400" : "text-red-400"}`}
        >
          {points > 0 ? "+" : ""}
          {count > 0 ? points * count : points}
        </span>
      </div>
    </div>
  );
}

export default ActivityRow;
