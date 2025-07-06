"use client";

import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card";

import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable
} from "@tanstack/react-table";
import { MoreHorizontal, Plus, Code2 } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import TcgCodeDialog from "./TcgCodeDialog";

import {
  deleteTcgCode,
  getTcgCodeList,
  postTcgCode,
  updateTcgCode,
} from "@/api/tcgCode";

export default function TcgCode({ className }) {
  const [sorting, setSorting] = useState([]);
  const [columnFilters, setColumnFilters] = useState([]);
  const [columnVisibility, setColumnVisibility] = useState({});
  const [rowSelection, setRowSelection] = useState({});
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingRow, setEditingRow] = useState(null);
  const [data, setData] = useState([]);

  useEffect(() => {
    async function fetchTcgCodeList() {
      try {
        const res = await getTcgCodeList();
        handleFailCheck(res);
        if (res && res.data) {
          setData(res.data);
        }
      } catch (error) {
        if (error?.response?.data?.message) {
          alert(error.response.data.message);
        } else {
          alert(error.message);
        }
        console.error("TCG 코드 목록 조회 실패:", error);
      }
    }
    fetchTcgCodeList();
  }, []);

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
        const updateData = {
          ...editingRow,
          tcgCode: formData.tcgCode,
          memo: formData.memo,
        };
        const result = await updateTcgCode(updateData);
        handleFailCheck(result);

        setData((prevData) =>
          prevData.map((item) => {
            return item.tcgCodeId === editingRow.tcgCodeId ? result.data : item;
          })
        );
      } else {
        // 신규추가 API 호출
        // 새 항목 추가
        const newItem = {
          tcgCodeId: null,
          tcgCode: formData.tcgCode,
          memo: formData.memo,
        };
        const result = await postTcgCode(newItem);
        handleFailCheck(result);
        
        const listResponse = await getTcgCodeList();
        handleFailCheck(listResponse);
        if (listResponse && listResponse.data) {
          setData(listResponse.data);
        }
      }
      setIsDialogOpen(false);
      return true; // 성공 시 true 반환
    } catch (error) {
      console.error("데이터 저장 오류:", error);
      if (error?.response?.data?.message) {
        alert(error.response.data.message);
      } else {
        alert(error.message);
      }
      return false; // 실패 시 false 반환
    }
  };

  const handleFailCheck = (result) => {
    if (!result.success) {
      throw new Error(`message: ${result.message} code: ${result.errorCode}`);
    }
  };

  // 삭제 핸들러 함수
  const handleDelete = async (rowData) => {
    if (!window.confirm("정말로 이 TCG 코드를 삭제하시겠습니까?")) {
      return;
    }

    try {
      const result = await deleteTcgCode(rowData.tcgCodeId);
      handleFailCheck(result);

      // 성공 시 로컬 상태에서 제거
      setData((prevData) =>
        prevData.filter((item) => item.tcgCodeId !== rowData.tcgCodeId)
      );
    } catch (error) {
      if (error?.response?.data?.message) {
        alert(error.response.data.message);
      } else {
        alert(error.message);
      }
      console.error("삭제 중 오류 발생:", error);
      // 에러 처리 (예: 토스트 메시지)
    }
  };

  const columns = [
    {
      accessorKey: "tcgCode",
      header: () => <div className="text-center font-semibold">TCG Code</div>,
      cell: ({ row }) => (
        <div className="text-center font-mono bg-gray-50 px-2 py-1 rounded text-sm">
          {row.getValue("tcgCode")}
        </div>
      ),
    },
    {
      accessorKey: "memo",
      header: () => <div className="text-center font-semibold">메모</div>,
      cell: ({ row }) => (
        <div className="text-gray-700">{row.getValue("memo")}</div>
      ),
    },
    {
      id: "actions",
      enableHiding: false,
      cell: ({ row }) => {
        const rowData = row.original;
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0 float-right hover:bg-gray-100">
                <span className="sr-only">메뉴 열기</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-40">
              <DropdownMenuItem
                onClick={() => handleEditClick(rowData)}
                className="cursor-pointer hover:bg-blue-50"
              >
                수정
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => navigator.clipboard.writeText(rowData.tcgCode)}
                className="cursor-pointer hover:bg-blue-50"
              >
                TCG 코드 복사
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => handleDelete(rowData)}
                className="cursor-pointer text-red-600 hover:bg-red-50"
              >
                삭제
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];

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
  });

  return (
    <Card className={`${className}`}>
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-green-100 rounded-lg">
              <Code2 className="h-5 w-5 text-green-600" />
            </div>
            <div>
              <CardTitle className="text-xl font-bold text-gray-900">TCG 코드 관리</CardTitle>
              <CardDescription className="text-gray-600">
                TCG 코드를 등록하고 관리하세요
              </CardDescription>
            </div>
          </div>
          <Button 
            onClick={() => setIsDialogOpen(true)}
            className="bg-green-600 hover:bg-green-700 text-white shadow-sm"
          >
            <Plus className="h-4 w-4 mr-2" />
            코드 추가
          </Button>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        {data.length > 0 ? (
          <div className="overflow-hidden">
            <Table>
              <TableHeader className="bg-gray-50">
                {table.getHeaderGroups().map((headerGroup) => (
                  <TableRow key={headerGroup.id} className="border-b border-gray-200">
                    {headerGroup.headers.map((header) => (
                      <TableHead key={header.id} className="text-gray-700 font-semibold">
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                      </TableHead>
                    ))}
                  </TableRow>
                ))}
              </TableHeader>
              <TableBody>
                {table.getRowModel().rows?.length ? (
                  table.getRowModel().rows.map((row) => (
                    <TableRow
                      key={row.id}
                      data-state={row.getIsSelected() && "selected"}
                      className="hover:bg-gray-50 transition-colors"
                    >
                      {row.getVisibleCells().map((cell) => (
                        <TableCell key={cell.id} className="py-3">
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
                      className="h-24 text-center text-gray-500"
                    >
                      등록된 TCG 코드가 없습니다.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        ) : (
          <div className="text-center py-12 space-y-4">
            <Code2 className="h-16 w-16 text-gray-300 mx-auto" />
            <div className="space-y-2">
              <h3 className="text-lg font-semibold text-gray-700">TCG 코드가 없습니다</h3>
              <p className="text-gray-500">
                첫 번째 TCG 코드를 추가해보세요!
              </p>
            </div>
            <Button 
              onClick={() => setIsDialogOpen(true)}
              className="bg-green-600 hover:bg-green-700 text-white"
            >
              <Plus className="h-4 w-4 mr-2" />
              첫 코드 추가하기
            </Button>
          </div>
        )}
      </CardContent>

      <TcgCodeDialog
        isOpen={isDialogOpen}
        onOpenChange={handleDialogOpenChange}
        onSubmit={handleFormSubmit}
        editingRow={editingRow}
      />
    </Card>
  );
}
