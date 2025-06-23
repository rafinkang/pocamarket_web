"use client";

import { useEffect, useState } from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function MyReport({ className }) {
  const [reportList, setReportList] = useState([
    {
      reporterNickname: "test",
      content: "사기는 안돼요.",
      createdAt: "2025-01-01",
      status: 0,
      result: "",
      resultAt: null,
    },
    {
      reporterNickname: "test2",
      content: "나한테 가져간 피카츄 돌려줘",
      createdAt: "2025-01-02",
      status: 1,
      result: "",
      resultAt: "2025-01-03",
    },
    {
      reporterNickname: "test3",
      content: "사기꾼33333",
      createdAt: "2025-01-03",
      status: 2,
      result: "사기 치지 마세요.",
      resultAt: "2025-01-04",
    },
    {
      reporterNickname: "test4",
      content: "제발 정지좀",
      createdAt: "2025-01-04",
      status: 3,
      result: "사실 확인을 위해 보류중.",
      resultAt: null,
    },
    {
      reporterNickname: "test5",
      content: "왜 하늘은 나를 낳고 사기꾼을 낳았는가",
      createdAt: "2025-01-05",
      status: 0,
      result: "",
      resultAt: "2025-01-06",
    },
    {
      reporterNickname: "test6",
      content: "GEN vs HEL",
      createdAt: "2025-01-06",
      status: 1,
      result: "",
      resultAt: "2025-01-07",
    },
    {
      reporterNickname: "test7",
      content:
        "마작이 하고 싶어요오오오오오오오오오오오오오오오오오오오옹\n오오오오오오오오오오오오오",
      createdAt: "2025-01-07",
      status: 2,
      result: "아이고 억울하시겠어요.",
      resultAt: null,
    },
  ]);

  const statusList = {
    0: "신고 접수",
    1: "처리 중",
    2: "처리 완료",
    3: "처리 보류",
  };

  useEffect(() => {
    setReportList((prev) => {
      return prev.map((report) => {
        return {
          ...report,
          status: { key: report.status, value: statusList[report.status] },
        };
      });
    });
  }, []);

  return (
    <Card className={`${className}`}>
      <CardHeader>
        <CardTitle>나의 신고페이지</CardTitle>
        <CardDescription>신고 내역을 확인할 수 있습니다.</CardDescription>
        {/* <CardAction>신고 내역 확인</CardAction> */}
      </CardHeader>
      <CardContent>
        <p>신고 내역</p>
        {reportList.length > 0 ? (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-center">신고 페이지</TableHead>
                <TableHead className="text-center">진행 상태</TableHead>
                <TableHead className="text-center">신고 사유</TableHead>
                <TableHead className="text-center">처리 내용</TableHead>
                <TableHead className="text-center">신고 일시</TableHead>
                <TableHead className="text-center">신고 처리 일시</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody className={"text-center"}>
              {reportList.map((report, index) => (
                <TableRow key={index}>
                  <TableCell>
                    <a
                      className="text-blue-500 hover:underline hover:text-blue-600"
                      href={`/trade/${report.tradeId}`}
                    >
                      이동
                    </a>
                  </TableCell>
                  <TableCell>{report.status?.value}</TableCell>
                  <TableCell className="text-left truncate max-w-[200px]">
                    {report.content}
                  </TableCell>
                  <TableCell className="text-left">{report.result || "-"}</TableCell>
                  <TableCell>{report.createdAt}</TableCell>
                  <TableCell>{report.resultAt}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <p>신고 내역이 없습니다.</p>
        )}
      </CardContent>
    </Card>
  );
}
