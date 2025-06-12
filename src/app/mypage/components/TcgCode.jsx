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
  const [editingRow, setEditingRow] = useState(null);
  const [data, setData] = useState([{
    tcgCodeId: 1,
    tcgCode: "포켓몬카드게임코드번호이다",
    memo: "메모메모메모",
  },
  {
    tcgCodeId: 2,
    tcgCode: "포켓몬카드게임코드번호이다2",
    memo: "메모메모메모2",
  },
  {
    tcgCodeId: 3,
    tcgCode: "포켓몬카드게임코드번호이다3",
    memo: "메모메모메모3",
  },])

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

  const handleFormSubmit = async (formData) => {
    try {
      if (editingRow) {
        // 항목수정 API 호출
        // 기존 항목 수정
        setData(prevData =>
          prevData.map(item =>
            item.tcgCodeId === editingRow.tcgCodeId
              ? {
                ...item,
                tcgCode: formData.tcgCode,
                memo: formData.memo
              }
              : item
          )
        );
      } else {
        // 신규추가 API 호출
        // 새 항목 추가
        const newItem = {
          tcgCodeId: 99,
          tcgCode: formData.tcgCode,
          memo: formData.memo,
        };
        setData(prevData => [...prevData, newItem]);
      }
      setIsDialogOpen(false);
      return true; // 성공 시 true 반환
    } catch (error) {
      console.error('데이터 저장 오류:', error);
      return false; // 실패 시 false 반환
    }
  };

  // 삭제 핸들러 함수
  const handleDelete = async (rowData) => {
    if (!window.confirm('정말로 이 TCG 코드를 삭제하시겠습니까?')) {
      return;
    }

    try {
      // await deleteTcgCode(rowData.tcgCodeId);
      // 성공 시 로컬 상태에서 제거
      setData(prevData =>
        prevData.filter(item => item.tcgCodeId !== rowData.tcgCodeId)
      );
    } catch (error) {
      console.error('삭제 중 오류 발생:', error);
      // 에러 처리 (예: 토스트 메시지)
    }
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
              <DropdownMenuItem
                onClick={() => handleDelete(rowData)}
                className="text-red-600 focus:text-red-600"
              >삭제</DropdownMenuItem>
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
          onSubmit={handleFormSubmit}
        />
      </CardFooter>
    </Card>
  )
}