import { Injectable } from '@angular/core';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { PurchaseOrderDto } from '../common/dto/inventory/purchase-order-dto';
import { SalesOrderDTO } from '../common/dto/inventory/sales-order-dto';
import { ToasterService } from './toaster.service';

@Injectable({
    providedIn: 'root'
})
export class PdfService {

    constructor(private toaster: ToasterService) { }

    generatePurchaseOrderPDF(order: PurchaseOrderDto): void {
        try {
            this.createPurchaseOrderPDF(order);
            this.toaster.success('PDF Generated', 'Purchase order PDF has been downloaded');
        } catch (error) {
            console.error('Error generating PDF:', error);
            this.toaster.error('PDF Error', 'Failed to generate purchase order PDF');
        }
    }

    generateSalesOrderPDF(order: SalesOrderDTO): void {
        try {
            this.createSalesOrderPDF(order);
            this.toaster.success('PDF Generated', 'Sales order PDF has been downloaded');
        } catch (error) {
            console.error('Error generating PDF:', error);
            this.toaster.error('PDF Error', 'Failed to generate sales order PDF');
        }
    }

    private createPurchaseOrderPDF(order: PurchaseOrderDto): void {
        const doc = new jsPDF();
        const pageWidth = doc.internal.pageSize.getWidth();
        const pageHeight = doc.internal.pageSize.getHeight();

        // Add logo (placeholder - you'll need to add actual logo)
        const logoWidth = 20;
        const logoHeight = 20;
        const logoX = 10;
        const logoY = 5;
        // doc.addImage(logo, "PNG", logoX, logoY, logoWidth, logoHeight);

        // Add report title
        doc.setFont("helvetica", "bold");
        doc.setFontSize(16);
        doc.setTextColor(44, 62, 80);
        doc.text("PURCHASE ORDER REPORT", pageWidth / 2, 25, { align: "center" });

        // Add generation date
        doc.setFont("helvetica", "normal");
        doc.setFontSize(12);
        doc.setTextColor(100, 100, 100);
        doc.text(`Generated on: ${this.formatDate(new Date())}`, pageWidth / 2, 35, { align: "center" });

        // Add decorative line
        doc.setDrawColor(41, 128, 185);
        doc.setLineWidth(0.5);
        doc.line(14, 40, pageWidth - 14, 40);

        // Add Summary section
        doc.setFont("helvetica", "bold");
        doc.setFontSize(14);
        doc.setTextColor(44, 62, 80);
        doc.text("ORDER SUMMARY", 14, 55);

        // Summary info boxes
        this.createInfoBox(doc, 14, 60, 60, 25, "Order Code", order.purchaseCode || 'N/A', "#3498db");
        this.createInfoBox(doc, 84, 60, 60, 25, "Total Items", (order.orderItems?.length || 0).toString(), "#f1c40f");
        this.createInfoBox(doc, 154, 60, 40, 25, "Total Amount", `$${order.totalPrice?.toFixed(2) || '0.00'}`, "#2ecc71");

        // Order details
        let currentY = 100;
        doc.setFont("helvetica", "bold");
        doc.setFontSize(14);
        doc.setTextColor(44, 62, 80);
        doc.text("ORDER DETAILS", 14, currentY);

        currentY += 10;
        doc.setFont("helvetica", "normal");
        doc.setFontSize(11);
        doc.setTextColor(100, 100, 100);
        doc.text(`Order Date: ${this.formatDate(order.purchaseDate)}`, 14, currentY);
        doc.text(`Status: ${order.status || 'N/A'}`, 100, currentY);

        // Create items table
        currentY += 15;
        const itemsTableData = order.orderItems?.map((item, index) => [
            index + 1,
            item.productType?.productName || item.productName || 'N/A',
            `${item.size || 0} ML`,
            item.quantity?.toString() || '0',
            `$${item.unitPrice?.toFixed(2) || '0.00'}`,
            `$${((item.quantity || 0) * (item.unitPrice || 0)).toFixed(2)}`,
            `$${item.taxAmount?.toFixed(2) || '0.00'}`,
            `$${item.totalPriceWithTax?.toFixed(2) || '0.00'}`
        ]) || [];

        autoTable(doc, {
            startY: currentY,
            head: [["#", "Product", "Size", "Qty", "Unit Price", "Total", "Tax", "Total with Tax"]],
            body: itemsTableData.length > 0 ? itemsTableData : [["--", "No items available", "--", "--", "--", "--", "--", "--"]],
            theme: "striped",
            headStyles: {
                fillColor: [41, 128, 185],
                textColor: [255, 255, 255],
                fontStyle: "bold",
            },
            columnStyles: {
                0: { cellWidth: 10, halign: "center" },
                1: { cellWidth: 50, overflow: 'linebreak' },
                2: { cellWidth: 15, halign: "center" },
                3: { cellWidth: 15, halign: "center" },
                4: { cellWidth: 25, halign: "right" },
                5: { cellWidth: 25, halign: "right" },
                6: { cellWidth: 20, halign: "right" },
                7: { cellWidth: 30, halign: "right" },
            },
        });

        // Footer
        doc.setFontSize(10);
        doc.setTextColor(150, 150, 150);
        doc.text(`© ${new Date().getFullYear()} Fin XP - All Rights Reserved`, pageWidth / 2, pageHeight - 10, { align: "center" });

        // Save PDF
        doc.save(`Purchase_Order_${order.purchaseCode || 'Unknown'}.pdf`);
    }

