'use client';

import { FileText, ArrowUpRight } from 'lucide-react';

interface Invoice {
  id: string;
  invoiceNumber: string;
  date: string;
  amount: number;
  status: 'paid' | 'pending' | 'failed';
}

interface BillingHistoryTableProps {
  invoices: Invoice[];
  onManageBilling?: () => void;
  onDownloadInvoice?: (invoiceId: string) => void;
}

export function BillingHistoryTable({
  invoices,
  onManageBilling,
  onDownloadInvoice,
}: BillingHistoryTableProps) {
  const getStatusBadge = (status: Invoice['status']) => {
    switch (status) {
      case 'paid':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 bg-green-100 text-green-700 text-xs font-medium rounded-full">
            Paid
          </span>
        );
      case 'pending':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 bg-yellow-100 text-yellow-700 text-xs font-medium rounded-full">
            Pending
          </span>
        );
      case 'failed':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 bg-red-100 text-red-700 text-xs font-medium rounded-full">
            Failed
          </span>
        );
    }
  };


}
