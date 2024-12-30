// src/utils/excelUtils.js
import * as XLSX from 'xlsx';

export const exportToExcel = (data,myTable) => {
    // Create a new workbook and worksheet
    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.json_to_sheet(data);

    // Define header style with gray background color
    const headerStyle = {
        fill: {
            fgColor: { rgb: 'D3D3D3' }, // Gray background
        },
        font: {
            color: { rgb: '000000' }, // Black font
            bold: true,
        },
    };

    // Apply the header style to the first row of the worksheet
    if (worksheet['!cols']) {
        worksheet['!cols'].forEach((col, index) => {
            const headerCellAddress = XLSX.utils.encode_cell({ r: 0, c: index });
            worksheet[headerCellAddress].s = headerStyle;
        });
    }

    // Add the worksheet to the workbook
    XLSX.utils.book_append_sheet(workbook, worksheet, myTable);

    // Write the workbook to a binary string and trigger a download
    XLSX.writeFile(workbook, `${myTable}.xlsx`);
};
