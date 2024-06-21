<template>
  <AgGridVue
    :rowData="rowData"
    :style="{ height }"
    style="width: 100%"
    class="ag-theme-balham"
    :columnDefs="columnDefs"
    :gridOptions="gridOptions"
    @grid-ready="(e) => (gridApi = e.api)"
    :onSelectionChanged="() => $emit('select', gridApi.getSelectedRows())"
  />
</template>
<script>
import { AgGridVue } from "ag-grid-vue3";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-balham.css";

export default {
  props: {
    rowData: {
      type: Array,
      required: true,
    },
    columnDefs: {
      type: Array,
      required: true,
    },
    height: {
      type: String,
      default: "30.8vh",
    },
  },
  components: { AgGridVue },
  data() {
    return {
      gridApi: null,
      gridOptions: {
        pagination: true,
        animateRows: true,
        suppressMenuHide: true,
        suppressCellSelection: true,
        suppressNoRowsOverlay: true,
        paginationAutoPageSize: true,
        rowHeight: 34.5,
        headerHeight: 35.5,
        rowSelection: "multiple",

        defaultColDef: {
          flex: 1,
          minWidth: 95,
          filterParams: {
            debounceMs: 200,
            filterOptions: ["contains"],
            suppressAndOrCondition: true,
          },
        },
      },
    };
  },
};
</script>
