export function LineRows({ items }: { items: string[] }) {
  return (
    <div className="flex flex-col gap-2">
      {items.map((item) => (
        <div
          key={item}
          className="h-9 rounded-md border border-ds-grey-200 bg-ds-grey-50 px-3 text-[13px] leading-9 text-ds-grey-700"
        >
          {item}
        </div>
      ))}
    </div>
  );
}
