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

import { Badge } from "@/components/ui/badge";
import CommonPagination from "@/components/pagination/Pagination";
import Link from "next/link";
import { ExternalLink, FileText, AlertCircle } from "lucide-react";

import { getTradeStatusName } from "@/constants/reportStatus";
import { getUserReport } from "@/api/usersReport";
import moment from "moment";

export default function MyReport({ className }) {
  const PAGE_SIZE = 15;
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const [reportList, setReportList] = useState([]);

  /**
   * 상태에 따른 배지 스타일 반환
   */
  const getStatusBadge = (status) => {
    switch (status) {
      case 'COMPLETED':
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">완료</Badge>;
      case 'PROCESSING':
        return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">처리중</Badge>;
      case 'PENDING':
        return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">대기중</Badge>;
      default:
        return <Badge variant="outline">{getTradeStatusName(status)}</Badge>;
    }
  };

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
      <CardHeader className="pb-4">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-orange-100 rounded-lg">
            <FileText className="h-5 w-5 text-orange-600" />
          </div>
          <div>
            <CardTitle className="text-xl font-bold text-gray-900">신고 내역</CardTitle>
            <CardDescription className="text-gray-600">
              제출한 신고의 처리 현황을 확인하세요
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        {reportList.length > 0 ? (
          <div className="overflow-hidden">
            <Table>
              <TableHeader className="bg-gray-50">
                <TableRow className="border-b border-gray-200">
                  <TableHead className="text-center font-semibold text-gray-700">링크</TableHead>
                  <TableHead className="text-center font-semibold text-gray-700">진행 상태</TableHead>
                  <TableHead className="text-center font-semibold text-gray-700">신고 사유</TableHead>
                  <TableHead className="text-center font-semibold text-gray-700">처리 내용</TableHead>
                  <TableHead className="text-center font-semibold text-gray-700">신고 일시</TableHead>
                  <TableHead className="text-center font-semibold text-gray-700">처리 일시</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {reportList.map((report, index) => (
                  <TableRow key={index} className="hover:bg-gray-50 transition-colors">
                    <TableCell className="text-center py-3">
                      <Link
                        className="inline-flex items-center text-blue-600 hover:text-blue-800 hover:underline transition-colors"
                        href={report.link}
                      >
                        <ExternalLink className="h-4 w-4 mr-1" />
                        이동
                      </Link>
                    </TableCell>
                    <TableCell className="text-center py-3">
                      {getStatusBadge(report.status)}
                    </TableCell>
                    <TableCell className="py-3 max-w-[250px]">
                      <div className="text-left">
                        <div 
                          className="text-sm text-gray-700 line-clamp-2"
                          dangerouslySetInnerHTML={{ 
                            __html: report.content.split(":").join("<br/>") 
                          }} 
                        />
                      </div>
                    </TableCell>
                    <TableCell className="py-3 max-w-[200px]">
                      <div className="text-left text-sm text-gray-700">
                        {report.result || (
                          <span className="text-gray-400 italic">처리 대기중</span>
                        )}
                      </div>
                    </TableCell>
                    <TableCell className="text-center py-3">
                      <div className="text-sm text-gray-600">
                        {moment(report.createdAt).format('YYYY-MM-DD')}
                        <br />
                        <span className="text-xs text-gray-400">
                          {moment(report.createdAt).format('HH:mm:ss')}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell className="text-center py-3">
                      <div className="text-sm text-gray-600">
                        {report.resultAt ? (
                          <>
                            {moment(report.resultAt).format('YYYY-MM-DD')}
                            <br />
                            <span className="text-xs text-gray-400">
                              {moment(report.resultAt).format('HH:mm:ss')}
                            </span>
                          </>
                        ) : (
                          <span className="text-gray-400 italic">-</span>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        ) : (
          <div className="text-center py-12 space-y-4">
            <AlertCircle className="h-16 w-16 text-gray-300 mx-auto" />
            <div className="space-y-2">
              <h3 className="text-lg font-semibold text-gray-700">신고 내역이 없습니다</h3>
              <p className="text-gray-500">
                아직 제출한 신고가 없습니다.
              </p>
            </div>
          </div>
        )}
      </CardContent>
      {reportList.length > 0 && (
        <CardFooter className="flex justify-center bg-gray-50 border-t">
          <CommonPagination
            page={page}
            totalPage={totalPage}
            onPageChange={setPage}
          />
        </CardFooter>
      )}
    </Card>
  );
}
