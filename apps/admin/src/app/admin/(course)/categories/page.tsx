import { API_URL_LOCAL } from "@/lib/constants";
import { validateResponse } from "@/lib/validate-response";
import {
  Pagination,
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@ng-youth/ui";
import { Category, Page } from "@ng-youth/lib/models";
import { buildQueryParams, formatNumber } from "@ng-youth/lib/utils";
import { cookies } from "next/headers";
import Link from "next/link";
import CategoryActionButtons from "./category-action-buttons";
import CategoryCreateButton from "./category-create-button";

interface Props {
  searchParams: { [key: string]: string | undefined };
}

const getCategories = async ({ searchParams }: Props) => {
  const query = buildQueryParams({
    ...searchParams,
    limit: 10,
    includeCourseCount: true,
  });
  const url = `${API_URL_LOCAL}/admin/categories${query}`;

  const resp = await fetch(url, {
    headers: {
      Cookie: cookies().toString(),
    },
  });

  await validateResponse(resp);

  return (await resp.json()) as Page<Category>;
};

export default async function Categories(props: Props) {
  const data = await getCategories(props);

  return (
    <>
      <div className="flex justify-between mb-4">
        <h2>Categories</h2>
        <CategoryCreateButton />
      </div>
      <Table>
        {data.contents.length === 0 && (
          <TableCaption className="text-start">
            No categories found
          </TableCaption>
        )}
        <TableHeader>
          <TableRow>
            <TableHead className="uppercase min-w-[300px] w-full">
              Category
            </TableHead>
            <TableHead className="uppercase min-w-[200px]">Slug</TableHead>
            <TableHead className="uppercase min-w-[200px]">
              No.of courses
            </TableHead>
            <TableHead className="uppercase min-w-[150px]">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="border-b">
          {data.contents.map((c, i) => {
            return (
              <TableRow key={c.id}>
                <TableCell>
                  <h6>{c.name}</h6>
                </TableCell>
                <TableCell className="text-muted-foreground text-sm">
                  {c.slug}
                </TableCell>
                <TableCell className="text-muted-foreground text-sm">
                  {formatNumber(BigInt(c.courseCount ?? 0))}
                </TableCell>
                <TableCell>
                  <CategoryActionButtons category={c} />
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>

      <div className="mt-8 flex justify-end">
        <Pagination
          totalPage={data.currentPage}
          currentPage={data.currentPage}
          search={buildQueryParams(props.searchParams)}
          LinkComponent={Link}
        />
      </div>
    </>
  );
}
