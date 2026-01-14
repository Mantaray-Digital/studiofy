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

  return (
    <div className="w-full">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-900">Billing History</h2>
        <button
          type="button"
          onClick={onManageBilling}
          className="flex items-center gap-1.5 text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors"
        >
          Manage Billing
          <ArrowUpRight className="w-4 h-4" />
        </button>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        {/* Table Header */}
        <div className="grid grid-cols-5 gap-4 px-6 py-3 bg-gray-50 border-b border-gray-200">
          <div className="text-sm font-medium text-gray-500">Invoice</div>
          <div className="text-sm font-medium text-gray-500">Date</div>
          <div className="text-sm font-medium text-gray-500">Amount</div>
          <div className="text-sm font-medium text-gray-500">Status</div>
          <div className="text-sm font-medium text-gray-500 text-center">
            Action
          </div>
        </div>

        {/* Table Body */}
        <div className="divide-y divide-gray-100">
          {invoices.map((invoice) => (
            <div
              key={invoice.id}
              className="grid grid-cols-5 gap-4 px-6 py-4 items-center hover:bg-gray-50 transition-colors"
            >
              {/* Invoice Number */}
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4 text-gray-400" />
                <span className="text-sm text-gray-900">
                  {invoice.invoiceNumber}
                </span>
              </div>

              {/* Date */}
              <div className="text-sm text-gray-600">{invoice.date}</div>

              {/* Amount */}
              <div className="text-sm text-gray-900 font-medium">
                ${invoice.amount.toFixed(2)}
              </div>

              {/* Status */}
              <div>{getStatusBadge(invoice.status)}</div>

              {/* Action */}
              <div className="text-center">
                <button
                  type="button"
                  onClick={() => onDownloadInvoice?.(invoice.id)}
                  className="text-sm text-[var(--color-blue-600)] hover:text-[var(--color-blue-700)] font-medium transition-colors"
                >
                  Download
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
