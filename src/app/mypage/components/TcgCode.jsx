"use client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState } from "react"



import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
  VisibilityState,
} from "@tanstack/react-table"
import { ArrowUpDown, ChevronDown, MoreHorizontal } from "lucide-react"

import { Checkbox } from "@/components/ui/checkbox"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import TcgCodeDialog from "./TcgCodeDialog"



export default function TcgCode() {

  const [sorting, setSorting] = useState([])
  const [columnFilters, setColumnFilters] = useState([])
  const [columnVisibility, setColumnVisibility] = useState({})
  const [rowSelection, setRowSelection] = useState({})
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [data, setData] = useState([{
    tcgCode: "포켓몬카드게임코드번호이다",
    uuid: 7211,
    status: 1,
    memo: "메모메모메모",
  },
  {
    tcgCode: "포켓몬카드게임코드번호이다2",
    uuid: 7212,
    status: 0,
    memo: "메모메모메모2",
  },
  {
    tcgCode: "포켓몬카드게임코드번호이다3",
    uuid: 7213,
    status: 1,
    memo: "메모메모메모3",
  },])
  const [editingRow, setEditingRow] = useState(null);

  // 수정 버튼 클릭 핸들러
  const handleEditClick = (rowData) => {
    setEditingRow(rowData);
    setIsDialogOpen(true);
  };

  // 다이얼로그가 닫힐 때 초기화
  const handleDialogOpenChange = (open) => {
    if (!open) {
      setEditingRow(null);
    }
    setIsDialogOpen(open);
  };

  const columns = [
    {
      accessorKey: "tcgCode",
      header: () => <div className="text-center">TCG Code</div>,
      cell: ({ row }) => (
        <div className="text-center">{row.getValue("tcgCode")}</div>
      ),
    },
    {
      accessorKey: "memo",
      header: () => <div className="text-center">Memo</div>,
      cell: ({ row }) => (
        <div className="capitalize">{row.getValue("memo")}</div>
      ),
    },
    {
      id: "actions",
      enableHiding: false,
      cell: ({ row }) => {
        const rowData = row.original
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0 float-right">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem
                onClick={() => navigator.clipboard.writeText(rowData.tcgCode)}
              >
                TCG Code 복사하기
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => { handleEditClick(rowData) }}
              >수정</DropdownMenuItem>
              <DropdownMenuItem>삭제</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )
      },
    },
  ]

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  })


  return (

    <Card className="w-full">
      <CardHeader>
        <CardTitle>친구 코드</CardTitle>
        <CardDescription>친구 코드를 복사하여 친구에게 공유할 수 있습니다.</CardDescription>
        <CardAction>Card Action</CardAction>
      </CardHeader>
      <CardContent>
        <div className="w-full">

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                {table.getHeaderGroups().map((headerGroup) => (
                  <TableRow key={headerGroup.id}>
                    {headerGroup.headers.map((header) => {
                      return (
                        <TableHead key={header.id}>
                          {header.isPlaceholder
                            ? null
                            : flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                        </TableHead>
                      )
                    })}
                  </TableRow>
                ))}
              </TableHeader>
              <TableBody>
                {table.getRowModel().rows?.length ? (
                  table.getRowModel().rows.map((row) => (
                    <TableRow
                      key={row.id}
                      data-state={row.getIsSelected() && "selected"}
                    >
                      {row.getVisibleCells().map((cell) => (
                        <TableCell key={cell.id}>
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell
                      colSpan={columns.length}
                      className="h-24 text-center"
                    >
                      등록된 친구 코드가 없습니다.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>

        </div>
      </CardContent>
      <CardFooter>
        <TcgCodeDialog
          open={isDialogOpen}
          onOpenChange={handleDialogOpenChange}
          initialData={editingRow}
        />
      </CardFooter>
    </Card>
  )
}