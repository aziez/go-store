import { Skeleton } from "@/components/ui/skeleton";

export function TableSkeleton() {
  return (
    <table className="w-full">
      <thead>
        <tr>
          <th className="p-2">
            <Skeleton className="h-4 w-[100px]" />
          </th>
          <th className="p-2">
            <Skeleton className="h-4 w-[250px]" />
          </th>
          <th className="p-2">
            <Skeleton className="h-4 w-[200px]" />
          </th>
          <th className="p-2">
            <Skeleton className="h-4 w-[100px]" />
          </th>
        </tr>
      </thead>
      <tbody>
        {Array(15)
          .fill(null)
          .map((_, index) => (
            <tr key={index}>
              <td className="p-2 flex flex-col">
                <Skeleton className="h-4 w-[100px]" />
              </td>
              <td className="p-2">
                <Skeleton className="h-4 w-[250px]" />
              </td>
              <td className="p-2">
                <Skeleton className="h-4 w-[200px]" />
              </td>
              <td className="p-2">
                <Skeleton className="h-4 w-[100px]" />
              </td>
            </tr>
          ))}
      </tbody>
    </table>
  );
}
