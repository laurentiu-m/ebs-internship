export type TablePageTypes = {
  pageIndex: number;
  pageSize: number;
  totalPages: number;
  onPageChange: (index: number) => void;
  onRowsChange: (index: number) => void;
};
