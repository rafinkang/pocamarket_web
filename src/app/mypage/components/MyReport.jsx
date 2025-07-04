"use client";

import { useEffect, useState } from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
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

import CommonPagination from "@/components/pagination/Pagination";
import Link from "next/link";

import { getTradeStatusName } from "@/constants/reportStatus";
import { getUserReport } from "@/api/usersReport";
import moment from "moment";

export default function MyReport({ className }) {
  const PAGE_SIZE = 15;
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const [reportList, setReportList] = useState([]);

  const getReport = async() => {
    const params = {
      page: page, size: PAGE_SIZE, sort: "createdAt,desc"
    }

    const { data } = await getUserReport(params);
    setReportList(data.content);
    setTotalPage(data.totalPage);
  }

  useEffect(() => {
    getReport();
  }, [page])

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
                    <Link
                      className="text-blue-500 hover:underline hover:text-blue-600"
                      href={report.link}
                    >
                      이동
                    </Link>
                  </TableCell>
                  <TableCell>{getTradeStatusName(report.status)}</TableCell>
                  <TableCell className="text-left truncate max-w-[200px]">
                    <div dangerouslySetInnerHTML={{ __html: report.content.split(":").join("<br/>") }} />
                  </TableCell>
                  <TableCell className="text-left">{report.result || "-"}</TableCell>
                  <TableCell>{moment(report.createdAt).format('YYYY-MM-DD HH:mm:ss')}</TableCell>
                  <TableCell>{report.resultAt ? moment(report.resultAt).format('YYYY-MM-DD HH:mm:ss') : "-"}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <p>신고 내역이 없습니다.</p>
        )}
      </CardContent>
      <CardFooter className="flex justify-center">
        <CommonPagination
          page={page}
          totalPage={totalPage}
          onPageChange={setPage}
        />
      </CardFooter>
    </Card>
  );
}
