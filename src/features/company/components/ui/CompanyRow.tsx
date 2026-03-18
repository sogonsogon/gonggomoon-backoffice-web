'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ExternalLink, Pencil, Trash2 } from 'lucide-react';
import { Button } from '@/shared/components/ui/button';
import ConfirmDialog from '@/shared/components/ui/ConfirmDialog';
import { useDeleteCompany } from '@/features/company/queries';
import { toast } from 'sonner';
import type { CompanyListItem } from '@/features/company/types';
import { COMPANY_TYPE_OPTIONS } from '@/features/company/constants';
import type { ApiErrorResponse } from '@/shared/types/api';

interface CompanyRowProps {
  no: number;
  company: CompanyListItem;
  industryName?: string;
  last?: boolean;
}

export default function CompanyRow({ no, company, industryName, last = false }: CompanyRowProps) {
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const { mutate: deleteCompany, isPending: isDeleting } = useDeleteCompany();

  const companyTypeLabel = company.companyType
    ? COMPANY_TYPE_OPTIONS.find((option) => option.value === company.companyType)?.label
    : '-';

  const handleDeleteConfirm = (id: number) => {
    deleteCompany(id, {
      onSuccess: () => {
        toast.success('기업이 삭제되었습니다.');
        setIsConfirmOpen(false);
      },
      onError: (error: ApiErrorResponse) => {
        toast.error(error.message || '기업 삭제에 실패했습니다.');
        setIsConfirmOpen(false);
      },
    });
  };

  return (
    <>
      <div className={`flex items-center h-14 ${!last ? 'border-b border-ds-grey-200' : ''} `}>
        <div className="w-14 px-4 text-[13px] text-ds-grey-600 shrink-0">{no}</div>
        <div className="w-44 px-4 text-sm font-medium text-ds-grey-900">{company.companyName}</div>
        <div className="w-36 px-4 text-sm text-ds-grey-900 truncate">{industryName ?? '-'}</div>
        <div className="w-44 px-4">
          <span
            className={`inline-flex px-2 py-1 rounded-md text-xs font-medium ${COMPANY_TYPE_OPTIONS.find((option) => option.value === company.companyType)?.style}`}
          >
            {companyTypeLabel}
          </span>
        </div>
        <div className="w-32 px-4 text-sm text-ds-grey-700">
          {company.employeeCount != null ? `${company.employeeCount.toLocaleString()}명` : '-'}
        </div>
        <div className="w-32 px-4 text-sm text-ds-grey-700">{company.foundedYear ?? '-'}</div>
        <div className="w-72 px-4 flex items-center gap-2 shrink-0">
          <Link
            href={`https://gonggomoon.com/company/${company.companyId}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-8 items-center justify-center gap-1.5 rounded-md border border-ds-grey-200 bg-white px-3 text-[13px] font-medium text-ds-grey-600 no-underline visited:text-ds-grey-600 hover:bg-ds-grey-50 hover:no-underline"
          >
            <ExternalLink size={13} />
            상세보기
          </Link>
          <Button asChild size="sm" className="gap-1.5 bg-primary text-white hover:bg-primary/90">
            <Link href={`/company/edit/${company.companyId}`}>
              <Pencil size={13} />
              수정
            </Link>
          </Button>
          <Button
            size="sm"
            variant="outline"
            className="gap-1.5 text-ds-badge-red-text hover:bg-ds-badge-red-bg hover:border-ds-badge-red-text"
            disabled={isDeleting}
            onClick={() => setIsConfirmOpen(true)}
          >
            <Trash2 size={12} />
            삭제
          </Button>
        </div>
      </div>

      <ConfirmDialog
        open={isConfirmOpen}
        id={company.companyId}
        onOpenChange={setIsConfirmOpen}
        title="기업 삭제"
        description="정말 삭제하시겠습니까? 삭제된 기업은 복구할 수 없습니다."
        onConfirm={handleDeleteConfirm}
        isPending={isDeleting}
      />
    </>
  );
}