    private createSalesOrderPDF(order: SalesOrderDTO): void {
        const doc = new jsPDF();
        const pageWidth = doc.internal.pageSize.getWidth();
        const pageHeight = doc.internal.pageSize.getHeight();

        // Add logo (placeholder - you'll need to add actual logo)
        const logoWidth = 20;
        const logoHeight = 20;
        const logoX = 10;
        const logoY = 5;
        // doc.addImage(logo, "PNG", logoX, logoY, logoWidth, logoHeight);

        // Add report title
        doc.setFont("helvetica", "bold");
        doc.setFontSize(16);
        doc.setTextColor(44, 62, 80);
        doc.text("SALES ORDER REPORT", pageWidth / 2, 25, { align: "center" });

        // Add generation date
        doc.setFont("helvetica", "normal");
        doc.setFontSize(12);
        doc.setTextColor(100, 100, 100);
        doc.text(`Generated on: ${this.formatDate(new Date())}`, pageWidth / 2, 35, { align: "center" });

        // Add decorative line
        doc.setDrawColor(41, 128, 185);
        doc.setLineWidth(0.5);
        doc.line(14, 40, pageWidth - 14, 40);

        // Add Summary section
        doc.setFont("helvetica", "bold");
        doc.setFontSize(14);
        doc.setTextColor(44, 62, 80);
        doc.text("ORDER SUMMARY", 14, 55);

        // Summary info boxes
        this.createInfoBox(doc, 14, 60, 60, 25, "Order Code", order.saleCode || 'N/A', "#3498db");
        this.createInfoBox(doc, 84, 60, 60, 25, "Total Items", (order.orderItems?.length || 0).toString(), "#f1c40f");
        this.createInfoBox(doc, 154, 60, 40, 25, "Total Amount", `$${order.totalPrice?.toFixed(2) || '0.00'}`, "#2ecc71");

        // Order details
        let currentY = 100;
        doc.setFont("helvetica", "bold");
        doc.setFontSize(14);
        doc.setTextColor(44, 62, 80);
        doc.text("ORDER DETAILS", 14, currentY);

        currentY += 10;
        doc.setFont("helvetica", "normal");
        doc.setFontSize(11);
        doc.setTextColor(100, 100, 100);
        doc.text(`Order Date: ${this.formatDate(order.saleDate)}`, 14, currentY);
        doc.text(`Status: ${order.status || 'N/A'}`, 100, currentY);

        // Create items table
        currentY += 15;
        const itemsTableData = order.orderItems?.map((item, index) => [
            index + 1,
            item.productType?.productName || item.productName || 'N/A',
            `${item.size || 0} ML`,
            item.quantity?.toString() || '0',
            `$${item.unitPrice?.toFixed(2) || '0.00'}`,
            `$${((item.quantity || 0) * (item.unitPrice || 0)).toFixed(2)}`,
            `$0.00`, // No tax amount for sales order
            `$${item.totalPrice?.toFixed(2) || '0.00'}`
        ]) || [];

        autoTable(doc, {
            startY: currentY,
            head: [["#", "Product", "Size", "Qty", "Unit Price", "Total"]],
            body: itemsTableData.length > 0 ? itemsTableData : [["--", "No items available", "--", "--", "--", "--"]],
            theme: "striped",
            headStyles: {
                fillColor: [41, 128, 185],
                textColor: [255, 255, 255],
                fontStyle: "bold",
            },
            columnStyles: {
                0: { cellWidth: 10, halign: "center" },
                1: { cellWidth: 50, overflow: 'linebreak' },
                2: { cellWidth: 15, halign: "center" },
                3: { cellWidth: 15, halign: "center" },
                4: { cellWidth: 25, halign: "right" },
                5: { cellWidth: 25, halign: "right" },

            },
        });

        // Footer
        doc.setFontSize(10);
        doc.setTextColor(150, 150, 150);
        doc.text(`© ${new Date().getFullYear()} Fin XP - All Rights Reserved`, pageWidth / 2, pageHeight - 10, { align: "center" });

        // Save PDF
        doc.save(`Sales_Order_${order.saleCode || 'Unknown'}.pdf`);
    }

    private createInfoBox(doc: jsPDF, x: number, y: number, width: number, height: number, title: string, value: string, color: string): void {
        // Box with rounded corners
        doc.setFillColor(255, 255, 255);
        doc.setDrawColor(230, 230, 230);
        doc.setLineWidth(0.5);
        doc.roundedRect(x, y, width, height, 2, 2, "FD");

        // Colored indicator on top
        doc.setFillColor(this.hexToRgb(color).r, this.hexToRgb(color).g, this.hexToRgb(color).b);
        doc.rect(x, y, width, 3, "F");

        // Title
        doc.setFont("helvetica", "normal");
        doc.setFontSize(9);
        doc.setTextColor(100, 100, 100);
        doc.text(title, x + 5, y + 10);

        // Value
        doc.setFont("helvetica", "bold");
        doc.setFontSize(14);
        doc.setTextColor(44, 62, 80);
        doc.text(value, x + 5, y + 20);
    }

    private hexToRgb(hex: string): { r: number; g: number; b: number } {
        // Remove # if present
        hex = hex.replace(/^#/, "");

        // Parse hex to RGB
        const bigint = parseInt(hex, 16);
        const r = (bigint >> 16) & 255;
        const g = (bigint >> 8) & 255;
        const b = bigint & 255;

        return { r, g, b };
    }

    private formatDate(date: string | Date | undefined): string {
        if (!date) return 'N/A';
        const d = new Date(date);
        return d.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    }
}